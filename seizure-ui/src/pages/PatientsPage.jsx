import React, { useState } from "react";

const PatientsPage = ({ isDarkTheme = true }) => {
  // Dummy patient data
  const [patients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 32,
      gender: "Male",
      lastVisit: "2025-07-10",
      status: "Normal",
      riskLevel: "Low",
      diagnosis: "No seizure activity",
      contactInfo: {
        phone: "+1 (555) 123-4567",
        email: "john.doe@email.com",
        emergencyContact: "Jane Doe - Wife"
      },
      medicalHistory: ["Mild concussion (2020)", "No previous seizures"],
      medication: ["None currently prescribed"]
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      age: 28,
      gender: "Female",
      lastVisit: "2025-07-11",
      status: "Seizure",
      riskLevel: "High",
      diagnosis: "Focal seizure activity detected",
      contactInfo: {
        phone: "+1 (555) 987-6543",
        email: "sarah.mitchell@email.com",
        emergencyContact: "Mark Mitchell - Husband"
      },
      medicalHistory: ["Epilepsy diagnosis (2018)", "Previous seizure episodes"],
      medication: ["Levetiracetam 500mg", "Lamotrigine 100mg"]
    },
    {
      id: 3,
      name: "Robert Chen",
      age: 45,
      gender: "Male",
      lastVisit: "2025-07-09",
      status: "Normal",
      riskLevel: "Medium",
      diagnosis: "Under observation",
      contactInfo: {
        phone: "+1 (555) 456-7890",
        email: "robert.chen@email.com",
        emergencyContact: "Lisa Chen - Wife"
      },
      medicalHistory: ["Head trauma (2019)", "Occasional headaches"],
      medication: ["Phenytoin 100mg (as needed)"]
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      age: 34,
      gender: "Female",
      lastVisit: "2025-07-12",
      status: "Normal",
      riskLevel: "Low",
      diagnosis: "Routine monitoring",
      contactInfo: {
        phone: "+1 (555) 321-0987",
        email: "emily.rodriguez@email.com",
        emergencyContact: "Carlos Rodriguez - Father"
      },
      medicalHistory: ["Family history of epilepsy", "No personal seizures"],
      medication: ["Vitamin D supplements"]
    },
    {
      id: 5,
      name: "Michael Thompson",
      age: 29,
      gender: "Male",
      lastVisit: "2025-07-08",
      status: "Seizure",
      riskLevel: "High",
      diagnosis: "Generalized tonic-clonic seizure",
      contactInfo: {
        phone: "+1 (555) 654-3210",
        email: "michael.thompson@email.com",
        emergencyContact: "Anna Thompson - Mother"
      },
      medicalHistory: ["Recent seizure onset (2024)", "Stress-induced episodes"],
      medication: ["Carbamazepine 200mg", "Diazepam (emergency)"]
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case "High": return "bg-red-900/30 text-red-400 border-red-500/30";
      case "Medium": return "bg-yellow-900/30 text-yellow-400 border-yellow-500/30";
      case "Low": return "bg-green-900/30 text-green-400 border-green-500/30";
      default: return "bg-gray-900/30 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusColor = (status) => {
    return status === "Seizure" 
      ? "text-red-400 bg-red-900/30 shadow-lg shadow-red-500/30 animate-pulse" 
      : "text-green-400 bg-green-900/30 shadow-lg shadow-green-500/30";
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-gray-800'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 animate-pulse">
            👥 Patient Management
          </h1>
          <p className={`text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive Patient Records & Monitoring
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients by name or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-3 pl-12 rounded-lg border focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200 ${
                isDarkTheme 
                  ? 'bg-gray-800 border-cyan-500/50 text-white placeholder-gray-400 focus:border-cyan-400' 
                  : 'bg-white border-blue-200 text-gray-800 placeholder-gray-500 focus:border-blue-400'
              }`}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
              🔍
            </div>
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <div
              key={patient.id}
              className={`border shadow-2xl rounded-xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer slide-in ${
                isDarkTheme 
                  ? 'bg-gray-800 border-cyan-500/30 shadow-cyan-500/20 hover:shadow-cyan-500/40' 
                  : 'bg-white border-blue-200 shadow-blue-200/30 hover:shadow-blue-300/50'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => setSelectedPatient(patient)}
            >
              {/* Patient Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {patient.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(patient.status)}`}>
                  {patient.status === "Seizure" ? "🚨" : "✅"} {patient.status}
                </span>
              </div>

              {/* Patient Details */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">🎂</span>
                  <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>Age: {patient.age}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">⚧</span>
                  <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>Gender: {patient.gender}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">📅</span>
                  <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>Last Visit: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">⚠️</span>
                  <span className={`px-2 py-1 rounded border text-sm ${getRiskBadgeColor(patient.riskLevel)}`}>
                    {patient.riskLevel} Risk
                  </span>
                </div>
                <div className="mt-4">
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="text-cyan-400">📋</span> {patient.diagnosis}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Patient Detail Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto border shadow-2xl rounded-xl p-6 ${
              isDarkTheme 
                ? 'bg-gray-800 border-cyan-500/30' 
                : 'bg-white border-blue-200'
            }`}>
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {selectedPatient.name}
                </h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-red-400 text-2xl transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              {/* Detailed Information */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">📋 Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Age:</span>
                      <p className={isDarkTheme ? 'text-white' : 'text-gray-800'}>{selectedPatient.age}</p>
                    </div>
                    <div>
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Gender:</span>
                      <p className={isDarkTheme ? 'text-white' : 'text-gray-800'}>{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Last Visit:</span>
                      <p className={isDarkTheme ? 'text-white' : 'text-gray-800'}>{selectedPatient.lastVisit}</p>
                    </div>
                    <div>
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Risk Level:</span>
                      <span className={`px-2 py-1 rounded border text-sm ${getRiskBadgeColor(selectedPatient.riskLevel)}`}>
                        {selectedPatient.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">📞 Contact Information</h3>
                  <div className="space-y-2">
                    <p><span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Phone:</span> {selectedPatient.contactInfo.phone}</p>
                    <p><span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Email:</span> {selectedPatient.contactInfo.email}</p>
                    <p><span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Emergency Contact:</span> {selectedPatient.contactInfo.emergencyContact}</p>
                  </div>
                </div>

                {/* Medical History */}
                <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">🏥 Medical History</h3>
                  <ul className="space-y-1">
                    {selectedPatient.medicalHistory.map((item, index) => (
                      <li key={index} className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Current Medication */}
                <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">💊 Current Medication</h3>
                  <ul className="space-y-1">
                    {selectedPatient.medication.map((med, index) => (
                      <li key={index} className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                        • {med}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Current Status */}
                <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">📊 Current Status</h3>
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 rounded-full font-bold ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status === "Seizure" ? "🚨" : "✅"} {selectedPatient.status}
                    </span>
                    <span className={`px-3 py-1 rounded border ${getRiskBadgeColor(selectedPatient.riskLevel)}`}>
                      {selectedPatient.riskLevel} Risk
                    </span>
                  </div>
                  <p className={`mt-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedPatient.diagnosis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
