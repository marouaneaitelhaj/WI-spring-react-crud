# 🎵 WI Spring-React CRUD Application

This is a full-stack CRUD web application built with **Spring Boot**, **React**, and **Docker Compose**.  
It allows users to **manage a list of songs** with authentication and role-based access.

## 🧰 Tech Stack

- **Backend**: Spring Boot (Java 17), Spring Security, JPA, PostgreSQL
- **Frontend**: React, Redux, React Hook Form, Axios, React Router
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **DevOps**: Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Docker & Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en) (v18+ recommended)

---

### 🐳 Run the Full Project with Docker

This is the **recommended** way to start the project.

1. Clone the repository:

   ```bash
   git clone https://github.com/marouaneaitelhaj/WI-spring-react-crud.git
   cd WI-spring-react-crud
   ```

2. Start backend, database, and dependencies:

   ```bash
   docker-compose up --build
   ```

   This will:
   - Run the Spring Boot app on `http://localhost:8082`
   - Set up PostgreSQL and pgAdmin

---

### 💻 Run the Frontend (React App)

1. Open a **new terminal**, go to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The React app will be running on `http://localhost:4200`

---

## 🔐 Login Credentials

> Default credentials (from preloaded database):

- **Admin**:  
  `email`: `admin@example.com`  
  `password`: `admin123`

- **User**:  
  `email`: `user@example.com`  
  `password`: `user123`

---

## 📁 Project Structure

```
WI-spring-react-crud/
├── backend/             → Spring Boot App (API, Auth, JPA)
├── frontend/            → React App (UI, Redux, Auth)
├── docker-compose.yml   → Dev environment setup
└── README.md
```

---

## ✅ Features

- JWT-based Authentication
- Role-based Authorization (Admin/User)
- Create, Edit, Delete, View songs
- Form validation (React Hook Form)
- Token-based protected routes
- Clean RESTful API
- Dockerized environment

---

## 📸 Screenshots

> Add screenshots of your UI here if needed.

---

## 🧑‍💻 Author

**Marouane Aitelhaj**  
[GitHub Profile](https://github.com/marouaneaitelhaj)

---

## 📝 License

This project is licensed under the MIT License.
