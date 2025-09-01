import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [adminName, setAdminName] = useState('');
  const [stats, setStats] = useState({
    totalMembers: 0,
    presentToday: 0,
    absent: 0,
    inactive: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAdminName(user.name || 'Admin');
    }

    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/attendance/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error('Failed to load summary:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-900 to-fuchsia-900 text-white">
      {/* 🚀 Top Navbar */}
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

      {/* 👋 Greeting */}
      <header className="px-6 pt-8 pb-4">
        <h1 className="text-4xl font-bold">Welcome, {adminName} 👋</h1>
        <p className="text-sm text-gray-200 mt-2">
          Here’s the real-time attendance summary for today.
        </p>
      </header>

      {/* 🔢 Stats Grid */}
      <main className="px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Members" value={stats.totalMembers} color="from-emerald-500 to-emerald-700" />
          <StatCard title="Present Today" value={stats.presentToday} color="from-blue-500 to-blue-700" />
          <StatCard title="Absent Today" value={stats.absent} color="from-red-500 to-red-700" />
          <StatCard title="Inactive Members" value={stats.inactive} color="from-yellow-500 to-yellow-700" />
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-lg`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
