# Node.js Server and JSON Storage

The goal is to serve the application on localhost:3000 and save login data to a JSON file.

## User Review Required

> [!IMPORTANT]
> I will be creating a Node.js server (`server.js`) and installing dependencies (`express`, `body-parser`, `cors`).
> I will modify the HTML files to send login data to this server instead of just showing a toast.
> **Please ensure you have Node.js installed.**

## Proposed Changes

### Backend Directory

#### [NEW] [package.json](file:///d:/xampp/htdocs/Hackathon/backend/package.json)
- Initialize project dependencies.

#### [NEW] [server.js](file:///d:/xampp/htdocs/Hackathon/backend/server.js)
- Express server running on port 3000.
- Routes:
    - `/` -> `index.html`
    - `/citizen` -> `loginc.html`
    - `/federal` -> `logins.html` (assuming 's' for State/Federal)
    - `/province` -> `loginp.html`
    - `/local` -> `loginl.html`
- API:
    - `POST /api/login` -> Saves data to `login_data.json`.

#### [MODIFY] [loginc.html](file:///d:/xampp/htdocs/Hackathon/backend/loginc.html)
- Update `loginWithCredentials` to POST to `/api/login`.

#### [MODIFY] [logins.html](file:///d:/xampp/htdocs/Hackathon/backend/logins.html)
- Update `loginWithCredentials` to POST to `/api/login`.

#### [MODIFY] [loginp.html](file:///d:/xampp/htdocs/Hackathon/backend/loginp.html)
- Update `loginWithCredentials` to POST to `/api/login`.

#### [MODIFY] [loginl.html](file:///d:/xampp/htdocs/Hackathon/backend/loginl.html)
- Update `loginWithCredentials` to POST to `/api/login`.

## Verification Plan

### Automated Tests
- Run `node server.js`.
- Send a POST request to `http://localhost:3000/api/login` and check if `login_data.json` is created/updated.

### Manual Verification
- Open `http://localhost:3000/citizen` in browser.
- Try to login.
- Check `login_data.json` for the new entry.
