- [x] Fix syntax errors in login files <!-- id: 0 -->
    - [x] Identify error locations <!-- id: 1 -->
    - [x] Check loginl.html for errors <!-- id: 2 -->
    - [x] Check loginp.html for errors <!-- id: 3 -->
    - [x] Check logins.html for errors <!-- id: 4 -->
    - [x] Check loginc.html for errors <!-- id: 5 -->
    - [/] Fix showToast function in all 4 files <!-- id: 6 -->
    - [ ] Fix socialLogin function indentation <!-- id: 7 -->
    - [ ] Fix scanBiometric function indentation <!-- id: 8 -->
    - [ ] Verify all fixes <!-- id: 9 -->

## Summary
All four login files (loginc.html, loginl.html, loginp.html, logins.html) have the same syntax error:
- The `showToast` function at line ~3161 is malformed with nested setTimeout containing account creation logic
- The function is missing its closing brace and duration parameter handling
- The `socialLogin` and `scanBiometric` functions have incorrect indentation
- The logins.html file has additional corruption in the `flipForm` and event listener sections
