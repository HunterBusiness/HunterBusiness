const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files (e.g., uploaded photos)
app.use('/uploads', express.static('uploads'));

// ✅ Routes
const authRoutes = require('./routes/auth');
const churchRoutes = require('./routes/church');
const memberRoutes = require('./routes/member');
const attendanceRoutes = require('./routes/attendance');
const analyticsRoutes = require('./routes/analytics');
const reportRoutes = require('./routes/reports'); // ✅ Export/Print Reports

app.use('/api/auth', authRoutes);
app.use('/api/church', churchRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportRoutes);

// ✅ Default Test Route
app.get('/', (req, res) => {
  res.send('🚀 Church Biometric Attendance API is running...');
});

// ✅ MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'church-attendance',
})
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🌐 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
