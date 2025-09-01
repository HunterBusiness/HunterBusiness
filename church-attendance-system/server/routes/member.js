const express = require('express');
const multer = require('multer');
const Member = require('../models/member');
const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// 📦 Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ POST /api/members/register
router.post(
  '/register',
  authenticate,
  authorizeRoles('admin', 'tech', 'pastor'),
  upload.single('photo'),
  async (req, res) => {
    try {
      const {
        name,
        phone,
        gender,
        community,
        digitalAddress,
        fingerprint,
        placeOfBirth,
        dateOfBirth
      } = req.body;

      if (!name || !phone || !gender || !community || !digitalAddress || !fingerprint || !placeOfBirth || !dateOfBirth) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newMember = new Member({
        fullName: name,
        phone,
        gender,
        community,
        digitalAddress,
        placeOfBirth,
        dateOfBirth,
        fingerprintTemplate: fingerprint,
        photo: req.file?.filename || null,
        church: req.user.churchId,
        registeredBy: req.user.id,
      });

      await newMember.save();

      res.status(201).json({
        message: 'Member registered successfully',
        memberId: newMember._id,
      });
    } catch (err) {
      res.status(500).json({ message: 'Member registration failed', error: err.message });
    }
  }
);

// ✅ Assign fingerprint to a member
router.post(
  '/assign-fingerprint',
  authenticate,
  authorizeRoles('admin', 'tech', 'pastor'),
  async (req, res) => {
    try {
      const { memberId, fingerprintTemplate } = req.body;

      if (!memberId || !fingerprintTemplate) {
        return res.status(400).json({ message: 'Missing member ID or fingerprint data' });
      }

      const member = await Member.findOne({
        _id: memberId,
        church: req.user.churchId,
      });

      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }

      member.fingerprintTemplate = fingerprintTemplate;
      await member.save();

      res.status(200).json({ message: 'Fingerprint assigned successfully', member });
    } catch (err) {
      res.status(500).json({ message: 'Assignment failed', error: err.message });
    }
  }
);

module.exports = router;
