import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
import numpy as np
import pickle

# Load the data
data_e7 = pd.read_csv('training_csv\\e7data.csv')
data = pd.concat([data_e7], ignore_index=True)

X = data[[data.columns[0]]]
y = data[data.columns[1]]

file_path = "model\\best_model.pkl"

# Load the polynomial model from pickle file
with open(file_path, "rb") as f:
    model_info = pickle.load(f)
    model_name, best_degree, best_model, best_accuracy = model_info

    # Generate points for the best fit polynomial curve
    x_line = np.linspace(X.min(), X.max(), y.shape[0]).reshape(-1, 1)

    if model_name == "Polynomial Regression":
        poly = PolynomialFeatures(degree=best_degree)
        x_line_poly = poly.fit_transform(x_line)
        y_line = best_model.predict(x_line_poly)
    else:

        y_line = best_model.predict(X)

    error = np.sqrt(np.square(y_line - y))

    # Plot the data points and the best fit polynomial curve
    plt.scatter(X, y, label="Data points")
    plt.plot(x_line, y_line, color="red", label="Best fit polynomial curve")
    plt.xlabel("X")
    plt.ylabel("y")
    plt.legend()
    plt.title("Best Fit Polynomial Curve using Polynomial Regression")
    plt.grid(True)
    plt.show()

    plt.plot(x_line, error, color='blue', label='error')
    plt.xlabel("X")
    plt.ylabel("Error")
    plt.legend()
    plt.title("Error of Best Fit Polynomial Curve")
    plt.grid(True)
    plt.show()

    # Save the best fit line coordinates in best_fit.csv
    best_fit_coords = pd.DataFrame({'X': x_line.flatten(), 'Y': y_line})
    best_fit_coords.to_csv('csv_best_fit\\best_fit.csv', index=False)

    # Save the error coordinates in error.csv
    error_coords = pd.DataFrame({'X': x_line.flatten(), 'Error': error})
    error_coords.to_csv('csv_error\\error.csv', index=False)
