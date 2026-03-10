# Students Table — Full Stack App

A full-stack Student Management System with React.js frontend and optional NestJS + PostgreSQL backend.

---

## Project Structure

```
students-app/
├── frontend/     ← React.js app (mandatory, fully functional standalone)
└── backend/      ← NestJS + PostgreSQL (optional bonus)
```

---

##  Frontend Setup

> Works completely standalone with in-memory state. No backend required.

```bash
cd frontend
npm install
npm start
```

Opens at `http://localhost:3000`

### Features
-  Student list with Name, Email, Age, Actions columns
-  Add Student form with full validation (required fields, valid email)
-  Edit Student with pre-filled data + same validations
-  Delete with confirmation dialog
-  Simulated loading state (spinner + loading bar)
-  Search/filter across name, email, age
-  Column sorting (click headers)
-  Export filtered or full data as CSV
-  Toast notifications for all actions
-  Responsive design

### Build & Deploy

```bash
cd frontend
npm run build
# Deploy the /build folder to Vercel, Netlify, or any static host
```

**Vercel (recommended):**
```bash
npm i -g vercel
cd frontend
vercel
```

---

## Backend (NestJS + PostgreSQL)

### Prerequisites
- Node.js 18+
- PostgreSQL running locally or via Docker

### Quick Start

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Start in development mode
npm run start:dev
```

Server runs at `http://localhost:4000`  
Swagger docs at `http://localhost:4000/api/docs`

### PostgreSQL with Docker (quick setup)

```bash
docker run --name students-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=students_db \
  -p 5432:5432 \
  -d postgres:15
```

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/students` | Get all students (optional `?search=`) |
| GET | `/students/:id` | Get student by ID |
| POST | `/students` | Create student |
| PATCH | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |

### Connect Frontend to Backend

In `frontend/src/hooks/useStudents.js`, replace in-memory operations with API calls:

```js
const API = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const addStudent = async (data) => {
  const res = await fetch(`${API}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};
```

---

## Tech Stack

**Frontend:** React 18, CSS Variables, Google Fonts (Syne + DM Mono)  
**Backend:** NestJS 10, TypeORM, PostgreSQL, Swagger/OpenAPI, class-validator
