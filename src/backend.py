import csv
from email.message import EmailMessage
import smtplib
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from urllib.parse import quote_plus
from pymongo import MongoClient
import pandas as pd
import io
import logging
import datetime
import pytz
import os
from dotenv import load_dotenv
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras import losses
from sklearn.preprocessing import StandardScaler
import joblib
from flask import Response
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
import jwt
import pyotp
from bcrypt import checkpw
from datetime import datetime
import smtplib
from email.message import EmailMessage
import logging

from werkzeug.utils import secure_filename


SECRET_KEY = "confluence"


load_dotenv()

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

username = quote_plus("utmaginesh")
password = quote_plus("maginesh@123")
connection_string = f"mongodb+srv://{username}:{password}@mycluster.sbko1.mongodb.net/"

myclient = MongoClient(connection_string)

db = myclient["sih24_confluence"]

users_collection = db['credentials']



@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'No file selected for uploading'}), 400
        
        collection = db[file.filename[0:len(file.filename) - 4]]

        try:
            data = pd.read_csv(io.BytesIO(file.read()))
            
            if 'dwlr_id' not in data.columns:
                return jsonify({'message': "'dwlr_id' column is missing in the uploaded file."}), 400
            
            india_tz = pytz.timezone('Asia/Kolkata')
            current_timestamp = datetime.datetime.now(india_tz)
            data['timestamp'] = current_timestamp

            records = data.to_dict(orient='records')

            for record in records:
                dwlr_id = record['dwlr_id']
                collection.update_one(
                    {'dwlr_id': dwlr_id},  
                    {'$set': record},      
                    upsert=True
                )
            return jsonify({'message': 'The DWLR Data has been updated successfully.'}), 200
        except Exception as e:
            logging.error(f"Error processing file: {str(e)}")
            return jsonify({'message': f'Error processing file: {str(e)}'}), 500
        
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    

@app.route('/updateFile', methods=['POST'])
def update_file():
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'No file selected for uploading'}), 400
        
        collection = db[file.filename[0:len(file.filename) - 4]]

        try:
            data = pd.read_csv(io.BytesIO(file.read()))
            
            if 'dwlr_id' not in data.columns:
                return jsonify({'message': "'dwlr_id' column is missing in the uploaded file."}), 400
            
            india_tz = pytz.timezone('Asia/Kolkata')
            current_timestamp = datetime.datetime.now(india_tz)
            data['timestamp'] = current_timestamp

            records = data.to_dict(orient='records')

            for record in records:
                dwlr_id = record['dwlr_id']
                collection.update_one(
                    {'dwlr_id': dwlr_id},  
                    {
                        '$set': {
                            'anomaly': record['anomaly'] == "TRUE",  
                            'battery_result': record['battery_result'] == "TRUE",  
                            'notify': record['notify'] == "TRUE",
                            **record  
                        }
                    },
                    upsert=True
                )
            return jsonify({'message': 'The DWLR Data has been updated successfully.'}), 200
        except Exception as e:
            logging.error(f"Error processing file: {str(e)}")
            return jsonify({'message': f'Error processing file: {str(e)}'}), 500
        
        
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    
model = tf.keras.models.load_model("./anomaly_detection_model.h5", custom_objects={'mse': losses.MeanSquaredError()})
scaler = joblib.load("./scaler.pkl")

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
        return True 
    else:
        return False 
    


@app.route('/dataAnalyse', methods=['POST'])
def data_analyse():
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'No file selected for uploading'}), 400

        data = pd.read_csv(file)

        data['anomaly'] = data['water_level'].apply(lambda x: True if detect_anomalies(x) else False)
        data['battery_result'] = data['battery_level'].apply(lambda x: check_battery_status(x))
        data['notify'] = np.where((data['anomaly']) | (data['battery_result']), True, False)

        csv_data = io.StringIO()
        data.to_csv(csv_data, index=False)
        csv_data.seek(0)

        return Response(
            csv_data.getvalue(),
            mimetype='text/csv',
            headers={"Content-Disposition": "attachment;filename=processed_data.csv"}
        )
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    
anomaly_mapping = {
    'water_level_anomaly': 'Water Level',
    'battery_level_anomaly': 'Battery Level',
    'dwlr_depth_anomaly': 'DWLR Depth',
    'well_depth_anomaly': 'Well Depth',
    'temp_anomaly': 'Temperature',
}

