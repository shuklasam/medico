# 🔍 Medico App — Full-Stack Inspection Report

**Date**: 25 Feb 2026  
**Scope**: All backend routes, controllers, models, middlewares, and frontend pages/services.

---

## 🔴 Critical Bugs (App-Breaking)

### 1. Analytics Route Mismatch
- **Frontend** (`Analytics.jsx:10`): calls `API.get("/analytics/bloodGroup-details")`
- **Backend** (`analyticsRoutes.js:12`): route is registered as `/bloodGroups-data`
- **Impact**: Analytics page will **always fail with a 404**. No blood group data will load.
- **Fix**: Change the frontend call to `/analytics/bloodGroups-data` OR rename the backend route.

### 2. `adminMiddleware.js` still uses `req.body.userId`
- **File**: `middlewares/adminMiddleware.js:4`
- **Code**: `const user = await userModel.findById(req.body.userId);`
- **Impact**: For GET requests to admin routes (`/admin/donar-list`, `/admin/hospital-list`, `/admin/org-list`), `req.body` may be empty. The middleware will fail to find the user and **block all admin API calls**.
- **Fix**: Change to `req.userId` (which is set by `authMiddelware.js`).

### 3. Typo in `adminMiddleware.js` error handler
- **File**: `middlewares/adminMiddleware.js:19`
- **Code**: `errro` (instead of `error`)
- **Impact**: If the middleware's catch block is triggered, the server will **crash** with `ReferenceError: errro is not defined`.

### 4. `createInventoryController` — OUT flow uses `req.body.userId`
- **File**: `controllers/inventoryController.js:32`
- **Code**: `const organisation = new mongoose.Types.ObjectId(req.body.userId);`
- **Impact**: When dispensing blood (OUT), the availability check may use an **undefined** value, causing incorrect stock validation or a crash.
- **Fix**: Change to `req.userId`.

---

## 🟡 Bugs (Non-Breaking but Incorrect Behavior)

### 5. `ProtectedRoute.jsx` — Missing `useEffect` dependency array
- **File**: `client/src/components/routes/ProtectedRoute.jsx:23-25`
- **Code**: `useEffect(() => { getUser(); });` — no `[]`
- **Impact**: `getUser()` (which calls `/auth/current-user`) fires on **every single re-render**. This causes excessive API calls and potential performance issues.
- **Fix**: Add an empty dependency array: `useEffect(() => { getUser(); }, []);`

### 6. `getCurrentUser` thunk — Incorrect function signature
- **File**: `client/src/redux/features/auth/authActions.js:62`
- **Code**: `async ({ rejectWithValue }) => {`
- **Impact**: The first argument to an `createAsyncThunk` callback is the **payload** (not thunkAPI). Destructuring `rejectWithValue` from the first arg means `rejectWithValue` is always `undefined`. Errors will not be properly reported to Redux.
- **Fix**: Change to `async (_, { rejectWithValue }) => {`

### 7. `ProtectedRoute.jsx` — Dispatches `getCurrentUser` incorrectly
- **File**: `client/src/components/routes/ProtectedRoute.jsx:15`
- **Code**: `dispatch(getCurrentUser(data));`
- **Impact**: `getCurrentUser` is an async thunk that fetches data itself. Passing `data` as payload conflicts with the thunk's own API call. The user data may not populate correctly in Redux state.
- **Fix**: The ProtectedRoute should either dispatch the thunk without arguments: `dispatch(getCurrentUser())`, or set the user data directly via a reducer action instead of re-fetching.

---

## 🟠 Warnings (Design / Maintainability)

### 8. Six backend inventory routes have NO frontend consumer
| Backend Route | Method | Frontend Call |
|---|---|---|
| `/inventory/get-recent-inventory` | GET | ❌ None |
| `/inventory/get-inventory-hospital` | POST | ❌ None |
| `/inventory/get-donars` | GET | ❌ None |
| `/inventory/get-hospitals` | GET | ❌ None |
| `/inventory/get-orgnaisation` | GET | ❌ None |
| `/inventory/get-orgnaisation-for-hospital` | GET | ❌ None |

- **Impact**: These endpoints work but are unused. Either they are **dead code** or the frontend pages that should consume them are not yet built.

### 9. `Layout.jsx` — `dispatch` imported but unused
- **File**: `client/src/components/Layout.jsx:8`
- **Impact**: `useDispatch()` is called but `dispatch` is never invoked. Logout only clears `localStorage` and navigates — it does **not** clear the Redux auth state. After logout, stale user data may persist in memory until a full page refresh.

### 10. Admin link visible to all roles
- **File**: `client/src/components/Layout.jsx:33-35`
- **Impact**: The "Admin" sidebar link is always rendered regardless of the user's role. Non-admin users will see it but get blocked by the backend middleware. This is a **UX issue**, not a security one.

### 11. `DEV_MODE` vs `NODE_ENV` inconsistency
- **File**: `.env` uses `DEV_MODE=development`, but `server.js:31` checks `process.env.NODE_ENV` for production static file serving.
- **Impact**: The static file serving block will never activate even in production unless `NODE_ENV` is explicitly set.

---

## ✅ What's Working Correctly

| Feature | Frontend → Backend → DB | Status |
|---|---|---|
| User Registration | `POST /auth/register` → `userModel.save()` | ✅ |
| User Login + JWT | `POST /auth/login` → `jwt.sign()` | ✅ |
| Get Current User | `GET /auth/current-user` → `userModel.findOne()` | ✅ |
| Get Inventory | `GET /inventory/get-inventory` → `inventoryModel.find()` | ✅ |
| Create Inventory (IN) | `POST /inventory/create-inventory` → `inventoryModel.save()` | ✅ |
| Admin: Donar List | `GET /admin/donar-list` → `userModel.find({role:"donar"})` | ⚠️ (blocked by Bug #2) |
| Admin: Hospital List | `GET /admin/hospital-list` → `userModel.find({role:"hospital"})` | ⚠️ (blocked by Bug #2) |
| Admin: Org List | `GET /admin/org-list` → `userModel.find({role:"organisation"})` | ⚠️ (blocked by Bug #2) |
| Analytics | `GET /analytics/bloodGroups-data` → aggregate pipeline | ❌ (blocked by Bug #1) |
| Create Inventory (OUT) | `POST /inventory/create-inventory` → availability check | ⚠️ (affected by Bug #4) |

---

## 📋 Summary

| Severity | Count |
|---|---|
| 🔴 Critical (app-breaking) | 4 |
| 🟡 Bugs (incorrect behavior) | 3 |
| 🟠 Warnings (design/UX) | 4 |
| ✅ Working correctly | 5 of 10 user-facing flows |

**Recommendation**: Fix the 4 critical bugs first — they affect the Analytics page, Admin Dashboard, and inventory OUT flow. The remaining items are important for stability and UX polish.
