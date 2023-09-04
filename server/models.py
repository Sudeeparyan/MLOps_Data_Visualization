"""Creating database for device-vision """
# python modules
import pytz
from datetime import datetime

# flask modules
from flask_sqlalchemy import SQLAlchemy

# initializing the db
db = SQLAlchemy()


class Users(db.Model):
    """
    Represents a user in the database.

    Attributes:
        id (int): The unique identifier for the user.
        username (str): The username of the user.
        email (str): The email address of the user.
        password(str): The password of the user.
    """

    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)

    password = db.Column(db.String(50), nullable=False)
    child_project = db.relationship(
        "Projects", back_populates="parent_users", lazy=True
    )


class Projects(db.Model):
    """
    Represents a project in the database.

    Attributes:
        project_id (int): The unique identifier for the project (primary key).
        project_name (str): The name of the project.
        user_id (int): The user ID of the owner of the project (foreign key to Users table).

    """

    __tablename__ = "projects"
    project_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)

    parent_users = db.relationship("Users", back_populates="child_project")
    child_input_file = db.relationship(
        "InputFiles", back_populates="parent_projects", lazy=True
    )
    status = db.Column(db.Boolean, default=True, nullable=False)


class InputFiles(db.Model):
    """
    Represents an input file in the database.

    Attributes:
        input_file_id (int): The unique identifier for the input file (primary key).
        project_id (int): The project ID to which this input file belongs (foreign key to Projects table).
        file_path (str): The path of the input file.
        for_training (bool): A flag indicating whether the input file is for training.

    """

    __tablename__ = "input_files"
    input_file_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_id = db.Column(
        db.Integer, db.ForeignKey("projects.project_id"), nullable=False
    )
    parent_projects = db.relationship("Projects", back_populates="child_input_file")

    file_path = db.Column(db.String, nullable=False)
    for_training = db.Column(db.Boolean, default=False)
    child_results = db.relationship(
        "Results", back_populates="parent_input_files", lazy=True
    )
    child_trained_model = db.relationship(
        "TrainedModels", back_populates="parent_input_files"
    )

    status = db.Column(db.Boolean, default=True)


class TrainedModels(db.Model):
    """
    Represents a trained model in the database.

    Attributes:
        trained_model_id (int): The unique identifier for the trained model (primary key).
        trained_model_path (str): The path of the trained model.
        file_path (str): The path of the input file associated with this trained model (foreign key to InputFiles table).
        x_coordinate_alias (str): The alias for the x-coordinate.
        y_coordinate_alias (str): The alias for the y-coordinate.

    """

    __tablename__ = "trained_models"
    trained_model_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trained_model_path = db.Column(db.String(50), nullable=False)
    file_path = db.Column(db.String, db.ForeignKey("input_files.file_path"))

    parent_input_files = db.relationship(
        "InputFiles", back_populates="child_trained_model", lazy=True
    )
    x_coordinate_alias = db.Column(db.String(50), nullable=False)
    y_coordinate_alias = db.Column(db.String(50), nullable=False)
    creation_timestamp = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Boolean, default=True)
    
    child_results = db.relationship(
        "Results", back_populates="parent_trained_model", lazy=True
    )


class Results(db.Model):
    """
    Represents a result in the database.

    Attributes:
        result_id (int): The unique identifier for the result (primary key).
        trained_model_id (int): The trained model ID associated with this result (foreign key to TrainedModels table).
        input_file_id (int): The input file ID associated with this result (foreign key to InputFiles table).
        x_coordinate (str): The x-coordinate.
        y_coordinate (str): The y-coordinate.
        result_json_path (str): The path of the JSON file containing the result.
    """

    tz_ist = pytz.timezone("Asia/Kolkata")
    __tablename__ = "results"
    result_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trained_model_id = db.Column(
        db.Integer, db.ForeignKey("trained_models.trained_model_id"), nullable=False
    )
    parent_trained_model = db.relationship(
        "TrainedModels", back_populates="child_results"
    )

    input_file_id = db.Column(
        db.Integer, db.ForeignKey("input_files.input_file_id"), nullable=False
    )
    parent_input_files = db.relationship("InputFiles", back_populates="child_results")
    x_coordinate = db.Column(db.String(50), nullable=False)
    y_coordinate = db.Column(db.String(50), nullable=False)
    status = db.Column(db.Boolean, default=True)
    
    result_file_path = db.Column(db.String(50), nullable=False)
    creation_timestamp = db.Column(db.DateTime, nullable=False)
