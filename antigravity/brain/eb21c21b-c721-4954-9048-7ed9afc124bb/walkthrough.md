# School Management Ecosystem - Walkthrough

## Overview
This project is a comprehensive School Management System with three distinct interfaces:
1.  **Public Guest Interface**: Landing page for enrollment.
2.  **Student/Parent Dashboard**: Tracking academic progress and fees.
3.  **Admin/Registrar Panel**: Managing students and analyzing school data.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### 1. Backend Setup
```bash
cd server
npm install
# Configure .env with your DB credentials
npm run start
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 📸 key Features

### Public Interface
- **Hero Section**: Modern "Glassmorphism" design with Indigo gradients.
- **Apply Wizard**: Interactive modal for new student applications.

### Student Dashboard
- **Overview**: Real-time stats on GPA, Attendance, and Fees.
- **Glass UI**: Translucent cards and sidebars for a premium feel.
- **Timetable**: Weekly class schedule grid.

### Admin Panel
- **Analytics**: Charts for enrollment trends and grade distribution.
- **Dark Mode Sidebar**: Sleek Zinc-950 sidebar for contrast.
- **Communication**: Tool for sending bulk Emails/SMS.

## Architecture
- **Frontend**: Next.js 15, Tailwind CSS (Glassmorphism), Recharts.
- **Backend**: Express.js, PostgreSQL.
