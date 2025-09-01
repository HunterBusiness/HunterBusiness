const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const Church = require('../models/church');

// Helper: generate a 6-digit admin code like ADM-123456
const generateAdminCode = () => {
  return 'ADM-' + Math.floor(100000 + Math.random() * 900000);
};

// 🔐 POST /api/admins/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, username, churchId } = req.body;

    if (!name || !email || !password || !username || !churchId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if username or email is already taken
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAdmin) {
      return res.status(409).json({ message: 'Email or username already exists' });
    }

    // Check if church exists
    const church = await Church.findById(churchId);
    if (!church) {
      return res.status(404).json({ message: 'Church not found' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminCode = generateAdminCode();

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      username,
      adminCode,
      church: churchId
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin registered successfully',
      admin: {
        name: admin.name,
        username: admin.username,
        adminCode: admin.adminCode
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

module.exports = router;
