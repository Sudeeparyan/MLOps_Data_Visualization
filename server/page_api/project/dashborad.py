"""This file contains the necessary api's for the dashboard"""
# Python modules
import os
from datetime import datetime

# Third party modules
from flask import  request, jsonify

# Application modules
from models import db, InputFiles, Projects
from utilities import (
    handle_errors
)


@project_page.route("/delete-project", methods=["DELETE"])
@handle_errors("Project can't be deleted from the database")
def delete_project():
    """
    Delete a project and associated project files.

    Deletes the specified project and sets its status to False.
    Also updates the status of the associated input file.

    Returns:
        JSON response with success message or error message
    """
    
    # Fetching the required details from the json body
    data = request.get_json()
    project_id = data.get("project_id")

    if not project_id:
        return jsonify({"error": "No project_id provided in the request body."})
    
    # Querying the db entities
    project = Projects.query.filter_by(project_id=project_id)
    input_file = InputFiles.query.filter_by(project_id=project.project_id)

    if input_file:
        input_file.status = False

    # changing the state of  the project to false
    project.status = False
    db.session.commit()

    return jsonify({"error": None})
