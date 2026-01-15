# Task Management System

A fullstack task management application with user authentication, real-time updates, and interactive dashboard.

## Live Demo

- **Frontend**: https://ag-next-intern-cgz3.vercel.app/
- **Video Demo**: https://drive.google.com/file/d/1VmRMBaIYHXhNDwZIAWPWwpFq99JZN3vx/view?usp=drive_link
- - **Backend**: https://vercel.com/anirudhs-projects-4f1303a7/ag-next-intern-wlck

## Features

- User authentication with JWT
- Create, read, update, and delete tasks
- Filter tasks by status and priority
- Real-time search across title, description, and category
- Interactive dashboard with task statistics
- Responsive design for all devices

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts

**Backend**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Zod validation

## Project Structure

```
├── TASK-IT-BE/                 # Backend
│   ├── src/
│   │   ├── db/                 # Database models
│   │   ├── middleweres/        # Auth middleware
│   │   ├── routers/            # API routes
│   │   ├── zod/                # Validation schemas
│   │   └── index.ts
│   └── package.json
│
└── TASK-IT-FE/                 # Frontend
    ├── src/
    │   ├── components/         # Reusable components
    │   ├── pages/              # Page components
    │   └── main.tsx
    └── package.json
```

## API Endpoints

### Authentication
```
POST   /api/auth/register       # Register user
POST   /api/auth/login          # Login user
GET    /api/auth/profile        # Get user profile (protected)
```

### Tasks
```
GET    /api/tasks               # Get all tasks
POST   /api/tasks               # Create task
GET    /api/tasks/:id           # Get single task
PUT    /api/tasks/:id           # Update task
DELETE /api/tasks/:id           # Delete task
GET    /api/tasks/stats         # Get task statistics
```

## Setup Instructions

### Backend

```bash
cd TASK-IT-BE
npm install
```

Create `.env` file:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Start server:
```bash
npm run dev
```

### Frontend

```bash
cd TASK-IT-FE
npm install
npm run dev
```

Update API endpoint in config to point to your backend.

## Task Model

```json
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
```

## Key Features Explained

**Real-Time UI Updates**
- Tasks update instantly without page reload
- State management keeps UI in sync with backend

**Search Functionality**
- Case-insensitive regex-based search
- Searches across title, description, and category
- Instant filtering with `useMemo` optimization

**Dashboard Statistics**
- Visual pie chart showing task distribution
- Status-based filtering
- Priority-based organization

## Challenges and Solutions

### Challenge 1: Real-Time UI Sync
**Problem**: UI not updating after creating tasks  
**Solution**: Implemented immediate state updates after successful API calls, eliminating need for page refresh

### Challenge 2: Partial Search Implementation
**Problem**: Needed flexible search across multiple fields  
**Solution**: Used regex-based filtering with `useMemo` for efficient, case-insensitive partial matching

### Challenge 2: Partial Search Implementation
**Problem**: unable to host backend 

## Future Enhancements

- Drag and drop task reordering
- Task notifications and reminders
- Dark mode support
- Collaborative task sharing
- Export to PDF/CSV
