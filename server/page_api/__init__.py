"""Creates flask app instance"""

# flask modules
from flask import Flask

# application modules
from .project.project import project_page

def create_app():
    """
    This function creates the flask app for the server

    Returns:
        Flask object
    """
    # initializing the flask app
    app = Flask(__name__)

    # registering the blueprint in the app
    app.register_blueprint(project_page, url_prefix='/api/v2/project')
    
    return app
