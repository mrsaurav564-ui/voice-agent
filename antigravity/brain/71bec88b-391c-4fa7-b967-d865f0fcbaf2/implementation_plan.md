# Fix Signup Internal Server Error

## Problem Description

The signup endpoint `/api/auth/signup` is throwing an internal server error (HTTP 500). Based on investigation:

1. The signup form at [signup.html](file:///d:/quiz/public/signup.html) is correctly sending POST requests
2. The [auth.js](file:///d:/quiz/routes/auth.js) route has proper error handling
3. The error is being caught and logged but not visible in the terminal
4. Likely causes:
   - Missing or invalid `JWT_SECRET` in `.env` file
   - Database connection issues (wrong credentials or database doesn't exist)
   - PostgreSQL server not running

## User Review Required

> [!IMPORTANT]
> Please verify the following before proceeding:
> 1. Is PostgreSQL running on your system?
> 2. Does the database `quiz_db` exist?
> 3. Have you run the [schema.sql](file:///d:/quiz/database/schema.sql) file to create the tables?
> 4. Is your `.env` file properly configured with database credentials and JWT_SECRET?

## Proposed Changes

### [MODIFY] [auth.js](file:///d:/quiz/routes/auth.js)

Add more detailed error logging to identify the exact issue:
- Log the specific error details (not just generic message)
- Log environment variable presence (without exposing values)
- Add database connection check before queries

### [NEW] [setup-check.js](file:///d:/quiz/setup-check.js)

Create a diagnostic script to validate:
- Environment variables are set
- Database connection works
- Required tables exist
- JWT can be generated

### [NEW] [.env-template](file:///d:/quiz/.env-template)

Create an alternative template file with clearer instructions for users who may have misconfigured `.env`.

## Verification Plan

### Automated Tests
1. Run `node setup-check.js` to diagnose configuration issues
2. Test database connectivity independently
3. Verify JWT generation works
4. Test signup endpoint with detailed logging

### Manual Verification
Once the diagnostic script identifies the issue, I'll guide you through fixing:
- PostgreSQL setup if database isn't running
- Creating the database if it doesn't exist
- Running migration scripts
- Configuring `.env` properly
