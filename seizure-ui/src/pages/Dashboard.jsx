import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [eegData, setEegData] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [prediction, setPrediction] = useState("");

  // ✅ Example dummy EEG data generator
  const generateRandomEEG = () => {
    const randomData = Array.from({ length: 178 }, () => Math.random());
    setEegData(randomData);
  };

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        eeg: eegData,
        patientName: patientName || "Anonymous",
      });
      setPrediction(response.data.prediction);
      alert(`Prediction: ${response.data.prediction}`);
    } catch (err) {
      console.error(err);
      alert("Prediction failed!");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center animate-pulse">
        🧠 Seizure Prediction Dashboard
      </h2>

      <div className="bg-gray-800 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 rounded-xl p-6 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
        <div className="mb-6">
          <label className="block mb-3 text-cyan-400 font-semibold">Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="bg-gray-700 border border-cyan-500/50 text-white placeholder-gray-400 px-4 py-3 w-full rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200"
            placeholder="Enter Patient Name"
          />
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={generateRandomEEG}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
          >
            ⚡ Generate Random EEG Data
          </button>

          <button
            onClick={handlePredict}
            className={`px-6 py-3 rounded-lg font-semibold transform transition-all duration-200 ${
              eegData.length === 0 
                ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white hover:scale-105 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
            }`}
            disabled={eegData.length === 0}
          >
            🔍 Predict Seizure
          </button>
        </div>

        {eegData.length > 0 && (
          <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4 mb-6">
            <div className="text-cyan-400 text-sm mb-2">EEG Signal Visualization:</div>
            <div className="h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse"></div>
              <div className="text-center pt-6 text-gray-400 text-sm">📊 {eegData.length} data points captured</div>
            </div>
          </div>
        )}

        {prediction && (
          <div className={`mt-6 p-4 rounded-lg text-lg font-semibold text-center ${
            prediction === "Seizure" 
              ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 animate-pulse" 
              : "bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg shadow-green-500/30"
          }`}>
            <span className="text-2xl mr-2">
              {prediction === "Seizure" ? "🚨" : "✅"}
            </span>
            Prediction Result: {prediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
