const express = require('express');
const Member = require('../models/member');
const Attendance = require('../models/attendance');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// ✅ Present Today
router.get('/present/today', authenticate, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const present = await Attendance.find({
      church: req.user.churchId,
      dateOnly: today
    }).populate('member');

    res.json({ count: present.length, present });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching present members', error: err.message });
  }
});

// ✅ Absent Today
router.get('/absent/today', authenticate, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const allMembers = await Member.find({ church: req.user.churchId });
    const present = await Attendance.find({
      church: req.user.churchId,
      dateOnly: today
    });

    const presentIds = new Set(present.map(a => a.member.toString()));
    const absent = allMembers.filter(m => !presentIds.has(m._id.toString()));

    res.json({ count: absent.length, absent });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching absent members', error: err.message });
  }
});

// ✅ Inactive Members by Weeks
router.get('/inactive/weeks/:weeks', authenticate, async (req, res) => {
  const weeks = parseInt(req.params.weeks);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (weeks * 7));

  try {
    const allMembers = await Member.find({ church: req.user.churchId });
    const recent = await Attendance.find({
      church: req.user.churchId,
      timestamp: { $gte: cutoff }
    });

    const activeIds = new Set(recent.map(a => a.member.toString()));
    const inactive = allMembers.filter(m => !activeIds.has(m._id.toString()));

    res.json({ count: inactive.length, inactive });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inactive members', error: err.message });
  }
});

// ✅ Weekly Summary - Last 7 Days
router.get('/summary/weekly', authenticate, async (req, res) => {
  try {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 6); // Last 7 days

    const data = await Attendance.aggregate([
      {
        $match: {
          church: req.user.churchId,
          timestamp: { $gte: oneWeekAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Weekly summary failed', error: err.message });
  }
});

// ✅ Monthly Summary - Grouped by Week
router.get('/summary/monthly', authenticate, async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 29);

    const data = await Attendance.aggregate([
      {
        $match: {
          church: req.user.churchId,
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            week: { $isoWeek: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Monthly summary failed', error: err.message });
  }
});

module.exports = router;
