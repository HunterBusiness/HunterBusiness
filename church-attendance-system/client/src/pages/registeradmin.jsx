import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterAdmins = () => {
  const navigate = useNavigate();
  const churchId = localStorage.getItem("churchId");

  const [admins, setAdmins] = useState([
    { name: "", email: "", password: "" },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updated = [...admins];
    updated[index][field] = value;
    setAdmins(updated);
  };

  // Add another admin field (limit: 3)
  const addAdminField = () => {
    if (admins.length < 3) {
      setAdmins([...admins, { name: "", email: "", password: "" }]);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // register each admin (one by one for now)
      for (const admin of admins) {
        await axios.post("http://localhost:5000/api/admins/register", {
          ...admin,
          churchId,
        });
      }

      // ✅ Clear form + navigate to login
      localStorage.removeItem("churchId");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register admins");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-fuchsia-900 via-indigo-900 to-blue-900 px-4 relative overflow-hidden">
      {/* 🌟 Glowing Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 opacity-20 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-800 tracking-wide">
            👥 Church Admin Setup
          </h1>
          <p className="text-gray-600 mt-1">
            Create up to{" "}
            <span className="font-semibold text-purple-700">three</span> trusted
            admin accounts to manage your church system.
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-center mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {admins.map((admin, index) => (
            <div
              key={index}
              className="border p-5 rounded-xl bg-gray-50 shadow-md space-y-4"
            >
              <h3 className="font-bold text-indigo-700">Admin {index + 1}</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                value={admin.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                value={admin.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                value={admin.password}
                onChange={(e) => handleChange(index, "password", e.target.value)}
                required
              />
            </div>
          ))}

          {/* Add another admin */}
          {admins.length < 3 && (
            <button
              type="button"
              onClick={addAdminField}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              ➕ Add Another Admin
            </button>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-bold py-3 rounded-xl hover:scale-105 transition duration-300 shadow-lg"
          >
            {loading ? "Registering..." : "Finish & Go to Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmins;
