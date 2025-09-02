import { useState } from 'react';
import { contact } from '../lib/api.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await contact(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (e) {
      setError('Failed to send. Please try again later.');
    }
  }

  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {sent && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">Thank you! We will get back to you.</div>}
      {error && <div className="mb-4 p-3 rounded bg-red-50 text-red-700">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full border rounded px-3 py-2" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea className="mt-1 w-full border rounded px-3 py-2 h-32" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} required />
        </div>
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
}


