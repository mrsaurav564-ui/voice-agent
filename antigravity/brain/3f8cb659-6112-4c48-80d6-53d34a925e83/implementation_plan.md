# Federal-Local Conflict Coordination System - Implementation Plan

A comprehensive web-based platform to streamline coordination between federal and local governments during national road infrastructure projects in Nepal, featuring AI-powered conflict analysis and real-time collaboration tools.

## User Review Required

> [!IMPORTANT]
> **Technology Stack Confirmation**
> - **Backend**: PHP with MySQL database
> - **Frontend**: HTML5, Tailwind CSS, JavaScript (Chart.js for analytics)
> - **AI Integration**: Will use a rule-based AI system for conflict classification and severity assessment (can be enhanced with external AI APIs if needed)
> - **Authentication**: Session-based with role-based access control
> 
> Please confirm if you'd like to use external AI APIs (e.g., OpenAI, Google AI) for more advanced conflict analysis, or if the rule-based system is sufficient for MVP.

> [!IMPORTANT]
> **User Roles & Permissions**
> The system will support two primary roles:
> - **Federal Users**: Can create projects, view all conflicts, update resolution status, access full analytics
> - **Local Users**: Can view assigned projects, raise conflicts, track resolution status, view project-specific analytics
> 
> Should we add additional roles like Project Manager, Field Inspector, or Admin with different permission levels?

> [!WARNING]
> **File Upload & Storage**
> Conflicts will support document and image uploads as evidence. These files will be stored in the server filesystem (`uploads/` directory) with references in the database. Please ensure adequate server storage and appropriate file size limits.

## Proposed Changes

### Database Layer

#### [NEW] [schema.sql](file:///c:/xampp2/htdocs/final%20one/database/schema.sql)

Complete MySQL database schema including:
- **users**: User authentication and profile information with role-based access
- **projects**: Federal road project details (name, location, budget, timeline, status)
- **conflicts**: Conflict reports with categorization, severity, and status tracking
- **resolutions**: Resolution history and tracking for each conflict
- **notifications**: Real-time notification system for users
- **activity_logs**: Comprehensive audit trail of all system activities
- **project_assignments**: Many-to-many relationship between projects and local governments

Includes proper indexes, foreign key constraints, and default values for optimal performance.

---

### Backend Configuration & Core

#### [NEW] [config/database.php](file:///c:/xampp2/htdocs/final%20one/config/database.php)

Database connection handler with:
- PDO-based MySQL connection with error handling
- Prepared statement support for SQL injection prevention
- Connection pooling configuration
- Character set and timezone settings

#### [NEW] [config/constants.php](file:///c:/xampp2/htdocs/final%20one/config/constants.php)

System-wide constants including:
- User roles (FEDERAL, LOCAL)
- Conflict types (LAND, COMPENSATION, ALIGNMENT, ENVIRONMENTAL, SOCIAL)
- Severity levels (LOW, MEDIUM, HIGH, CRITICAL)
- Project status values
- File upload configurations
- API response codes

#### [NEW] [includes/auth.php](file:///c:/xampp2/htdocs/final%20one/includes/auth.php)

