import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String },
    department: { type: String },
    email: { type: String },
    phone: { type: String },
    photoUrl: { type: String },
    office: { type: String },
    bio: { type: String },
    researchAreas: [{ type: String }],
    website: { type: String }
  },
  { timestamps: true }
);

export const Faculty = mongoose.model('Faculty', facultySchema);


