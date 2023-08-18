"""Reuseable functions for this project"""
# python modules
from functools import wraps
import os
# flask modules
from flask import jsonify


def handle_errors(func):
    """ Args:
        func (function): The function to be decorated.

    Returns:
        function: The decorated function with exception handling."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as error:
            error_message = str(error)
            return jsonify({"error": error_message})

    return wrapper


def save_csv_files(file, path):
    """saving files in their corresponding directory"""
    try:
        print(path)
        file.save(path)

    except Exception as err:
        return jsonify({"error": "file can't be saved", "exact_message": err})