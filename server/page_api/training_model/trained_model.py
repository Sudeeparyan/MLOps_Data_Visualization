"""This file contains necessary api's for training page"""
# Python modules
import os
from datetime import datetime

# Third party modules
from flask import request, jsonify, Blueprint

# Application modules
from models import TrainedModels
from utilities import handle_errors

# Creating the blueprint for training_page
training_page = Blueprint("training_model", __name__)


@training_page.route("/get-models", methods=["GET"])
@handle_errors("An error occured while fetching models list")
def get_models():
    """
    Retrieves a list of trained models available.

    This route handles a GET request to retrieve a list of trained models. For each
    model, relevant information such as model ID, coordinates, and aliases are included
    in the response.

    """
    available_models = []

    # Querying all the available models from db and iterating it for sending necessary info
    for model in TrainedModels.query.all():
        available_models.append(
            {
                model.trained_model_path[
                    model.trained_model_path.rfind("\\")
                    + 1 : model.trained_model_path.rfind(".")
                ]: {
                    "modelId": model.trained_model_id,
                    "xCoordinate": model.x_coordinate_alias,
                    "yCoordinate": model.y_coordinate_alias,
                    "createdTime": model.creation_timestamp.strftime(
                        "%d-%m-%y %H:%M"
                    ),
                }
            }
        )

    # Sending the available models to the user
    if available_models:
        return jsonify({"error": None, "models": available_models})

    else:
        return jsonify({"error": None, "details": "models not found"})
