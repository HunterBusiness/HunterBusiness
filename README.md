# University Department Website

Production-ready full-stack website for a university department.

Includes:
- React + Vite + TailwindCSS frontend (responsive, accessible, PWA)
- Node.js + Express backend (REST API, auth, email, security)
- MongoDB via Mongoose
- Admin dashboard for posts, events, and faculty

## Quick Start

Prerequisites:
- Node.js 18+
- MongoDB (local or Atlas)

1) Copy environment file and fill values

```
cp .env.example .env
```

2) Install dependencies

```
cd server && npm install
cd ../client && npm install
```

3) Seed the database (optional)

```
cd server
npm run seed
```

4) Start development servers (two terminals)

```
# Terminal A
cd server
npm run dev

# Terminal B
cd client
npm run dev
```

Backend: http://localhost:5000
Frontend: http://localhost:5173

## Environment Variables

See `.env.example` at the repo root. Copy to `.env`.

Server uses: `PORT`, `MONGODB_URI`, `JWT_SECRET`, SMTP settings.
Client uses Vite `VITE_*` variables.

## Production Build

Frontend:
```
cd client
npm run build
```

Backend:
```
cd server
npm run start
```

Serve `client/dist` as static files behind a reverse proxy, or deploy frontend to Netlify/Vercel and the API to Render/Fly/Heroku. Set `VITE_API_URL` accordingly.

## Deployment Guides

### Render (API)
- Create Web Service
- Build command: `npm install`
- Start command: `npm run start`
- Environment: add variables from `.env`

### Netlify or Vercel (Frontend)
- Build command: `npm run build`
- Publish directory: `dist`

## Admin Login

After seeding, an admin user is created:
- email: admin@university.edu
- password: AdminPass123!

## Security
- Helmet, CORS, rate limiting, input validation (Joi)
- JWT auth with role-based access

## Accessibility & SEO
- Semantic HTML, keyboard focus styles, color contrast
- Sitemap at `/api/sitemap.xml`
- `robots.txt`, meta tags, OpenGraph, and manifest

## License
MIT


