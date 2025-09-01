const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

// 🔐 POST /api/auth/login (username + adminCode)
router.post('/login', async (req, res) => {
  try {
    const { username, adminCode } = req.body;

    if (!username || !adminCode) {
      return res.status(400).json({ message: 'Username and Admin Code are required' });
    }

    const admin = await Admin.findOne({ username, adminCode });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        churchId: admin.church,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        username: admin.username,
        adminCode: admin.adminCode,
        church: admin.church
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;
