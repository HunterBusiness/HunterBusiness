import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Topbar = ({ adminName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white bg-opacity-10 backdrop-blur-md shadow-md py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-bold">📊 Church Dashboard</h2>
        <span className="text-sm text-gray-200 hidden sm:inline">| Welcome, {adminName}</span>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="hover:text-purple-300 font-medium transition">
          Overview
        </Link>
        <Link to="/scan" className="hover:text-purple-300 font-medium transition">
          Scan Attendance
        </Link>
        <Link to="/register-member" className="hover:text-purple-300 font-medium transition">
          Register Member
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md text-white text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Topbar;
