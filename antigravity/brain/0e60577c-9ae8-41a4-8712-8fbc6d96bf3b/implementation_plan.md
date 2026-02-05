# Implementation Plan - GenZ Quiz App

## Goal Description
Build a fully feature-rich, fullstack quiz application with Admin and Student portals.
Key features include multiplayer capabilities, AI assistance (Gemini), realtime chat, and a "Gen Z" glassy aesthetic.

## User Review Required
> [!IMPORTANT]
> **Tech Stack Selection**:
> - Framework: Next.js 14+ (App Router)
> - Language: TypeScript
> - Database: SQLite (via Prisma) for ease of local dev/deployment, upgradeable to Postgres.
> - Realtime: Socket.io with a custom server wrapper (or separate server) is required for true multiplayer/chat. *Self-hosting restrictions might apply on serverless platforms like Vercel.*
> - Auth: NextAuth.js

## Proposed Changes

### Architecture
- **Frontend**: Next.js App Router.
- **Backend**: Next.js Server Actions + API Routes. Custom server for WebSockets.
- **Data**: Prisma ORM.

### Project Structure (New)
- `c:/quiz`
    - `app/` (Next.js App Router)
        - `(auth)/` - Auth pages
        - `(admin)/` - Admin portal routes
        - `(student)/` - Student portal routes
        - `api/` - API endpoints
    - `components/` - Reusable UI
    - `lib/` - Utils, DB interface
    - `prisma/` - Schema and migrations

### Core Features to Implement

#### 1. Setup & Design
- Initialize `next-app`
- Install `tailwindcss`, `framer-motion` (for animations), `lucide-react` (icons).
- Define "Glassmorphism" utility classes in `globals.css`.

#### 2. Database Schema (Prisma)
- **User**: (id, username, password, role: ADMIN/STUDENT)
- **Quiz**: (id, title, description, timeLimit, rounds)
- **Round**: (id, quizId, type, questions)
- **Question**: (id, roundId, content, options, answer)
- **Result**: (id, userId, quizId, score, answers)
- **Message**: (id, content, senderId, createdAt) -> for Chat

#### 3. Authentication
- Use `next-auth` with Credentials provider.
- Admin: Hardcoded or seeded in DB.
- Student: Signup API.

#### 4. Game Logic
- **Singleplayer**: State management in React.
- **Multiplayer**: Socket.io "rooms".

#### 5. AI Assistant
- Integration with Google Gemini API for "Explain this" button on questions.

## Verification Plan

### Automated Tests
- `npm run build` to verify type safety.
- `npx prisma validate` for schema.

### Manual Verification
- **Admin**: Create a quiz, add rounds, publish.
- **Student**: Sign up, see quiz, play (Single/Multi), check results.
- **Chat**: Verify messages appear in real-time.
