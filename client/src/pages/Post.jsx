import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../lib/api.js';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => { getPost(slug).then(setPost).catch(() => {}); }, [slug]);
  if (!post) return <div className="container py-12">Loading...</div>;
  return (
    <div className="container py-12 prose max-w-3xl">
      <h1>{post.title}</h1>
      <p className="text-slate-600">{post.excerpt}</p>
      <div className="mt-6 whitespace-pre-line">{post.content}</div>
    </div>
  );
}


