import { useEffect, useState } from 'react';
import { getFaculty } from '../lib/api.js';

export default function Faculty() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getFaculty().then(setList).catch(() => {});
  }, []);
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Faculty & Staff</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((f) => (
          <div key={f._id} className="border rounded-lg p-4 hover:shadow-sm transition">
            {f.photoUrl ? (
              <img className="w-full h-40 object-cover rounded" src={f.photoUrl} alt={f.name} />
            ) : (
              <div className="w-full h-40 bg-slate-100 rounded" />
            )}
            <h3 className="mt-3 font-semibold text-lg">{f.name}</h3>
            <p className="text-slate-600">{f.title}</p>
            <p className="text-sm text-slate-500 mt-1">{f.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


