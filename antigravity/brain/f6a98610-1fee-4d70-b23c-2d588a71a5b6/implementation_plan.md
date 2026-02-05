# Cloud Migration Plan (Netlify Ready)

To make the application deployable on Netlify, we must replace the local components with cloud services.

## 1. Database Migration (SQLite -> PostgreSQL)
Netlify cannot host a persistent SQLite file. We will switch to PostgreSQL, the industry standard for Next.js apps.

### Changes
- **[MODIFY] [prisma/schema.prisma](file:///c:/cafe/prisma/schema.prisma)**: Change provider from `sqlite` to `postgresql`.
- **[MODIFY] [.env](file:///c:/cafe/.env)**: Update `DATABASE_URL` format.
- **Action Required**: You will need a free PostgreSQL database (recommended: **Neon.tech** or **Supabase**).

## 2. Image Storage (Local -> Cloudinary)
Netlify cannot store uploaded files permanently. We will use **Cloudinary** (free tier) for image hosting.

### Changes
- **[NEW] [src/lib/cloudinary.ts](file:///c:/cafe/src/lib/cloudinary.ts)**: Config for Cloudinary SDK.
- **[MODIFY] [src/app/api/menu/route.ts](file:///c:/cafe/src/app/api/menu/route.ts)**:
    - Remove filesystem code (`fs/promises`).
    - Add Cloudinary upload stream logic.
    - Save the returned *secure_url* to the database.
- **Action Required**: You will need a free **Cloudinary** account and API keys (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

## 3. Deployment Steps
Once the code is updated:
1.  Push changes to GitHub.
2.  In Netlify Site Settings -> **Environment Variables**:
    - Add `DATABASE_URL` (from Neon/Supabase)
    - Add `CLOUDINARY_...` keys
    - Add `ADMIN_USERNAME` / `ADMIN_PASSWORD`
3.  Redeploy.

## Verification
- We will verify the build locally.
- *Note*: You cannot run the app locally after this change without the real API keys.
