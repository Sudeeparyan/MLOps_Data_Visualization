"""This file creates api call for excelpage"""

# python modules
import datetime
import os

# third party modules
import dask.dataframe as dd
import numpy as np
from flask import Blueprint, request, jsonify

# application modules
from models import db, InputFiles, Users, Projects, TrainedModels, Results
from ml.prediction_from_model import prediction_using_trained_model
from utilities import handle_errors, save_csv_files

# creating the blueprint for excel_page
project_page = Blueprint("project", __name__)

@project_page.route("/upload-csv", methods=["POST"])
@handle_errors
def upload_csv():
    """
    This function handles the API call
       for uploading csv to the storage

    Returns:
       It returns a JSON response with the status of file uploaded
    """

    current_user = Users.query.order_by(Users.user_id.desc()).first()

    # Create a new project associated with the newly created user
    new_project = Projects(project_name="device-vision",
                           user_id=current_user.user_id)
    db.session.add(new_project)
    db.session.commit()

    csv_file = request.files["file"]
    file_name = (
        str(new_project.project_id)
        + "_"
        + str(datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))
        + ".csv"
    )

    os.makedirs(f"storage\\media_files\\project_csv\\{new_project.project_id}", exist_ok=True)
    current_csv_path = f"storage\\media_files\\project_csv\\{new_project.project_id}\\"+ file_name

    try:
        save_csv_files(csv_file, current_csv_path)
        df_dask = dd.read_csv(current_csv_path, low_memory=False, dtype={'Signal_Mode': 'object'})
        df_pandas = df_dask.compute()
        df_pandas.fillna("", inplace=True)

        df_dask = dd.from_pandas(df_pandas, npartitions=1)
        df_dask.to_csv(current_csv_path, index=False, single_file=True)

        input_file = InputFiles(
            file_path=current_csv_path, project_id=new_project.project_id
        )

        db.session.add(input_file)
        db.session.commit()

        return jsonify({"error": None, "projectId": new_project.project_id})

    except Exception as err:
       
        return jsonify({"error": "File uploaded is in incorrect format", "exact_message": str(err)})


@project_page.route("/get-csv/<project_id>", methods=["GET"])
@handle_errors
def send_csv(project_id):
    """This api is for sending the csv file content

    Args:
        project_id (int): The project id for the uploaded csv file

    Returns:
        _Json response with csv file content or error message
    """

    project = Projects.query.filter_by(project_id=project_id).first()

    if project:
        input_file = InputFiles.query.filter_by(
            project_id=project.project_id).first()

        try:
           
            chunk_size = 1000  # Define the chunk size as per your requirement
            actual_csv = dd.read_csv(input_file.file_path, blocksize=None, low_memory=False, dtype={'Signal_Mode': 'object'})  # Read the whole file

            page = int(request.args.get('page', 1))  # Get the requested page number
            start_idx = (page - 1) * chunk_size

            # Read the requested chunk using Dask
            chunk = actual_csv.compute().iloc[start_idx : start_idx + chunk_size]
            chunk.fillna("", inplace=True)
            chunk.replace([np.inf, -np.inf], "", inplace=True)
            column_list = [column for column in chunk.columns]
            chunk_records = chunk.to_dict(orient="records")
            existing_index = actual_csv.index.compute()
            
            if (page)*chunk_size not in existing_index:
                next_page = None  # No more data to send
            else:
                next_page = page + 1  # Include the next page number

            return jsonify({
                "error": None,
                "tableContent": chunk_records,
                "columns": column_list,
                "nextPage": next_page
            })

        except Exception as err:
            return jsonify({"error": "File uploaded is in incorrect format", "exact_message": str(err)})

            
    else:
        return jsonify({"error": "Invalid projectID"})


