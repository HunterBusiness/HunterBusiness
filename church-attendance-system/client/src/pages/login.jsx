import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // 🔗 Axios instance

const Login = () => {
  const [username, setUsername] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', {
        username,
        adminCode,
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 px-4 relative overflow-hidden">
      {/* 🔆 Glowing BG Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">✝️ Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">
            Login with your username and admin code.
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-center mb-4 text-sm font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin_username"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Admin Code</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={adminCode}
              onChange={e => setAdminCode(e.target.value)}
              placeholder="ADM-123456"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
