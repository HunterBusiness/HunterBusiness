import { useEffect, useState } from 'react';
import { getPosts } from '../lib/api.js';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { getPosts({ status: 'published' }).then(setPosts).catch(() => {}); }, []);
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">News & Blog</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((p) => (
          <article key={p._id} className="border rounded-lg p-4 hover:shadow-sm transition">
            <h2 className="text-xl font-semibold">
              <Link className="text-navy hover:underline" to={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>
            <p className="text-slate-600">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}


