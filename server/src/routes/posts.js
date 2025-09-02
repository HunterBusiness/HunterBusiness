import express from 'express';
import Joi from 'joi';
import { Post } from '../models/Post.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const router = express.Router();

const postSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().regex(/^[a-z0-9-]+$/).required(),
  excerpt: Joi.string().allow(''),
  content: Joi.string().required(),
  coverImageUrl: Joi.string().allow(''),
  categories: Joi.array().items(Joi.string()).default([]),
  tags: Joi.array().items(Joi.string()).default([]),
  status: Joi.string().valid('draft', 'published').default('draft'),
  publishedAt: Joi.date().allow(null)
});

router.get('/', async (req, res) => {
  const { q, tag, category, status = 'published' } = req.query;
  const query = {};
  if (status) query.status = status;
  if (q) query.$text = { $search: q };
  if (tag) query.tags = tag;
  if (category) query.categories = category;
  const posts = await Post.find(query).sort({ publishedAt: -1, createdAt: -1 }).limit(50);
  res.json(posts);
});

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});

router.post('/', requireAuth, requireRole(['admin', 'editor']), async (req, res) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const exists = await Post.findOne({ slug: value.slug });
  if (exists) return res.status(409).json({ message: 'Slug already exists' });
  const post = await Post.create({ ...value, authorId: req.user.id });
  res.status(201).json(post);
});

router.put('/:id', requireAuth, requireRole(['admin', 'editor']), async (req, res) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const post = await Post.findByIdAndUpdate(req.params.id, value, { new: true });
  res.json(post);
});

router.delete('/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).end();
});


