# Fix Syntax Error and Logic in logins.html

## Goal Description
Fix the `'}' expected` syntax error in `logins.html` caused by malformed `showToast` function. Restore `showToast` to its correct functionality and move the misplaced account creation logic to a proper event listener for the signup form.

## User Review Required
> [!NOTE]
> I am assuming the misplaced code inside `showToast` was intended for the "Create Account" button/form. I will move it there.

## Proposed Changes

### Backend
#### [MODIFY] [logins.html](file:///d:/xampp/htdocs/Hackathon/backend/logins.html)
- Fix `showToast` function to properly close and hide the toast after duration.
- Add a new event listener for the signup form submission (`.signup form`).
- Move the account creation simulation logic (show "Creating...", wait, show "Success", flip form) to this new listener.

## Verification Plan

### Manual Verification
1.  Open `logins.html` in a browser (via the server `http://localhost:3000/citizen` if running, or just check the file).
2.  Verify the syntax error is gone (console should be clean of this error).
3.  Click "Sign up here" to flip to the signup form.
4.  Fill in dummy data and click "Create Account".
5.  Verify the toast "Creating account..." appears (if I add it), then "Account created successfully!", then the form flips back to login.
