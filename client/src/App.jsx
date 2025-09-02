import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Faculty from './pages/Faculty.jsx';
import Blog from './pages/Blog.jsx';
import Post from './pages/Post.jsx';
import Events from './pages/Events.jsx';
import EventPage from './pages/EventPage.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/admin/Admin.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}


