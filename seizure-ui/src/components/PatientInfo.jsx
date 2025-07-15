import React from "react";

const PatientInfo = ({ patient, isDarkTheme = true }) => {
  if (!patient) {
    return (
      <div className={`border shadow-2xl rounded-xl p-6 w-full max-w-md mx-auto mt-6 text-center animate-pulse ${
        isDarkTheme 
          ? 'bg-gray-800 border-gray-600 text-gray-400' 
          : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <div className="text-cyan-400 mb-2">⚡</div>
        No patient selected yet.
      </div>
    );
  }

  return (
    <div className={`border shadow-2xl rounded-xl p-6 w-full max-w-md mx-auto mt-6 transform hover:scale-105 transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-gray-800 border-cyan-500/30 shadow-cyan-500/20 hover:shadow-cyan-500/40' 
        : 'bg-white border-blue-200 shadow-blue-200/30 hover:shadow-blue-300/50'
    }`}>
      <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">Patient Info</h2>
      <div className="space-y-3">
        <p className="flex items-center">
          <span className="font-medium text-cyan-400 mr-2">👤 Name:</span> 
          <span className={isDarkTheme ? 'text-white' : 'text-gray-800'}>{patient.name}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium text-cyan-400 mr-2">🎂 Age:</span> 
          <span className={isDarkTheme ? 'text-white' : 'text-gray-800'}>{patient.age}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium text-cyan-400 mr-2">⚧ Gender:</span> 
          <span className={isDarkTheme ? 'text-white' : 'text-gray-800'}>{patient.gender}</span>
        </p>
        {patient.status && (
          <p className="flex items-center animate-pulse">
            <span className="font-medium text-cyan-400 mr-2">📊 Status:</span>
            <span className={`ml-2 font-bold px-3 py-1 rounded-full ${patient.status === "Seizure" ? "text-red-400 bg-red-900/30 shadow-lg shadow-red-500/30" : "text-green-400 bg-green-900/30 shadow-lg shadow-green-500/30"}`}>
              {patient.status === "Seizure" ? "🚨 " : "✅ "}{patient.status}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientInfo;
