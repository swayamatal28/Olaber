# Olaber Backend API Documentation

## Table of Contents
- User Registration (POST /users/register)
- User Login (POST /users/login)
- Captain Registration (POST /captains/register)
- Captain Login (POST /captains/login)
- Get Captain Profile (GET /captains/profile)
## Captain Registration

### POST /captains/register
Registers a new captain, hashes the password, creates vehicle info and returns the captain object and a JWT.

Request Body (application/json)
```json
{
  "fullname": {
    "firstname": "string", // required, min 3 chars
    "lastname": "string"   // optional
  },
  "email": "string",       // required, valid email
  "password": "string",    // required, min 6 chars
  "vehicle": {
    "color": "string",         // required, min 3 chars
    "plate": "string",         // required, min 3 chars
    "capacity": 1,             // required, integer >= 1
    "vehicleType": "car"       // required, one of: "car","motorcycle","auto"
  }
}
```

Success (201 Created)
```json
{
  "token": "jwt",
  "captain": { /* captain object (password excluded) */ }
}
```

Errors
- 400 Bad Request — validation errors or captain already exists
- 500 Internal Server Error

Notes
- Password is hashed before saving.
- JWT returned in response body (not set as cookie on registration).
- Email must be unique.
- Vehicle fields are required and validated (type and ranges).

Example
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Doe"},"email":"jane@captain.com","password":"secret123","vehicle":{"color":"red","plate":"ABC123","capacity":4,"vehicleType":"car"}}'
```

---

## Captain Login

### POST /captains/login
Authenticate captain, returns captain object and JWT. Controller selects password to compare then issues token.

Request Body (application/json)
```json
{
  "email": "string",
  "password": "string"
}
```

Success (200 OK)
```json
{
  "token": "jwt",
  "captain": { /* captain object (password excluded) */ }
}
```

Side effect
- Token is also set as a cookie named `token`.

Errors
- 400 Bad Request — validation errors
- 401 Unauthorized — invalid email or password
- 500 Internal Server Error

Notes
- The controller looks up the captain and compares hashed password.
- On success the token is returned in body and set as a cookie for subsequent requests.

Example
```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@captain.com","password":"secret123"}'
```

---

## Get Captain Profile

### GET /captains/profile
Retrieve the authenticated captain's profile information. Requires authentication token.

Headers
```
Authorization: Bearer <jwt_token>
```
OR
```
Cookie: token=<jwt_token>
```

Success (200 OK)
```json
{
  "captain": {
    "_id": "60f7b3b3e3b3f3001f3b3b3b",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane@captain.com",
    "status": "inactive",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": null,
      "lng": null
    },
    "socketId": null
  }
}
```

Errors
- 401 Unauthorized — no token provided, invalid token, or token blacklisted
- 500 Internal Server Error

Example
```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Captain Logout

### GET /captains/logout
Logs out the authenticated captain by blacklisting their current token and clearing the cookie.

Headers
```
Authorization: Bearer <jwt_token>
```
OR
```
Cookie: token=<jwt_token>
```

Success (200 OK)
```json
{
  "message": "Logout successfully"
}
```

Side effects
- Token is added to blacklist database
- `token` cookie is cleared from client

Errors
- 401 Unauthorized — no token provided, invalid token, or token already blacklisted
- 500 Internal Server Error

Notes
- Once logged out, the token cannot be used for future requests
- Captain must login again to get a new token

Example
```bash
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Get Captain Profile

### GET /captains/profile
Returns the authenticated captain's profile. Requires a valid JWT provided via cookie (`token`) or Authorization header `Bearer <token>`.

Headers
```
Cookie: token=<jwt>
OR
Authorization: Bearer <jwt>
```

Success (200 OK)
```json
{
  "captain": {
    "_id": "string",
    "fullname": {"firstname":"string","lastname":"string"},
    "email": "string",
    "vehicle": {"color":"string","plate":"string","capacity":1,"vehicleType":"car"},
    "socketId": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

Errors
- 401 Unauthorized — missing/invalid/blacklisted token
- 500 Internal Server Error

Notes
- Auth middleware validates token and checks blacklist before attaching `req.captain`.

Example
```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <your_jwt>"
```

---

## Logout Captain

### GET /captains/logout
Invalidates the current token by adding it to the blacklist (TTL), clears the `token` cookie and returns a success message. Requires authentication.

Headers
```
Cookie: token=<jwt>
OR
Authorization: Bearer <jwt>
```

Success (200 OK)
```json
{ "message": "Logout successfully" }
```

Errors
- 401 Unauthorized — missing/invalid/blacklisted token
- 500 Internal Server Error

Notes
- The token provided (cookie or Authorization header) is stored in a blacklist collection with TTL so it cannot be reused.
- The server clears the `token` cookie on logout; clients should also remove any locally stored token.

Example
```bash
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <your_jwt>"
```
- Logout User (GET /users/logout)
- Environment & Running

---

## User Registration

### POST /users/register
Registers a new user, hashes the password, returns user object and JWT.

Request Body (application/json)
```json
{
  "fullname": {
    "firstname": "string", // required, min 3 chars
    "lastname": "string"   // optional, if provided min 3 chars
  },
  "email": "string",       // required, valid email, min 5 chars
  "password": "string"     // required, min 6 chars
}
```

Success (201 Created)
```json
{
  "user": { /* user object without password */ },
  "token": "jwt"
}
```

Errors
- 400 Bad Request — validation errors or user exists
- 500 Internal Server Error

Notes
- Passwords hashed with bcrypt (saltRounds = 10)
- JWT expires in 24 hours
- Email unique
- Password excluded from queries by default (select: false)

Example
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"securepassword"}'
```

---

## User Login

### POST /users/login
Authenticate user, returns user and JWT. Controller selects password (+password) and compares.

Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

Success (200 OK)
```json
{
  "user": { /* user object */ },
  "token": "jwt"
}
```

Errors
- 400 Bad Request — validation errors
- 401 Unauthorized — invalid credentials
- 500 Internal Server Error

Notes
- Token also sent as cookie: `token`
- JWT expiry: 24 hours

Example
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepassword"}'
```

---

## Get User Profile

### GET /users/profile
Returns authenticated user's profile. Requires valid JWT via cookie (`token`) or Authorization header `Bearer <token>`.

Headers
```
Cookie: token=<jwt>
OR
Authorization: Bearer <jwt>
```

Success (200 OK)
```json
{
  "_id": "string",
  "fullname": {"firstname":"string","lastname":"string"},
  "email": "string",
  "socketId": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

Errors
- 401 Unauthorized — no token, invalid token, or blacklisted token

Example
```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <your_jwt>"
```

---

## Logout User

### GET /users/logout
Clears `token` cookie and blacklists the provided token (stored with 24h TTL) so it cannot be reused. Requires valid JWT (cookie or Authorization header).

Headers
```
Cookie: token=<jwt>
OR
Authorization: Bearer <jwt>
```

Success (200 OK)
```json
{ "message": "Logged out" }
```

Errors
- 401 Unauthorized — no token, invalid token, or already blacklisted

Notes
- Blacklisted tokens stored in TTL collection (expires after 24 hours)
- Clients should also clear any locally stored token

Example
```bash
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <your_jwt>"
```

---

## Environment Setup

Create a `.env` with:
```
PORT=4000
DB_CONNECT=mongodb://0.0.0.0/olaberdb
JWT_SECRET=your_jwt_secret_here
```

## Running the Server
```bash
npm install
node server.js
```

Server defaults to port 4000 (or value in .env).

---