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

# from sklearn.preprocessing import MinMaxScaler

def get_graph_data():
    # Perform data preprocessing tasks here
    
    # Load data from CSV file
    data = pd.read_csv('training_csv\\e1data.csv')
    print(data)
    
    # 1. Handling Missing Values
    data.dropna(inplace=True)
    
    # 2. Encoding Categorical Variables 
    # data = pd.get_dummies(data, columns=['CategoricalColumn'])

    # 3. Feature Scaling/Normalization   
    # scaler = MinMaxScaler()
    # data[['Feature1', 'Feature2']] = scaler.fit_transform(data[['Feature1', 'Feature2']])

    # 4. Feature Selection 
    # selected_features = ['Feature1', 'Feature2', 'Target']
    # data = data[selected_features]

    # Extract input features (X) and target variable (y)
    X = data[data.columns[:-1]]  # Update with your column names
    y = data[data.columns[-1]]  # Update with your column name


get_graph_data()

