import React, { useState } from "react";
import axios from "axios";

const AddPatient = ({ onPatientAdded, isDarkTheme = true }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/patients", {
        name,
        age,
        gender,
      });

      alert("Patient Added Successfully");
      onPatientAdded(response.data);
      setName("");
      setAge("");
      setGender("");
    } catch (error) {
      console.error("Failed to add patient", error);
      alert("Failed to add patient");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`border shadow-2xl rounded-xl p-6 w-full max-w-md mx-auto mt-6 transform hover:scale-105 transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-gray-800 border-cyan-500/30 shadow-cyan-500/20 hover:shadow-cyan-500/40' 
        : 'bg-white border-blue-200 shadow-blue-200/30 hover:shadow-blue-300/50'
    }`}>
      <h2 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Add Patient Info</h2>
      <input
        type="text"
        placeholder="Patient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={`border px-3 py-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200 ${
          isDarkTheme 
            ? 'bg-gray-700 border-cyan-500/50 text-white placeholder-gray-400 focus:border-cyan-400 hover:border-cyan-400' 
            : 'bg-gray-50 border-blue-200 text-gray-800 placeholder-gray-500 focus:border-blue-400 hover:border-blue-300'
        }`}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        className={`border px-3 py-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200 ${
          isDarkTheme 
            ? 'bg-gray-700 border-cyan-500/50 text-white placeholder-gray-400 focus:border-cyan-400 hover:border-cyan-400' 
            : 'bg-gray-50 border-blue-200 text-gray-800 placeholder-gray-500 focus:border-blue-400 hover:border-blue-300'
        }`}
      />
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
        className={`border px-3 py-3 mb-6 w-full rounded-lg focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200 ${
          isDarkTheme 
            ? 'bg-gray-700 border-cyan-500/50 text-white placeholder-gray-400 focus:border-cyan-400 hover:border-cyan-400' 
            : 'bg-gray-50 border-blue-200 text-gray-800 placeholder-gray-500 focus:border-blue-400 hover:border-blue-300'
        }`}
      />
      <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg w-full font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50">
        Add Patient
      </button>
    </form>
  );
};

export default AddPatient;
