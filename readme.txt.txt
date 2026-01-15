Task Management System – Fullstack Web Application
Overview

This project is a fullstack Task Management System built as part of a Fullstack Software Development Internship Assignment.
It enables users to securely register and log in, manage personal tasks, filter and search tasks in real time, and visualize task progress through an interactive dashboard.

The application is designed to be simple, secure, responsive, and production-ready, demonstrating real-world fullstack development practices including authentication, protected APIs, state management, and live UI updates.

Live Demo

Frontend: (Add Vercel / Netlify link)

Backend API: (Add Render / Railway link)

Video Demo (2–3 mins): (Add link)

Tech Stack
Frontend

React (Vite)

TypeScript

Tailwind CSS

Axios

React Router DOM

Recharts (for task statistics)

Backend

Node.js

Express.js

TypeScript

MongoDB (Mongoose)

JWT Authentication

Zod (request validation)

Tools

Postman (API testing)

Git & GitHub

Vercel (Frontend deployment)

Render / Railway (Backend deployment)

Project Structure
Backend (TASK-IT-BE)
TASK-IT-BE/
├── src/
│   ├── db/              # Database connection & models
│   ├── middleweres/     # JWT authentication middleware
│   ├── routers/         # Auth & Task routes
│   ├── zod/             # Zod schemas for validation
│   │   ├── authZod.ts
│   │   └── userZod.ts
│   └── index.ts         # Application entry point
├── package.json
├── tsconfig.json
└── .env

Frontend (TASK-IT-FE)
TASK-IT-FE/
├── src/
│   ├── components/      # Sidebar, Cards, Filters, Modals
│   ├── pages/           # SignIn, SignUp, Dashboard
│   ├── icons/
│   └── main.tsx
├── public/
├── vite.config.ts
├── vercel.json
└── package.json

Backend API Endpoints
Authentication
POST /api/auth/register   → Register new user
POST /api/auth/login      → Login user
GET  /api/auth/profile    → Get user profile (protected)

Task Management
GET    /api/tasks         → Get all user tasks
POST   /api/tasks         → Create new task
GET    /api/tasks/:id     → Get specific task
PUT    /api/tasks/:id     → Update task
DELETE /api/tasks/:id     → Delete task
GET    /api/tasks/stats   → Task statistics

Task Model
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "priority": "High | Medium | Low",
  "status": "Pending | In Progress | Completed",
  "dueDate": "ISO date",
  "createdAt": "ISO date",
  "updatedAt": "ISO date",
  "userId": "string"
}

Features Implemented
User Authentication

User registration and login

JWT-based authentication

Protected routes for tasks

Task Management

Create, read, update, delete tasks

Priority levels (High / Medium / Low)

Task status tracking

Due date support

Category support

Dashboard

Real-time task listing

Regex-based partial search

Status filters

Task statistics (Pie Chart)

Live UI updates without page reload

UI / UX

Responsive design

Loading and error states

Modal-based task creation

Sidebar navigation (Home / Dashboard)

Real-Time UI Updates

Tasks are fetched once on load

Creating a task:

Sends POST /api/tasks

On success, task is added to local state

Home view shows all tasks

Dashboard view enables search + filters

No page refresh required

Search Functionality

Case-insensitive

Regex-based partial matching

Searches across:

Title

Description

Category

Example searches:

dash
progress
ui
fix

Setup Instructions
Backend Setup
cd TASK-IT-BE
npm install
npm run dev


Create .env file:

PORT=3000
JWT_SECRET=your_secret_key

Frontend Setup
cd TASK-IT-FE
npm install
npm run dev


Ensure API base URL points to backend:

http://localhost:3000

API Testing

Tested using Postman

JWT authorization verified

Task CRUD operations validated

Error handling tested

Challenges & Solutions

. Real-Time UI Sync

Challenge: UI not updating after task creation
Solution: Updated React state immediately after successful API response

. Search & Filtering

Challenge: Partial search across multiple fields
Solution: Implemented regex-based filtering using useMemo

Future Enhancements

Drag and drop task ordering

Task reminders and notifications


Dark mode

Role-based access control

Submission Deliverables

GitHub repository

Live deployed frontend

Live backend API

Video demo (2–3 minutes)

Postman / Swagger collection

Final Notes

This project demonstrates:

Fullstack architecture design

Secure authentication

RESTful API development

Responsive frontend with live updates

Clean, maintainable code structure

If you want, I can also:

Review your repo before submission

Generate Swagger documentation

Write a 2–3 minute demo script

Help convert this into resume bullet points