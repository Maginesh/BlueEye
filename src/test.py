import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split

# Load the training dataset
file_path = "new_goa.csv"  # Replace with the path to your file
data = pd.read_csv(file_path)

# Preprocess the data
data = data.dropna(subset=["water_level"])  # Drop rows with missing water level values
water_levels = data["water_level"].values.reshape(-1, 1)  # Reshape for single feature processing

# Normalize the water levels
scaler = MinMaxScaler()
normalized_water_levels = scaler.fit_transform(water_levels)

# Split the data into training and validation sets
train_features, val_features = train_test_split(normalized_water_levels, test_size=0.2, random_state=42)

# Build the anomaly detection model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation='relu', input_dim=1),  # Input dimension is now 1
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(1, activation='linear')  # Output dimension is 1
])
model.compile(optimizer='adam', loss='mse')

# Train the model with early stopping
early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
model.fit(train_features, train_features, 
          validation_data=(val_features, val_features),
          epochs=100, 
          batch_size=16, 
          shuffle=True, 
          verbose=1, 
          callbacks=[early_stopping])

# Calculate a dynamic threshold based on the validation set
reconstructed_val_features = model.predict(val_features, verbose=0)
reconstruction_errors_val = np.abs(reconstructed_val_features - val_features)
threshold = np.percentile(reconstruction_errors_val, 95)  # Set threshold to 95th percentile

# Save the model and scaler
model.save("anomaly_detection_model.h5")
import joblib
joblib.dump(scaler, "scaler.pkl")

# Function to detect anomalies with the added constraint
def detect_anomalies(water_level):
    # Check if water level is within the valid range (2.0 to 15.0)
    if water_level < 2.0 or water_level > 15.0:
        print(f"Water level {water_level} is outside the valid range (2.0 to 15.0). Anomaly detected based on range.")
        return True  # Return anomaly if out of bounds

    # Normalize the input value
    input_data = scaler.transform(np.array([[water_level]]))

    # Predict using the trained model
    predicted = model.predict(input_data, verbose=0)

    # Calculate reconstruction error
    reconstruction_error = np.abs(predicted - input_data)

    # Detect anomaly using the dynamic threshold
    is_anomaly = reconstruction_error[0][0] > threshold

    return is_anomaly

# Example of detecting anomalies
try:
    water_level_input = float(input("Enter water level: "))

    # Detect anomalies
    anomaly_detected = detect_anomalies(water_level_input)

    # Output the results
    print(f"Anomaly detected: {anomaly_detected}")
except Exception as e:
    print("Invalid input. Please enter a numeric value for water level.")

bi = int(input("Enter battery level: "))
if bi <= 10:
    print(True)
else:
    print(False)
