import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterChurch = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/churches', {
        name,
        location,
        email,
      });

      const { churchId } = res.data;
      localStorage.setItem('churchId', churchId);
      navigate('/register-admins');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 px-4 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="relative z-10 bg-white bg-opacity-95 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-800 mb-2">
          🕊️ Register Your Church
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Begin by setting up your church profile before creating admin accounts.
        </p>

        {error && (
          <div className="text-red-600 mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none shadow-sm"
            placeholder="Church Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none shadow-sm"
            placeholder="Church Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none shadow-sm"
            placeholder="Church Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-3 rounded-xl hover:scale-105 transition duration-300 shadow-md"
          >
            Continue to Add Admins
          </button>

          {/* 👉 Login instead link */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-3 border border-purple-600 text-purple-700 font-semibold py-2 rounded-xl hover:bg-purple-50 transition duration-300"
          >
            Already Registered? Login Instead
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterChurch;
