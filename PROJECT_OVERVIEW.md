# Medico - Blood Bank Management System (MERN Stack)

Medico is a comprehensive Blood Bank Management platform built using the MERN stack (MongoDB, Express, React, Node.js). It facilitates the tracking of blood donations, inventory levels, and distributions across multiple roles including Donors, Hospitals, and Organisations.

---

## 🏗️ Project Architecture & Data Flow

### 1. Unified Backend (Express.js & Node.js)
The backend follows a standard MVC-inspired architecture:
- **Routes**: Define API endpoints and apply middleware.
- **Controllers**: Contain the core business logic.
- **Models**: Define data schemas using Mongoose for MongoDB.
- **Middlewares**: Handle authentication and specialized logic (e.g., Admin verification).

### 2. Modern Frontend (React & Vite)
The frontend is a decoupled Single Page Application (SPA):
- **Redux Toolkit**: Manages global state (authentication, user profile).
- **Service Layer (Axios)**: Centralizes API calls with JWT handling.
- **Protected Routing**: Ensures data security based on the user's role and session status.

---

## 📂 File Structure & Responsibilities

### Root Directory (Backend)
- `server.js`: entry point, initializes the Express app, middleware, and database connection.
- `config/db.js`: handles the Mongoose connection to MongoDB Atlas.
- `routes/`:
  - `authRoutes.js`: Login, register, and current-user endpoints.
  - `inventoryRoutes.js`: CRUD for blood records and specialized lists (Donors, Hospitals).
  - `analyticsRoutes.js`: Data fetching for blood group statistics.
  - `adminRoutes.js`: Administrative management of users and records.
- `controllers/`:
  - `authController.js`: Handles JWT generation, password hashing, and user validation.
  - `inventoryController.js`: Manages blood quantity logic (In/Out) and inventory tracking.
  - `analyticsController.js`: Aggregates blood group data for visualization.
  - `adminController.js`: Logic for managing site-wide lists and deletions.
- `models/`:
  - `userModel.js`: User schema (Name, Email, Role, etc.).
  - `inventoryModel.js`: Blood record schema (Blood Group, Quantity, Organisation, etc.).
- `middlewares/`:
  - `authMiddleware.js`: Validates the JWT token and attaches `userId` to the request.
  - `adminMiddleware.js`: Ensures only admin-role users can access specific routes.
- `.env`: (Ignored by Git) Contains sensitive keys (MONGO_URL, JWT_SECRET, PORT).

### `client/` Directory (Frontend)
- `src/main.jsx`: Entry point for React, wraps the app in the Redux Provider.
- `src/App.jsx`: Main routing configuration using `react-router-dom`.
- `src/services/api.js`: Centralized Axios instance with automatic JWT header attachment.
- `src/redux/`:
  - `store.js`: Configures the global Redux store.
  - `features/auth/`: Contains `authSlice` (state) and `authActions` (async thunks).
- `src/components/`:
  - `Layout.jsx`: Main sidebar/header shell for the application.
  - `routes/`: `ProtectedRoute.jsx` and `PublicRoute.jsx` for session control.
- `src/pages/`:
  - `Dashboard.jsx`: Primary inventory view with "Add Record" functionality.
  - `Analytics.jsx`: Visual representation of blood availability.
  - `auth/`: Login and Registration pages with role validation.
  - `admin/`: Specialized views for the system administrator.

---

## 🔄 How Things Move (Data Flow)

1.  **Authentication**:
    - User submits login form -> `authActions` calls `/auth/login`.
    - Backend validates -> returns a JWT token.
    - Frontend stores token in `localStorage` -> Redux state updates `user` info.
    - Subsequent visits call `/auth/current-user` via `ProtectedRoute` to re-validate.

2.  **Inventory Management**:
    - Dashboard calls `getBloodRecords()` -> `api.js` adds `Bearer <token>` automatically.
    - Backend `getInventoryController` filters records by the authenticated `organisation`.
    - Data is returned and stored in local React state (`data`) and rendered in a table.

3.  **Adding Records**:
    - Modal form submits to `/inventory/create-inventory`.
    - Backend performs logic:
      - If `OUT`, checks if enough blood is available in the specific group.
      - If `IN`, adds to the aggregate total.
    - Success response triggers a refresh of the dashboard list.

---

## 🛠️ Performance & Security
- **JWT**: Stateless session management for scalability.
- **Bcrypt.js**: Industry-standard password hashing.
- **Vite**: Ultra-fast build tool for the frontend.
- **Concurrently**: Allows running both Server and Client with a single command (`npm run dev`).
