const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

// ✅ Register new admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, username, adminCode, email, password, church } = req.body;

    // Check if admin already exists
    const existing = await Admin.findOne({ $or: [{ email }, { username }, { adminCode }] });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists with provided email/username/adminCode' });
    }

    // Create new admin
    const newAdmin = new Admin({
      name,
      username,
      adminCode,
      email,
      password,
      church,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (err) {
    console.error('❌ Error registering admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await require('bcryptjs').compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token, admin });
  } catch (err) {
    console.error('❌ Error logging in admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
