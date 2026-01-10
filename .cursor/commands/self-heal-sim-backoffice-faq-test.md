---
name: Self-Heal SIM Backoffice FAQ Test
description: Regenerate the sim-backoffice-faq-test test script when it fails but behavior still works
---

# Self-Heal SIM Backoffice FAQ Test

⚠️ **IMPORTANT**: Only use this command if you have verified that the 
behavior described below STILL WORKS when you test it manually in your 
browser, but the automated test is failing.

## Original Behavior (What This Test Should Do)

### Starting Point
URL: https://dev-simattendance.simge.edu.sg/StudentAppBackOffice/Login

### Steps
1. Login to the application by following the same behaviors outlined in sim-backoffice-login-test.md
2. When the page loads, locate a clickable which has the text "F.A.Q" and click it
3. This should open a submenu - within that submenu click on "ISO F.A.Q"
4. This should bring you to a new page. Verify that there is a red button with the text "Add FAQ" inside it

### Expected Outcome
User should be navigated to the ISO FAQ page and see a red "Add FAQ" button.

## Test File Location
`tests/sim-backoffice-faq-test.spec.ts`

## When to Use This Command

Use this command when:
- ✓ You manually tested and the behavior WORKS
- ✓ But the automated test FAILS
- ✓ This is a FALSE NEGATIVE (test script issue, not a real bug)

Do NOT use this command when:
- ✗ The behavior is actually broken (TRUE NEGATIVE)
- ✗ You haven't verified the behavior works manually

## Instructions for Cursor

This is a self-healing workflow. The user has confirmed the behavior 
above still works correctly, but the test script is failing.

Your task: Regenerate the test using the SAME protocol as initial 
test generation:

1. Use browser plugin to verify each step still works
2. Capture new element refs if they've changed
3. Generate new Playwright locators (using MCP if available)
4. Write updated test file
5. Verify test passes
6. Maximum 5 regeneration attempts

### Regeneration Protocol

Follow the EXACT same steps as "Generate New E2E Test" command, but:
- Use the behavior steps defined above
- Overwrite the existing test file: tests/sim-backoffice-faq-test.spec.ts
- Update the behavior doc with "Last Verified: [new timestamp]"
- Report what changed (if you can detect it)

### Special Notes

- Test reuses login flow from sim-backoffice-login-test.md
- **Credentials**: All credentials must be read from `.env` file (TEST_USER_EMAIL and TEST_USER_PASSWORD)
- **Security**: Never store credentials in behavior files or test code - only in .env file
- **Password format**: If password contains special characters (like #), it must be quoted in .env file: `TEST_USER_PASSWORD="your-password"`
- Ensure credentials are correctly loaded from .env
- Login uses Local login type (not Staff or Azure AD)
- Verify "Add FAQ" button is visible on ISO FAQ page

### After Successful Regeneration

Report to user:
```
✓ Test successfully regenerated and verified!

What changed:
- [list any detectable differences in selectors, structure, etc.]

The test now passes and is ready for regression testing.

Updated files:
- tests/sim-backoffice-faq-test.spec.ts
- test-behaviors/sim-backoffice-faq-test.md

Consider committing these changes:
Use command: "Commit Changes"
```

### If Regeneration Fails After 5 Attempts

```
✗ Unable to regenerate working test after 5 attempts.

This could mean:
1. The behavior has changed significantly
2. The behavior doesn't actually work as expected
3. Complex timing or state issues
4. Credentials or environment configuration issues

Please:
1. Manually verify the behavior again
2. Check if any steps have changed
3. Verify .env file has correct password (quoted if contains #)
4. Consider updating the behavior description
5. Manual test modification may be needed
```
