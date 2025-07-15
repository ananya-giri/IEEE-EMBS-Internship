from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
import joblib
import os

# ✅ TRAIN THE MODEL WITH REAL EEG SEIZURE DATA
print("Loading Epileptic Seizure Recognition dataset...")

# Load the real dataset
data_path = "../Epileptic Seizure Recognition.csv"
df = pd.read_csv(data_path)

print(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")
print(f"Target classes distribution:\n{df['y'].value_counts()}")

# Check for non-numeric columns and drop the first column (Unnamed)
if 'Unnamed: 0' in df.columns:
    df = df.drop('Unnamed: 0', axis=1)
elif df.columns[0] == 'Unnamed':
    df = df.drop(df.columns[0], axis=1)

# Prepare features and target
X = df.drop('y', axis=1).values  # All columns except 'y' are features
y = df['y'].values  # Target column

print(f"Feature matrix shape: {X.shape}")
print(f"Target vector shape: {y.shape}")

# Map the 5-class problem to binary classification
# Class 1 = Seizure activity, Classes 2-5 = Non-seizure activity
y_binary = (y == 1).astype(int)  # 1 = Seizure, 0 = Normal

print(f"Binary classification mapping:")
print(f"Seizure samples (class 1): {np.sum(y_binary == 1)}")
print(f"Normal samples (classes 2-5): {np.sum(y_binary == 0)}")

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_binary, test_size=0.2, random_state=42, stratify=y_binary
)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the model
print("Training Random Forest model...")
clf = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
clf.fit(X_train_scaled, y_train)

# Evaluate the model
y_pred = clf.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)

print(f"Model trained with accuracy: {accuracy:.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['Normal', 'Seizure']))

# Save the model and scaler
joblib.dump(clf, 'seizure_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("Model and scaler saved successfully!")

# ✅ SET UP FLASK API
app = Flask(__name__)

# Load the trained model and scaler
model = joblib.load("seizure_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        eeg_data = np.array(data['eeg']).reshape(1, -1)
        
        # Ensure the input has the correct number of features (178)
        if eeg_data.shape[1] != 178:
            return jsonify({
                'error': f'Expected 178 features, got {eeg_data.shape[1]}',
                'prediction': 'Error'
            }), 400
        
        # Scale the input data
        eeg_data_scaled = scaler.transform(eeg_data)
        
        # Make prediction
        prediction = model.predict(eeg_data_scaled)
        probability = model.predict_proba(eeg_data_scaled)[0]
        
        result = "Seizure" if prediction[0] == 1 else "Normal"
        confidence = max(probability) * 100
        
        return jsonify({
            'prediction': result,
            'confidence': f"{confidence:.2f}%",
            'seizure_probability': f"{probability[1] * 100:.2f}%",
            'normal_probability': f"{probability[0] * 100:.2f}%"
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'prediction': 'Error'
        }), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    return jsonify({
        'model_type': 'Random Forest Classifier',
        'features': 178,
        'classes': ['Normal', 'Seizure'],
        'dataset': 'Epileptic Seizure Recognition',
        'description': 'Trained on real EEG data to detect seizure activity'
    })

@app.route('/')
def home():
    return "Seizure Prediction API is Running! (Trained on real EEG data)"

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, port=port)
