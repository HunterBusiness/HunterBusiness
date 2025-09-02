import express from 'express';
import { Post } from '../models/Post.js';
import { Event } from '../models/Event.js';

export const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '') || 'http://localhost:5173';
  const posts = await Post.find({ status: 'published' }).select('slug updatedAt').sort({ updatedAt: -1 });
  const events = await Event.find().select('slug updatedAt').sort({ updatedAt: -1 });
  const urls = [
    '',
    '/faculty',
    '/blog',
    '/events',
    '/contact'
  ].map((p) => `${base}${p}`);

  const dynamic = [
    ...posts.map((p) => `${base}/blog/${p.slug}`),
    ...events.map((e) => `${base}/events/${e.slug}`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    [...urls, ...dynamic]
      .map((u) => `<url><loc>${u}</loc></url>`) 
      .join('') +
    `</urlset>`;

  res.type('application/xml').send(xml);
});


