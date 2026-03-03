# Medico - Blood Bank Management System (MERN Stack)

Medico is a comprehensive Blood Bank Management platform built using the MERN stack (MongoDB, Express, React, Node.js). It facilitates the tracking of blood donations, inventory levels, and distributions across multiple roles including Donors, Hospitals, and Organisations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (for the database)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd medico-main
   ```

2. **Install Backend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd client
   npm install
   cd ..
   ```

### Environment Configuration

Create a `.env` file in the root directory and add the following:
```env
PORT=8080
DEV_MODE=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Running the Application

You can run both the backend and frontend concurrently from the root directory:
```bash
npm run dev
```

The application will be accessible at:
- Frontend: `http://localhost:5173` (Vite)
- Backend API: `http://localhost:8080/api/v1`

---

## 🏗️ Project Architecture & Data Flow

### 1. Unified Backend (Express.js & Node.js)
The backend follows a standard MVC-inspired architecture:
- **Routes**: Define API endpoints and apply middleware.
- **Controllers**: Contain the core business logic.
- **Models**: Define data schemas using Mongoose for MongoDB.
- **Middlewares**: Handle authentication and specialized logic.

### 2. Modern Frontend (React & Vite)
The frontend is a decoupled Single Page Application (SPA):
- **Redux Toolkit**: Manages global state (authentication, user profile).
- **Service Layer (Axios)**: Centralizes API calls with JWT handling.
- **Protected Routing**: Ensures data security based on user roles.

---

## 📂 File Structure & Responsibilities

### Root Directory (Backend)
- `server.js`: entry point, initializes the Express app and database connection.
- `config/db.js`: handles the Mongoose connection to MongoDB.
- `routes/`: API endpoint definitions.
- `controllers/`: Core business logic for auth, inventory, and analytics.
- `models/`: Mongoose schemas for Users and Inventory.
- `middlewares/`: JWT validation and Admin access control.

### `client/` Directory (Frontend)
- `src/main.jsx`: Entry point for React and Redux Provider.
- `src/App.jsx`: Main routing logic.
- `src/services/api.js`: Axios instance with JWT interceptors.
- `src/redux/`: Global state management.
- `src/pages/`: UI components for Dashboard, Analytics, and Auth.

---

## 🔄 Data Flow

1.  **Authentication**: Users log in via `/auth/login`, receive a JWT, and store it in `localStorage`.
2.  **Inventory**: Dashboard fetches data through the API service, filtered by the logged-in organisation.
3.  **Transactions**: New blood records are validated for availability (if OUT) before being saved to MongoDB.

---

## 🛠️ Performance & Security
- **JWT**: Secure session management.
- **Bcrypt.js**: High-security password hashing.
- **Vite**: Modern, fast frontend build tool.
- **Redux Toolkit**: Predictable state management.