"""This file creates api call for excelpage"""

# Python modules
import os
import io
from datetime import datetime

# Third party modules
import dask.dataframe as dd
import pandas as pd
import numpy as np
from flask import Blueprint, request, jsonify

# Application modules
from models import db, InputFiles, Users, Projects, TrainedModels
from utilities import handle_errors

# Creating the blueprint for excel_page
project_page = Blueprint("project", __name__)


@project_page.route("/upload-file", methods=["POST"])
@handle_errors("An error occurred while uploading the file")
def upload_file():
    """
    This function handles the API call
       for uploading files to the storage

    Returns:
       It returns a JSON response with the status of file uploaded
    """
    project_file = request.files["file"]

    # Convert the FileStorage object to a BytesIO object
    bytes_io = project_file.read()

    # Convert the BytesIO object to a Dask DataFrame
    pandas_df = pd.read_csv(io.BytesIO(bytes_io), low_memory=False)

    # Get the actual column count
    num_columns = len(pandas_df.columns)

    if num_columns <= 1:
        return jsonify({"error": "Invalid file, Please upload proper file"})

    # Checking the file type is csv or not
    if not (os.path.splitext(project_file.filename)[1].lower() == ".csv"):
        return jsonify({"error": "Invalid file format"})

    # Querying the user_id from the recent logged in user
    current_user = Users.query.order_by(Users.user_id.desc()).first()
    # Creating a new project for the file uploaded from the user
    new_project = Projects(project_name="device-vision", user_id=current_user.user_id)
    db.session.add(new_project)
    db.session.commit()

    # creating a file name according to the timestamp
    file_name = (
        str(new_project.project_id)
        + "_"
        + str(datetime.now().strftime("%Y%m%d_%H%M%S"))
        + ".csv"
    )

    # Making the corresponding directories for saving the file
    os.makedirs(
        f"storage\\media_files\\project_files\\{new_project.project_id}", exist_ok=True
    )
    current_file_path = (
        f"storage\\media_files\\project_files\\{new_project.project_id}\\" + file_name
    )

    # Reading the csv for preprocessing and saving it
    pandas_df.fillna("", inplace=True)
    # replacing the infinity values in the file
    pandas_df.replace([np.inf, -np.inf], "", inplace=True)
    pandas_df.to_csv(current_file_path, index=False)

    # Creating the new entry in the input_files table
    actual_input_file = InputFiles(
        file_path=current_file_path, project_id=new_project.project_id
    )
    db.session.add(actual_input_file)
    db.session.commit()
    
    return jsonify({"error": None, "projectId": new_project.project_id})


@project_page.route("/get-file-data/<project_id>", methods=["GET"])
@handle_errors("An error occured while fetching project data")
def send_file_data(project_id: int):
    """This api is for sending the project file content

    Args:
        project_id (int): The project id for the uploaded project file

    Returns:
        _Json response with project file content or error message
    """

    project = Projects.query.filter_by(project_id=project_id).first()

    if not project:
        return jsonify({"error": "Invalid projectID"})

    actual_input_file = InputFiles.query.filter_by(
        project_id=project.project_id
    ).first()

    # Define the chunk size as per your requirement
    chunk_size = 1000
    # Read the whole file
    actual_file = dd.read_csv(
        actual_input_file.file_path,
        blocksize=None,
        low_memory=False,
        dtype={"Signal_Mode": "object"},
    )
    # Get the requested page number
    page = int(request.args.get("page", 1))
    start_idx = (page - 1) * chunk_size

    # Read the requested chunk using Dask
    chunk = actual_file.compute().iloc[start_idx : start_idx + chunk_size]
    # skipping na values in file
    chunk.fillna("", inplace=True)
    # replacing the infinity values in the file
    chunk.replace([np.inf, -np.inf], "", inplace=True)

    column_list = [column for column in chunk.columns]
    chunk_records = chunk.to_dict(orient="records")
    existing_index = actual_file.index.compute()

    if (page) * chunk_size not in existing_index:
        # No more data to send
        next_page = None
    else:
        # Include the next page number
        next_page = page + 1

    return jsonify(
        {
            "error": None,
            "tableContent": chunk_records,
            "columns": column_list,
            "nextPage": next_page,
        }
    )
