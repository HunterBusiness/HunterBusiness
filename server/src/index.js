import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';

import { router as authRouter } from './routes/auth.js';
import { router as postsRouter } from './routes/posts.js';
import { router as facultyRouter } from './routes/faculty.js';
import { router as eventsRouter } from './routes/events.js';
import { router as contactRouter } from './routes/contact.js';
import { router as sitemapRouter } from './routes/sitemap.js';
import { router as robotsRouter } from './routes/robots.js';
import { router as commentsRouter } from './routes/comments.js';

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/unidept';

app.set('trust proxy', 1);

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: CLIENT_URL.split(',').map((s) => s.trim()), credentials: true }));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/events', eventsRouter);
app.use('/api/contact', contactRouter);
app.use('/api', sitemapRouter);
app.use('/api', robotsRouter);
app.use('/api/comments', commentsRouter);

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${PORT}`);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', e);
    process.exit(1);
  }
}

start();


