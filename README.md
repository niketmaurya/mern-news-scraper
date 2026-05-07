# MERN Hacker News Scraper

A mini full-stack MERN application built for the Full Stack Developer (MERN) assignment.

It scrapes top stories from Hacker News, stores them in MongoDB, provides JWT-based authentication, and allows users to bookmark stories from a React frontend.

## Features

- Scrape top 10 stories from [Hacker News](https://news.ycombinator.com)
- Store story data in MongoDB:
  - `url`
  - `points`
  - `author`
  - `postedAt`
- JWT Authentication:
  - Register
  - Login
- Story APIs:
  - List stories (sorted by points descending)
  - Get single story
  - Toggle bookmark (protected)
  - Get bookmarked stories (protected)
- React frontend:
  - Login/Register pages
  - Story listing
  - Bookmark toggle
  - Protected Bookmarks page
  - Auth state with Context API

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, Cheerio, Axios
- Database: MongoDB

## Project Structure

```text
Scrapper/
├─ backend/
│  ├─ api/
│  │  └─ index.js
│  ├─ config/
│  │  └─ db.js
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ services/
│  ├─ app.js
│  ├─ server.js
│  ├─ .env.example
│  └─ vercel.json
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ component/
│  │  ├─ context/
│  │  ├─ pages/
│  │  └─ routes/
│  └─ .env.example
└─ README.md
```

## Environment Variables

### Backend (`backend/.env`)

Use `backend/.env.example` as reference:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

Use `frontend/.env.example` as reference:

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Setup

### 1) Clone and install dependencies

```bash
git clone <your-repo-url>
cd Scrapper
```

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 2) Configure env files

- Create `backend/.env` from `backend/.env.example`
- Create `frontend/.env` from `frontend/.env.example`

### 3) Run the app

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## API Endpoints

### Auth

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Scraper

- `POST /api/scrape` - Trigger scraper manually

Note: scraper also runs on backend server start in local runtime (`backend/server.js`).

### Stories

- `GET /api/stories` - Get stories (sorted by points desc)
  - Supports pagination: `?page=1&limit=10`
- `GET /api/stories/:id` - Get single story
- `POST /api/stories/:id/bookmark` - Toggle bookmark (protected)
- `GET /api/stories/bookmarks` - Get current user bookmarks (protected)

## Deployment Notes

- Frontend can be deployed on Vercel.
- Backend can be deployed on Vercel serverless (config included in `backend/vercel.json`) or on Render/Railway.
- Set production env variables on deployment platforms:
  - Backend: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`
  - Frontend: `VITE_API_URL` (point to deployed backend `/api`)

## Suggested Commit History (for assignment requirement)

Use multiple meaningful commits, for example:

1. `chore: initialize backend and frontend projects`
2. `feat: add mongo db connection and express server setup`
3. `feat: implement jwt auth register and login apis`
4. `feat: add hacker news scraper service and scrape endpoint`
5. `feat: implement stories list detail and bookmark apis`
6. `feat: create auth context and protected routes in frontend`
7. `feat: build stories and bookmarks pages with bookmark toggle`
8. `fix: sync bookmark button state with backend response`
9. `chore: prepare env examples and deployment config`
10. `docs: add project setup and api documentation`

## Loom Video Checklist (5-10 min)

- Project architecture overview
- Scraper flow and stored fields
- Auth flow (register/login/JWT)
- Story APIs and bookmark logic
- Frontend walkthrough (Home, Login/Register, Bookmarks)
- Local run + deployment env setup

