# OAuth Setup Guide

## Overview
This guide explains how to set up Google and Facebook OAuth login for your Smart Nagarik application.

## Google OAuth Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**

### Step 2: Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Add authorized JavaScript origins:
   ```
   http://localhost
   ```
5. Add authorized redirect URIs:
   ```
   http://localhost/uplodedFile/index.html
   ```
6. Click **Create** and copy your **Client ID**

### Step 3: Update Code
Open [index.html](file:///c:/xampp2/htdocs/uplodedFile/index.html) and find line ~3869:
```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
```
Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID.

---

## Facebook OAuth Setup

### Step 1: Create Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Choose **Consumer** as app type
4. Enter app name and contact email
5. Click **Create App**

### Step 2: Add Facebook Login
1. In your app dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Choose **Web** platform
4. Enter your site URL:
   ```
   http://localhost/uplodedFile/
   ```

### Step 3: Configure OAuth Settings
1. Go to **Facebook Login** → **Settings**
2. Add Valid OAuth Redirect URIs:
   ```
   http://localhost/uplodedFile/index.html
   ```
3. Save changes

### Step 4: Get App ID
1. Go to **Settings** → **Basic**
2. Copy your **App ID**

### Step 5: Update Code
Open [index.html](file:///c:/xampp2/htdocs/uplodedFile/index.html) and find line ~3870:
```javascript
const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';
```
Replace `YOUR_FACEBOOK_APP_ID` with your actual App ID.

---

## Testing

### Test Registration
1. Open `http://localhost/uplodedFile/index.html`
2. Click "Login" button
3. Click "Sign up here"
4. Fill the form and submit
5. You should see a success overlay with green checkmark
6. After 3 seconds, redirects to `home.html`

### Test Google Login
1. Click "Login" button
2. Click the Google icon
3. Google Sign-In popup should appear
4. Select your Google account
5. Success overlay appears
6. Redirects to dashboard

### Test Facebook Login
1. Click "Login" button
2. Click the Facebook icon
3. Facebook Login dialog appears
4. Authorize the app
5. Success overlay appears
6. Redirects to dashboard

---

## Troubleshooting

### Google Sign-In not working
- Check that Client ID is correct
- Verify authorized origins include `http://localhost`
- Check browser console for errors
- Make sure Google SDK loaded (check Network tab)

### Facebook Login not working
- Check that App ID is correct
- Verify app is not in Development Mode (or add test users)
- Check Valid OAuth Redirect URIs
- Ensure email permission is requested

### Database errors
- Verify MySQL is running
- Check database name is `user_management`
- Ensure tables `users` and `user_profiles` exist
- Check PHP error logs

---

## Production Deployment

When deploying to production:

1. **Update OAuth origins/redirects** to your production domain
2. **Use HTTPS** (required by both Google and Facebook)
3. **Secure your API keys** (use environment variables)
4. **Enable proper token verification** in PHP files
5. **Set Facebook app to Live mode**

---

## Current Status

✅ Success overlay implemented with styled message  
✅ Registration redirects to dashboard after 3 seconds  
✅ Google OAuth backend created (`api/google-login.php`)  
✅ Facebook OAuth backend created (`api/facebook-login.php`)  
✅ OAuth SDKs loaded in HTML  
✅ JavaScript OAuth handlers implemented  

⚠️ **Action Required:** Add your Google Client ID and Facebook App ID to the code
