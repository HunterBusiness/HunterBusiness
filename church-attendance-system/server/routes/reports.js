const express = require('express');
const PDFDocument = require('pdfkit');
const Attendance = require('../models/attendance');
const Member = require('../models/member');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// 🖨️ Export Attendance PDF
router.get('/attendance/pdf/:date', authenticate, async (req, res) => {
  try {
    const churchId = req.user.churchId;
    const dateOnly = req.params.date; // expected: YYYY-MM-DD

    const records = await Attendance.find({ church: churchId, dateOnly })
      .populate('member');

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="attendance-${dateOnly}.pdf"`);

    doc.pipe(res);
    doc.fontSize(16).text(`Attendance Report – ${dateOnly}`, { align: 'center' });
    doc.moveDown();

    records.forEach((r, i) => {
      doc.fontSize(12).text(`${i + 1}. ${r.member.fullName} – ${r.member.gender} – ${r.member.phone}`);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: 'PDF generation failed', error: err.message });
  }
});

// 🖨️ Export Absentees PDF
router.get('/absentees/pdf/:date', authenticate, async (req, res) => {
  try {
    const churchId = req.user.churchId;
    const dateOnly = req.params.date;

    const allMembers = await Member.find({ church: churchId });
    const present = await Attendance.find({ church: churchId, dateOnly });

    const presentIds = new Set(present.map(a => a.member.toString()));
    const absentMembers = allMembers.filter(m => !presentIds.has(m._id.toString()));

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="absentees-${dateOnly}.pdf"`);

    doc.pipe(res);
    doc.fontSize(16).text(`Absentees Report – ${dateOnly}`, { align: 'center' });
    doc.moveDown();

    absentMembers.forEach((m, i) => {
      doc.fontSize(12).text(`${i + 1}. ${m.fullName} – ${m.gender} – ${m.phone}`);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: 'PDF generation failed', error: err.message });
  }
});

module.exports = router;
