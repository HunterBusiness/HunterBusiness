import express from 'express';
import Joi from 'joi';
import { Faculty } from '../models/Faculty.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  title: Joi.string().allow(''),
  department: Joi.string().allow(''),
  email: Joi.string().email().allow(''),
  phone: Joi.string().allow(''),
  photoUrl: Joi.string().allow(''),
  office: Joi.string().allow(''),
  bio: Joi.string().allow(''),
  researchAreas: Joi.array().items(Joi.string()).default([]),
  website: Joi.string().allow('')
});

router.get('/', async (req, res) => {
  const list = await Faculty.find().sort({ name: 1 });
  res.json(list);
});

router.get('/:id', async (req, res) => {
  const item = await Faculty.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.post('/', requireAuth, requireRole(['admin', 'editor']), async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const created = await Faculty.create(value);
  res.status(201).json(created);
});

router.put('/:id', requireAuth, requireRole(['admin', 'editor']), async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const updated = await Faculty.findByIdAndUpdate(req.params.id, value, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.status(204).end();
});


