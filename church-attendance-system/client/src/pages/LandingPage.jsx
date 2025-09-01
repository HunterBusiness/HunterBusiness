import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/church-bg.webp')" }}>
      <div className="bg-black bg-opacity-60 p-10 rounded-2xl text-center text-white max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Church Biometric Attendance System</h1>
        <p className="text-lg mb-6">Securely register and track member attendance with fingerprint scanning and real-time analytics.</p>
        <Link to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition-all">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