columns_to_remove = [
    'tahsil',
    'village',
    'water_level_anomaly',
    'battery_level_anomaly',
    'dwlr_depth_anomaly',
    'well_depth_anomaly',
    'temp_anomaly',
    'notify',
]
output_csv = 'output.csv'

def mail():
   
    sender_email = "bpraven05@gmail.com"
    sender_password = "dxew suoy yiex ozbx"
    recipient_email = "jaihari1020@gmail.com"

    email = EmailMessage()
    email["from"] = sender_email
    email["to"] = recipient_email
    email["subject"] = "Processed CSV Report"
    email.set_content("Hello! Please find the attached processed report.")

    try:
        with open(output_csv, "rb") as file:
            email.add_attachment(
                file.read(),
                maintype="application",
                subtype="vnd.ms-excel",
                filename="report.csv",  
            )
    except FileNotFoundError:
        print(f"Error: The file '{output_csv}' was not found.")
        return False

    
    try:
        with smtplib.SMTP(host="smtp.gmail.com", port=587) as smtp:
            smtp.ehlo()  # Greet the server
            smtp.starttls()  
            smtp.login(sender_email, sender_password)
            smtp.send_message(email)
        print("Email sent successfully!")
        return True
    except Exception as e:
        print(f"Error: Unable to send email. Details: {e}")
        return False

def process_csv(input_file, output_file):
    rows = []

    with open(input_file, mode='r', newline='', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            true_columns = [
                label for key, label in anomaly_mapping.items() if row.get(key) == 'TRUE'
            ]

            # Construct result column value
            row['result'] = (
                f"Anomaly detected in {', '.join(true_columns)}" if true_columns else "Normal"
            )
            rows.append(row)

    # Remove specified columns
    filtered_rows = []
    for row in rows:
        filtered_row = {key: value for key, value in row.items() if key not in columns_to_remove}
        filtered_rows.append(filtered_row)

    # Write the modified rows back to a new CSV file
    with open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=filtered_rows[0].keys())
        writer.writeheader()
        writer.writerows(filtered_rows)

    print(f"CSV file successfully processed. Output saved to: {output_file}")
    
    if mail():
        try:
            os.remove(output_file)
            print(f"The file '{output_file}' has been deleted after mailing.")
        except OSError as e:
            print(f"Error: Unable to delete the file '{output_file}'. Details: {e}")


@app.route('/emailReport', methods=['POST'])
def email_report():
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400

        input_csv = request.files['file']

        # Save the uploaded file temporarily
        filename = secure_filename(input_csv.filename)
        temp_file_path = os.path.join("temp", filename)  # You can create a temp folder for the file

        # Make sure the 'temp' directory exists
        if not os.path.exists("temp"):
            os.makedirs("temp")

        # Save the file to the server
        input_csv.save(temp_file_path)
        
        print(f"File saved to: {temp_file_path}")
        
        # Process the CSV and send the email
        process_csv(temp_file_path, output_csv)

        # Clean up the temporary file
        os.remove(temp_file_path)

        return jsonify({'message': 'CSV file processed and report emailed successfully'}), 200
        
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500


    

