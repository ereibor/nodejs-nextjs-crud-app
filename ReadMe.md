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
* Global state management with redux tookit
* MongoDB for database management

---

## 🛠️ Tech Stack

**Frontend**: Next.js, React, Tailwind CSS, redux toolkit
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
| POST   | `/api/users/users`   | create users  |
| PUT    | `/api/users/users:id`| Update user   |
| DELETE | `/api/users/users:id`| Delete user   |

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) to test backend routes.

---

## 🔗 Deployment

* Frontend: [Vercel](https://vercel.com/)
* Backend: [Render](https://render.com/) / [Railway](https://railway.app/)

---

🧩 Debugging Report

1. Issue: API Route Not Responding
Problem Description:
The /api/users/:id route in the backend was not responding as expected when tested with various HTTP methods. The frontend failed to fetch user data, and the API was returning a 500 Internal Server Error.

Solution:

Corrected the database connection string in the .env file.

Implemented error handling for missing parameters in the route.

Restarted the server to apply the changes.

Testing After Fix:

The API now successfully returns the correct user data and responds with a 200 OK status.


2. Issue: Authentication Problems with JWT
Problem Description:
There were issues with user authentication after login. The frontend was not receiving or handling the JWT token correctly. Even after a successful login request, the user wasn't able to stay authenticated on subsequent API calls.

Solution:

Fixed the backend to correctly generate and send the JWT token upon successful login.

Ensured that the frontend stored the token securely (in localStorage or cookies).

Added logic to include the token in the Authorization header when making requests to protected routes.

Testing After Fix:

After logging in, the JWT token is correctly stored, and protected routes are accessible with the valid token in the request headers.


3. Issue: Redux State Not Updating on User Login
Problem Description:
The Redux state was not being updated after a user successfully logged in. Even though authentication on the backend was successful, the frontend did not reflect the authenticated state.

Solution:

Fixed the login action to correctly dispatch setToken and setUser actions.

Updated the reducer to handle state updates properly.

Testing After Fix:

The Redux state was updated correctly with user information and authentication token after login.



## 👤 Author

* **TUNERE EREIBOR** – [@ereibor](https://github.com/ereibor)
