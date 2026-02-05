# Quiz Website Backend Implementation Plan

Implementing a fully functional PostgreSQL and Node.js backend for the quiz website with support for multiple quiz round types (General, Buzzer, Rapid Fire, Visual, Audio rounds) to replace the current mock data and localStorage-based implementation.

## User Review Required

> [!IMPORTANT]
> **Breaking Changes**: This implementation will transition from localStorage-based authentication to JWT token-based authentication. Users will need to re-register after deployment.

> [!IMPORTANT]
> **PostgreSQL Required**: You need to have PostgreSQL installed and running on your machine. If you don't have it installed, please let me know and I'll provide installation instructions.

> [!WARNING]
> **Environment Variables**: Sensitive credentials (database password, JWT secret, Google OAuth) will be stored in a `.env` file. This file must NOT be committed to version control.

## Proposed Changes

### Quiz Round Types Overview

This implementation supports **5 distinct quiz round types**, each with unique gameplay mechanics:

#### **1. General Round** (Standard Quiz)
- **Format**: Multiple choice questions, one at a time
- **Timing**: No strict time limit per question (optional timeout)
- **Scoring**: Fixed points per question (10-100 based on difficulty)
- **Player Count**: Solo or multiplayer
- **UI**: Standard question card with 4 options, next/submit buttons
- **Use Case**: Traditional quiz format, good for learning and practice

#### **2. Buzzer Round** (Competitive)
- **Format**: Question displayed to all players simultaneously
- **Timing**: First player to "buzz in" gets to answer
- **Scoring**: Correct answer = full points, wrong answer = points deducted, other players can answer
- **Player Count**: Multiplayer only (2-8 players)
- **UI**: Large buzzer button, player indicators showing who buzzed first, lockout mechanism
- **Features**:
  - Buzz-in window (3-5 seconds after question appears)
  - Lockout for incorrect answers
  - Steal opportunity for other players
  - Real-time player status indicators
- **Use Case**: Competitive quizzes, team events, live quiz competitions

#### **3. Rapid Fire Round** (Speed Challenge)
- **Format**: Quick succession of questions with countdown timer
- **Timing**: Strict time limit per question (5-15 seconds)
- **Scoring**: Bonus points for faster answers, combo multipliers for consecutive correct answers
- **Player Count**: Solo or multiplayer (race mode)
- **UI**: Prominent countdown timer, fast-paced transitions, score multiplier indicator
- **Features**:
  - Auto-submit when timer expires
  - Time bonus calculation (faster = more points)
  - Combo counter (2x, 3x, 5x for streaks)
  - Visual speed indicators
- **Use Case**: High-energy challenges, time-based competitions

#### **4. Visual Round** (Image-Based)
- **Format**: Questions with images/diagrams
- **Timing**: Moderate time limit (15-30 seconds)
- **Scoring**: Standard points, bonus for accurate identification
- **Player Count**: Solo or multiplayer
- **UI**: Large image display, image zoom capability, caption options
- **Media Types**: Photos, diagrams, maps, charts, artwork
- **Features**:
  - Image zoom and pan
  - Multiple images per question (carousel)
  - Image annotation support
- **Use Case**: Geography, art, science, identification quizzes

#### **5. Audio Round** (Sound-Based)
- **Format**: Questions with audio clips
- **Timing**: Depends on audio duration + thinking time
- **Scoring**: Standard points with replay penalty
- **Player Count**: Solo or multiplayer
- **UI**: Audio player controls, waveform visualization, replay button (limited)
- **Media Types**: Music clips, sound effects, spoken questions, audio puzzles
- **Features**:
  - Play/pause controls
  - Limited replays (1-2 times with point deduction)
  - Audio visualization
  - Speed control (optional)
- **Use Case**: Music trivia, language learning, sound identification

---

#### **Multi-Round Quizzes**
Quizzes can combine multiple round types:
- Round 1: General (10 questions)
- Round 2: Rapid Fire (15 questions, 10 sec each)
- Round 3: Buzzer (5 questions, multiplayer finale)
- Total score aggregated across all rounds

