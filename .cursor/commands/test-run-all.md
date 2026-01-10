---
name: Run All Tests
description: Run all your automated tests and see the results
---

# Run All Tests

This command runs all your Playwright tests in the background (headless mode) and shows you the results.

## What this does:
1. Runs all tests in the `tests/` folder
2. Generates a detailed HTML report
3. Shows you a summary of which tests passed and failed
4. Opens the HTML report in your browser for detailed review

## Instructions for Cursor:

### Step 1: Inform User
```
Starting test execution...
Running all tests in headless mode (tests run in the background).
```

### Step 2: Execute Tests
```bash
npm run test
```

### Step 3: Parse Results
After execution, read the JSON report:
```bash
cat test-results/results.json
```

Parse and display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST EXECUTION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Tests: [X]
✓ Passed: [Y] 
✗ Failed: [Z]
⊘ Skipped: [W]

Duration: [time]
```

### Step 4: List Failed Tests (if any)
If there are failures:
```
Failed Tests:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. tests/login-flow.spec.ts
   Error: [brief error message]
   
2. tests/checkout.spec.ts
   Error: [brief error message]

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For each failed test, determine if:

A) FALSE NEGATIVE (Test script issue - behavior still works)
   → Use the self-heal command for that specific test
   → Example: Run "Self-Heal Login Test" command
   
B) TRUE NEGATIVE (Actual bug - behavior is broken)
   → Contact the development team
   → Share the test report with them
   → Do not run self-heal until the bug is fixed

Tip: If you're not sure, manually test the behavior in your 
browser first to determine which category it falls into.
```

### Step 5: Open HTML Report
```bash
npm run test:report
```

Confirm:
```
✓ Opening detailed HTML report in your browser...

The report shows:
- Screenshots of failures
- Step-by-step test execution
- Error details and stack traces
- Timing information
```

## Success Scenario (All Pass):
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST EXECUTION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Tests: 5
✓ All tests passed! 

Duration: 45.2s

Great job! Your application is working as expected.
All features tested are functioning correctly.
```

## Error Handling:

### If no tests exist:
```
No tests found in the tests/ directory.

Would you like to create your first test?
Use the "Generate New E2E Test" command to get started.
```

### If playwright not installed:
```
Playwright is not installed.
Would you like me to install it now?
```

### If tests hang or timeout:
After 5 minutes of no output:
```
Tests appear to be taking longer than expected.
This might indicate:
- Network issues
- Application not responding
- Test configuration problems

Would you like to:
1. Continue waiting
2. Stop the tests
3. Run in headed mode to see what's happening
```

## Additional Features:

Offer after showing results:
```
What would you like to do next?
1. View detailed report for a specific test
2. Re-run failed tests only
3. Run a specific test in headed mode
4. Self-heal failed tests
```
