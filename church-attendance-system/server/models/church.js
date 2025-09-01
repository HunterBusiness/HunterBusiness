const mongoose = require('mongoose');

const churchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Church', churchSchema);
