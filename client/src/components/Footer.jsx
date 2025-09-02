export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-16 py-10 text-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-600">© {new Date().getFullYear()} University Department</p>
        <div className="flex gap-6 text-slate-600">
          <a className="hover:text-navy" href="/sitemap">Sitemap</a>
          <a className="hover:text-navy" href="/privacy">Privacy</a>
          <a className="hover:text-navy" href="/accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}


