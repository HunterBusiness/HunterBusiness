const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  church: { type: mongoose.Schema.Types.ObjectId, ref: 'Church', required: true },
  timestamp: { type: Date, default: Date.now },
  dateOnly: { type: String, required: true } // format: YYYY-MM-DD
});

attendanceSchema.index({ member: 1, dateOnly: 1 }, { unique: true }); // prevent double marking

module.exports = mongoose.model('Attendance', attendanceSchema);
