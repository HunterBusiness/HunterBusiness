import React, { useState } from 'react';
import api from '../services/api';

const RegisterMember = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    gender: '',
    community: '',
    digitalAddress: '',
    placeOfBirth: '',
    dateOfBirth: '',
    photo: null,
    fingerprint: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = e => {
    setForm(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const churchId = user?.church;

      const data = new FormData();
      for (let key in form) {
        data.append(key, form[key]);
      }
      data.append('churchId', churchId);

      const res = await api.post('/members/register', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('✅ Member registered successfully!');
      setForm({
        name: '',
        phone: '',
        gender: '',
        community: '',
        digitalAddress: '',
        placeOfBirth: '',
        dateOfBirth: '',
        photo: null,
        fingerprint: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 p-6 flex items-center justify-center text-white">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-xl w-full max-w-lg p-8 text-black">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">📝 Register New Member</h2>

        {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className={inputClass} />
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className={inputClass} />
          <select name="gender" value={form.gender} onChange={handleChange} required className={inputClass}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="text" name="community" value={form.community} onChange={handleChange} placeholder="Community" required className={inputClass} />
          <input type="text" name="digitalAddress" value={form.digitalAddress} onChange={handleChange} placeholder="Digital Address (e.g. AS-123-4567)" required className={inputClass} />
          <input type="text" name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} placeholder="Place of Birth" required className={inputClass} />
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required className={inputClass} />
          <input type="file" accept="image/*" onChange={handlePhotoChange} required className={inputClass} />
          <input type="text" name="fingerprint" value={form.fingerprint} onChange={handleChange} placeholder="Fingerprint (only used on church hardware)" required className={inputClass} />

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300">
            {loading ? 'Registering...' : 'Register Member'}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none";

export default RegisterMember;