@app.route('/getdetails', methods=['GET'])
def get_details():
    try:
        state = request.args.get('state')
        dwlr_id = request.args.get('dwlrid')
        if not state or not dwlr_id:
            return jsonify({'message': 'Missing state or dwlr_id parameters'}), 400
        
        collection = db[state]  

        # col = db["west_bengal"]

        # result = col.update_many(
        #     {
        #         "notify": { "$exists": True, "$not": { "$type": "bool" } },
        #         "battery_result": { "$exists": True, "$not": { "$type": "bool" } }
        #     },
        #     [
        #         {
        #             "$set": {
        #                 "notify": { "$cond": { "if": { "$eq": ["$notify", "true"] }, "then": True, "else": False } },
        #                 "battery_result": { "$cond": { "if": { "$eq": ["$battery_result", "Sufficient"] }, "then": True, "else": False } }
        #             }
        #         }
        #     ]
        # )

        document = collection.find_one({'dwlr_id': dwlr_id})
        if document:
            document['_id'] = str(document['_id'])
            return jsonify(document), 200
        else:
            return jsonify({'message': 'No document found with the given dwlr_id'}), 404

    except Exception as e:
        logging.error(f"Error fetching details: {str(e)}")
        return jsonify({'message': f'Error fetching details: {str(e)}'}), 500
    

def make_newcall(msg):

    to = os.getenv('TWILIO_TO_PHONE_NUMBER')
    body = msg

    if not to or not body:
        return jsonify({'error': 'Missing "to" or "body" parameters'}), 400

    try:
        twiml = VoiceResponse()
        twiml.pause(length=3)
        twiml.say(body)
        twiml.pause(length=2)
        twiml.hangup()
        call = client.calls.create(
            to=to,
            from_=twilio_phone_number,
            twiml=twiml.to_xml()
        )

        return jsonify({'message': 'Call initiated successfully'}), 200
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': 'Failed to initiate call'}), 500
    


@app.route('/modelpredict', methods=['POST'])
def predict():
    try:

        model = tf.keras.models.load_model("./anomaly_detection_model.h5", custom_objects={'mse': losses.MeanSquaredError()})
        scaler = joblib.load("scaler.pkl")

        data = request.json
        water_level = float(data.get('waterLevel', 0))
        battery_level = float(data.get('batteryLevel', 0))

        isbattery = battery_level < 20

        if water_level < 2.0 or water_level > 15.0 and isbattery:
            return jsonify({'message': 'Anomaly Detected in Water Level and Battery Level is also low'}), 200
        elif water_level < 2.0 or water_level > 15.0:
            return jsonify({'message': 'Anomaly Detected in Water Level'}), 200

        input_data = scaler.transform(np.array([[water_level]]))

        predicted = model.predict(input_data, verbose=0)

        reconstruction_error = np.abs(predicted - input_data)

        threshold = 0.1 

        is_anomaly = reconstruction_error[0][0] > threshold
        message = ''

        if is_anomaly and isbattery:
            message = 'Anomaly Detected in Water Level and Battery Level is also low'
        elif is_anomaly:
            message = 'Anomaly Detected in Water Level'
        elif isbattery:
            message = 'No Anomaly Dectected but the Battery level is low '
        else:
            message = 'safe'

        return jsonify({'message': message}), 200
    except Exception as e:
        logging.error(f"Error in predicting: {str(e)}")
        return jsonify({'message': f'Error in predicting: {str(e)}'}), 500



account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
twilio_phone_number = os.getenv('TWILIO_PHONE_NUMBER')

if not all([account_sid, auth_token, twilio_phone_number]):
    raise ValueError("Twilio credentials are missing. Please check your .env file.")

client = Client(account_sid, auth_token)


@app.route('/sms', methods=['POST'])
def send_sms():
    try:
        data = request.json
        message = data.get('pass')
        if not message:
            return jsonify({'error': 'Message body is required'}), 400

        to = os.getenv('TWILIO_TO_PHONE_NUMBER')

        try:
            message = client.messages.create(
                body=message,
                from_=twilio_phone_number,
                to=to
            )
            return jsonify({'message': 'Message sent successfully'}), 200
        except Exception as e:
            print(f'Error: {e}')
            return jsonify({'error': 'Failed to send message'}), 500
    except Exception as e:
        logging.error(f"Error fetching details: {str(e)}")
        return jsonify({'message': f'Error fetching details: {str(e)}'}), 500
    

