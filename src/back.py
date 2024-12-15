import pandas as pd
import os
from flask import Flask, render_template_string, send_file, request


app = Flask(_name_)

def process_telemetry_data(file_path):
    # Read the Excel file
    try:
        df = pd.read_excel(file_path, engine='openpyxl')
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return None

    # Ensure 'timestamp' is treated as a datetime
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

    # Initialize new anomaly columns
    df['water_level_anomaly'] = False
    df['battery_level_anomaly'] = False
    df['dwlr_depth_anomaly'] = False
    df['well_depth_anomaly'] = False
    df['temp_anomaly'] = False
    df['Notify'] = False

    # Check anomalies
    for idx, row in df.iterrows():
        water_level = row['water_level']
        battery = row['battery']
        DWLR_depth = row['DWLR_depth']
        well_depth = row['well_depth']
        water_temperature = row['water_temperature']

        water_level_anomaly = False
        if not pd.isna(water_level):
            # Filter water levels for the same telemetry UID
            water_levels = df[df['telemetry_uid'] == row['telemetry_uid']]['water_level'].dropna()
            # Get the list of indices for water levels of this telemetry UID
            water_level_indices = water_levels.index.tolist()
            # Find the current index in this filtered list
            current_index = water_level_indices.index(row.name)  # Use row.name for the index of the current row
            # Ensure it's not the first value (index 0) to calculate the difference
            if current_index > 0:
                recent = water_levels.iloc[current_index]
                historical = water_levels.iloc[current_index - 1]
                diff = abs(recent - historical)
                water_level_anomaly = diff >= 0.35


        # Battery level anomaly
        battery_level_anomaly = False
        if not pd.isna(battery):
            battery_level_anomaly = not (3.25 <= battery <= 4)

        # DWLR depth anomaly
        dwlr_depth_anomaly = False
        if not pd.isna(DWLR_depth) and abs(water_level) > DWLR_depth:
            dwlr_depth_anomaly = True

        # Well depth anomaly
        well_depth_anomaly = False
        if not pd.isna(well_depth) and (DWLR_depth > well_depth or abs(water_level) > well_depth):
            well_depth_anomaly = True

        # Temperature anomaly
        temp_anomaly = False
        if not pd.isna(water_temperature):
            temp_anomaly = not (15 <= water_temperature <= 35)

        # Notify
        notify = any([water_level_anomaly, battery_level_anomaly, dwlr_depth_anomaly, well_depth_anomaly, temp_anomaly])

        # Update the dataframe
        df.at[idx, 'water_level_anomaly'] = water_level_anomaly
        df.at[idx, 'battery_level_anomaly'] = battery_level_anomaly
        df.at[idx, 'dwlr_depth_anomaly'] = dwlr_depth_anomaly
        df.at[idx, 'well_depth_anomaly'] = well_depth_anomaly
        df.at[idx, 'temp_anomaly'] = temp_anomaly
        df.at[idx, 'Notify'] = notify

    # Define the desired column order
    column_order = [
        'telemetry_uid', 'state', 'district', 'tahsil', 'block', 'village', 'latitude', 'longitude',
        'timestamp', 'battery', 'water_temperature', 'water_level', 'DWLR_depth', 'well_depth',
        'water_level_anomaly', 'battery_level_anomaly', 'dwlr_depth_anomaly', 'well_depth_anomaly',
        'temp_anomaly', 'Notify'
    ]

    # Reorder columns
    df = df[column_order]
    return df

def data_to_html(data):
    # Generate HTML table
    html = '''
    <html>
    <head>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #4CAF50;
                color: white;
            }
            td.water-level-anomaly {
                background-color: #FFC0CB;
            }
            td.battery-level-anomaly {
                background-color: #FFB6C1;
            }
            td.dwlr-depth-anomaly {
                background-color: #FFD700;
            }
            td.well-depth-anomaly {
                background-color: #FF6347;
            }
            td.temp-anomaly {
                background-color: #FF4500;
            }
            td.notify-true {
                background-color: #FFFF00;
            }
        </style>
    </head>
    <body>
        <h1>Processed Telemetry Data</h1>
        <table>
            <thead>
                <tr>
                    <th>Telemetry UID</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Tahsil</th>
                    <th>Block</th>
                    <th>Village</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Timestamp</th>
                    <th>Battery</th>
                    <th>Water Temperature</th>
                    <th>Water Level</th>
                    <th>DWLR Depth</th>
                    <th>Well Depth</th>
                    <th>Water Level Anomaly</th>
                    <th>Battery Level Anomaly</th>
                    <th>DWLR Depth Anomaly</th>
                    <th>Well Depth Anomaly</th>
                    <th>Temp Anomaly</th>
                    <th>Notify</th>
                </tr>
            </thead>
            <tbody>
    '''
    for _, row in data.iterrows():
        html += '<tr>'
        for col in data.columns:
            value = row[col]
            class_name = ""
            if col.endswith('_anomaly') and value:
                class_name = col.replace('_', '-')
            if col == 'Notify' and value:
                class_name = 'notify-true'
            html += f'<td class="{class_name}">{value}</td>'
        html += '</tr>'
    html += '''
            </tbody>
        </table>
    </body>
    </html>
    '''
    return html

@app.route('/')
def display_table():
    file_path = r'C:\Users\MOHANAPRASAD\Downloads\Maha.xlsx'
    processed_data = process_telemetry_data(file_path)
    if processed_data is not None:
        return render_template_string(data_to_html(processed_data))
    else:
        return "Error processing data"

@app.route('/download')
def download_file():
    file_path = r'C:\Users\MOHANAPRASAD\Downloads\Maha.xlsx'
    processed_data = process_telemetry_data(file_path)
    if processed_data is not None:
        download_path = os.path.join(os.getcwd(), 'processed_telemetry_data.xlsx')
        processed_data.to_excel(download_path, index=False, engine='openpyxl')
        return send_file(download_path, as_attachment=True)
    else:
        return "Error processing data for download"


if _name_ == '_main_':
    app.run(debug=True)