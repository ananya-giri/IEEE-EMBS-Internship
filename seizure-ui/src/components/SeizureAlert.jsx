import React from "react";

const SeizureAlert = ({ status, isDarkTheme = true }) => {
  if (!status) {
    return (
      <div className={`w-full max-w-3xl mx-auto mt-6 p-6 rounded-xl border font-semibold text-center text-lg animate-pulse ${
        isDarkTheme 
          ? 'bg-gray-800 border-gray-600 text-gray-400' 
          : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <div className="text-cyan-400 mb-2 text-2xl">⚡</div>
        Awaiting EEG analysis...
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-3xl mx-auto mt-6 p-6 rounded-xl shadow-2xl text-white font-bold text-center text-xl transform hover:scale-105 transition-all duration-300 ${
        status === "Seizure" 
          ? "bg-gradient-to-r from-red-600 to-red-700 border border-red-500 shadow-red-500/50 animate-pulse" 
          : "bg-gradient-to-r from-green-600 to-emerald-700 border border-green-500 shadow-green-500/30"
      }`}
    >
      <div className="flex items-center justify-center space-x-3">
        <span className="text-3xl">
          {status === "Seizure" ? "🚨" : "✅"}
        </span>
        <span>
          {status === "Seizure" ? "Seizure Detected!" : "No Seizure - Normal Activity"}
        </span>
      </div>
      {status === "Seizure" && (
        <div className="mt-2 text-sm font-normal animate-bounce">
          Emergency protocol activated
        </div>
      )}
    </div>
  );
};

export default SeizureAlert;
