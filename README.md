# Smart Event Booking System

Production-ready full-stack event booking platform with JWT auth, real-time seat updates, admin analytics, QR ticketing, and modern animated UI.

## Tech Stack
- Frontend: React, Tailwind CSS, Framer Motion, React Router, Axios, Socket.IO Client, QRCode, React Confetti, React Hot Toast
- Backend: Node.js, Express, MySQL, Socket.IO, JWT, bcrypt
- Deployment: Vercel/Netlify (frontend), Render (backend), MySQL

## Features
- User auth (register/login/me)
- Browse/search events
- Event details and booking flow
- Real-time seat updates via Socket.IO
- QR ticket generation
- Booking history and cancellation API
- Admin stats and bookings API
- Seeded database with 8 events

## Setup
### 1) Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

### 3) Database
Run SQL script:
```bash
mysql -u root -p < server/sql/event_booking.sql
```

## Environment Variables
Backend (`server/.env`)
- PORT=5000
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=your_password
- DB_NAME=event_booking
- JWT_SECRET=super_secure_secret
- CLIENT_URL=http://localhost:5173

Frontend (`client/.env`)
- VITE_API_URL=http://localhost:5000/api
- VITE_SOCKET_URL=http://localhost:5000

## API Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Events: `GET /api/events`, `GET /api/events/:id`, `POST/PUT/DELETE /api/events/:id` (admin)
- Bookings: `POST /api/bookings`, `GET /api/bookings/my`, `PUT /api/bookings/:id/cancel`
- Admin: `GET /api/admin/bookings`, `GET /api/admin/stats`

## Deployment
- Frontend to Vercel/Netlify with `VITE_API_URL`/`VITE_SOCKET_URL`
- Backend to Render with MySQL env vars

## Screenshots
Add screenshots after local run in this section.
