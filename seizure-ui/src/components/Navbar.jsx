import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onThemeChange, isDarkTheme = true }) => {
  const [isDark, setIsDark] = useState(isDarkTheme);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDark(!isDark);
    onThemeChange(!isDark);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`border-b shadow-lg p-4 flex justify-between items-center transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800 border-cyan-500 shadow-cyan-500/20' 
        : 'bg-white border-blue-200 shadow-blue-200/30'
    }`}>
      <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-400 hover:to-cyan-500 transition-all duration-300">
        🧠 SeizureSense
      </Link>
      <div className="space-x-6 flex items-center">
        <Link 
          to="/" 
          className={`font-medium transition-colors duration-200 hover:glow px-3 py-2 rounded-lg ${
            isActive('/') 
              ? (isDark ? 'text-cyan-400 bg-cyan-400/10' : 'text-blue-600 bg-blue-100') 
              : (isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500')
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/patients" 
          className={`font-medium transition-colors duration-200 hover:glow px-3 py-2 rounded-lg ${
            isActive('/patients') 
              ? (isDark ? 'text-cyan-400 bg-cyan-400/10' : 'text-blue-600 bg-blue-100') 
              : (isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500')
          }`}
        >
          Patients
        </Link>
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center space-x-2"
        >
          <span className="text-lg">
            {isDark ? "☀️" : "🌙"}
          </span>
          <span className="hidden sm:inline">
            {isDark ? "Light" : "Dark"}
          </span>
        </button>
        
        <div className="flex items-center ml-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
          <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Online</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
