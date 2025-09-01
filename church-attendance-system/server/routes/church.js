const express = require('express');
const Church = require('../models/church');

const router = express.Router();

// Create new church
router.post('/', async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Church name is required' });
    }

    const church = new Church({ name, location });
    await church.save();

    res.status(201).json({ message: 'Church created successfully', church });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create church', error: err.message });
  }
});

module.exports = router;
