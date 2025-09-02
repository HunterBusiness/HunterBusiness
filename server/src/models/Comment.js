import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', index: true },
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    content: { type: String, required: true },
    approved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Comment = mongoose.model('Comment', commentSchema);


