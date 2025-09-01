import React, { useState } from 'react';
import api from '../services/api';

const ScanAttendance = () => {
  const [fingerprintTemplate, setFingerprintTemplate] = useState('');
  const [message, setMessage] = useState('');
  const [member, setMember] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    setMessage('');
    setError('');
    setMember(null);

    if (!fingerprintTemplate.trim()) {
      setError('Please enter fingerprint template');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/attendance/scan',
        { fingerprintTemplate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || '✅ Attendance marked');
      setMember(res.data.member || null);
    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-fuchsia-900 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-95 p-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          📷 Scan Member Fingerprint
        </h2>
        <p className="text-gray-600 mb-6">
          Simulate fingerprint scanning by entering a template string.
        </p>

        <input
          type="text"
          className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none mb-4"
          placeholder="Enter fingerprint template"
          value={fingerprintTemplate}
          onChange={e => setFingerprintTemplate(e.target.value)}
        />

        <button
          onClick={handleScan}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 rounded-md font-semibold hover:scale-105 transition"
        >
          Scan Fingerprint
        </button>

        {/* 🔔 Feedback messages */}
        {message && (
          <div className="mt-4 text-green-700 font-medium">{message}</div>
        )}
        {error && (
          <div className="mt-4 text-red-600 font-medium">{error}</div>
        )}
        {member && (
          <div className="mt-4 text-sm text-gray-700">
            <p>👤 Member: <strong>{member.fullName}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanAttendance;
