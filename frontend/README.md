# Olaber Frontend

This is the frontend application for the Olaber ride-sharing platform built with React, Vite, and Tailwind CSS.

For complete project documentation, please see the main [README.md](../README.md) in the root directory.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **React 19** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **React-Leaflet** - Map Integration (OpenStreetMap - FREE)
- **Socket.IO Client** - Real-time Communication
- **Axios** - HTTP Client
- **GSAP** - Animations
- **Remix Icon** - Icons

## Features

- User authentication (Login/Register)
- Captain authentication (Login/Register)
- Live location tracking with OpenStreetMap
- Ride booking with fare estimation
- Real-time ride updates via WebSocket
- Vehicle selection (Car, Motorcycle, Auto)
- OTP verification for ride start

## Note on Maps

This application uses **React-Leaflet with OpenStreetMap** for live tracking, which is completely free and requires no API key. The map will work out of the box!
