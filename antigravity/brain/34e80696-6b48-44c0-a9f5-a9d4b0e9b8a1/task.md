# Fix Apache 404 Error - Task List

## Problem Identified
- [x] Confirmed `register.html` file exists on D: drive
- [x] Confirmed Apache is running on port 80
- [x] Identified mismatch: files on `D:\xampp2\htdocs` but Apache configured for `C:\xampp2\htdocs`

## Solution Options
- [/] Update Apache DocumentRoot to D: drive (recommended)
- [ ] Alternative: Copy files to C: drive

## Steps to Fix
- [ ] Stop Apache server
- [ ] Edit `httpd.conf` to change DocumentRoot
- [ ] Restart Apache server
- [ ] Test access to register.html
