import express from 'express';

export const router = express.Router();

router.get('/robots.txt', (req, res) => {
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '') || 'http://localhost:5173';
  const txt = `User-agent: *\nAllow: /\nSitemap: ${base}/api/sitemap.xml\n`;
  res.type('text/plain').send(txt);
});


