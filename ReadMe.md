## 📘 Fullstack User Management App

A fullstack user management application built with **Next.js** on the frontend and **Node.js + Express** on the backend, using **MongoDB** as the database.

---

## 📁 Project Structure

```
nextjs-nodejs-project/
├── frontend/   → Next.js frontend
├── backend/    → Node.js + Express backend
└── README.md
```

---

## 🚀 Features

* User registration and login (authentication)
* Secure password hashing
* User CRUD operations (create, read, update, delete)
* REST API built with Express
* Responsive UI using Tailwind CSS
* MongoDB for database management

---

## 🛠️ Tech Stack

**Frontend**: Next.js, React, Tailwind CSS
**Backend**: Node.js, Express, MongoDB, Mongoose
**Auth**: JWT
**Tools**: Git, Postman, Vercel (Frontend), Render or Railway (Backend)

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/ereibor/nodejs-nextjs-crud-app

cd nodejs-nextjs-crud-app

```

### 2. Setup Backend

```bash
cd backend
npm install
# create .env file
npm run dev
```

**`.env` example**:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📫 API Endpoints (Backend)

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |
| GET    | `/api/users`         | Get all users |
| GET    | `/api/users/:id`     | Get single user|
| PUT    | `/api/users/:id`     | Update user   |
| DELETE | `/api/users/:id`     | Delete user   |

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) to test backend routes.

---

## 🔗 Deployment

* Frontend: [Vercel](https://vercel.com/)
* Backend: [Render](https://render.com/) / [Railway](https://railway.app/)

---

## 👤 Author

* **TUNERE EREIBOR** – [@ereibor](https://github.com/ereibor)
