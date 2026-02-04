# 🚗 Olaber - Ride Sharing Application

A full-stack ride-sharing application similar to Uber/Ola built with React, Node.js, Express, MongoDB, and Socket.IO for real-time communication.

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-19+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7+-green.svg)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4+-black.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Frontend Routes](#-frontend-routes)
- [Socket Events](#-socket-events)
- [Screenshots](#-screenshots)

## ✨ Features

### For Users
- 🔐 User Registration & Login
- 📍 Live location tracking with OpenStreetMap (Leaflet)
- 🔍 Search for pickup and destination locations
- 🚗 Multiple vehicle options (Car, Motorcycle, Auto)
- 💰 Real-time fare calculation
- 📱 Real-time ride status updates
- 🔔 OTP verification for ride start

### For Captains (Drivers)
- 🔐 Captain Registration & Login
- 📍 Live location sharing
- 🔔 Real-time ride requests
- ✅ Accept/Reject ride requests
- 📊 Ride management dashboard
- 🏁 Complete ride functionality

## 🛠 Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **React-Leaflet** - Map Integration (OpenStreetMap)
- **Socket.IO Client** - Real-time Communication
- **Axios** - HTTP Client
- **GSAP** - Animations
- **Remix Icon** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - Real-time Communication
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Express Validator** - Input Validation

## 📁 Project Structure

```
Olaber/
├── Backend/
│   ├── controllers/
│   │   ├── captain.controller.js
│   │   ├── map.controller.js
│   │   ├── ride.controller.js
│   │   └── user.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── blacklistToken.model.js
│   │   ├── captain.model.js
│   │   ├── ride.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── captain.routes.js
│   │   ├── maps.routes.js
│   │   ├── ride.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── captain.service.js
│   │   ├── maps.service.js
│   │   ├── ride.service.js
│   │   └── user.service.js
│   ├── app.js
│   ├── server.js
│   ├── socket.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CaptainDetails.jsx
│   │   │   ├── ConfirmRide.jsx
│   │   │   ├── ConfirmRidePopUp.jsx
│   │   │   ├── FinishRide.jsx
│   │   │   ├── LiveTracking.jsx
│   │   │   ├── LocationSearchPanel.jsx
│   │   │   ├── LookingForDriver.jsx
│   │   │   ├── RidePopUp.jsx
│   │   │   ├── VehiclePanel.jsx
│   │   │   └── WaitingForDriver.jsx
│   │   ├── context/
│   │   │   ├── CaptainContext.jsx
│   │   │   ├── SocketContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── pages/
│   │   │   ├── CaptainHome.jsx
│   │   │   ├── Captainlogin.jsx
│   │   │   ├── CaptainLogout.jsx
│   │   │   ├── CaptainProtectWrapper.jsx
│   │   │   ├── CaptainRiding.jsx
│   │   │   ├── Captainsignup.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Riding.jsx
│   │   │   ├── Start.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   ├── UserLogout.jsx
│   │   │   ├── userProtectWrapper.jsx
│   │   │   └── UserSignup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (v7+)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/yourusername/olaber.git
cd olaber
```

### Install Backend Dependencies
```bash
cd Backend
npm install
```

### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## ⚙️ Environment Setup

### Backend (.env)
Create a `.env` file in the `Backend/` directory:
```env
PORT=4000
DB_CONNECT=mongodb://localhost:27017/olaberdb
JWT_SECRET=your_secure_jwt_secret_here
GOOGLE_MAPS_API=your_google_maps_api_key_here
```

### Frontend (.env)
Create a `.env` file in the `frontend/` directory:
```env
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> **Note:** The frontend uses **React-Leaflet with OpenStreetMap** for live tracking, which is free and doesn't require an API key. The Google Maps API is only needed for the backend services (geocoding, distance calculation, autocomplete).

### Getting a Google Maps API Key (Optional for full functionality)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the following APIs:
   - Geocoding API
   - Distance Matrix API
   - Places API
4. Create an API key and add it to your `.env` files

## 🏃 Running the Application

### Start MongoDB
```bash
mongod
```

### Start Backend Server
```bash
cd Backend
npm start
# or for development with nodemon
npm run dev
```
Server runs on `http://localhost:4000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📚 API Documentation

### User Endpoints

#### Register User
```http
POST /users/register
```
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /users/login
```
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Logout User
```http
GET /users/logout
Authorization: Bearer <token>
```

### Captain Endpoints

#### Register Captain
```http
POST /captains/register
```
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane@captain.com",
  "password": "secret123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Login Captain
```http
POST /captains/login
```
```json
{
  "email": "jane@captain.com",
  "password": "secret123"
}
```

#### Get Captain Profile
```http
GET /captains/profile
Authorization: Bearer <token>
```

#### Logout Captain
```http
GET /captains/logout
Authorization: Bearer <token>
```

### Ride Endpoints

#### Get Fare Estimate
```http
GET /rides/get-fare?pickup=<address>&destination=<address>
Authorization: Bearer <token>
```

#### Create Ride
```http
POST /rides/create
Authorization: Bearer <token>
```
```json
{
  "pickup": "123 Main Street",
  "destination": "456 Park Avenue",
  "vehicleType": "car"
}
```

#### Confirm Ride (Captain)
```http
POST /rides/confirm
Authorization: Bearer <token>
```
```json
{
  "rideId": "<ride_id>"
}
```

#### Start Ride (Captain)
```http
GET /rides/start-ride?rideId=<id>&otp=<otp>
Authorization: Bearer <token>
```

#### End Ride (Captain)
```http
POST /rides/end-ride
Authorization: Bearer <token>
```
```json
{
  "rideId": "<ride_id>"
}
```

### Map Endpoints

#### Get Coordinates
```http
GET /maps/get-coordinates?address=<address>
Authorization: Bearer <token>
```

#### Get Distance & Time
```http
GET /maps/get-distance-time?origin=<origin>&destination=<destination>
Authorization: Bearer <token>
```

#### Get Autocomplete Suggestions
```http
GET /maps/get-suggestions?input=<search_input>
Authorization: Bearer <token>
```

## 🛣 Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Start | Landing page |
| `/login` | UserLogin | User login page |
| `/signup` | UserSignup | User registration page |
| `/home` | Home | User home/booking page (Protected) |
| `/riding` | Riding | Active ride view for user (Protected) |
| `/users/logout` | UserLogout | User logout (Protected) |
| `/captain-login` | CaptainLogin | Captain login page |
| `/captain-signup` | CaptainSignup | Captain registration page |
| `/captain-home` | CaptainHome | Captain dashboard (Protected) |
| `/captain-riding` | CaptainRiding | Active ride view for captain (Protected) |
| `/captain/logout` | CaptainLogout | Captain logout (Protected) |

## 🔌 Socket Events

### Client to Server

| Event | Payload | Description |
|-------|---------|-------------|
| `join` | `{ userId, userType }` | Register user/captain socket connection |
| `update-location-captain` | `{ userId, location: { ltd, lng } }` | Update captain's location |

### Server to Client

| Event | Payload | Description |
|-------|---------|-------------|
| `new-ride` | `ride` | New ride request for captains |
| `ride-confirmed` | `ride` | Ride confirmed by captain |
| `ride-started` | `ride` | Ride has started |
| `ride-ended` | `ride` | Ride has ended |

## 🚗 Vehicle Types & Pricing

| Vehicle | Base Fare | Per KM | Per Minute | Capacity |
|---------|-----------|--------|------------|----------|
| Car | ₹50 | ₹15 | ₹3 | 4 |
| Motorcycle | ₹20 | ₹8 | ₹1.5 | 1 |
| Auto | ₹30 | ₹10 | ₹2 | 3 |

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Token blacklisting on logout
- Protected routes for authenticated users
- Input validation with express-validator

## 🗺️ Map Integration

The application uses two mapping solutions:

1. **Frontend (Live Tracking):** React-Leaflet with OpenStreetMap tiles - **FREE, no API key required**
2. **Backend (Geocoding, Distance, Autocomplete):** Google Maps API - **Requires API key**

> The app will work for live tracking without a Google Maps API key. The Google API is only needed for location search suggestions and fare calculation.


---

⭐ Star this repository if you find it helpful!
