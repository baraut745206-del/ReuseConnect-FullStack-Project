# ReuseConnect — Donation & Reuse Platform

A responsive full-stack web application for donating unused clothes and household items to verified NGOs/beneficiaries.

## Stack
- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs
- Security: Helmet, rate limiting, validation
- UI: Custom responsive CSS (no heavy UI framework)

## Implemented requirements
- Donor registration/login and profile
- NGO/beneficiary registration and verification
- Donation listing for clothes/household items
- NGO discovery/search
- NGO selection
- Doorstep pickup scheduling
- Donation status tracking
- Donation history
- NGO dashboard: accept/reject/update requests
- Admin dashboard: verify NGOs, manage donations, categories and reports
- Notifications
- KPI cards
- Responsive/mobile-friendly interface
- REST APIs
- MongoDB indexes and paginated donation listing
- Future-ready matching/scheduling service structure

## Run locally

### 1. Backend
```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

On macOS/Linux use:
```bash
cp .env.example .env
```

### 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173).

### Demo accounts after seeding
- Admin: admin@reuseconnect.local / Admin@123
- NGO: ngo@reuseconnect.local / Ngo@123
- Donor: donor@reuseconnect.local / Donor@123

## MongoDB
The default backend connection is:
mongodb://127.0.0.1:27017/reuseconnect

Make sure MongoDB is running before starting the backend.

## Important
This is a complete internship-ready MVP. Before production deployment, replace demo credentials, use a managed MongoDB connection string, configure HTTPS, email/SMS provider, real Maps API and production secrets.
