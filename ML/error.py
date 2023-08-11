import numpy as np
import matplotlib.pyplot as plt
import pickle
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression, Lasso, Ridge, LogisticRegression
from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import pickle
import json

# user uploaded  Actual Data
data_e5 = pd.read_csv("training_csv\\e5data.csv")
data_e6 = pd.read_csv("training_csv\\e6data.csv")
data_e7 = pd.read_csv("training_csv\\e7data.csv")
data_e8 = pd.read_csv("training_csv\\e8data.csv")
data = pd.concat([data_e7], ignore_index=True)

X = data[[data.columns[0]]]
y = data[data.columns[1]]

file_path = "model\\best_model.pkl"
# Load the polynomial model from pickle file
with open(file_path, "rb") as f:
    model = pickle.load(f)
    # Generate points for the best fit polynomial curve

    x_line = np.linspace(X.min(), X.max(), y.shape[0]).reshape(-1, 1)
    # x_line = X
    if model[0] == "Polynomial Regression":
        poly = PolynomialFeatures(
            degree=model[1]
        )  # You can change the degree as needed
        x_line_poly = poly.fit_transform(x_line)
        y_line = model[2].predict(x_line_poly)
    else:
        y_line = model[2].predict(X)
    print(y.shape, y_line.shape)

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
    print(x_line, error)
    plt.show()
