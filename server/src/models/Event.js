import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    imageUrl: { type: String },
    isAllDay: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);


