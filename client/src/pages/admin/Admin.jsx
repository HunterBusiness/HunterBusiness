import { useState } from 'react';
import { login } from '../../lib/api.js';

export default function Admin() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  async function onLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await login(creds);
      setToken(res.token);
      localStorage.setItem('token', res.token);
    } catch (e) {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="container py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      {!token ? (
        <form onSubmit={onLogin} className="space-y-4">
          {error && <div className="p-3 rounded bg-red-50 text-red-700">{error}</div>}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="mt-1 w-full border rounded px-3 py-2" value={creds.email} onChange={(e)=>setCreds({...creds, email:e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" className="mt-1 w-full border rounded px-3 py-2" value={creds.password} onChange={(e)=>setCreds({...creds, password:e.target.value})} required />
          </div>
          <button className="btn" type="submit">Log in</button>
          <p className="text-sm text-slate-600">Use admin@university.edu / AdminPass123!</p>
        </form>
      ) : (
        <div className="space-y-3">
          <p className="text-green-700">Logged in.</p>
          <p className="text-sm break-all">Token: {token}</p>
          <p className="text-slate-600">Dashboard management UI can be expanded from here.</p>
        </div>
      )}
    </div>
  );
}


