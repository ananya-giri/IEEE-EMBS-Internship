import requests
import numpy as np

# Dummy EEG data (178 random numbers as expected by your model)
dummy_eeg_data = np.random.rand(178).tolist()

response = requests.post(
    'http://127.0.0.1:5000/predict',
    json={"eeg": dummy_eeg_data}  # ✅ Key must be 'eeg'
)

try:
    print("Prediction Result:", response.json())
except Exception:
    print("Failed to parse JSON:", response.text)
