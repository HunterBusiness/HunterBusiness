import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    coverImageUrl: { type: String },
    categories: [{ type: String }],
    tags: [{ type: String }],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    publishedAt: { type: Date },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' }
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text', categories: 'text' });

export const Post = mongoose.model('Post', postSchema);


