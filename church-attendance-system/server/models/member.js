const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },                       // Full name of the member
  gender: { type: String, enum: ['male', 'female'], required: true }, // Gender must be either male or female
  phone: { type: String },                                          // Phone number (optional)
  photo: { type: String },                                          // File name or image path
  fingerprintTemplate: { type: String },                            // Base64 or encoded template
  placeOfBirth: { type: String },                                   // ✅ NEW: Place of birth
  dateOfBirth: { type: Date },                                      // ✅ NEW: Date of birth
  community: { type: String },                                      // ✅ Member's community (village/area)
  digitalAddress: { type: String },                                 // GhanaPost GPS or similar
  church: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Church',
    required: true                                                  // Must belong to a church
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'                                                     // Who registered this person
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Member', memberSchema);
