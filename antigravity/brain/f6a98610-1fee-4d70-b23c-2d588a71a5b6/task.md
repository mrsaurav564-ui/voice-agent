# Tasks

- [x] Analyze file `src/lib/prisma.ts` and `package.json`
- [x] Fix Prisma Client Generation
    - [x] Diagnose `DATABASE_URL` environment issue (Confirmed working with Prisma 5)
    - [x] Verify Prisma version (Downgraded to 5.22.0)
    - [x] Run `npx prisma generate` successfully
- [x] Verify fix

# Menu System Implementation
- [ ] Database & Config
    - [x] Update `schema.prisma` with `Category` and `MenuItem` models
    - [x] Update `package.json` with seed script
    - [x] Run migration and seed
- [ ] API Routes
    - [x] Create `api/categories/route.ts`
    - [x] Create `api/menu/route.ts`
- [x] Frontend
    - [x] Update `MenuManager` component

# SQLite Reversion
- [ ] Configuration
    - [x] Revert `schema.prisma` to sqlite
    - [x] Revert `.env` to file path
- [ ] Database Setup
    - [x] Clean up migrations
    - [x] Run `prisma migrate dev`
    - [x] Run `prisma db seed`

# Bugchecking
- [x] Fix Login 500 Error (Cookie handling)
- [x] Fix Dashboard Crash (Missing `useState` import)

# Deployment
- [x] Prepare GitHub Repository

# Cloud Migration (Netlify Support)
- [x] Dependencies
    - [x] Install `cloudinary`
- [x] Database
    - [x] Update `schema.prisma` to PostgreSQL
- [x] Image Storage
    - [x] Create `src/lib/cloudinary.ts`
    - [x] Update `src/app/api/menu/route.ts` to use Cloudinary
    - [x] Install `tailwindcss-animate`

- [x] Restart Server & Verify
- [x] Fix Missing Images
    - [x] Verify `public` directory content
    - [x] Update `src/lib/data.ts` or generate placeholders

# Redesign & Fix Order Flow
- [ ] Backend (Functional Fix)
    - [x] Migrate `src/app/api/orders/route.ts` to Prisma
    - [x] Migrate `src/app/api/requests/route.ts` to Prisma
    - [x] Migrate `src/app/api/reviews/route.ts` to Prisma
- [ ] Frontend (Design Overhaul)
    - [x] Redesign `src/app/page.tsx`
    - [x] Improve `src/app/globals.css`
- [x] Verify functionality and design

# Notification System
- [x] Store & Logic
    - [x] Update `useCartStore` to track `myOrderIds` (persist logic)
    - [x] Create `OrderTracker` component for polling
- [x] UI Components
    - [x] Install/Verify `toast` component
    - [x] Add `Toaster` to `layout.tsx`
- [x] Integration
    - [x] Update `CartSheet` to save order ID on success
    - [x] Verify notifications on status change

# Admin Access
- [x] Add Footer Link to `/login`

# Production Debugging
- [x] Fix Dashboard Tabs Crash
    - [x] Check `SalesSummary` & `api/stats`
- [x] Check `MenuManager` & `api/menu`
- [x] Create `/api/debug-db` to diagnose 500 errors
- [x] Verify Remote Database Content

# Frontend Data Sync
- [ ] Connect Homepage to API
    - [ ] Fetch Categories from `/api/categories` in `page.tsx`
    - [x] Fetch Menu Items from `/api/menu` in `page.tsx`
    - [x] Remove hardcoded data usage
    - [x] Fix Build Errors (Missing Imports)
    - [x] Configure `next.config.ts` for Image Domains (`unsplash`, `cloudinary`, `plus.unsplash`)

# Image Upload
- [x] Backend
    - [x] Update `src/app/api/menu/route.ts` to handle `FormData` and file saving
    - [x] Create `public/uploads` directory
- [x] Frontend
    - [x] Update `MenuManager` to support file input
    - [x] Switch submission to `FormData`
- [x] Verification
    - [x] Test adding item with image

# Dashboard Security (Auth)
- [x] Setup
    - [x] Create `middleware.ts` for route protection
    - [x] Add env vars `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- [x] Login Flow
    - [x] Create `src/app/login/page.tsx`
    - [x] Create `src/app/api/login/route.ts`
    - [x] Add Logout button to dashboard

# Sales Analytics
- [x] API
    - [x] Create `src/app/api/stats/route.ts` for aggregations
- [x] UI
    - [x] Create `src/components/sales-summary.tsx`
    - [x] Integrate into Dashboard
