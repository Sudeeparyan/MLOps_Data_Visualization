import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Lasso, Ridge, BayesianRidge
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import r2_score
import numpy as np
import pickle


def find_best_degree(X_train, Y_train, max_degree=20):
    best_degree = 1
    best_accuracy = -float("inf")
    best_model_info = None

    models = [
        ("Linear Regression", LinearRegression()),
        ("Polynomial Regression", LinearRegression()),
        ("Lasso Regression", Lasso()),
        ("Ridge Regression", Ridge()),
        ("Bayesian Ridge Regression", BayesianRidge()),
    ]

    # Train and evaluate models
    for model_name, model in models:
        if model_name == "Polynomial Regression":
            for degree in range(1, max_degree + 1):
                polynomial_features = PolynomialFeatures(degree=degree)
                X_train_poly = polynomial_features.fit_transform(X_train)

                # Create models

                model.fit(X_train_poly, Y_train)
                y_pred = model.predict(polynomial_features.transform(X_test))

                accuracy = r2_score(Y_test, y_pred)

                if accuracy > best_accuracy:
                    best_accuracy = accuracy
                    best_degree = degree
                    best_model_info = (model_name, degree, model)
        else:
            model.fit(X_train, Y_train)
            y_pred = model.predict(X_test)

            accuracy = r2_score(Y_test, y_pred)

            if accuracy > best_accuracy:
                best_accuracy = accuracy
                best_model_info = (model_name, None, model)

    return best_model_info


data_e7 = pd.read_csv("training_csv\\e7data.csv")
data = pd.concat([data_e7], ignore_index=True)

X = data[[data.columns[0]]]  # Reshape to a 2D array
Y = data[data.columns[1]]

# Split the data into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, random_state=42
)

# Find the best degree dynamically
best_model_info = find_best_degree(X_train, Y_train, max_degree=200)
best_model_name, best_degree, best_model = best_model_info

print("Best Degree:", best_degree)

# Train the best model with the best degree
if best_model_name == "Polynomial Regression":
    polynomial_features = PolynomialFeatures(degree=best_degree)
    X_train_poly = polynomial_features.fit_transform(X_train)
    best_model.fit(X_train_poly, Y_train)
else:
    best_model.fit(X_train, Y_train)

# Test the best model
if best_model_name == "Polynomial Regression":
    X_test_poly = polynomial_features.transform(X_test)
else:
    X_test_poly = X_test
y_pred = best_model.predict(X_test_poly)
best_accuracy = r2_score(Y_test, y_pred)

print(f"Best Model: {best_model_name}")
print(f"Best Model R-squared: {best_accuracy:.4f}")

# Save the best model information using pickle
best_model_info = (best_model_name, best_degree, best_model, best_accuracy)
with open("model\\best_model.pkl", "wb") as file:
    pickle.dump(best_model_info, file)