@project_page.route("/delete-project", methods=["DELETE"])
@handle_errors
def delete_project():
    """
    This API is for deleting projects and their associated CSV files
    The project_id to be deleted should be provided in the request body as a array.

    Returns:
        _Json response with success message or error message
    """
    data = request.get_json()
    project_id = data.get("project_id")

    if not project_id:
        return jsonify({"error": "No project_id provided in the request body."})

    project = Projects.query.filter_by(project_id=project_id).first()
    if project:
        input_file = InputFiles.query.filter_by(
            project_id=project.project_id
        ).first()

        if input_file:
            input_file.status = False

        # Delete the project
        project.status = False

    db.session.commit()
    return jsonify({"error": None})

@project_page.route("/test-data", methods=['POST'])
@handle_errors
def test_data():
    """Creating a training model for testing the actual csv"""
    
    project_data = request.get_json()
    project_ID = project_data.get('projectId')
    project = Projects.query.filter_by(project_id=project_ID).first()
    
    if project:
        input_file = InputFiles.query.filter_by(
            project_id=project.project_id).first()
        trained_model = TrainedModels(trained_model_path="ml\\trained_models\\best_model.pkl", file_path=input_file.file_path
                                    )
        db.session.add(trained_model)
        db.session.commit()
       
        return jsonify({"error": None,"modelId": trained_model.trained_model_id})
        
    else:
        return jsonify({"error": "Invalid projectID"})

@project_page.route("/get-results/<project_id>/<trained_model_id>", methods=['GET'])
def get_results(project_id,trained_model_id):
    """ Using ML trained model to fetch graph data
    """
    project = Projects.query.filter_by(project_id=project_id).first()
    
    if project:
        
        input_file = InputFiles.query.filter_by(
            project_id=project.project_id).first()
        trained_model = TrainedModels.query.filter_by(trained_model_id=trained_model_id).first()
        
        if trained_model:
            try:
                actual_csv = dd.read_csv(input_file.file_path).compute()
                file_path = prediction_using_trained_model(trained_model.trained_model_path, input_file.file_path, project_id)
                df = dd.read_csv(file_path,blocksize=None, low_memory=False, dtype={'Signal_Mode': 'object'})
                df = df.compute()
                
                # Select two columns and create a new DataFrame
                best_fit_columns = ['best_fit_X', 'best_fit_Y']  # Replace with actual column names
                best_fit_df = df[best_fit_columns]
                new_column_names = {'best_fit_X': 'x', 'best_fit_Y': 'y'}  # Replace with desired new names
                best_fit_df.rename(columns=new_column_names, inplace=True) 
                best_fit_df = best_fit_df.to_dict(orient='records')
                
                error_columns = ['error_X', 'error_Y']  # Replace with actual column names
                error_df = df[error_columns]
                new_column_names = {'error_X': 'x', 'error_Y': 'y'}  # Replace with desired new names
                error_df.rename(columns=new_column_names, inplace=True)
                error_df = error_df.to_dict(orient='records')
            
                actual_data_columns = [actual_csv.columns[0], actual_csv.columns[1]]  # Replace with actual column names
                actual_data_df = df[actual_data_columns]
                new_column_names = {actual_csv.columns[0]: 'x', actual_csv.columns[1]: 'y'}  # Replace with desired new names
                actual_data_df.rename(columns=new_column_names, inplace=True) 
                actual_data_df = actual_data_df.to_dict(orient='records')
                
                new_result = Results(trained_model_id=trained_model.trained_model_id,input_file_id=input_file.input_file_id,result_csv_path=file_path)
                db.session.add(new_result)
                db.session.commit()
            
                return jsonify({"error":None,"bestFitData": best_fit_df, "actualData": actual_data_df,"errorData": error_df})
            
            except Exception as err:
                
                return jsonify({"error": "file uploaded can't be trained", "exact_error_message": str(err)})
            
        else:
            return jsonify({"error": "Invalid modelID"})
            
        
    else:
        return jsonify({"error": "Invalid projectID"})
        
        
        
        
    