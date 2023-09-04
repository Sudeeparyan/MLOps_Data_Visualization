"""Creates flask app instance"""

# flask modules
from flask import Flask

# application modules
from .project.project import project_page
from .training_model.trained_model import training_page
from .results.graph import result_page

def create_app():
    """
    This function creates the flask app for the server

    Returns:
        Flask object
    """
    # initializing the flask app
    app = Flask(__name__)

    # registering the blueprint for project page in the app
    app.register_blueprint(project_page, url_prefix='/api/v2/project')
    # registering the blueprint for training page in the app
    app.register_blueprint(training_page, url_prefix='/api/v2/training-model')
    # registering the blueprint for results page in the app
    app.register_blueprint(result_page, url_prefix='/api/v2/results')
    return app
