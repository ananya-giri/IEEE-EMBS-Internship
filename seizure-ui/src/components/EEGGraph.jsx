import React, { useState } from "react";
import axios from "axios";

const EEGGraph = ({ onPredict, patient, isDarkTheme = true }) => {
  const [eegData, setEegData] = useState([]);

  const generateRandomEEG = () => {
    const randomData = Array.from({ length: 178 }, () => Math.random());
    setEegData(randomData);
  };

  const handlePredict = async () => {
    if (!patient) {
      alert("Please add patient information first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        eeg: eegData,
        patientName: patient.name,
        age: patient.age,
        gender: patient.gender,
      });

      alert(`Prediction: ${response.data.prediction}`);
      onPredict(response.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Prediction failed!");
    }
  };

  return (
    <div className={`mt-6 border shadow-2xl rounded-xl p-6 transform hover:scale-105 transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-gray-800 border-cyan-500/30 shadow-cyan-500/20 hover:shadow-cyan-500/40' 
        : 'bg-white border-blue-200 shadow-blue-200/30 hover:shadow-blue-300/50'
    }`}>
      <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center">
        🧠 EEG Data & Seizure Prediction
      </h2>

      <div className="mb-6">
        {eegData.length > 0 && (
          <div className={`border rounded-lg p-4 mb-4 ${
            isDarkTheme 
              ? 'bg-gray-900 border-cyan-500/30' 
              : 'bg-gray-50 border-blue-200'
          }`}>
            <div className="text-cyan-400 text-sm mb-2">EEG Signal Visualization:</div>
            <div className="h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse"></div>
              <div className={`text-center pt-6 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                📊 {eegData.length} data points captured
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={generateRandomEEG}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center"
        >
          ⚡ Generate EEG Data
        </button>

        <button
          onClick={handlePredict}
          className={`px-6 py-3 rounded-lg font-semibold transform transition-all duration-200 flex items-center ${
            eegData.length === 0 
              ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white hover:scale-105 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
          }`}
          disabled={eegData.length === 0}
        >
          🔍 Predict Seizure
        </button>
      </div>
    </div>
  );
};

export default EEGGraph;
