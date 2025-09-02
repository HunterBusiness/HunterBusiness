import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../lib/api.js';

export default function EventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  useEffect(() => { getEvent(slug).then(setEvent).catch(() => {}); }, [slug]);
  if (!event) return <div className="container py-12">Loading...</div>;
  return (
    <div className="container py-12 prose max-w-3xl">
      <h1>{event.title}</h1>
      <p className="text-slate-600">{new Date(event.startDate).toLocaleString()} {event.location ? `• ${event.location}` : ''}</p>
      <div className="mt-6 whitespace-pre-line">{event.description}</div>
    </div>
  );
}


