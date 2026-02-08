# CosmicWatch API Documentation

Base URL: `http://localhost:5000/api` (or your configured port)

## Authentication (`/auth`)

### 1. Signup
- **Endpoint**: `POST /auth/signup`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: `{ token, user }`

### 2. Login
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: `{ token, user }`

### 3. Google OAuth
- **Endpoint**: `GET /auth/google`
- **Description**: Redirects to Google Login.

### 4. GitHub OAuth
- **Endpoint**: `GET /auth/github`
- **Description**: Redirects to GitHub Login.

---

## Asteroids (`/`)

### 5. Get All Asteroids
- **Endpoint**: `GET /`
- **Query Params**:
  - `page` (optional, default 1)
  - `limit` (optional, default 10)
  - `hazard` (optional, boolean `true` to filter hazardous ones)
- **Response**: `{ asteroids: [...], totalPages, currentPage }`

### 6. Get Asteroid Details
- **Endpoint**: `GET /:id`
- **Params**: `id` (MongoDB ID or NASA ID)
- **Response**: Asteroid Object or 404

### 7. Get Risk Analysis
- **Endpoint**: `GET /:id/risk`
- **Params**: `id` (Asteroid MongoDB ID)
- **Response**: Risk Analysis Object

### 8. Analyze Risk (Manual Trigger)
- **Endpoint**: `POST /:id/analyze`
- **Params**: `id` (Asteroid MongoDB ID)
- **Response**: Updated Risk Analysis Object

---

## User & Alerts (`/user`)
*Headers required: `Authorization: Bearer <token>`*

### 9. Add to History (Watch Asteroid)
- **Endpoint**: `POST /user/history`
- **Body**:
  ```json
  {
    "asteroidId": "65c3..."
  }
  ```
- **Response**: `{ message: "Added to history" }`

### 10. Get Search History
- **Endpoint**: `GET /user/history`
- **Response**: Array of history items (populated with asteroid details).

### 11. Get Alerts
- **Endpoint**: `GET /user/alerts`
- **Response**: Array of alert objects.

### 12. Mark Alert as Read
- **Endpoint**: `PUT /user/alerts/:id/read`
- **Params**: `id` (Alert ID)
- **Response**: `{ message: "Marked as read" }`
