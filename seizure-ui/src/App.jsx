import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import axios from "axios";

function App() {
  const [patientDetails, setPatientDetails] = useState(null);
  const [history, setHistory] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // ✅ Fetch patient history on load
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/history");
      setHistory(response.data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  // ✅ Handle Adding Patient (After form submission)
  const handlePatientAdded = (newPatient) => {
    setPatientDetails(newPatient);  // Show in Patient Info section
  };

  // ✅ Handle Theme Change
  const handleThemeChange = (darkMode) => {
    setIsDarkTheme(darkMode);
  };

  // ✅ Handle Prediction from EEGGraph
  const handlePredictionResult = (prediction) => {
    if (!patientDetails) {
      alert("Please add patient info first.");
      return;
    }

    // Update Patient Info with Prediction
    setPatientDetails((prev) => ({
      ...prev,
      status: prediction,
    }));

    // Refresh history after prediction
    fetchHistory();
  };

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-gray-800'
      }`}>
        <Navbar onThemeChange={handleThemeChange} isDarkTheme={isDarkTheme} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <DashboardPage 
                patientDetails={patientDetails}
                history={history}
                isDarkTheme={isDarkTheme}
                handlePatientAdded={handlePatientAdded}
                handlePredictionResult={handlePredictionResult}
              />
            } 
          />
          <Route 
            path="/patients" 
            element={<PatientsPage isDarkTheme={isDarkTheme} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
