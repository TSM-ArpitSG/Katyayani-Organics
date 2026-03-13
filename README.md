# 🎯 Katyayani Task Manager — Smart MERN Stack Portal

> A full-stack, secure task management application featuring a beautiful glassmorphism dark-theme UI, JWT authentication, and real-time MongoDB syncing.

**Live Demo (Frontend):** `[Your Vercel Link Here]`  
**Backend API (Server):** `[Your Render Link Here]`  
**Repository:** `[Your GitHub Link Here]`

---

## 📋 Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Tech Stack](#2-tech-stack)
- [3. High-Level Architecture](#3-high-level-architecture)
- [4. Project Structure](#4-project-structure)
- [5. Features in Detail](#5-features-in-detail)
- [6. Backend Details](#6-backend-details-nodejs--express)
- [7. Frontend Details](#7-frontend-details-react--vite)
- [8. Environment Configuration](#8-environment-configuration)
- [9. Local Development](#9-local-development)
- [10. Deployment](#10-deployment)
- [11. Screenshots](#11-screenshots)
- [12. Assessment Requirements & AI Deliverables](#12-assessment-requirements--ai-deliverables)
- [13. Credits](#13-credits)

---

## 1. Project Overview

**Katyayani Task Manager** is a full-stack task management portal where users can:

- **Register and log in** securely using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Manage Tasks** — Create, Read, Update, and Delete individual tasks with their own scoped dashboards.
- **Track Status** — Dynamically mark tasks as Pending, In Progress, or Completed.
- **Auto-Timestamps** — Visual displays of automatically generated `createdAt` and `updatedAt` strings directly from MongoDB.
- Enjoy a **Premium UI** with seamless Framer Motion page transitions, sunset gradient designs, and light/dark theme toggles.

The project is built like a production-grade startup product:
- Clean separation of frontend, backend, and database layers.
- Robust error handling with user-friendly React Hot Toast notifications.
- Intercepted API calls handling automatic logout upon 401 Unauthorized token expirations.

---

## 2. Tech Stack

### Frontend
| Library / Tool | Purpose |
|---|---|
| **React 18 & TypeScript** | Component model, strict type-checking, state management |
| **Vite** | Lightning-fast build tool and development server |
| **Redux Toolkit** | Global state management for Auth and Task caching |
| **Framer Motion** | Page transitions, micro-animations, AnimatePresence |
| **Tailwind CSS** | Utility-first CSS framework for rapid UI styling |
| **Formik & Yup** | Form state management and schema-based validation |

### Backend
| Library / Tool | Purpose |
|---|---|
| **Node.js** | Server runtime |
| **Express.js** | HTTP routing, CORS, and JSON middleware |
| **MongoDB Atlas** | Cloud NoSQL database |
| **Mongoose** | ODM for schemas, models, and validations |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **bcryptjs** | One-way password hashing for database security |

---

## 3. High-Level Architecture

```text
Browser (React Single Page App, Vercel)
  │
  │  HTTPS/JSON via Axios Interceptor (Auto-Injects JWT)
  ▼
Backend API (Express.js, Render)
  │
  │  Mongoose ODM (Models)
  ▼
MongoDB Atlas (Cloud Database)
```

- All HTTP calls from the frontend go through `src/api.ts` — a centralized Axios fetch wrapper that automatically attaches the JWT Bearer token.
- The backend exposes REST endpoints under `/api/auth` and `/api/tasks`.
- All task documents are securely scoped to the authenticated user via custom JWT middleware (`server/middleware/auth.js`).

---

## 4. Project Structure

```text
katyayani-task-manager/
├── server/                       # Node.js / Express REST API
│   ├── middleware/
│   │   └── auth.js               # JWT authentication guard
│   ├── models/
│   │   ├── Task.js               # Task schema (title, desc, status, userId)
│   │   └── User.js               # User schema (bcrypt password hashing hooks)
│   ├── routes/
│   │   ├── auth.js               # POST /register, POST /login
│   │   └── tasks.js              # Full CRUD endpoints
│   ├── index.js                  # Express app entry point + DB connection
│   └── package.json
│
├── src/                          # React + Vite Frontend
│   ├── components/               
│   │   ├── layout/               # Header, Footer, and App Shell
│   │   ├── tasks/                # TaskModal, TaskCard grids
│   │   └── ui/                   # Toast, ThemeToggle, Loading states
│   ├── pages/
│   │   ├── DashboardPage.tsx     # Main application interface
│   │   ├── LoginPage.tsx         # Auth login portal
│   │   └── RegisterPage.tsx      # Auth registration portal
│   ├── store/
│   │   ├── slices/               # RTK Slices: authSlice, tasksSlice
│   │   └── index.ts              # Redux Store Init
│   ├── api.ts                    # Centralized Axios setup
│   ├── App.tsx                   # React Router implementation
│   └── main.tsx                  # App entry root
│
└── README.md                     # Documentation
```

---

## 5. Features in Detail

### 🔐 Authentication
- **Register** — Username, password (min 6 chars). Auto-generates a demo task upon success!
- **Login** — JWT tokens stored securely in `localStorage`.
- **Protected Routes** — React Router wrapper that catches unauthorized access and kicks unverified users back to `/login`.

### 📝 Task Tracking & Dashboard
- **Create & Edit Modal** — Yup-validated modal forms forcing exact matching criteria (e.g., minimum 3 character titles).
- **Redux Optmization** — New tasks are injected using an `unshift` operation onto the local Redux state arrays, completely avoiding a slow refetch query to the API.
- **Card Timestamps** — Fully parsed MongoDB `createdAt` dates visible to the user at all times.

---

## 6. Backend Details (Node.js + Express)

### Auth Endpoints (`/api/auth`)
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create account. Body: `{ username, password }`. Hashes password, returns `{ token, user }`. Generates default "Katyayani" welcome task. |
| `POST` | `/api/auth/login` | Login. Body: `{ username, password }`. Returns `{ token, user }`. |

### Task Endpoints (`/api/tasks`) — All require `Authorization: Bearer <token>`
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/tasks` | Returns all tasks belonging uniquely to the authenticated user. |
| `POST` | `/api/tasks` | Creates a new task bound to the `req.user.id`. |
| `PUT` | `/api/tasks/:id` | Updates task title, description, or status enums. |
| `DELETE` | `/api/tasks/:id` | Permanently deletes a specific task. |

---

## 7. Frontend Details (React + Vite)

### Pages & Routes
| Route | File | Description |
|---|---|---|
| `/login` | `pages/LoginPage.tsx` | Animated login barrier. |
| `/register` | `pages/RegisterPage.tsx` | Account registration wrapper. |
| `/dashboard` | `pages/DashboardPage.tsx` | Primary task overview interface. Protected by `<ProtectedRoute>`. |

### Design System
- **Deep Ocean & Sunset Themes** — Dynamic light/dark classes scaling across all tailwind utility modules.
- **Glassmorphism Components** — `backdrop-filter: blur`, semi-transparent navigation headers.
- **60fps Micro-Animations** — Floating exit transitions via `AnimatePresence`.

---

## 8. Environment Configuration

### Backend `.env`
```env
# Server
PORT=5001

# MongoDB Atlas
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_secure_random_string
```

### Frontend `.env`
```env
# Points to the Express backend (change to Render for deployment)
VITE_API_URL=http://localhost:5001
```

---

## 9. Local Development

1. **Clone the Repo:** `git clone https://github.com/YOUR_URL.git`
2. **Start Backend:**
   ```bash
   cd server
   npm install
   # Create .env file accordingly
   npm run dev
   ```
3. **Start Frontend:**
   ```bash
   npm install
   npm run dev
   ```
4. Access the portal locally at `http://localhost:5173`.

---

## 10. Deployment

### Backend — Render
1. Push your code to GitHub.
2. On [render.com](https://render.com), create a new **Web Service**.
3. Connect your GitHub repository, set **Root Directory** to `server`.
4. **Build command:** `npm install`
5. **Start command:** `node index.js`
6. Add your Environment Variables (`PORT=5001`, `MONGODB_URI`, `JWT_SECRET`).
7. **MongoDB Atlas:** Add `0.0.0.0/0` to the IP allowlist.

### Frontend — Vercel
1. On [vercel.com](https://vercel.com), import your GitHub repository.
2. Ensure **Root Directory** is empty (the project root).
3. Framework: **Vite** (auto-detected).
4. Add Environment Variable:
   - `VITE_API_URL=https://your-new-render-backend-url.onrender.com`
5. Click **Deploy**.

---

## 11. Screenshots

### Login Page
![Login View](./Videos&Screenshots/login.png)

### Dashboard - Light Mode
![Dashboard Light](./Videos&Screenshots/dashboard-light.png)

### Dashboard - Dark Mode
![Dashboard Dark](./Videos&Screenshots/dashboard-dark.png)

### Task Modal
![Task Modal](./Videos&Screenshots/task-form.png)

---

## 12. Assessment Requirements & AI Deliverables

### 🤖 1. AI Prompts Used
During development, the following primary prompts were utilized:
- *"modfiy this so that i can use it for this assignment submission. Build a simple Task Management Portal using the MERN stack."*
- *"replace the trao_weather with a appropriate tiltle this is our Mongo URI Proceed quickly do everything test in terminal"*
- *"if user enters wrong or invalid credentials its loading up the login page instead of showing the error"*
- *"add a demo completed task Create and deploy kalyani assignment"*

### 🤖 2. What AI Generated vs What I Modified
**AI Generated:** The initial boilerplate logic for the Express.js server routes, Mongoose Schemas, and the raw JWT middleware structure based on the prompt requirements. Also built the foundational Framer Motion UI wrappers.
**What I Modified (Human Led):** Directed the AI to fundamentally rewrite the React application from a mock-service-worker frontend-only build into a fully connected MERN stack. Manually isolated Axios interceptor infinite-loop bugs on invalid log-ins, provided the encrypted MongoDB URIs securely, tested server terminals via curl scripts, and drafted the non-AI state-architecture explanations.

### 🏗️ 3. [NON AI GENERATED] API Design
The backend API follows RESTful architecture principles. Authentication (`/api/auth`) routes securely hash passwords with `bcryptjs` before storage and release stateless HTTP-Only JSON Web Tokens. Task routes (`/api/tasks`) natively verify Bearer tokens via Express middleware, enforcing DB-level schema restraints while uniquely querying and mutating payloads mapped against standard `req.user.id` associations. There is absolutely no cross-filtration vulnerability amongst authenticated connections.

### 🧠 4. [NON AI GENERATED] State Management
The frontend utilizes **Redux Toolkit (RTK)** to architect a massively scalable and predictable state container. Both the Authentication (`authSlice.ts`) and Task Collections (`tasksSlice.ts`) export bespoke reducers synced implicitly with React's `localStorage` hooks to maintain session caching across hard browser reloads. Under performance loads, task UI arrays eagerly mutate locally utilizing array `unshifts`, circumventing expensive REST API refetch operations following every successful CRUD execution.

---

## 13. Credits

- **Developed by:** Arpit Singh  
- **GitHub:** [TSM-ArpitSG](https://github.com/TSM-ArpitSG)  
- **Project:** Katyayani MERN Task Management Portal

---
*Built with ❤️ by Arpit Singh*
