"""ML program for testing the actual project data with the
   best trained model"""
# python modules
import os
import pickle
import datetime

# third-party modules
import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures


def generate_predictions(
    model_path: str,
    file_path: str,
    project_id: int,
    x_alias: str,
    y_alias: str,
    result_name: str,
) -> str:
    """Using the best fit model to predict the actual data

    Args:
    model_path (str): relative path to the best fit model
    file_path (str): relative path to the actual csv file

    Returns:
    str: file path to the predicted csv and error csv file
    """

    actual_data = pd.read_csv(file_path)
    actual_data.dropna(inplace=True)
    dependent_column = actual_data[x_alias]
    independent_column = actual_data[y_alias]

    # Load the polynomial model from pickle file
    with open(model_path, "rb") as fp:
        model_info = pickle.load(fp)
        model_name, best_degree, best_model, best_accuracy = model_info
        

    # Generate points for the best fit polynomial curve
    x_line = np.linspace(
        dependent_column.min(), dependent_column.max(), independent_column.shape[0]
    ).reshape(-1, 1)

    if model_name == "Polynomial Regression":
        poly = PolynomialFeatures(degree=best_degree)
        x_line_poly = poly.fit_transform(x_line)
        y_line = best_model.predict(x_line_poly)
    else:
        y_line = best_model.predict(dependent_column)

    error = np.sqrt(np.square(y_line - independent_column))

    best_fit_coordinates = pd.DataFrame(
        {"best_fit_X": x_line.flatten(), "best_fit_Y": y_line}
    )
    actual_coordinates = pd.DataFrame(
        {x_alias: dependent_column, y_alias: independent_column}
    )
    error_coordinates = pd.DataFrame({"error_X": x_line.flatten(), "error_Y": error})

    # Sort all DataFrames based on the same column
    result = pd.concat(
        [best_fit_coordinates, error_coordinates, actual_coordinates], axis=1
    )
    result = result.sort_values(by=[x_alias])

    # file path for the result csv to be stored
    file_path = os.path.abspath(os.path.join(os.getcwd()))
    file_path = os.path.join(
        file_path, "storage", "media_files", "project_files", str(project_id)
    )

    result.dropna(inplace=True)

    result.to_csv(file_path + f"\\{result_name}.csv", index=False)
    result_path = file_path + f"\\{result_name}.csv"

    return result_path