---

### Backend Server (Node.js/Express)

### Backend Server (Node.js/Express)

#### [NEW] [package.json](file:///d:/quiz/package.json)
- Initialize Node.js project with dependencies: `express`, `pg` (PostgreSQL client), `bcryptjs` (password hashing), `jsonwebtoken` (JWT auth), `cors`, `dotenv`, `express-validator`
- Dev dependencies: `nodemon` for auto-restart during development

---

#### [NEW] [server.js](file:///d:/quiz/server.js)
- Main Express server setup
- Database connection initialization
- Route registration for all API endpoints
- Error handling middleware
- CORS configuration for frontend-backend communication
- Server listening on port 3000

---

#### [NEW] [.env.example](file:///d:/quiz/.env.example)
- Template for environment variables
- Database connection details (host, port, database name, user, password)
- JWT secret key
- Google OAuth credentials
- Server port configuration

---

### Database Layer

#### [NEW] [database/schema.sql](file:///d:/quiz/database/schema.sql)
- Complete PostgreSQL database schema with round type support
- **users** table: id, email, password_hash, name, avatar_url, created_at, last_login
- **quizzes** table: id, title, category, difficulty, description, questions_count, round_type (general/buzzer/rapid/visual/audio), round_config (JSON), created_at
- **questions** table: id, quiz_id, question_text, options (JSON), correct_answer, points, media_url, media_type, time_limit
- **quiz_rounds** table: id, quiz_id, round_number, round_type, config (JSON for round-specific settings)
- **user_scores** table: id, user_id, quiz_id, score, time_taken, round_data (JSON), completed_at
- **multiplayer_sessions** table: id, quiz_id, session_code, host_user_id, status, created_at
- **session_participants** table: session_id, user_id, buzzer_locked, buzz_time, score, joined_at
- **achievements** table: id, name, description, icon, unlock_criteria (JSON)
- **user_achievements** table: user_id, achievement_id, unlocked_at
- **leaderboard view**: Aggregated user statistics for rankings
- **user_stats view**: Individual user statistics (games played, wins, streaks)
- Indexes for performance optimization

---

#### [NEW] [database/seed.sql](file:///d:/quiz/database/seed.sql)
- Sample quiz data (Science, History, Geography, Sports, Entertainment)
- Sample questions for each quiz
- Default achievements
- Demo user accounts (for testing)

---

#### [NEW] [database/db.js](file:///d:/quiz/database/db.js)
- PostgreSQL connection pool configuration
- Database query wrapper functions
- Error handling for database operations
- Connection validation and retry logic

---

### API Routes

#### [NEW] [routes/auth.js](file:///d:/quiz/routes/auth.js)
- **POST /api/auth/register**: User registration with email validation and password hashing
- **POST /api/auth/login**: User login with JWT token generation
- **POST /api/auth/google**: Google OAuth authentication
- **POST /api/auth/logout**: Logout (token invalidation)
- **GET /api/auth/verify**: Verify JWT token validity

---

#### [NEW] [routes/users.js](file:///d:/quiz/routes/users.js)
- **GET /api/users/profile**: Get current user profile
- **PUT /api/users/profile**: Update user profile (name, avatar)
- **GET /api/users/stats**: Get user statistics (games, wins, streaks, achievements)
- **GET /api/users/:id**: Get public profile of another user

---

#### [NEW] [routes/quizzes.js](file:///d:/quiz/routes/quizzes.js)
- **GET /api/quizzes**: Get all quizzes with optional filtering (category, difficulty, round_type)
- **GET /api/quizzes/:id**: Get specific quiz details including round configuration
- **GET /api/quizzes/:id/questions**: Get questions for a quiz with media URLs
- **POST /api/quizzes/:id/submit**: Submit quiz answers and calculate score (round-specific scoring)
- **GET /api/quizzes/featured**: Get featured/recommended quizzes
- **POST /api/quizzes/:id/start**: Start a quiz session (initialize timers for rapid rounds)
- **POST /api/quizzes/:id/answer**: Submit single answer (for rapid fire rounds)

