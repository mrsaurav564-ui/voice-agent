# Federal-Local Conflict Coordination System - Walkthrough

## System Overview

The Federal-Local Conflict Coordination System is a sophisticated web-based platform designed to streamline communication and conflict resolution between federal and local governments during national road infrastructure projects in Nepal.

---

## What Has Been Built

### 1. Complete Database Architecture ✅

A robust MySQL database with 8 interconnected tables:

- **users** - Authentication and user profiles (Federal & Local roles)
- **projects** - Federal road project management
- **project_assignments** - Project-locality mapping
- **conflicts** - Conflict tracking and reporting
- **resolutions** - Resolution history and actions
- **notifications** - Real-time notification system
- **activity_logs** - Comprehensive audit trail
- **system_settings** - Configuration management

**Sample Data Included:**
- 5 users (2 federal, 3 local)
- 3 active projects
- 3 sample conflicts with different severities
- Resolution history
- Notifications

---

### 2. Backend Core Infrastructure ✅

#### Database Connection (`config/database.php`)
- Singleton pattern for connection pooling
- PDO-based with prepared statements
- Automatic error logging
- Transaction support
- Helper functions for CRUD operations

#### System Constants (`config/constants.php`)
- User roles and permissions
- Conflict types (8 categories)
- Severity levels with color coding
- Project status values
- File upload configuration
- Nepal provinces list
- 20+ helper functions

#### Authentication Module (`includes/auth.php`)
- Secure session management
- Bcrypt password hashing
- Login/logout functionality
- Role-based access control
- Permission checking
- CSRF token protection
- Activity logging
- Remember me feature
- Login attempt limiting (5 attempts, 15-min lockout)

#### Security Module (`includes/security.php`)
- Input sanitization
- XSS prevention
- File upload validation
- MIME type checking
- Rate limiting
- Security headers
- CORS configuration
- IP detection
- Security event logging

#### AI Analysis Engine (`includes/ai-engine.php`)
- **Conflict Classification**: Keyword-based pattern matching
- **Severity Assessment**: Multi-factor scoring (population, cost, delay, type, area, stakeholders)
- **Resolution Recommendations**: Type-specific strategies with historical data
- **Impact Prediction**: Delay and cost estimation
- **Priority Calculation**: 1-5 scale based on severity
- **Confidence Scoring**: Analysis reliability metric

---

### 3. API Endpoints ✅

#### Authentication APIs
- `POST /api/auth/login.php` - User authentication with rate limiting
- `POST /api/auth/logout.php` - Session destruction
- `GET /api/auth/me.php` - Current user information

**Features:**
- JSON-based RESTful design
- Proper HTTP status codes
- Comprehensive error handling
- CORS support
- Input validation

---

### 4. User Interface ✅

#### Login Page (`login.html`)
- Modern glassmorphism design
- Role selector (Federal/Local)
- Form validation
- Password visibility toggle
- Remember me option
- Toast notifications
- Loading states
- Fully responsive
- Demo credentials display

**Design Features:**
- Gradient background
- Glass-effect card
- Smooth animations
- Icon integration (Font Awesome)
- Mobile-friendly

---

### 5. Security Configuration ✅

#### Apache Configuration (`.htaccess`)
- Security headers (X-Frame-Options, CSP, XSS Protection)
- URL rewriting (clean URLs)
- Directory protection
- File access control
- PHP execution prevention in uploads
- Compression (gzip)
- Browser caching
- CORS for APIs
- Custom error pages support

---

### 6. Documentation ✅

#### README.md
- Complete file structure
- Module descriptions
- Installation guide
- Default credentials
- API format
- Security practices
- Troubleshooting

#### DATABASE.md
- ER diagrams (Mermaid)
- Table structures
- Relationships
- Indexes
- Sample queries
- Backup procedures

#### IMPLEMENTATION_PROGRESS.md
- Completion status
- Next steps
- API templates
- Frontend templates
- Quick start guide

---

## How to Use the System

### Installation

1. **Extract Files**
   ```
   Location: C:\xampp2\htdocs\final one\
   ```

2. **Start XAMPP**
   - Start Apache
   - Start MySQL

3. **Create Database**
   ```bash
   # Open MySQL command line or phpMyAdmin
   mysql -u root -p
   source "C:\xampp2\htdocs\final one\database\schema.sql"
   ```

4. **Access Application**
   ```
   URL: http://localhost/final%20one/login.html
   ```

### Login Credentials

**Federal Users:**
```
Username: federal_admin
Password: password
Role: Federal (Ministry of Physical Infrastructure)

Username: dor_engineer
Password: password
Role: Federal (Department of Roads)
```

**Local Users:**
```
Username: kathmandu_local
Password: password
Role: Local (Kathmandu Metropolitan City)

Username: pokhara_local
Password: password
Role: Local (Pokhara Metropolitan City)

Username: chitwan_local
Password: password
Role: Local (Bharatpur Metropolitan City)
```

---

## System Capabilities

### For Federal Users

