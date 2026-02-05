# Google Sign-In Implementation Plan

## Overview
Implement Google OAuth 2.0 Sign-In for the quiz login website using Google Identity Services (the latest Google Sign-In library).

## User Review Required

> [!IMPORTANT]
> **Google Client Credentials Required**
> You have a client secret JSON file. I'll need the **Client ID** from that file to complete the integration. The file structure should contain:
> - `client_id`: Your Google OAuth Client ID (looks like: `xxxxx.apps.googleusercontent.com`)
> - `project_id`: Your Google Cloud project ID
> 
> Please provide the Client ID, or I can create a configuration file where you can add it later.

> [!WARNING]
> **Client Secret Security**
> The client secret should **NEVER** be exposed in frontend JavaScript. We'll only use the Client ID in the browser. The client secret is only needed for server-side token validation (optional for this implementation).

## Proposed Changes

### Frontend Integration

#### [MODIFY] [index.html](file:///d:/quiz/index.html)
- Add Google Identity Services library script in `<head>`
- Add `data-client-id` attribute to Google sign-in button
- Ensure proper button structure for Google OAuth

#### [MODIFY] [script.js](file:///d:/quiz/script.js)
- Initialize Google Identity Services
- Implement `handleGoogleSignIn()` function to process OAuth callback
- Handle credential response and decode JWT token
- Extract user information (name, email, profile picture)
- Store user session (localStorage or sessionStorage)
- Redirect to dashboard on successful login
- Add error handling for failed authentication

#### [NEW] [config.js](file:///d:/quiz/config.js)
Create a configuration file to store:
- Google Client ID
- Redirect URIs
- OAuth scopes
- Other authentication settings

This allows easy credential management without modifying core code.

---

## Implementation Details

### 1. Google Identity Services Integration

**Library**: Google Identity Services (GIS) - the modern replacement for Google Sign-In Platform Library

**Features**:
- One Tap sign-in
- Automatic sign-in for returning users
- Personalized button
- Secure token-based authentication

### 2. Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Google
    participant YourApp

    User->>Browser: Click "Sign in with Google"
    Browser->>Google: Redirect to Google OAuth
    Google->>User: Show consent screen
    User->>Google: Grant permission
    Google->>Browser: Return credential (JWT)
    Browser->>YourApp: Process credential
    YourApp->>Browser: Decode JWT token
    Browser->>YourApp: Extract user info
    YourApp->>Browser: Store session
    Browser->>User: Redirect to dashboard
```

### 3. Code Changes

**index.html**:
- Add Google GSI script: `https://accounts.google.com/gsi/client`
- Initialize Google button with proper attributes

**script.js**:
- Initialize Google OAuth on page load
- Handle credential callback
- Decode JWT token to get user info
- Manage user session

**config.js** (new):
- Store Client ID securely
- Configure OAuth parameters

### 4. Security Considerations

- ✅ Client ID is safe to expose in frontend
- ✅ JWT tokens are signed by Google
- ✅ Token validation happens via Google's library
- ✅ HTTPS recommended for production
- ✅ CSRF protection built into Google OAuth flow

### 5. User Information Available

After successful sign-in, you'll have access to:
- User's full name
- Email address
- Profile picture URL
- Google ID (unique identifier)
- Email verification status

## Verification Plan

### Manual Testing
1. Open the website in a browser
2. Click "Sign in with Google" button
3. Verify Google consent screen appears
4. Grant permissions
5. Verify successful redirect back to website
6. Check browser console for user information
7. Verify user session is stored
8. Test sign-out functionality

### Browser Console Testing
- Check for any JavaScript errors
- Verify JWT token is received
- Confirm user data is properly decoded
- Validate session storage

### Cross-Browser Testing
- Test in Chrome, Firefox, Edge, Safari
- Test on mobile browsers
- Verify responsive design works with Google sign-in flow

## Next Steps

1. Provide your Google Client ID
2. I'll implement the integration
3. Test the sign-in flow
4. Add user dashboard (optional)
5. Implement sign-out functionality
