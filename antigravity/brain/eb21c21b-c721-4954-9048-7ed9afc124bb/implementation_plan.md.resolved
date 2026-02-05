# Implementation Plan - School Management Ecosystem

## Goal Description
Build a comprehensive School Management System with three interfaces: Public (Guest), Student/Parent (User), and Admin (Backend). The system will use a Next.js frontend and a Node.js/Express backend with a PostgreSQL database.

## Architecture
- **Frontend**: Next.js (React) with Tailwind CSS. Color Palette: Black, Blue, White ratio.
- **Backend**: Node.js with Express.
- **Database**: PostgreSQL.
- **Authentication**: Custom JWT implementation.
- **Structure**: Monorepo-style with `client/` and `server/` directories within the root `c:/school`.

## Proposed Changes

### Project Structure
- Create `client` directory for Next.js.
- Create `server` directory for Express.

### Backend (Server)
#### [NEW] server/package.json
- Dependencies: `express`, `pg` (or `prisma`/`sequelize`), `jsonwebtoken`, `bcrypt`, `cors`, `dotenv`.
#### [NEW] server/src/app.js (or index.js)
- Entry point for the Express server.
#### [NEW] server/src/routes/*.js
- API routes for Auth (Implemented), Students, Attendance, Results.
#### [NEW] server/src/models/*.js
- Database models/schema definitions.
#### [NEW] server/src/middleware/auth.js
- JWT verification middleware.

### Frontend (Client)
#### [NEW] client/package.json
- Standard Next.js dependencies + `axios` (or `fetch`), `lucide-react` (icons), `chart.js` or `recharts` (charts).
#### [NEW] client/src/app/page.tsx
- Public Landing Page.
#### [NEW] client/src/app/dashboard/student/page.tsx
- Student Dashboard.
#### [NEW] client/src/app/admin/page.tsx
- Admin Dashboard.
#### [NEW] client/src/components/*
- Reusable UI components (Cards, Tables, Charts).

## Verification Plan
### Automated Tests
- Verify backend API endpoints using manual testing or a script.
- Build the frontend and check for errors.
### Manual Verification
- **Public**: Check landing page responsiveness and "Apply Now" wizard.
- **Student**: Login, view timetable, fees on dashboard.
- **Admin**: Login, view student list, charts.
