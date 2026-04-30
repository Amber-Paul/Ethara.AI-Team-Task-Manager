# ⚡ TaskFlow — Project Management App

A full-stack project management app with role-based access control, task boards, dashboards, and team collaboration.

## Features

- **Authentication** — Signup/Login with JWT tokens
- **Projects** — Create, manage, and color-code projects
- **Role-Based Access** — Admin (full control) and Member roles per project
- **Task Board** — Kanban board + List view with drag-style status updates
- **Task Details** — Priority, assignee, due dates, comments
- **Dashboard** — Stats, overdue alerts, project progress bars
- **My Tasks** — All your tasks across every project, filterable & sortable
- **Team Management** — Invite members by email, change roles, remove members

## Tech Stack

- **Backend:** Node.js, Express, sql.js (SQLite), JWT, bcryptjs
- **Frontend:** React 18, React Router v6, Vite
- **Database:** SQLite (via sql.js, file-persisted)

---

## 🚀 Deploy on Railway

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create taskflow --public --push
# OR: git remote add origin https://github.com/YOUR_USERNAME/taskflow.git && git push -u origin main
```

### Step 2 — Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `taskflow` repository
4. Railway will auto-detect and build

### Step 3 — Set Environment Variables

In Railway dashboard → your service → **Variables**, add:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `your_super_secret_key_here_change_this` |
| `PORT` | `3000` *(Railway sets this automatically)* |

### Step 4 — Deploy

Railway will automatically build and deploy. Your app will be live at:
`https://your-project-name.up.railway.app`

---

## 🏃 Run Locally

```bash
# Install all dependencies
cd backend && npm install
cd ../frontend && npm install

# Start backend (in one terminal)
cd backend
JWT_SECRET=devsecret node server.js
# API runs on http://localhost:3001

# Start frontend (in another terminal)
cd frontend
npm run dev
# App runs on http://localhost:5173
```

---

## Project Structure

```
taskflow/
├── backend/
│   ├── server.js          # Express app entry point
│   ├── db.js              # sql.js database + wrapper
│   ├── middleware.js       # JWT auth middleware
│   └── routes/
│       ├── auth.js        # /api/auth/*
│       ├── projects.js    # /api/projects/*
│       └── tasks.js       # /api/tasks/*
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Router + layout
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProjectsPage.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   └── MyTasks.jsx
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   └── UI.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ToastContext.jsx
│   │   └── utils/api.js
│   └── vite.config.js
├── railway.toml
├── nixpacks.toml
└── package.json
```

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user

### Projects
- `GET /api/projects` — List my projects
- `POST /api/projects` — Create project
- `GET /api/projects/:id` — Get project + members
- `PUT /api/projects/:id` — Update (admin only)
- `DELETE /api/projects/:id` — Delete (owner only)
- `POST /api/projects/:id/members` — Add member (admin)
- `PUT /api/projects/:id/members/:userId` — Change role (admin)
- `DELETE /api/projects/:id/members/:userId` — Remove member (admin)

### Tasks
- `GET /api/tasks/dashboard` — Dashboard stats
- `GET /api/tasks/my` — My tasks across all projects
- `GET /api/tasks/project/:id` — Tasks in a project
- `POST /api/tasks` — Create task
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task
- `GET /api/tasks/:id` — Task detail + comments
- `POST /api/tasks/:id/comments` — Add comment