---

#### [NEW] [routes/multiplayer.js](file:///d:/quiz/routes/multiplayer.js)
- **POST /api/multiplayer/sessions**: Create a new multiplayer session (generates 6-digit code)
- **POST /api/multiplayer/sessions/:code/join**: Join multiplayer session with code
- **GET /api/multiplayer/sessions/:id**: Get session details and participants
- **POST /api/multiplayer/sessions/:id/start**: Start the quiz (host only)
- **POST /api/multiplayer/sessions/:id/buzz**: Player buzzes in (buzzer rounds)
- **POST /api/multiplayer/sessions/:id/answer**: Submit answer during buzzer round
- **GET /api/multiplayer/sessions/:id/state**: Get current game state (for real-time updates)
- **DELETE /api/multiplayer/sessions/:id**: End session (host only)

---

#### [NEW] [routes/leaderboard.js](file:///d:/quiz/routes/leaderboard.js)
- **GET /api/leaderboard/global**: Global leaderboard (all time)
- **GET /api/leaderboard/weekly**: Weekly leaderboard
- **GET /api/leaderboard/monthly**: Monthly leaderboard
- **GET /api/leaderboard/friends**: Friends leaderboard (requires friends feature)
- **GET /api/leaderboard/rank/:userId**: Get specific user's rank

---

#### [NEW] [routes/achievements.js](file:///d:/quiz/routes/achievements.js)
- **GET /api/achievements**: Get all achievements with unlock status
- **GET /api/achievements/unlocked**: Get user's unlocked achievements
- **POST /api/achievements/check**: Check and unlock achievements based on user activity

---

### Middleware

#### [NEW] [middleware/auth.js](file:///d:/quiz/middleware/auth.js)
- JWT token verification middleware
- Extract user ID from token and attach to request
- Handle authentication errors (invalid/expired tokens)

---

#### [NEW] [middleware/validation.js](file:///d:/quiz/middleware/validation.js)
- Input validation middleware using express-validator
- Email format validation
- Password strength validation
- Request body sanitization

---

### Frontend Integration

#### [MODIFY] [script.js](file:///d:/quiz/script.js)
- Update API endpoint from `/api/login` to `http://localhost:3000/api/auth/login`
- Store JWT token in localStorage on successful login
- Include JWT token in Authorization header for authenticated requests
- Handle token refresh logic
- Update Google OAuth to send credential to backend

---

#### [NEW] [quiz-player.html](file:///d:/quiz/quiz-player.html)
- Universal quiz player that adapts based on round type
- Dynamic UI that changes based on quiz configuration
- Round type detection and UI switching
- Progress tracker across multiple rounds

---

#### [NEW] [quiz-player.js](file:///d:/quiz/quiz-player.js)
- Round-specific gameplay logic:
  - **General Round**: Standard question flow, option selection
  - **Buzzer Round**: WebSocket connection for real-time buzz-in, player lockout logic
  - **Rapid Fire**: Countdown timer, auto-submit, combo multiplier display
  - **Visual Round**: Image loading, zoom functionality, carousel navigation
  - **Audio Round**: Audio playback controls, replay tracking with penalties
- Score calculation engine for each round type
- API integration for fetching questions and submitting answers
- Session state management

---

#### [NEW] [quiz-player.css](file:///d:/quiz/quiz-player.css)
- Responsive styles for all round types
- Round-specific components:
  - Buzzer button with animation
  - Countdown timer with urgency colors
  - Image viewer with zoom
  - Audio player controls
  - Player status indicators for multiplayer
- Transition animations between questions
- Score display and combo indicators

---

#### [NEW] [multiplayer-lobby.html](file:///d:/quiz/multiplayer-lobby.html)
- Session creation interface
- Join session with code input
- Participant list with ready status
- Host controls (start game, kick players)
- Session settings (round types, difficulty, time limits)

---

