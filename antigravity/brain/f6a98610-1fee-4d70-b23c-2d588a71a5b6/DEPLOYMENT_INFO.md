# Deployment Configuration

## Environment Variables
Copy these values to your new hosting provider (Vercel, Railway, etc.).

**Database (Neon.tech)**
- `DATABASE_URL`: `postgresql://neondb_owner:npg_r2VX8nzWgGLP@ep-little-bird-ahx21n7z-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
  *(Note: Do NOT include quotes `"` if your host provides a form field)*

**Image Storage (Cloudinary)**
- `CLOUDINARY_CLOUD_NAME`: `doi4c08zs`
- `CLOUDINARY_API_KEY`: `371235542785278`
- `CLOUDINARY_API_SECRET`: `Ad7M84yKktkxubHqpU1QLIX5nc0`

**Admin Access (Dashboard)**
- `ADMIN_USERNAME`: `admin`
- `ADMIN_PASSWORD`: `cafe123`

## Post-Deployment Steps
1. **Seed the Database**: Visit `https://your-new-domain.com/api/seed-remote` to fix categories and images.
