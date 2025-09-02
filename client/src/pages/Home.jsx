import { useEffect, useState } from 'react';
import { getPosts, getEvents } from '../lib/api.js';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getPosts({ status: 'published' }).then(setPosts).catch(() => {});
    getEvents().then(setEvents).catch(() => {});
  }, []);

  return (
    <div>
      <section className="bg-navy text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Department of Computer Science</h1>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto">Excellence in research, teaching, and community engagement.</p>
        </div>
      </section>

      <section className="container py-12 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          <ul className="space-y-4">
            {posts.slice(0, 4).map((p) => (
              <li key={p._id} className="border-b pb-3">
                <a className="text-navy hover:underline" href={`/blog/${p.slug}`}>{p.title}</a>
                <p className="text-slate-600 text-sm">{p.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            {events.slice(0, 4).map((e) => (
              <li key={e._id} className="border-b pb-3">
                <a className="text-navy hover:underline" href={`/events/${e.slug}`}>{e.title}</a>
                <p className="text-slate-600 text-sm">{new Date(e.startDate).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}


