"""APi's for generating ML results for the given project"""

# Python modules
import os
from datetime import datetime

# Third party modules
from flask import request, jsonify, Blueprint

# Application modules
from models import db, InputFiles, Projects, TrainedModels, Results
from machine_learning.prediction_from_model import generate_predictions
from utilities import handle_errors, fetch_result_data, get_new_file_name

# Creating the blueprint for results page
result_page = Blueprint("results", __name__)


@result_page.route("/generate-results", methods=["POST"])
@handle_errors("An error occured while fetching test results")
def get_results():
    """
    Fetch graph data using a trained model.

    Retrieves graph data including best fit, actual, and error data points using a trained model.

    Args:
        project_id (str): The ID of the project.
        trained_model_id (str): The ID of the trained model to use.

    Returns:
        JSON response with graph data or error message
    """
    # Getting the required data from request body
    request_body_data = request.get_json()
    project_id = request_body_data.get("projectId")
    trained_model_id = request_body_data.get("modelId")
    x_alias = request_body_data.get("xColumn")
    y_alias = request_body_data.get("yColumn")
    result_name = request_body_data.get("resultName")

    if result_name.isspace() or result_name == '':
        result_name = "Unnamed"
        
    # Fetching the entries from db
    project = Projects.query.filter_by(project_id=project_id).first()
    actual_input_file = InputFiles.query.filter_by(project_id=project_id).first()

    if not project:
        return jsonify({"error": "Invalid projectID"})

    # Checking whether the user given name already exists in db
    file_name_exists = Results.query.filter_by(
        result_file_path=f"storage\\media_files\\project_files\\{actual_input_file.input_file_id}\\"
        + result_name
        + ".csv",
        input_file_id=actual_input_file.input_file_id,
    ).first()

    if file_name_exists:
        # if yes then changing the name accordingly with its count
        result_name = get_new_file_name(
            result_name + ".csv", actual_input_file.input_file_id
        )

    actual_input_file = InputFiles.query.filter_by(
        project_id=project.project_id
    ).first()
    trained_model = TrainedModels.query.filter_by(
        trained_model_id=trained_model_id
    ).first()

    if not trained_model:
        return jsonify({"error": "Invalid modelID"})

    # Predicting the data using trained models
    result_file_path = generate_predictions(
        trained_model.trained_model_path,
        actual_input_file.file_path,
        project_id,
        x_alias,
        y_alias,
        result_name,
    )

    # Creating a new result entry in db
    new_result = Results(
        trained_model_id=trained_model.trained_model_id,
        input_file_id=actual_input_file.input_file_id,
        x_coordinate=x_alias,
        y_coordinate=y_alias,
        result_file_path=os.path.relpath(result_file_path),
        creation_timestamp=datetime.now(),
    )
    db.session.add(new_result)
    db.session.commit()

    return jsonify({"error": None, "resultId": new_result.result_id})


@result_page.route("/get-results/<project_id>/<result_id>", methods=["GET"])
@handle_errors("An error occured while fetching graph data")
def get_result(project_id, result_id):
    """This function renders the prediction results from ML to frontend
       to plot the graph

    Args:
        project_id (int): Unique id for the upload file for prediction using ML
        result_id (int): Unique id for the generated result

    Returns:
        Response object: contains the x&y coordinates for plotting the graph
    """
    # Fetching the entries from db
    project = Projects.query.filter_by(project_id=project_id).first()
    result = Results.query.filter_by(result_id=result_id).first()

    if not project:
        return jsonify({"error": "Invalid projectID"})

    if not result:
        return jsonify({"error": "Invalid resultID"})

    return fetch_result_data(
        result.result_file_path, result.x_coordinate, result.y_coordinate
    )


@result_page.route("/fetch-available-results", methods=["POST"])
@handle_errors("An error occured while fetching test results list")
def send_result_list():
    """
    Fetches available test results for a given project ID.

    This route handles a POST request containing a JSON payload with a 'projectId'
    field, which is used to retrieve the test results associated with the specified
    project.

    """
    # Getting the required data from json body
    project_id = request.get_json().get("projectId")
    # Fetching the entries from db
    actual_input_file = InputFiles.query.filter_by(project_id=project_id).first()

    if not actual_input_file:
        return jsonify({"error": "Invalid projectID"})

    # Querying all the available results from db
    results = Results.query.filter_by(
        input_file_id=actual_input_file.input_file_id
    ).all()

    # Getting the list of results along with id's and timestamp
    result_list = [
        {
            "resultName": result.result_file_path[
                result.result_file_path.rfind("\\")
                + 1 : result.result_file_path.rfind(".")
            ],
            "resultId": result.result_id,
            "createdTime": result.creation_timestamp.strftime("%d-%m-%y %H:%M"),
        }
        for result in results
    ]

    if result_list:
        return jsonify({"error": None, "results": result_list})

    else:
        return jsonify({"error": None, "details": "results not found"})
