# GenZ Quiz App - Walkthrough

## Overview
A fully functional, glassmorphism-styled quiz application built with Next.js 14+, Prisma, and Tailwind CSS.
Features include separate Admin/Student portals, real-time chat, AI assistance, and a multiplayer-ready architecture.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Database:** SQLite (Dev) / Prisma ORM
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Auth:** NextAuth.js
- **Real-time:** Socket.io (Custom Server)

## Key Features

### 1. Authentication
- **Admin**: Login with `admin` / `adminpassword` (seeded).
- **Student**: Sign up with username/password.
- **Security**: Protected routes and API endpoints.

### 2. Admin Portal
- **Dashboard**: Overview of system stats (file://src/app/(admin)/admin/page.tsx).
- **Quiz Management**: Create quizzes, rounds, and add/delete questions via the **Question Bank** UI.
- **AI Question Generator**: Auto-generate options for questions using simulated AI (Gemini integration ready).
- **Score Review**: Detailed list of student results (file://src/app/(admin)/admin/scores/page.tsx).
- **Announcements**: Post broadcast messages to all students (file://src/app/(admin)/admin/announcements/page.tsx).
- **Glassy UI**: Modern, responsive sidebar via `AdminLayout`.

### 3. Student Portal
- **Dashboard**: Join games, see trending quizzes (file://src/app/(student)/dashboard/page.tsx).
- **Interactive Gameplay**:
    - Real-time timer and scoring.
    - Confetti animations for correct answers.
    - "Explain This" AI button using Gemini integration.
- **Global Chat**: Real-time chat accessible on all pages via `ChatRoom` component.

### 4. Gameplay Engine
- **Single Player**: Linear question flow with immediate feedback.
- **Results**: Scores saved to database and viewable in Profile.

## How to Run
1. **Install Dependencies**: `npm install`
2. **Setup DB**: `npx prisma db push` & `npx prisma db seed`
3. **Run Server**: `npm run dev` (Runs custom `server.ts` for WebSockets)
4. **Access**: `http://localhost:3000`

## Screenshots & Design
The app features a deep "Gen Z" dark interface with:
- `bg-slate-900` base with `violet/pink` gradients.
- `backdrop-blur-xl` panels for the glassy effect.
- Smooth page transitions and button interaction states.

## Future Improvements
- [ ] Connect Gemini API Key in `.env` for real AI responses.
- [ ] fully sync multiplayer game state via Socket.io events.