#### [NEW] [multiplayer-lobby.js](file:///d:/quiz/multiplayer-lobby.js)
- WebSocket connection for real-time updates
- Session management (create, join, leave)
- Participant synchronization
- Game start coordination
- Code generation and validation

---

#### [MODIFY] [dashboard.js](file:///d:/quiz/dashboard.js)
- Replace hardcoded sample data with API calls
- **Fetch user profile**: GET /api/users/profile
- **Fetch user stats**: GET /api/users/stats
- **Fetch quizzes**: GET /api/quizzes
- **Fetch leaderboard**: GET /api/leaderboard/global
- **Fetch achievements**: GET /api/achievements
- Include Authorization header with JWT token in all API requests
- Handle API errors and redirect to login on 401 Unauthorized

---

#### [MODIFY] [config.js](file:///d:/quiz/config.js)
- Add API base URL configuration
- Update to support environment-based URLs (development vs production)

---

#### [NEW] [signup.html](file:///d:/quiz/signup.html)
- User registration form (email, password, confirm password, name)
- Client-side validation
- Link to registration API endpoint
- Redirect to login on successful registration

---

## Verification Plan

### Automated Tests

**Database Schema Verification**
```bash
# Navigate to d:/quiz
cd d:/quiz

# Run PostgreSQL schema creation
psql -U postgres -d quiz_db -f database/schema.sql

# Verify tables were created
psql -U postgres -d quiz_db -c "\dt"
```

**Backend Server Start**
```bash
# Install dependencies
npm install

# Start server in development mode
npm run dev

# Server should start on http://localhost:3000
# Expected output: "Server running on port 3000" and "Database connected successfully"
```

**API Endpoint Testing** (using curl or Postman)
```bash
# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"Test1234\",\"name\":\"Test User\"}"

# Expected: 201 Created with user object and JWT token

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"Test1234\"}"

# Expected: 200 OK with JWT token

# Test get quizzes
curl -X GET http://localhost:3000/api/quizzes

# Expected: 200 OK with array of quiz objects
```

### Manual Verification

1. **User Registration Flow**
   - Open browser to `http://localhost:5500/signup.html` (or your local server)
   - Fill in registration form with valid email and password
   - Click "Sign Up" button
   - Verify: Should redirect to login page with success message
   - Check database: Verify user was created in `users` table

2. **User Login Flow**
   - Open browser to `http://localhost:5500/index.html`
   - Enter registered email and password
   - Click "Sign In" button
   - Verify: Should see success animation and redirect to dashboard
   - Check localStorage: Verify JWT token is stored
   - Check dashboard: Verify user name and avatar are displayed correctly

3. **Dashboard Data Loading**
   - After login, verify all sections load data from backend:
     - Home: Stats should show real data (games played, total score, etc.)
     - Play Quiz: Quizzes should be fetched from database
     - My Scores: Should show actual score history
     - Leaderboard: Should display rankings from database
     - Achievements: Should show achievements with unlock status
     - Profile: Should display user information from database

4. **Quiz Gameplay**
   - Click on a quiz from the "Play Quiz" section
   - Verify: Questions are loaded from backend
   - Answer all questions
   - Submit quiz
   - Verify: Score is calculated and saved to database
   - Check "My Scores": New score should appear
   - Check leaderboard: Rankings should update if score is high enough

5. **Google OAuth**
   - Click "Sign in with Google" button
   - Complete Google authentication
   - Verify: User is created in database with Google ID
   - Verify: JWT token is issued and stored
   - Verify: Redirected to dashboard with user profile populated

6. **Error Handling**
   - Try logging in with wrong password → Should show error message
   - Try accessing dashboard without login → Should redirect to login page
   - Try submitting invalid data → Should show validation errors
   - Stop backend server → Frontend should show connection error

> [!NOTE]
> If you need help running PostgreSQL or setting up the database, please let me know. I can provide step-by-step instructions for Windows/macOS/Linux.

> [!TIP]
> For testing, I'll create a demo user account with pre-populated data so you can immediately see the dashboard in action after logging in.