**Planned Features:**
1. Create and manage road projects
2. View all conflicts across projects
3. Update conflict resolution status
4. Access comprehensive analytics
5. Assign conflicts to team members
6. Track resolution timelines
7. Generate reports

### For Local Users

**Planned Features:**
1. View assigned projects
2. Raise new conflicts with evidence
3. Track conflict status
4. Receive notifications
5. View project-specific analytics
6. Upload supporting documents
7. Communicate with federal team

---

## AI Analysis Features

### Conflict Classification
The AI engine analyzes conflict descriptions and automatically categorizes them:
- Land Acquisition
- Compensation Issues
- Route Alignment
- Environmental Impact
- Social/Cultural Issues
- Technical Problems
- Budget Related
- Other Issues

### Severity Assessment
Multi-factor scoring based on:
- Affected population (25 points)
- Estimated cost impact (20 points)
- Estimated delay (20 points)
- Conflict type severity (15 points)
- Affected area size (10 points)
- Stakeholder count (10 points)

**Result:** LOW, MEDIUM, HIGH, or CRITICAL

### Resolution Recommendations
Type-specific strategies:
- Immediate actions (5 steps)
- Long-term solutions
- Historical successful resolutions
- Stakeholder engagement approaches

### Impact Prediction
- Estimated delay in days
- Estimated cost impact in NPR
- Resolution timeline (min/max/average)
- Risk level assessment

---

## File Structure

```
final one/
├── config/              ✅ Configuration files
├── includes/            ✅ Core PHP modules
├── api/
│   └── auth/           ✅ Authentication APIs
├── database/            ✅ SQL schema
├── docs/                ✅ Documentation
├── login.html           ✅ Login page
├── .htaccess            ✅ Apache config
└── README.md            ✅ Main documentation
```

---

## What's Next

### To Complete the MVP:

1. **Project Management APIs** (4 files)
   - Create, list, details, update

2. **Conflict Management APIs** (4 files)
   - Create, list, details, update status

3. **Analytics APIs** (2 files)
   - Dashboard stats, heatmap data

4. **Notification APIs** (2 files)
   - List, mark as read

5. **Frontend Dashboards** (8 files)
   - Federal: dashboard, projects, conflicts, analytics
   - Local: dashboard, projects, raise conflict, track

6. **Shared JavaScript** (3 files)
   - Core app.js, charts.js, notifications.js

7. **Main CSS** (1 file)
   - Tailwind-based styling

---

## Testing the Current Build

### 1. Test Database Connection
```php
<?php
require_once 'config/database.php';
$db = getDB();
$users = $db->fetchAll("SELECT username, role FROM users");
print_r($users);
?>
```

### 2. Test Login API
```bash
curl -X POST http://localhost/final%20one/api/auth/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"federal_admin","password":"password"}'
```

### 3. Test AI Analysis
```php
<?php
require_once 'includes/ai-engine.php';
$ai = getAI();
$result = $ai->analyzeConflict([
    'title' => 'Land acquisition dispute',
    'description' => 'Farmers refusing to hand over land due to low compensation',
    'conflict_type' => 'LAND',
    'estimated_affected_population' => 500
]);
print_r($result);
?>
```

---

## Security Features Implemented

✅ Password hashing (bcrypt)  
✅ SQL injection prevention (prepared statements)  
✅ XSS protection (input sanitization, output escaping)  
✅ CSRF token protection  
✅ File upload validation  
✅ Rate limiting  
✅ Session security  
✅ Activity logging  
✅ Security headers  
✅ Directory protection  

---

## Performance Optimizations

✅ Database connection pooling  
✅ Indexed database columns  
✅ Gzip compression  
✅ Browser caching  
✅ Optimized queries  
✅ JSON for flexible data  

---

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

---

## Mobile Responsiveness

The login page is fully responsive. Remaining pages will use Tailwind CSS for mobile-first design.

---

## Conclusion

### What Works Now:
1. ✅ Database is fully functional with sample data
2. ✅ User authentication system is complete
3. ✅ AI analysis engine is operational
4. ✅ Login interface is ready
5. ✅ Security measures are in place
6. ✅ Documentation is comprehensive

### What Needs to Be Built:
1. 📝 Remaining API endpoints (12 files)
2. 📝 Frontend dashboards (8 files)
3. 📝 Shared JavaScript (3 files)
4. 📝 Main stylesheet (1 file)

### Estimated Completion:
- **Current Progress:** 60%
- **Remaining Work:** 40%
- **Time to Complete:** 2-3 days for experienced developer

---

## Support

For questions or issues:
1. Check `README.md` for general information
2. Review `docs/DATABASE.md` for database queries
3. See `docs/IMPLEMENTATION_PROGRESS.md` for templates
4. Check logs in `logs/` directory for errors

---

**System Version:** 1.0 (In Development)  
**Last Updated:** 2025-11-21  
**Status:** Core Infrastructure Complete (60%)  
**Next Milestone:** API Endpoints & Dashboards
