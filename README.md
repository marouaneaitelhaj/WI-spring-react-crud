# Full-Stack CRUD Application (Spring Boot + React)

This project is a full-stack CRUD application developed with **Spring Boot (Java)** for the backend and **React.js** for the frontend. It demonstrates clean architecture, proper RESTful design, database interaction using JPA, and a responsive UI with React Hooks.

## 📌 Features

### Backend (Spring Boot)
- RESTful API with Spring Boot
- CRUD operations for `Product` entity
- Input validation using `javax.validation`
- Exception handling (global error responses)
- PostgreSQL/MySQL integration with Spring Data JPA
- CORS configured for frontend access

### Frontend (React)
- List view and form view using React Router
- Functional components and Hooks (`useState`, `useEffect`)
- Axios for API requests
- Add/Edit/Delete Products
- Context API for state management
- Responsive design with basic styling

### Database
- Schema initialization using `schema.sql`
- Compatible with PostgreSQL or MySQL

---

## 🧰 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Backend     | Java, Spring Boot, JPA   |
| Frontend    | React.js, Axios, React Router |
| Database    | PostgreSQL / MySQL       |
| Dev Tools   | Maven, Node.js, Docker (optional) |
| Versioning  | Git, GitHub              |

---

## 🗂️ Project Structure

```
project-root/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── schema.sql
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Maven
- PostgreSQL or MySQL installed locally

---

## ⚙️ Backend Setup

```bash
cd backend
# Update `application.properties` with your DB config
mvn spring-boot:run
```

### Database

The migration files `backend\src\main\resources\db\migration\V1__create_song_table.sql` and `backend\src\main\resources\db\migration\V2__create_app_user_table.sql` will be created automatically by Flyway when you run the application for the first time.

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Bonus (If Implemented)

- [ ] JWT Authentication
- [ ] Docker support (`docker-compose.yml`)
- [ ] Unit tests with JUnit (backend) and Jest (frontend)

---

## 📸 Screenshots

> _Add a few screenshots here of the UI and Postman if desired._

---

## 📝 Notes

- Make sure the backend is running on `http://localhost:8080`
- The frontend assumes the API base URL is `http://localhost:8080/api/products`
- CORS is configured in the backend for local frontend dev

---