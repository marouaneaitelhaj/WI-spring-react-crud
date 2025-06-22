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

- **User1**:  
  `email`: `alice`  
  `password`: `password123`

- **User2**:  
  `email`: `bob`  
  `password`: `password123`

- **User3**:  
  `email`: `charlie`  
  `password`: `password123`

---

## 📁 Project Structure

```
WI-spring-react-crud/
├── backend/                   # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/tunz/backend/
│   │   │   │   ├── config/           # Security, JWT, CORS config
│   │   │   │   ├── controller/       # REST controllers (Auth, Song)
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── entity/           # JPA Entities (AppUser, Song)
│   │   │   │   ├── enums/            # Enums (e.g. Genre)
│   │   │   │   ├── exception/        # Custom exceptions and handlers
│   │   │   │   ├── repository/       # Spring Data JPA repositories
│   │   │   │   ├── service/          # Service interfaces and impl
│   │   │   │   ├── util/             # Utility classes (e.g. JwtUtil)
│   │   │   ├── resources/
│   │   │   │   ├── db/migration/     # Flyway migrations SQL scripts
│   │   │   │   ├── static/
│   │   │   │   ├── templates/
│   │   │   │   └── application.yml   # Spring Boot configuration
│   ├── Dockerfile                # Backend Docker container setup
│   ├── docker-compose.yml        # Docker compose (note: seems here)
│   ├── pom.xml                   # Maven dependencies and build
├── frontend/                  # React frontend app
│   ├── public/                # Static files like index.html
│   ├── src/
│   │   ├── assets/            # Images, SVGs etc.
│   │   ├── components/        # Reusable React components (forms, lists, UI)
│   │   ├── pages/             # Pages (Home, Login, Register, Song CRUD)
│   │   ├── routes/            # Route guards and protected routes
│   │   ├── services/          # API calls, axios config
│   │   ├── store/             # Redux slices and store config
│   │   ├── types/             # TypeScript type definitions
│   │   ├── App.tsx            # Main React app entry point
│   │   ├── main.tsx           # ReactDOM render and router setup
│   ├── package.json           # npm dependencies and scripts
│   ├── vite.config.ts         # Vite build config
├── README.md                  # This documentation
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
