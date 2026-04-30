🚀 TaskFlow – Project & Task Management Web App

TaskFlow is a full-stack web application designed to help users manage projects, assign tasks, and track progress efficiently with role-based access control.

Built with a modern frontend and a lightweight backend, this project is ideal for academic submissions, demos, and beginner full-stack development practice.

**✨ Features**  

**🔐 Authentication**
Secure Signup & Login
JWT-based authentication
Token stored in browser for session handling

**👥 Role-Based Access Control**
Two roles: Admin and Member
Admin can manage projects
Members can work on assigned tasks

**📁 Project Management**
Create and view projects
Assign ownership

**✅ Task Management**
Create tasks
Assign tasks to users
Track task status

**📊 Dashboard**
View all tasks dynamically
Real-time updates from backend

**🎨 UI/UX**
Apple-style clean interface
Responsive and minimal design
Smooth navigation between pages

**🛠️ Tech Stack**
Frontend
React (Vite)
Axios
React Router DOM
Backend
Node.js
Express.js
JSON Web Tokens (JWT)
LowDB (JSON-based database)


**📦 Installation & Setup**
🔹 Clone the Repository
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow



🔹 Install Dependencies
Backend
cd backend
npm install
Frontend
cd ../frontend
npm install

**🚀 Running Locally**

🔻 Terminal 1 — Start Backend
cd backend
export JWT_SECRET=devsecret   # For Git Bash / Linux
node server.js

👉 For Windows CMD:
set JWT_SECRET=devsecret && node server.js

🔻 Terminal 2 — Start Frontend
cd frontend
npm run dev

****
taskflow-fullstack/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── middleware/
│   │   └── auth.js
│
├── frontend/
│   ├── src/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── api.js
│   │   └── router.jsx
│
└── README.md
