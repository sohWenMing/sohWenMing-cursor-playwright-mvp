---
name: Self-Heal SIM Backoffice Login Test
description: Regenerate the sim-backoffice-login-test test script when it fails but behavior still works
---

# Self-Heal SIM Backoffice Login Test

⚠️ **IMPORTANT**: Only use this command if you have verified that the 
behavior STILL WORKS when you test it manually in your browser, but the 
automated test is failing.

## Behavior Reference

**Read the expected behavior from:** `test-behaviors/sim-backoffice-login-test.md`

The behavior file is the single source of truth for what this test should do. 
All behavior steps, expected outcomes, and special notes are documented there.

## Test File Location
`tests/sim-backoffice-login-test.spec.ts`

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
from the referenced behavior file still works correctly, but the test script is failing.

Your task: Regenerate the test using the SAME protocol as initial 
test generation:

1. Read the behavior steps from `test-behaviors/sim-backoffice-login-test.md`
2. Use browser plugin to verify each step still works
3. Capture new element refs if they've changed
4. Generate new Playwright locators (using MCP if available)
5. Write updated test file
6. Verify test passes
7. Maximum 5 regeneration attempts

### Regeneration Protocol

Follow the EXACT same steps as "Generate New E2E Test" command, but:
- Read the behavior steps from `test-behaviors/sim-backoffice-login-test.md` (the single source of truth)
- Overwrite the existing test file: tests/sim-backoffice-login-test.spec.ts
- Update the behavior doc with "Last Verified: [new timestamp]"
- Report what changed (if you can detect it)

### Special Notes

- **Credentials**: All credentials must be read from `.env` file (TEST_USER_EMAIL and TEST_USER_PASSWORD)
- **Security**: Never store credentials in behavior files or test code - only in .env file
- **Password format**: If password contains special characters (like #), it must be quoted in .env file: `TEST_USER_PASSWORD="your-password"`
- Ensure credentials are correctly loaded from .env
- Login uses Local login type (not Staff or Azure AD)
- Verify both "StudentAppBackOffice" and "Student App IT Admin" texts appear after login

### After Successful Regeneration

Report to user:
```
✓ Test successfully regenerated and verified!

What changed:
- [list any detectable differences in selectors, structure, etc.]

The test now passes and is ready for regression testing.

Updated files:
- tests/sim-backoffice-login-test.spec.ts
- test-behaviors/sim-backoffice-login-test.md

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
