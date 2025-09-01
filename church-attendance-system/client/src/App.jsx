import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import RegisterChurch from './pages/registerchurch';
import RegisterAdmins from './pages/registeradmin';
import ScanAttendance from './pages/scanattendance';
import RegisterMember from './pages/RegisterMember'; // ✅ New
import Analytics from './pages/Analytics'; // ✅ New
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      {/* 🌟 Default Landing always shows RegisterChurch */}
      <Route path="/" element={<RegisterChurch />} />

      {/* 📋 Registration Flow */}
      <Route path="/register-admins" element={<RegisterAdmins />} />
      <Route path="/login" element={<Login />} />

      {/* 🔐 Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/scan"
        element={
          <PrivateRoute>
            <ScanAttendance />
          </PrivateRoute>
        }
      />
      <Route
        path="/register-member"
        element={
          <PrivateRoute>
            <RegisterMember />
          </PrivateRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        }
      />

      {/* 🔁 Catch-all redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
