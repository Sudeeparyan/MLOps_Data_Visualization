"""Reuseable functions for this project"""
# python modules
from functools import wraps
import os

# flask modules
from flask import jsonify
import dask.dataframe as dd

# application modules
from models import Results


def handle_errors(error_message):
    """
    A decorator to handle errors in Flask routes by providing a custom error message.

    This decorator can be applied to Flask route functions to
    catch exceptions that occur during their execution.


    Args:
        error_message (str): The custom error message to be included in the response.

    Returns:
        function: The decorated route function."""

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                result = func(*args, **kwargs)
                return result
            except Exception as err:
                return jsonify({"error": error_message, "details": str(err)})

        return wrapper

    return decorator


def fetch_result_data(file_path: str, x_alias: str, y_alias: str):
    """This function is for fetching file data for the user

    Args:
        file_path (str): file path
        x_alias (str): column selected by the user for X axis
        y_alias (str): column selected by the user for Y axis

    Returns:
        JSON response: csv file content for plotting graph
    """
    data_set = dd.read_csv(
        file_path, blocksize=None, low_memory=False, dtype={"Signal_Mode": "object"}
    )
    data_set = data_set.compute()

    return jsonify(
        {
            "error": None,
            "bestFitDataX": data_set["best_fit_X"].values.tolist(),
            "bestFitDataY": data_set["best_fit_Y"].values.tolist(),
            "errorDataX": data_set["error_X"].values.tolist(),
            "errorDataY": data_set["error_Y"].values.tolist(),
            "actualDataX": data_set[x_alias].values.tolist(),
            "actualDataY": data_set[y_alias].values.tolist(),
            "errorCutoffX": [(data_set["error_X"]).min(),(data_set["error_X"]).max()],
            "errorCutoffY": [(data_set["error_Y"]).max()*0.2, (data_set["error_Y"]).max()*0.2],
            "xLabel": x_alias,
            "yLabel": y_alias,
        }
    )


def get_new_file_name(desired_name: str, file_id: int) -> str:
    """This creates the new file name for repeated files

    Args:
        available_names (list): list of available file names
        desired_name (str): name given by the user

    Returns:
       str : new file name
    """

    # separating the basename and extension from the filename
    base_name, extension = os.path.splitext(desired_name)
    count = 1
    new_name = desired_name

    # Checking for the existance of filename in db
    file_exists = Results.query.filter_by(
        result_file_path=f"storage\\media_files\\project_files\\{file_id}\\" + new_name,
        input_file_id=file_id,
    ).first()

    # iterating it in the loop unless new_name is created
    while file_exists:
        new_name = f"{base_name}({count})"
        count += 1
        file_exists = Results.query.filter_by(
            result_file_path=f"storage\\media_files\\project_files\\{file_id}\\{new_name}.csv",
            input_file_id=file_id,
        ).first()

    return new_name
