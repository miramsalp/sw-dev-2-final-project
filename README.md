# Sports Facility Booking — Group 1

Search and book sports facilities (badminton, tennis, futsal, gym).
Monorepo: `backend/` (Express + MongoDB) and `frontend/` (Next.js + NextAuth).

## Getting started

### 1. Install

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment variables

**Backend**: copy `backend/config/config.env.example` to `backend/config/config.env`

| Key | Example |
|---|---|
| `PORT` | `5000` |
| `NODE_ENV` | `development` |
| `MONGO_URI` | your MongoDB Atlas connection string |
| `JWT_SECRET` | any long random string |
| `JWT_EXPIRE` | `365d` |
| `JWT_COOKIE_EXPIRE` | `365` |
| `FRONTEND_URL` | `http://localhost:3000` |

**Frontend**: copy `frontend/.env.example` to `frontend/.env.local`

| Key | Example |
|---|---|
| `BACKEND_URL` | `http://localhost:5000` |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | generate with `openssl rand -base64 32` |

Never commit `config.env` or `.env.local`.

### 3. Run (two terminals)

```bash
cd backend && npm run dev     # http://localhost:5000  (API docs: /api-docs)
cd frontend && npm run dev    # http://localhost:3000
```

## Project structure

```
backend/
├── config/        # db connection, env
├── controllers/   # route logic
├── middleware/    # auth (protect, authorize)
├── models/        # mongoose schemas
├── routes/
└── server.js

frontend/src/
├── app/           # routes only; each page.tsx renders a component from features/
├── components/
│   ├── ui/        # shared UI: Button, Input, Card, Table...
│   └── layout/    # Navbar
├── features/      # one folder per feature
│   ├── auth/      # NextAuth config, login/register forms, useAuth
│   ├── facilities/
│   ├── bookings/
│   └── admin/
├── hooks/
├── lib/           # api() fetch wrapper
└── types/
```

## Way of code

- **Branch** from `main`, one task per branch: `feat/login-page`, `fix/booking-date`, `docs/readme`
- **Commit** with a prefix: `feat:` `fix:` `refactor:` `chore:` `docs:`
  e.g. `feat: add booking edit page`
- **Pull request** into `main`. CI (lint + build) must pass and one teammate must approve.
  Don't push to `main` directly.
- **Frontend**
  - A new page goes in `app/<route>/page.tsx` and only renders a component from `features/`
  - API calls go in `features/<feature>/api.ts`, client hooks in `features/<feature>/hooks.ts`
  - Reuse `components/ui` instead of styling raw HTML
  - Get the current user and token with `useAuth()`
- Run `npm run lint` in `frontend/` before pushing

## Deployment

Both apps deploy to Vercel automatically on merge to `main`
(two Vercel projects, Root Directory `backend` and `frontend`).
