import pickle
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
import numpy as np

def predict():
    # Load the best model from the pickle file
    with open('model\\best_model.pkl', 'rb') as file:
        best_model = pickle.load(file)
        best_model_name = best_model[0]
        best_model = best_model[2]

    # Load the data
    data_e4 = pd.read_csv('training_csv\\e4data.csv')
    data_e5 = pd.read_csv('training_csv\\e5data.csv')
    data_e6 = pd.read_csv('training_csv\\e6data.csv')
    data_e7 = pd.read_csv('training_csv\\e7data.csv')
    
    data = pd.concat([data_e7], ignore_index=True)

    X = data[[data.columns[0]]]
    Y = data[data.columns[1]]
    print(X,Y)
    polynomial_features = PolynomialFeatures(degree=2)
    x_line = np.linspace(X.min(), X.max(), Y.shape[0]).reshape(-1, 1)
    polynomial_features.fit_transform(x_line)
    
    # Define a dictionary to map model names to prediction processes
    prediction_process = {
        "Polynomial Regression": lambda model, X: model.predict(polynomial_features.transform(X)),
        "Linear Regression": lambda model, X: model.predict(X),
        "Lasso Regression": lambda model, X: model.predict(X),
        "Ridge Regression": lambda model, X: model.predict(X)
    }

    print("bm",best_model_name)
    # Perform dynamic prediction based on the model name
    y_pred = prediction_process[best_model_name](best_model, X)
    # print(polynomial_features.transform(X))
    # Plot the data and predictions
    plt.figure(figsize=(10, 6))
    plt.scatter(X, Y, color='blue', label='Actual Data')
    plt.plot(X, y_pred, color='red', label='Predicted Data')
    plt.title(f'{best_model_name} - Actual vs Predicted')
    plt.xlabel('X')
    plt.ylabel('y')
    plt.legend()
    plt.grid(True)
    plt.show()
    
predict()