Authentication and authorization utilities:
- Session management functions
- Role-based access control checks
- Password hashing and verification (using PHP's `password_hash()`)
- Login/logout handlers
- CSRF token generation and validation

---

### API Endpoints - Authentication

#### [NEW] [api/auth/login.php](file:///c:/xampp2/htdocs/final%20one/api/auth/login.php)

Handles user authentication:
- Validates credentials against database
- Creates secure session with role information
- Returns user profile and permissions
- Logs login activity

#### [NEW] [api/auth/logout.php](file:///c:/xampp2/htdocs/final%20one/api/auth/logout.php)

Handles user logout:
- Destroys session securely
- Logs logout activity
- Returns success confirmation

#### [NEW] [api/auth/register.php](file:///c:/xampp2/htdocs/final%20one/api/auth/register.php)

User registration endpoint:
- Validates input data
- Checks for duplicate usernames/emails
- Creates new user account with hashed password
- Assigns appropriate role

---

### API Endpoints - Projects

#### [NEW] [api/projects/create.php](file:///c:/xampp2/htdocs/final%20one/api/projects/create.php)

Federal users create new road projects:
- Validates project data (name, location, budget, timeline)
- Stores project in database
- Assigns to relevant local governments
- Creates notifications for assigned localities
- Returns created project details

#### [NEW] [api/projects/list.php](file:///c:/xampp2/htdocs/final%20one/api/projects/list.php)

Retrieves projects based on user role:
- Federal users: All projects with filtering options
- Local users: Only assigned projects
- Supports pagination and search
- Returns project summary with conflict counts

#### [NEW] [api/projects/details.php](file:///c:/xampp2/htdocs/final%20one/api/projects/details.php)

Get detailed information for a specific project:
- Project metadata and timeline
- Associated conflicts and their status
- Resolution history
- Activity timeline
- Access control based on user role

#### [NEW] [api/projects/update.php](file:///c:/xampp2/htdocs/final%20one/api/projects/update.php)

Update project information (federal users only):
- Modify project details
- Update status and timeline
- Log changes in activity log
- Notify affected local governments

---

### API Endpoints - Conflicts

#### [NEW] [api/conflicts/create.php](file:///c:/xampp2/htdocs/final%20one/api/conflicts/create.php)

Local users raise new conflicts:
- Validates conflict data (type, description, location)
- Handles file uploads (documents, images)
- Triggers AI analysis for classification and severity
- Creates notifications for federal authorities
- Returns conflict ID and initial analysis

#### [NEW] [api/conflicts/list.php](file:///c:/xampp2/htdocs/final%20one/api/conflicts/list.php)

Retrieve conflicts with filtering:
- Filter by project, status, severity, type
- Role-based access control
- Pagination support
- Returns conflict summaries with AI insights

#### [NEW] [api/conflicts/details.php](file:///c:/xampp2/htdocs/final%20one/api/conflicts/details.php)

Get detailed conflict information:
- Full conflict description and evidence
- AI analysis results
- Resolution history and timeline
- Related stakeholders and communications
- Downloadable attachments

#### [NEW] [api/conflicts/update-status.php](file:///c:/xampp2/htdocs/final%20one/api/conflicts/update-status.php)

Federal users update conflict resolution status:
- Update status (PENDING, IN_PROGRESS, RESOLVED, ESCALATED)
- Add resolution notes and actions taken
- Upload resolution documents
- Notify relevant parties
- Log status changes

---

### API Endpoints - AI Analysis

#### [NEW] [api/ai/analyze-conflict.php](file:///c:/xampp2/htdocs/final%20one/api/ai/analyze-conflict.php)

AI-powered conflict analysis:
- **Classification**: Categorizes conflict type using keyword analysis and pattern matching
- **Severity Assessment**: Evaluates based on affected area, stakeholders, budget impact, timeline impact
- **Resolution Suggestions**: Provides recommended actions based on conflict type and historical data
- **Impact Prediction**: Estimates project delay and cost implications
- Returns structured analysis with confidence scores

#### [NEW] [includes/ai-engine.php](file:///c:/xampp2/htdocs/final%20one/includes/ai-engine.php)

Core AI logic implementation:
- Rule-based classification algorithms
- Severity scoring matrix
- Resolution recommendation database
- Impact calculation formulas
- Learning from historical resolution data

---

### API Endpoints - Notifications

#### [NEW] [api/notifications/list.php](file:///c:/xampp2/htdocs/final%20one/api/notifications/list.php)

Retrieve user notifications:
- Unread and read notifications
- Filter by type and date
- Mark as read functionality
- Pagination support

#### [NEW] [api/notifications/create.php](file:///c:/xampp2/htdocs/final%20one/api/notifications/create.php)

Internal API for creating notifications:
- System-generated notifications
- Role-based targeting
- Priority levels
- Template support

---

### API Endpoints - Analytics

#### [NEW] [api/analytics/dashboard.php](file:///c:/xampp2/htdocs/final%20one/api/analytics/dashboard.php)

Dashboard statistics:
- Total projects and conflicts
- Active vs resolved conflicts
- Severity distribution
- Resolution rate and average time
- Trend analysis (monthly/quarterly)
- Role-specific metrics

#### [NEW] [api/analytics/heatmap.php](file:///c:/xampp2/htdocs/final%20one/api/analytics/heatmap.php)

Conflict heatmap data:
- Geographic distribution of conflicts
- Severity-based color coding
- Project-wise conflict density
- Returns data formatted for visualization

---

### Frontend - Authentication & Layout

#### [NEW] [index.html](file:///c:/xampp2/htdocs/final%20one/index.html)

Landing page with:
- System overview and features
- Role-based login options
- Modern, professional design
- Responsive layout

#### [NEW] [login.html](file:///c:/xampp2/htdocs/final%20one/login.html)

Unified login interface:
- Role selector (Federal/Local)
- Secure credential input
- Remember me functionality
- Password visibility toggle
- Error handling and validation
- Redirects to appropriate dashboard

#### [NEW] [layouts/header.php](file:///c:/xampp2/htdocs/final%20one/layouts/header.php)

Common header component:
- Navigation menu based on user role
- Notification bell with unread count
- User profile dropdown
- Logout functionality

#### [NEW] [layouts/sidebar.php](file:///c:/xampp2/htdocs/final%20one/layouts/sidebar.php)

Role-based sidebar navigation:
- Federal: Projects, Conflicts, Analytics, Settings
- Local: My Projects, Raise Conflict, Track Status, Notifications

---

### Frontend - Federal Dashboard

#### [NEW] [federal/dashboard.html](file:///c:/xampp2/htdocs/final%20one/federal/dashboard.html)

Federal user main dashboard:
- Overview statistics cards (total projects, active conflicts, resolution rate)
- Recent conflicts table with quick actions
- Project status overview
- Conflict severity distribution chart
- Timeline of recent activities
- Quick access to create project and view analytics

#### [NEW] [federal/projects.html](file:///c:/xampp2/htdocs/final%20one/federal/projects.html)

Project management interface:
- Create new project form with validation
- Projects list with search and filters
- Project cards showing status, conflicts, and timeline
- Bulk actions support
- Export functionality

#### [NEW] [federal/conflicts.html](file:///c:/xampp2/htdocs/final%20one/federal/conflicts.html)

Conflict management interface:
- All conflicts table with advanced filtering
- Severity and status indicators
- Quick status update actions
- Detailed conflict view modal
- AI analysis insights display
- Resolution tracking timeline

#### [NEW] [federal/analytics.html](file:///c:/xampp2/htdocs/final%20one/federal/analytics.html)

Comprehensive analytics dashboard:
- Interactive charts (Chart.js):
  - Conflict trends over time (line chart)
  - Conflict type distribution (pie chart)
  - Resolution rate by severity (bar chart)
  - Project status overview (doughnut chart)
- Conflict heatmap visualization
- Exportable reports
- Date range filters
- Performance metrics

---

### Frontend - Local Dashboard

#### [NEW] [local/dashboard.html](file:///c:/xampp2/htdocs/final%20one/local/dashboard.html)

Local user main dashboard:
- Assigned projects overview
- My conflicts summary
- Pending actions required
- Recent notifications
- Quick raise conflict button
- Project timeline view

#### [NEW] [local/projects.html](file:///c:/xampp2/htdocs/final%20one/local/projects.html)

View assigned projects:
- Project cards with details
- Filter by status
- View project timeline and milestones
- Access to raise conflict for each project
- Download project documents

#### [NEW] [local/raise-conflict.html](file:///c:/xampp2/htdocs/final%20one/local/raise-conflict.html)

Conflict reporting form:
- Project selection dropdown
- Conflict type selection
- Rich text description editor
- Location/affected area input
- File upload (documents, images)
- Stakeholder information
- Form validation
- AI analysis preview before submission

#### [NEW] [local/track-conflicts.html](file:///c:/xampp2/htdocs/final%20one/local/track-conflicts.html)

Track submitted conflicts:
- My conflicts list with status
- Filter by project, status, severity
- Detailed conflict view with resolution history
- Communication thread with federal authorities
- Download resolution documents

---

### Frontend - Shared Components & Assets

#### [NEW] [assets/css/main.css](file:///c:/xampp2/htdocs/final%20one/assets/css/main.css)

Main stylesheet with Tailwind CSS:
- Custom design system (colors, typography, spacing)
- Component styles (cards, buttons, forms, tables)
- Responsive utilities
- Animation and transition classes
- Dark mode support (optional)

#### [NEW] [assets/js/app.js](file:///c:/xampp2/htdocs/final%20one/assets/js/app.js)

Core JavaScript functionality:
- API request wrapper with error handling
- Authentication state management
- Form validation utilities
- Toast notification system
- Modal management
- Date formatting helpers

#### [NEW] [assets/js/charts.js](file:///c:/xampp2/htdocs/final%20one/assets/js/charts.js)

Chart.js configuration and utilities:
- Reusable chart creation functions
- Custom color schemes
- Responsive chart options
- Data formatting for visualizations
- Export chart as image functionality

#### [NEW] [assets/js/notifications.js](file:///c:/xampp2/htdocs/final%20one/assets/js/notifications.js)

Real-time notification system:
- Fetch and display notifications
- Mark as read functionality
- Notification badge updates
- Sound/visual alerts for new notifications
- Notification templates

---

### Security & Configuration

#### [NEW] [.htaccess](file:///c:/xampp2/htdocs/final%20one/.htaccess)

Apache configuration:
- URL rewriting for clean URLs
- Prevent direct access to sensitive files
- CORS headers for API endpoints
- Security headers (XSS protection, content type options)
- File upload restrictions

#### [NEW] [config/security.php](file:///c:/xampp2/htdocs/final%20one/config/security.php)

Security utilities:
- Input sanitization functions
- XSS prevention
- SQL injection protection (via prepared statements)
- CSRF token validation
- File upload validation
- Rate limiting for API endpoints

---

### Documentation

#### [NEW] [README.md](file:///c:/xampp2/htdocs/final%20one/README.md)

Project documentation:
- System overview and features
- Installation instructions for XAMPP
- Database setup guide
- Configuration steps
- User guide for federal and local users
- API documentation
- Troubleshooting guide

#### [NEW] [docs/API.md](file:///c:/xampp2/htdocs/final%20one/docs/API.md)

Detailed API documentation:
- Endpoint descriptions
- Request/response formats
- Authentication requirements
- Error codes and handling
- Example requests using cURL

## Verification Plan

### Automated Tests

```bash
# Start XAMPP Apache and MySQL services
# Import database schema
mysql -u root -p < database/schema.sql

# Access the application
# Navigate to http://localhost/final%20one/
```

### Manual Verification

1. **Authentication Flow**
   - Test login with federal and local user credentials
   - Verify role-based dashboard redirection
   - Test logout functionality
   - Verify session persistence

2. **Federal User Workflow**
   - Create a new road project
   - Verify project appears in projects list
   - Check notifications sent to local governments
   - View and respond to conflicts
   - Update conflict resolution status
   - Access analytics dashboard and verify charts

3. **Local User Workflow**
   - View assigned projects
   - Raise a new conflict with file uploads
   - Verify AI analysis results
   - Track conflict status
   - Receive notifications for updates

4. **AI Analysis**
   - Submit conflicts with different types and descriptions
   - Verify correct classification
   - Check severity assessment accuracy
   - Review resolution suggestions relevance

5. **Analytics & Reporting**
   - Verify dashboard statistics accuracy
   - Test chart interactions and filters
   - Check heatmap visualization
   - Export reports

6. **Notification System**
   - Verify real-time notification delivery
   - Test mark as read functionality
   - Check notification badge updates

7. **Security Testing**
   - Test unauthorized access attempts
   - Verify CSRF protection
   - Test file upload restrictions
   - Check SQL injection prevention
   - Verify XSS protection

8. **Responsive Design**
   - Test on desktop, tablet, and mobile viewports
   - Verify all features work across devices
   - Check chart responsiveness

9. **Browser Compatibility**
   - Test on Chrome, Firefox, Edge, Safari
   - Verify consistent functionality and appearance
