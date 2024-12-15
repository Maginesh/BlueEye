import pandas as pd
import numpy as np
import tensorflow as tf
import joblib
from tensorflow.keras import losses

model = tf.keras.models.load_model("anomaly_detection_model.h5", custom_objects={'mse': losses.MeanSquaredError()})

scaler = joblib.load("scaler.pkl")

def detect_anomalies(water_level):

    if water_level < 2.0 or water_level > 15.0:
        return True  

    input_data = scaler.transform(np.array([[water_level]]))

    predicted = model.predict(input_data, verbose=0)

    reconstruction_error = np.abs(predicted - input_data)

    threshold = 0.1 

    is_anomaly = reconstruction_error[0][0] > threshold

    return is_anomaly

def check_battery_status(battery_level):
    if battery_level <= 10:
        return 'TRUE'  
    else:
        return 'FALSE' 

file_path = "final_karnataka.csv"  
data = pd.read_csv(file_path)

data['anomaly'] = data['water_level'].apply(lambda x: 'TRUE' if detect_anomalies(x) else 'FALSE')

data['battery_result'] = data['battery_level'].apply(lambda x: check_battery_status(x))

data['notify'] = np.where((data['anomaly'] == 'TRUE') | (data['battery_result'] == 'TRUE'), 'TRUE', 'FALSE')

output_file_path = "anomalies_battery_notify.csv"  
data.to_csv(output_file_path, index=False)

print(f"Anomalies detection and notification complete. Output saved to {output_file_path}")
