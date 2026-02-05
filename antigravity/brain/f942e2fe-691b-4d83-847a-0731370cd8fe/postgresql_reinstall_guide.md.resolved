# PostgreSQL Uninstall & Reinstall Guide

## Current Status
- **PostgreSQL Version**: 18 (x64)
- **Service Status**: Stopped and deleted ✓
- **Installation Path**: `C:\Program Files\PostgreSQL\18`

---

## Step 1: Complete Uninstallation

### 1.1 Restart Your Computer
Some PostgreSQL files may be locked by processes. **Restart your computer** to release all file locks.

### 1.2 Remove PostgreSQL Directory (After Restart)
Open **PowerShell as Administrator** and run:

```powershell
# Remove PostgreSQL installation directory
Remove-Item -Path "C:\Program Files\PostgreSQL\18" -Recurse -Force

# Remove PostgreSQL parent directory if empty
Remove-Item -Path "C:\Program Files\PostgreSQL" -Force -ErrorAction SilentlyContinue
```

### 1.3 Remove PostgreSQL Data Directory
```powershell
# Remove data directory (commonly in AppData)
Remove-Item -Path "C:\Users\HP\AppData\Local\PostgreSQL" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Users\HP\AppData\Roaming\PostgreSQL" -Recurse -Force -ErrorAction SilentlyContinue
```

### 1.4 Clean Up Environment Variables
```powershell
# Check if PostgreSQL is in PATH
$env:PATH -split ';' | Select-String -Pattern 'PostgreSQL'

# If found, remove it from System Environment Variables manually:
# 1. Win + X → System → Advanced system settings
# 2. Environment Variables → System variables → Path
# 3. Remove any PostgreSQL entries
```

### 1.5 Remove Registry Entries (Optional but Recommended)
**Run Registry Editor (regedit) as Administrator:**

1. Press `Win + R`, type `regedit`, press Enter
2. Navigate to and delete (if they exist):
   - `HKEY_LOCAL_MACHINE\SOFTWARE\PostgreSQL`
   - `HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\PostgreSQL`
   - `HKEY_CURRENT_USER\Software\PostgreSQL`

---

## Step 2: Install PostgreSQL

### 2.1 Download PostgreSQL Installer
Visit the official PostgreSQL download page:
```
https://www.postgresql.org/download/windows/
```

**Recommended**: Download the latest stable version from EDB installer.

### 2.2 Run the Installer
1. Run the downloaded `.exe` file as Administrator
2. Follow the installation wizard:
   - **Installation Directory**: `C:\Program Files\PostgreSQL\<version>`
   - **Components**: Select all (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools)
   - **Data Directory**: Default or custom location
   - **Password**: Set a strong password for the `postgres` superuser (REMEMBER THIS!)
   - **Port**: Default `5432` (or choose a custom port)
   - **Locale**: Default

### 2.3 Complete Installation
- Let the installer complete
- Stack Builder will offer additional tools (optional)

---

## Step 3: Verify Installation

### 3.1 Check PostgreSQL Service
```powershell
# In PowerShell
Get-Service -Name postgresql*
```

Expected output: Status should be **Running**

### 3.2 Check PostgreSQL Version
```powershell
# Add PostgreSQL to PATH first (if not automatically added)
# Then run:
psql --version
```

### 3.3 Connect to PostgreSQL
```powershell
# Connect as postgres user
psql -U postgres

# You'll be prompted for the password you set during installation
# Once connected, you should see the postgres=# prompt
```

To exit psql, type:
```sql
\q
```

---

## Step 4: Restore Your Database (If Needed)

If you have a backup of your previous database:

### 4.1 Create Database
```sql
-- In psql prompt
CREATE DATABASE your_database_name;
```

### 4.2 Restore from Backup
```powershell
# From PowerShell (outside psql)
psql -U postgres -d your_database_name -f path\to\backup.sql
```

---

## Quick Commands Reference

### Start/Stop PostgreSQL Service
```powershell
# Start
Start-Service postgresql-x64-<version>

# Stop
Stop-Service postgresql-x64-<version>

# Restart
Restart-Service postgresql-x64-<version>
```

### Connect to Database
```powershell
# Default connection
psql -U postgres

# Specific database
psql -U postgres -d database_name

# Specific host and port
psql -U postgres -h localhost -p 5432 -d database_name
```

---

## Troubleshooting

### Issue: Port 5432 Already in Use
```powershell
# Find what's using the port
netstat -ano | findstr :5432

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: Service Won't Start
```powershell
# Check event logs
Get-EventLog -LogName Application -Source PostgreSQL* -Newest 20
```

### Issue: Cannot Connect to Database
1. Verify service is running
2. Check `pg_hba.conf` for authentication settings
3. Ensure firewall allows PostgreSQL (port 5432)
4. Verify password is correct

---

## Notes for Your Quiz Application

After reinstalling PostgreSQL, you'll need to:

1. **Recreate your database schema**:
   - Run the SQL from `d:\quiz\database\schema.sql`

2. **Update connection settings** in your application:
   - Check files in `d:\quiz` for database connection strings
   - Update password, port, or host if changed

3. **Test your application**:
   - Ensure all routes (like `achievements.js`) can connect to the database

---

## Next Steps

1. ✅ **Restart your computer** (to release file locks)
2. ✅ **Delete PostgreSQL directories** (after restart)
3. ✅ **Download and install PostgreSQL**
4. ✅ **Verify installation**
5. ✅ **Restore your quiz database**
6. ✅ **Test your application**
