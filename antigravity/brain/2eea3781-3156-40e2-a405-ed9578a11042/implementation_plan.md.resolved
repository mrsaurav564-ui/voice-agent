# Implementation Plan: Amarsingh Secondary School Website

## Goal
Build a professional, minimalistic, and sophisticated full-stack website for Amarsingh Secondary School with a public hero page and role-based portals for Admin, School Staff, and Students.

## User Review Required
> [!IMPORTANT]
> - **Database**: The plan assumes PostgreSQL. Ensure a PostgreSQL instance is available (local or cloud).
> - **Auth**: NextAuth.js (v5) will be used with Credentials provider.

## Proposed Changes

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI (Radix Primitives)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js (Credentials)

### Architecture
- `app/(public)`: Public facing pages (Hero, About, etc.)
- `app/(auth)`: Login pages.
- `app/(dashboard)`: Protected routes for Admin, School, Student.

### Database Schema (Overview)
- **Users**: Admin, School Staff, Students.
- **Roles**: `SUPER_ADMIN`, `SCHOOL_STAFF`, `STUDENT`.
- **School Staff Types**: `HEAD_TEACHER`, `SECTION_INCHARGE`, `TEACHER`, `ACCOUNTANT`, `LIBRARIAN`.
- **Academics**: `Class`, `Section`, `Subject`, `Exam`, `Result`.
- **Finance**: `FeeStructure`, `Invoice`, `Payment`.
- **Inventory**: `Item`, `Category`, `Transaction`.

### [Frontend]
#### [NEW] [Layouts & Components](file:///c:/school/app)
- `app/layout.tsx`: Root layout with providers.
- `components/ui`: Shadcn components.
- `components/dashboard`: Dashboard shell (Sidebar, Header).
- `app/(public)/page.tsx`: Hero page inspired by reference.

### [Backend]
#### [NEW] [API Actions](file:///c:/school/lib/actions)
- `server actions` for mutations (Create Student, Add Notice, etc.).
- `Prisma Client` singleton.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure type safety.
- Use `browser` tool to verify navigation and dashboard access.

### Manual Verification
1. **Public Site**: Check responsiveness and aesthetics.
2. **Admin Login**: Verify super admin access.
3. **School Login**:
    - Create a Student.
    - Create a Notice.
    - Check RBAC (e.g., Accountant sees Fees, Teacher sees Marks).
4. **Student Login**:
    - Register/First Login.
    - View Result/Fees.
