import React from "react";

const PatientHistory = ({ history, isDarkTheme = true }) => {
  if (!history.length) {
    return (
      <div className={`border shadow-2xl rounded-xl p-6 mt-6 w-full max-w-5xl mx-auto text-center animate-pulse ${
        isDarkTheme 
          ? 'bg-gray-800 border-gray-600 text-gray-400' 
          : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <div className="text-cyan-400 mb-2 text-2xl">📊</div>
        No history data available yet.
      </div>
    );
  }

  return (
    <div className={`border shadow-2xl rounded-xl p-6 mt-6 w-full max-w-5xl mx-auto overflow-x-auto transform hover:scale-[1.02] transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-gray-800 border-cyan-500/30 shadow-cyan-500/20 hover:shadow-cyan-500/40' 
        : 'bg-white border-blue-200 shadow-blue-200/30 hover:shadow-blue-300/50'
    }`}>
      <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 flex items-center">
        📈 Patient Event History
      </h2>
      <div className={`overflow-hidden rounded-lg border ${isDarkTheme ? 'border-cyan-500/30' : 'border-blue-200'}`}>
        <table className={`min-w-full text-sm text-left ${isDarkTheme ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
          <thead>
            <tr className={`text-cyan-400 font-semibold border-b ${
              isDarkTheme 
                ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30' 
                : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
            }`}>
              <th className="py-4 px-6">👤 Name</th>
              <th className="py-4 px-6">🎂 Age</th>
              <th className="py-4 px-6">⚧ Gender</th>
              <th className="py-4 px-6">⏰ Time</th>
              <th className="py-4 px-6">📊 Status</th>
              <th className="py-4 px-6">⏱ Duration</th>
            </tr>
          </thead>
          <tbody>
            {history.map((event, idx) => (
              <tr key={idx} className={`border-b transition-colors duration-200 ${
                isDarkTheme 
                  ? 'border-gray-700 hover:bg-gray-700/30' 
                  : 'border-gray-200 hover:bg-blue-50/30'
              }`}>
                <td className={`py-4 px-6 font-medium ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
                  {event.patientName}
                </td>
                <td className={`py-4 px-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {event.age}
                </td>
                <td className={`py-4 px-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {event.gender}
                </td>
                <td className={`py-4 px-6 font-mono text-xs ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {event.time}
                </td>
                <td className="py-4 px-6 font-bold">
                  <span className={`px-3 py-1 rounded-full text-sm ${event.status === "Seizure" ? "text-red-400 bg-red-900/30 shadow-lg shadow-red-500/30 animate-pulse" : "text-green-400 bg-green-900/30 shadow-lg shadow-green-500/30"}`}>
                    {event.status === "Seizure" ? "🚨 " : "✅ "}{event.status}
                  </span>
                </td>
                <td className={`py-4 px-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {event.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientHistory;