def send_Newsms(message):
    try:

        to = os.getenv('TWILIO_TO_PHONE_NUMBER')

        try:
            message = client.messages.create(
                body=message,
                from_=twilio_phone_number,
                to=to
            )
            
            return jsonify({'message': 'Message sent successfully'}), 200
        except Exception as e:
            print(f'Error: {e}')
            return jsonify({'error': 'Failed to send message'}), 500
    except Exception as e:
        logging.error(f"Error fetching details: {str(e)}")
        return jsonify({'message': f'Error fetching details: {str(e)}'}), 500


@app.route('/call', methods=['POST'])
def make_call():
    data = request.get_json()

    to = os.getenv('TWILIO_TO_PHONE_NUMBER')
    body = data.get('pass')

    if not to or not body:
        return jsonify({'error': 'Missing "to" or "body" parameters'}), 400

    try:
        twiml = VoiceResponse()
        twiml.pause(length=3)
        twiml.say(body)
        twiml.pause(length=2)
        twiml.hangup()
        call = client.calls.create(
            to=to,
            from_=twilio_phone_number,
            twiml=twiml.to_xml()
        )

        return jsonify({'message': 'Call initiated successfully'}), 200
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': 'Failed to initiate call'}), 500




@app.route('/cardDetails', methods=['GET'])
def get_card_details():
    try:
        total_dwlr_count = 0
        total_anomaly_count = 0
        total_battery_count = 0
        total_anomaly_battery_count = 0

        for collection_name in db.list_collection_names():
            collection = db[collection_name]

            dwlr_count = len(collection.distinct('telemetry_uid'))
            total_dwlr_count += dwlr_count

            anomaly_count = collection.count_documents({'water_level_anomaly': True, 'battery_level_anomaly' : False})
            total_anomaly_count += anomaly_count

            battery_count = collection.count_documents({'battery_level_anomaly': True, 'water_level_anomaly': False})
            total_battery_count += battery_count

            anomaly_battery_count = collection.count_documents({'water_level_anomaly': True, 'battery_level_anomaly': True})
            total_anomaly_battery_count += anomaly_battery_count

        response_data = {
            'dwlrConnected': total_dwlr_count,
            'anomalyDetected': total_anomaly_count,
            'lowBattery': total_battery_count,
            'bothAnomalyLowBattery': total_anomaly_battery_count
        }

        return jsonify(response_data), 200

    except Exception as e:
        logging.error(f"Error fetching card details: {str(e)}")
        return jsonify({'message': f'Error fetching card details: {str(e)}'}), 500
    

@app.route('/tableDetails', methods=['GET'])
def getTableDetails():
    try:
        collections = db.list_collection_names()
        combined_data = []

        for collection_name in collections:
            if collection_name != 'credentials':  
                collection = db[collection_name]
                documents = list(collection.find({}))

                for doc in documents:
                    if '_id' in doc:
                        doc['_id'] = str(doc['_id'])  

                combined_data.extend(documents)  

        return jsonify(combined_data), 200

    except Exception as e:
        logging.error(f"Error fetching data: {e}")
        return jsonify({'error': str(e)}), 500

    

@app.route('/getStateDetails', methods=['GET'])
def get_state_details():
    try:
        state = request.args.get('state')
        if not state:
            return jsonify({'message': 'Missing state or dwlr_id parameters'}), 400
        
        collection = db[state]  
        combined_data = []
        documents = list(collection.find({}))
        for doc in documents:
            if '_id' in doc:
                doc['_id'] = str(doc['_id'])

        combined_data = documents
        return jsonify(combined_data), 200

    except Exception as e:
        logging.error(f"Error fetching details: {str(e)}")
        return jsonify({'message': f'Error fetching details: {str(e)}'}), 500


