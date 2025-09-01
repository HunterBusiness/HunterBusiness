import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AssignFingerprint = ({ fingerprintTemplate, onSuccess }) => {
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/members/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(res.data);
      } catch (err) {
        setError('Failed to load members');
      }
    };

    fetchMembers();
  }, []);

  const handleAssign = async () => {
    if (!selectedMemberId || !fingerprintTemplate) {
      setError('Please select a member');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/members/assign-fingerprint',
        { memberId: selectedMemberId, fingerprintTemplate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('✅ Fingerprint assigned successfully!');
      onSuccess?.(); // Optional callback to reset UI
    } catch (err) {
      setError(err.response?.data?.message || 'Assignment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md mx-auto text-black">
      <h3 className="text-xl font-bold mb-4 text-indigo-700">🧩 Assign Fingerprint</h3>
      <p className="text-sm text-gray-700 mb-2">Select the member this fingerprint belongs to:</p>

      <select
        className="w-full p-2 border rounded mb-4"
        value={selectedMemberId}
        onChange={e => setSelectedMemberId(e.target.value)}
      >
        <option value="">-- Select Member --</option>
        {members.map(member => (
          <option key={member._id} value={member._id}>
            {member.fullName} ({member.phone})
          </option>
        ))}
      </select>

      <button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
        onClick={handleAssign}
        disabled={loading}
      >
        {loading ? 'Assigning...' : 'Assign Fingerprint'}
      </button>

      {message && <div className="text-green-600 mt-4 text-sm text-center">{message}</div>}
      {error && <div className="text-red-600 mt-4 text-sm text-center">{error}</div>}
    </div>
  );
};

export default AssignFingerprint;
