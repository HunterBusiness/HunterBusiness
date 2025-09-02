import express from 'express';
import Joi from 'joi';
import { Event } from '../models/Event.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const router = express.Router();

const schema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().regex(/^[a-z0-9-]+$/).required(),
  description: Joi.string().allow(''),
  location: Joi.string().allow(''),
  startDate: Joi.date().required(),
  endDate: Joi.date().allow(null),
  imageUrl: Joi.string().allow(''),
  isAllDay: Joi.boolean().default(false)
});

router.get('/', async (req, res) => {
  const events = await Event.find().sort({ startDate: 1 }).limit(200);
  res.json(events);
});

router.get('/:slug', async (req, res) => {
  const item = await Event.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.post('/', requireAuth, requireRole(['admin', 'editor']), async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const exists = await Event.findOne({ slug: value.slug });
  if (exists) return res.status(409).json({ message: 'Slug already exists' });
  const created = await Event.create(value);
  res.status(201).json(created);
});

router.put('/:id', requireAuth, requireRole(['admin', 'editor']), async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const updated = await Event.findByIdAndUpdate(req.params.id, value, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).end();
});