@app.route('/mapDetails', methods=['GET'])
def getMapDetails():
    try:
        collections = db.list_collection_names()

        all_data = {}

        for collection_name in collections:
            collection = db[collection_name]
            documents = list(collection.find({}))  

            for doc in documents:
                if '_id' in doc:
                    doc['_id'] = str(doc['_id'])

            all_data[collection_name] = documents

        return jsonify(all_data), 200

    except Exception as e:
        logging.error(f"Error fetching data: {e}")
        return jsonify({'error': str(e)}), 500
    



@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Please provide both email and password"}), 400

       
        user = users_collection.find_one({"email": email})
        if not user:
            return jsonify({"message": "Invalid email or password"}), 400


        if not (password==user['password']):
            return jsonify({"message": "Invalid email or password"}), 400

        return jsonify({"message": "Login successful", "user": {"email": user['email'], "name": user.get('name', '')}}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/mfaCheck', methods=['POST'])
def authenticate():
    try:
        data = request.json
        arr = data.get('otp')
        email = data.get('email')
        iat = data.get('iat')
        exp = data.get('exp')
        otp = ''
        for x in arr:
            otp += x
        user = users_collection.find_one({"email":email})
        key = user['mfa_key']
        totp = pyotp.TOTP(key)
        if not totp.verify(otp):
            return jsonify({'message': 'Invalid OTP'}), 401
        payload = {
            "email": email,
            "role": user['role'],
            "exp": exp,  
            "iat": iat,  
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return jsonify({'message': 'MFA Authentication successful', 'data': {'token': str(token)}}), 200
    except Exception as e:
        logging.error(f"Error in the MFA Process: {str(e)}")
        return jsonify({'message': f'Error in the MFA Process: {str(e)}'}), 500
    

@app.route('/signup', methods=['POST'])
def sign_up():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Please provide both email and password"}), 400


        key = pyotp.random_base32()


        hashed_password = generate_password_hash(password, method='bcrypt')

        existing_user = users_collection.find_one({"email": email})
        if existing_user:
            return jsonify({"message": "Email already exists"}), 400

        users_collection.insert_one({
            "email": email,
            "password": hashed_password,
            "mfa_key": key
        })

        return jsonify({"message": "Signup successful", "mfa_key": key}), 200

    except Exception as e:
        logging.error(f"Error Signing Up: {str(e)}")
        return jsonify({'message': f'Error Signing Up: {str(e)}'}), 500
    

        

@app.route('/getTelemetryDetails', methods=['GET'])
def getTelemetryDetails():
    try:
        telemetry_uid = request.args.get('dwlrid')
        state = request.args.get('state')
        target_date = request.args.get('date')

        if not target_date or not telemetry_uid:
            return jsonify({'message': 'Both date and telemetry_uid are required'}), 400
    
        collection = db[state]
        try:
   
            target_date = datetime.strptime(target_date, '%m/%d/%Y')

            
            start_date = target_date.replace(hour=0, minute=0, second=0, microsecond=0)
            end_date = target_date.replace(hour=23, minute=59, second=59, microsecond=999999)

            query = {
                'telemetry_uid': telemetry_uid,
                'timestamp': {
                    '$gte': start_date,
                    '$lt': end_date
                }
            }

            data = list(collection.find(query))

            if not data:
                return jsonify({'message': 'No data found for the given telemetry_uid and date'}), 404
            for item in data:
                item['_id'] = str(item['_id'])
            return jsonify(data), 200
        
        except ValueError:
            return jsonify({'message': 'Invalid date format, expected MM/DD/YYYY'}), 400


    except Exception as e:
        logging.error(f"Error Getting Details: {str(e)}")
        return jsonify({'message': f'Error Getting Details: {str(e)}'}), 500


@app.route('/getNewDetails', methods=['GET'])
def getNewDetails():
    try:
        telemetry_uid = request.args.get('dwlrid')
        state = request.args.get('state')
        target_date = request.args.get('date')

        if not target_date or not telemetry_uid:
            return jsonify({'message': 'Both date and telemetry_uid are required'}), 400
    
        collection = db[state]
        try:
   
            target_date = datetime.strptime(target_date, '%m/%d/%Y')

            
            start_date = target_date.replace(hour=0, minute=0, second=0, microsecond=0)
            end_date = target_date.replace(hour=23, minute=59, second=59, microsecond=999999)

            query = {
                'telemetry_uid': telemetry_uid,
                'timestamp': {
                    '$gte': start_date,
                    '$lt': end_date
                }
            }

            data = list(collection.find(query))

            if not data:
                return jsonify({'message': 'No data found for the given telemetry_uid and date'}), 404

            records = [doc for doc in data]


            isCheck1 = validate_uid_counts(records)

            isCheck2 = validate_fields(records)

            isCheck3 = validate_battery(records)

            isCheck4 = validate_water_level(records)

            p = 0

            res = 'Anomaly Detected in \n '
            if isCheck1:
                res += 'No of Readings received per day falls short,\n'
                p = p + 1
            if isCheck2:
                res += 'Any of the column is found to be Null,\n'
                p = p + 1
            if isCheck3:
                res += 'Anomaly in Battery Level,\n'
                p = p + 1
            if isCheck4:
                res += 'Anomaly in Water Level,\n'
                p = p + 1
            res += '.Please Respond As Soon As Possible'
            if p == 0:
                return jsonify({'message': "The Telemetry is safe!"}), 200
            send_Newsms(res)
            make_newcall(res)
            return jsonify({'message': str(res)}), 200

            
        except ValueError:
            return jsonify({'message': 'Invalid date format, expected MM/DD/YYYY'}), 400
        
    except Exception as e:
        logging.error(f"Error Getting Details: {str(e)}")
        return jsonify({'message': f'Error Getting Details: {str(e)}'}), 500
    

def validate_uid_counts(records):
    l = len(records)
    if l == 4:
        return False
    return True

def validate_fields(records):
    for record in records:
        if record['water_level'] is None or record['water_level'] == 0 or record['water_level'] == 1:
            return True
    return False


def validate_battery(records):
    for record in records:
        battery = record['battery']
        if battery <= 3.25 or battery >= 4:
            return True
    return False

def validate_water_level(records):
    ref = None
    for record in records:
        if ref is None:
            ref = record['water_level']
        elif abs((record['water_level'] - ref) >= 0.30):
            return True
        ref = record['water_level']
    return False


@app.route('/processTelemetry', methods=['POST'])
def process_telemetry_data():
    # Read the Excel file
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'No file selected for uploading'}), 400
        df = pd.read_excel(file, engine='openpyxl')

        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

        df['water_level_anomaly'] = False
        df['battery_level_anomaly'] = False
        df['dwlr_depth_anomaly'] = False
        df['well_depth_anomaly'] = False
        df['temp_anomaly'] = False
        df['notify'] = False

        for idx, row in df.iterrows():
            water_level = row['water_level']
            battery = row['battery']
            dwlr_depth = row['dwlr_depth']
            well_depth = row['well_depth']
            water_temperature = row['water_temperature']

            water_level_anomaly = False
            if not pd.isna(water_level):
                water_levels = df[df['telemetry_uid'] == row['telemetry_uid']]['water_level'].dropna()
                water_level_indices = water_levels.index.tolist()
                current_index = water_level_indices.index(row.name)  
                if current_index > 0:
                    recent = water_levels.iloc[current_index]
                    historical = water_levels.iloc[current_index - 1]
                    diff = abs(recent - historical)
                    water_level_anomaly = diff >= 0.35


            battery_level_anomaly = False
            if not pd.isna(battery):
                battery_level_anomaly = not (3.25 <= battery <= 4)

            dwlr_depth_anomaly = False
            if not pd.isna(dwlr_depth) and abs(water_level) > dwlr_depth:
                dwlr_depth_anomaly = True

            well_depth_anomaly = False
            if not pd.isna(well_depth) and (dwlr_depth > well_depth or abs(water_level) > well_depth):
                well_depth_anomaly = True

            temp_anomaly = False
            if not pd.isna(water_temperature):
                temp_anomaly = not (15 <= water_temperature <= 35)

            notify = any([water_level_anomaly, battery_level_anomaly, dwlr_depth_anomaly, well_depth_anomaly, temp_anomaly])

            df.at[idx, 'water_level_anomaly'] = water_level_anomaly
            df.at[idx, 'battery_level_anomaly'] = battery_level_anomaly
            df.at[idx, 'dwlr_depth_anomaly'] = dwlr_depth_anomaly
            df.at[idx, 'well_depth_anomaly'] = well_depth_anomaly
            df.at[idx, 'temp_anomaly'] = temp_anomaly
            df.at[idx, 'notify'] = notify

        column_order = [
            'telemetry_uid', 'state', 'district', 'tahsil', 'block', 'village', 'latitude', 'longitude',
            'timestamp', 'battery', 'water_temperature', 'water_level', 'dwlr_depth', 'well_depth',
            'water_level_anomaly', 'battery_level_anomaly', 'dwlr_depth_anomaly', 'well_depth_anomaly',
            'temp_anomaly', 'notify'
        ]

        df = df[column_order]

        collection = db[file.filename[0:len(file.filename) - 5]]

        records = df.to_dict(orient='records')

        collection.insert_many(records)

        return jsonify({'message': 'The DWLR Data has been updated successfully.'}), 200
    
    except Exception as e:
        logging.error(f"Error Getting Details: {str(e)}")
        return jsonify({'message': f'Error Getting Details: {str(e)}'}), 500
    

