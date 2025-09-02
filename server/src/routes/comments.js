import express from 'express';
import Joi from 'joi';
import { Comment } from '../models/Comment.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const router = express.Router();

const schema = Joi.object({
  postId: Joi.string().required(),
  authorName: Joi.string().required(),
  authorEmail: Joi.string().email().required(),
  content: Joi.string().min(2).required()
});

router.get('/', async (req, res) => {
  const { postId } = req.query;
  const query = postId ? { postId } : {};
  const comments = await Comment.find(query).sort({ createdAt: -1 }).limit(200);
  res.json(comments);
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const created = await Comment.create(value);
  res.status(201).json(created);
});

router.put('/:id/approve', requireAuth, requireRole(['admin', 'editor']), async (req, res) => {
  const updated = await Comment.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(204).end();
});


