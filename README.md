# Task Tracker – MERN Stack App

A full-stack Task Tracker web application built using MongoDB, Express, React, and Node.js.

## Live Links
- **Frontend (Live App):** https://task-tracker-nu-self.vercel.app
- **Backend (API):** https://task-tracker-jmoa.onrender.com

## Features
- Create, View, Update & Delete Tasks (CRUD)
- Form validation
- REST APIs
- MongoDB integration
- Responsive UI
- Dynamic updates without page refresh

## Tech Stack
- Frontend: React.js (Vite), Axios
- Backend: Node.js, Express.js
- Database: MongoDB Atlas

## Note
The backend is hosted on Render's free tier, which spins down after inactivity. The first request after inactivity may take 30-50 seconds to respond.

## Local Setup
1. Clone the repository
2. Backend: `cd backend && npm install && npm start`
3. Frontend: `cd frontend && npm install && npm run dev`
4. Add a `.env` file in backend with `MONGO_URI` and `PORT`
