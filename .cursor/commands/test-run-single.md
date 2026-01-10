---
name: Run Single Test
description: Run one specific test to check if it passes
---

# Run Single Test

This command runs just one test file, useful for quickly checking a specific feature without running all tests.

## What this does:
1. Shows you available test files
2. Runs the test you select
3. Shows detailed results for that test

## Instructions for Cursor:

### Step 1: List Available Tests
```bash
ls -1 tests/*.spec.ts
```

Display:
```
Available tests:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. login-flow.spec.ts
2. checkout.spec.ts
3. profile-update.spec.ts
...

Which test would you like to run?
Type the number or filename:
```

### Step 2: Wait for User Selection
User can provide:
- Number (1, 2, 3...)
- Filename (login-flow.spec.ts)
- Partial name (login)

### Step 3: Run Selected Test
```bash
npx playwright test tests/[selected-test].spec.ts
```

Show output:
```
Running: [test-name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[real-time test output]
```

### Step 4: Display Results

If PASSED:
```
✓ TEST PASSED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test: [test-name]
Duration: [time]
All checks passed successfully!

The tested feature is working as expected.
```

If FAILED:
```
✗ TEST FAILED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test: [test-name]
Error: [error message]

Failure Details:
[detailed error information]

Screenshot saved: [path]

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Check if the feature still works manually:
   - Open your browser
   - Try the same steps the test performs
   
2. If feature WORKS manually:
   → This is a FALSE NEGATIVE (test script issue)
   → Use the self-heal command: "Self-Heal [test-name]"
   
3. If feature DOESN'T WORK manually:
   → This is a TRUE NEGATIVE (actual bug)
   → Contact the development team
   → Share this error report

Would you like to:
a) Run this test in headed mode to see what's happening
b) View the failure screenshot
c) Run the self-heal command for this test
```

### Step 5: Offer Next Actions
```
What would you like to do next?

1. Run again in headed mode (see the browser)
2. Run all tests
3. View HTML report
4. Self-heal this test
5. Exit
```

## Error Handling:

### If test file doesn't exist:
```
Test file '[name]' not found.

Available tests are:
[list files]

Please select a valid test.
```

### If no tests directory:
```
No tests directory found.
Have you created any tests yet?

Use the "Generate New E2E Test" command to create your first test.
```

## Quick Re-run Option:

After showing results, offer:
```
Press 'r' to re-run this test
Press 'h' to run in headed mode
Press 'q' to quit
```