@app.route('/processBulkDs', methods=['POST'])
def process_bulk_ds():
    # Read the Excel file
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'No file selected for uploading'}), 400
        df = pd.read_excel(file, engine='openpyxl')


        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

        # Initialize new anomaly columns
        df['water_level_anomaly'] = False
        df['battery_level_anomaly'] = False
        df['dwlr_depth_anomaly'] = False
        df['well_depth_anomaly'] = False
        df['temp_anomaly'] = False
        df['notify'] = False

        # Check anomalies
        for idx, row in df.iterrows():
            water_level = row['water_level']
            battery = row['battery']
            dwlr_depth = row['dwlr_depth']
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
                    water_level_anomaly = diff >= 0.20


            # Battery level anomaly
            battery_level_anomaly = False
            if not pd.isna(battery):
                battery_level_anomaly = not (3.25 <= battery <= 4)

            # DWLR depth anomaly
            dwlr_depth_anomaly = False
            if not pd.isna(dwlr_depth) and abs(water_level) > dwlr_depth:
                dwlr_depth_anomaly = True

            # Well depth anomaly
            well_depth_anomaly = False
            if not pd.isna(well_depth) and (dwlr_depth > well_depth or abs(water_level) > well_depth):
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

        column_order = [
            'telemetry_uid', 'state', 'district', 'tahsil', 'block', 'village', 'latitude', 'longitude',
            'timestamp', 'battery', 'water_temperature', 'water_level', 'dwlr_depth', 'well_depth',
            'water_level_anomaly', 'battery_level_anomaly', 'dwlr_depth_anomaly', 'well_depth_anomaly',
            'temp_anomaly', 'notify'
        ]
        df = df[column_order]
        output = io.StringIO()
        df.to_csv(output, index=False)
        output.seek(0)

        # Return the CSV file as a response
        return send_file(
            io.BytesIO(output.getvalue().encode('utf-8')),
            as_attachment=True,
            download_name='processed_data.csv',
            mimetype='text/csv'
        )
    
    except Exception as e:
            logging.error(f"Error Getting Details: {str(e)}")
            return jsonify({'message': f'Error Getting Details: {str(e)}'}), 500
    

    

if __name__ == '__main__':
    app.run(debug=True)