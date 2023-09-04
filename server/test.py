import random
import pandas as pd

# Define the number of rows and columns
num_rows = 5000
num_columns = 15
decimal_places = 2  # Number of decimal places to round to

# Create an empty list to hold the data
data = []

# Generate random data and populate the list
for _ in range(num_rows):
    row = [round(random.random(), decimal_places) for _ in range(num_columns)]
    data.append(row)

# Create column names
column_names = [f"Column_{i+1}" for i in range(num_columns)]

# Create a DataFrame from the data and column names
df = pd.DataFrame(data, columns=column_names)

# Save the DataFrame to a CSV file
csv_filename = "random_dataset.csv"
df.to_csv(csv_filename, index=False)

print(f"CSV file '{csv_filename}' has been created.")
