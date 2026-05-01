#  TaskFlow — Full Stack Task Management App

##  Overview

TaskFlow is a full-stack web application that allows users to manage projects and tasks efficiently.
It includes authentication, protected routes, and full CRUD operations.

---

##  Features

###  Authentication

* User registration and login
* JWT-based authentication
* Protected API routes

###  Projects

* Create projects
* View user-specific projects

###  Tasks

* Create tasks inside projects
* Update task status (To Do, In Progress, Done)
* Delete tasks
* View tasks per project
* View tasks assigned to user

---

##  Tech Stack

### Frontend

* React
* React Router
* Axios

### Backend

* Node.js
* Express.js
* PostgreSQL

### Authentication

* JSON Web Token (JWT)

---

##  Installation

### 1. Clone the repository

```bash
git clone https://github.com/zineblouniri/TaskFlow.git
cd taskflow
```

---

### 2. Backend setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
DATABASE_URL=<your_postgres_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Run server:

```bash
npm run dev
```

---

### 3. Frontend setup

```bash
cd client
npm install
npm run dev
```

---

##  API Endpoints

### Auth

* POST /auth/register
* POST /auth/login

### Projects

* GET /projects
* GET /projects/:id
* POST /projects
* PUT /projects/:id
* DELETE /projects/:id

### Tasks

* GET /tasks/:projectId
* GET /tasks/my
* POST /tasks
* PUT /tasks/:id
* DELETE /tasks/:id

---

##  Key Concepts

* JWT Authentication
* Middleware protection
* Role-based access control
* REST API design
* React state management

---

##  Future Improvements

* UI with Tailwind CSS
* Notifications (toast)
* Deployment

---

##  Author

Zineb Louniri
