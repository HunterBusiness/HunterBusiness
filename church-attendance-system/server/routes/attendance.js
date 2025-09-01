const express = require('express');
const Member = require('../models/member');
const Attendance = require('../models/attendance');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// ✅ POST /api/attendance/scan
router.post('/scan', authenticate, async (req, res) => {
  try {
    const { fingerprintTemplate } = req.body;

    if (!fingerprintTemplate) {
      return res.status(400).json({ message: 'Fingerprint data is required' });
    }

    // 🔍 Find member by fingerprint and church
    const member = await Member.findOne({
      fingerprintTemplate,
      church: req.user.churchId
    });

    if (!member) {
      // ⚠️ Fingerprint not found, return for assignment
      return res.status(404).json({
        message: 'Fingerprint not recognized. You can assign it to a member.',
        fingerprintTemplate
      });
    }

    const today = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD

    // ✅ Check if already marked today
    const alreadyMarked = await Attendance.findOne({
      member: member._id,
      dateOnly: today
    });

    if (alreadyMarked) {
      return res.status(200).json({
        message: 'Attendance already marked',
        member: {
          _id: member._id,
          name: member.fullName
        }
      });
    }

    // 📝 Record new attendance
    const attendance = new Attendance({
      member: member._id,
      church: member.church,
      dateOnly: today
    });
    await attendance.save();

    // ⏱️ Update member's last attendance
    member.lastAttendance = new Date();
    await member.save();

    res.status(201).json({
      message: 'Attendance marked successfully',
      member: {
        _id: member._id,
        name: member.fullName
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Attendance marking failed', error: err.message });
  }
});

// ✅ GET /api/attendance/summary
router.get('/summary', authenticate, async (req, res) => {
  try {
    const churchId = req.user.churchId;
    const today = new Date().toISOString().split('T')[0];

    const totalMembers = await Member.countDocuments({ church: churchId });

    const presentToday = await Attendance.countDocuments({
      church: churchId,
      dateOnly: today
    });

    const inactiveThreshold = new Date();
    inactiveThreshold.setDate(inactiveThreshold.getDate() - 30); // 30-day inactivity

    const inactiveMembers = await Member.countDocuments({
      church: churchId,
      lastAttendance: { $lt: inactiveThreshold }
    });

    const absent = totalMembers - presentToday;

    res.json({
      totalMembers,
      presentToday,
      absent,
      inactive: inactiveMembers
    });

  } catch (err) {
    res.status(500).json({ message: 'Failed to load summary', error: err.message });
  }
});

module.exports = router;
