import React from "react";
import PatientInfo from "../components/PatientInfo";
import AddPatient from "../components/AddPatient";
import EEGGraph from "../components/EEGGraph";
import SeizureAlert from "../components/SeizureAlert";
import PatientHistory from "../components/Patienthistory";

const DashboardPage = ({ 
  patientDetails, 
  history, 
  isDarkTheme, 
  handlePatientAdded, 
  handlePredictionResult 
}) => {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 animate-pulse">
          Welcome to SeizureSense Dashboard
        </h1>
        <p className={`text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
          Advanced EEG Analysis & Seizure Prediction System
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* ✅ Add Patient Form */}
        <div className="slide-in">
          <AddPatient onPatientAdded={handlePatientAdded} isDarkTheme={isDarkTheme} />
        </div>

        {/* ✅ Patient Info */}
        <div className="slide-in" style={{animationDelay: '0.1s'}}>
          <PatientInfo patient={patientDetails} isDarkTheme={isDarkTheme} />
        </div>

        {/* ✅ Seizure Alert */}
        <div className="slide-in" style={{animationDelay: '0.2s'}}>
          <SeizureAlert status={patientDetails?.status} isDarkTheme={isDarkTheme} />
        </div>
      </div>

      {/* ✅ EEGGraph (Pass Patient Data) */}
      <div className="slide-in" style={{animationDelay: '0.3s'}}>
        <EEGGraph
          onPredict={handlePredictionResult}
          patient={patientDetails}
          isDarkTheme={isDarkTheme}
        />
      </div>

      {/* ✅ Patient History */}
      <div className="slide-in" style={{animationDelay: '0.4s'}}>
        <PatientHistory history={history} isDarkTheme={isDarkTheme} />
      </div>
    </div>
  );
};

export default DashboardPage;
