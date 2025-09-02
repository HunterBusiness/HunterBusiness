import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-navy font-bold text-xl">Dept.</Link>
        <nav className="hidden md:flex gap-6">
          {[
            ['Home', '/'],
            ['Faculty', '/faculty'],
            ['Blog', '/blog'],
            ['Events', '/events'],
            ['Contact', '/contact']
          ].map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `text-slate-700 hover:text-navy transition ${isActive ? 'text-navy font-semibold' : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <Link to="/admin" className="btn">Admin</Link>
      </div>
    </header>
  );
}


