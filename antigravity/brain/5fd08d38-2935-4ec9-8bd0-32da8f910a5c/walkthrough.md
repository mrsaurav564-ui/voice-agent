# Server Setup and Login Data Storage

I have set up a Node.js server to serve the login pages and handle login data storage.

## Changes

### Server Implementation
- **[server.js](file:///d:/xampp/htdocs/Hackathon/backend/server.js)**: Express server running on port 3000.
    - Serves static files from the backend directory.
    - Routes `/citizen`, `/federal`, `/province`, `/local` to their respective HTML files.
    - API endpoint `/api/login` accepts POST requests and saves data to `login_data.json`.

### Frontend Updates
- Updated `loginc.html`, `logins.html`, `loginp.html`, and `loginl.html` to send a POST request to `/api/login` when the user logs in with credentials.

## Verification Results

### Automated Verification
- **Server Start**: Server starts successfully on port 3000.
- **API Test**: Sent a test POST request to `/api/login`.
- **Data Storage**: Verified that `login_data.json` was created and contained the test data.

```json
[
  {
    "password": "test_pass",
    "identifier": "test_user",
    "role": "citizen",
    "timestamp": "2025-11-20T18:41:13.757Z"
  }
]
```

## How to Run
1.  Open a terminal in `d:\xampp\htdocs\Hackathon\backend`.
2.  Run `node server.js`.
3.  Access the pages at:
    - `http://localhost:3000/citizen`
    - `http://localhost:3000/federal`
    - `http://localhost:3000/province`
    - `http://localhost:3000/local`
