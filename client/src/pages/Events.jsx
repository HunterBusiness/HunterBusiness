import { useEffect, useState } from 'react';
import { getEvents } from '../lib/api.js';
import { Link } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => { getEvents().then(setEvents).catch(() => {}); }, []);
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Events & Calendar</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((e) => (
          <article key={e._id} className="border rounded-lg p-4 hover:shadow-sm transition">
            <h2 className="text-xl font-semibold">
              <Link className="text-navy hover:underline" to={`/events/${e.slug}`}>{e.title}</Link>
            </h2>
            <p className="text-slate-600">{new Date(e.startDate).toLocaleString()} {e.location ? `• ${e.location}` : ''}</p>
          </article>
        ))}
      </div>
    </div>
  );
}


