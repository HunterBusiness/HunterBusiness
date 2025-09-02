import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/User.js';
import { Faculty } from './models/Faculty.js';
import { Post } from './models/Post.js';
import { Event } from './models/Event.js';

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/unidept';
  await mongoose.connect(uri);
  console.log('Connected');

  await Promise.all([
    User.deleteMany({}),
    Faculty.deleteMany({}),
    Post.deleteMany({}),
    Event.deleteMany({})
  ]);

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@university.edu',
    passwordHash: await bcrypt.hash('AdminPass123!', 10),
    role: 'admin'
  });

  const faculty = await Faculty.create([
    { name: 'Prof. Jane Doe', title: 'Department Chair', email: 'jane@university.edu', researchAreas: ['AI', 'ML'], photoUrl: '', bio: 'Researcher in AI.' },
    { name: 'Dr. John Smith', title: 'Associate Professor', email: 'john@university.edu', researchAreas: ['Systems', 'Cloud'], photoUrl: '', bio: 'Works on distributed systems.' }
  ]);

  const posts = await Post.create([
    { title: 'Welcome to Our Department', slug: 'welcome', excerpt: 'Introductory post', content: 'Hello world', status: 'published', publishedAt: new Date(), tags: ['announcement'], categories: ['general'], authorId: admin._id },
    { title: 'Research Highlights', slug: 'research-highlights', excerpt: 'Recent work', content: 'Highlights...', status: 'published', publishedAt: new Date(), tags: ['research'], categories: ['research'], authorId: admin._id }
  ]);

  const events = await Event.create([
    { title: 'Colloquium: AI Frontiers', slug: 'colloquium-ai-frontiers', description: 'Talk on AI', location: 'Room 101', startDate: new Date(Date.now() + 86400000) },
    { title: 'Open House', slug: 'open-house', description: 'Meet and greet', location: 'Atrium', startDate: new Date(Date.now() + 604800000) }
  ]);

  console.log('Seeded', { admin: admin.email, faculty: faculty.length, posts: posts.length, events: events.length });
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


