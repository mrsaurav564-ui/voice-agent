# Implementation Plan - Cafe Ordering System

## Goal Description
Build a responsive, full-stack website for a cafe/restaurant that allows customers to browse the menu, place orders, request waiter service, and view their bill. The system will provide real-time notifications to staff/owners about new orders and service requests. It will support English/Nepali languages and Dark/Light themes.

## User Review Required
> [!IMPORTANT]
> **Tech Stack Selection**: I am proposing **Next.js** (App Router) for the full-stack framework due to its strong SSR support and API capabilities. For the database, I recommend **SQLite (via Prism)** for simplicity in this local setup, or **Supabase/PostgreSQL** if you prefer a cloud DB. For real-time updates, I will use **Socket.io** with a custom Express server or a robust polling mechanism if strictly serverless. *Please confirm if you have a specific preference.*

## Proposed Changes

### Project Structure
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Shadcn UI (for accessible, premium components) + Framer Motion (for animations)
- **Language**: TypeScript
- **State Management**: Zustand (for cart/app state)
- **Database**: Prisma ORM with SQLite (local file-based, easy to deploy later)

### Core Features

#### 1. Setup & Configuration
- Initialize Next.js app.
- Setup Tailwind with a custom "Foody" theme (warm colors, inviting typography).
- Configure `next-intl` or similar for English/Nepali localization.
- Configure `next-themes` for Dark/Light mode.

#### 2. Database Schema (Prisma)
- **Category**: ID, Name (EN/NP)
- **MenuItem**: ID, Name (EN/NP), Description, Price, Image, CategoryID
- **Order**: ID, TableNumber, Status (Pending, Served, Paid), TotalAmount, Items (Json or Relation), CreatedAt
- **ServiceRequest**: ID, TableNumber, Type (Water, Bill, Call), Status
- **Review**: ID, CustomerName, Rating, Comment, CreatedAt

#### 3. Customer Interface
- **Menu Page**: dynamic grid of items with images. Filter by category.
- **Item Detail**: Modal or page to select quantity/variants.
- **Cart/Floating Action Button**: Shows current total.
- **Service Bar**: Sticky bar/buttons to "Call Waiter", "Request Bill".
- **Review Form**: Simple star rating and text input.

#### 4. Staff/Owner Interface
- **Dashboard**: a live updating board.
- **Order Cards**: Show table number, items, time elapsed.
- **Notifications**: Sound/Visual alert when new order arrives.

### Real-time Implementation
- Using a custom server with Socket.io is the most robust way for "instant" notifications.
- *Alternative*: If we want to keep it simple without a custom server, we can use SWR/TanStack Query with frequent polling (e.g., every 5s). **I will proceed with Polling for simplicity unless requested otherwise**, as it simplifies deployment (no need for separate websocket server).

## Verification Plan

### Automated Tests
- Not planning extensive unit tests for this prototype phase, but will verify API endpoints.

### Manual Verification
- **Customer Flow**: Open app on mobile view -> Add items -> Place Order -> Check Total -> Request Bill.
- **Staff Flow**: Open Dashboard on desktop view -> Verify order appears -> Change status to "Served".
- **Responsiveness**: Check on simulated iPhone, iPad, and Desktop sizes.
- **Theme/Lang**: Toggle between Light/Dark and EN/NP to ensure all text/colors update.
