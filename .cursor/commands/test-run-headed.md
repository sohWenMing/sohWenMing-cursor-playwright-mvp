---
name: Run Test in Headed Mode
description: Run a test with the browser visible so you can see what's happening
---

# Run Test in Headed Mode

This command runs a test with the browser window visible, so you can watch the test execute step by step. This is useful for:
- Verifying test behavior visually
- Debugging failing tests
- Understanding what the test does
- Confirming tests work correctly

## What this does:
1. Shows available tests
2. Runs the selected test with browser visible
3. You can watch each action happen in real-time

## Instructions for Cursor:

### Step 1: List Available Tests
```bash
ls -1 tests/*.spec.ts
```

Display:
```
Available tests to run in headed mode:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. login-flow.spec.ts
2. checkout.spec.ts
3. profile-update.spec.ts
...

Which test would you like to watch?
Type the number or filename:
```

### Step 2: Wait for User Selection

### Step 3: Inform User
```
Starting test in HEADED mode...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The browser window will open and you'll see:
- Each action the test performs
- What elements it interacts with
- The final result

Watch the browser window that's about to open...
```

### Step 4: Execute Test
```bash
npx playwright test tests/[selected-test].spec.ts --headed
```

### Step 5: After Execution

If PASSED:
```
✓ TEST COMPLETED SUCCESSFULLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test: [test-name]
Duration: [time]

You saw the test execute successfully!
The browser performed all actions as expected.

This confirms the test is working correctly.
```

If FAILED:
```
✗ TEST FAILED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test: [test-name]
Error: [error message]

Did you see what went wrong in the browser?

Common issues you might have observed:
- Element not found (wrong selector)
- Timing issue (page not loaded)
- Wrong URL or navigation problem
- Authentication issue

Next steps:
1. If the manual behavior works but test fails → Use self-heal command
2. If you saw an actual bug → Contact development team
3. If you need to see it again → Re-run this command

Would you like to:
a) Run again in headed mode
b) Try the self-heal command
c) Run with Playwright Inspector (debug mode)
```

## Debug Mode Option:

After a failure, offer:
```
💡 Pro tip: Run in DEBUG mode?

Debug mode lets you:
- Pause at each step
- Inspect elements
- Step through the test manually
- Try different selectors

Run in debug mode? (yes/no)
```

If yes:
```bash
npx playwright test tests/[selected-test].spec.ts --debug
```

Explain:
```
DEBUG MODE STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Playwright Inspector has opened.

How to use it:
1. Click the "Play" button to start
2. Click "Step over" to go one action at a time
3. Hover over the test code to see what each line does
4. Click "Resume" to continue running

This helps you see exactly where the test fails.
```

## Special Features:

### Slow Motion Option:
```
Would you like to run in slow motion?
This makes each action slower so you can see it clearly.

Run with slow motion? (yes/no)
```

If yes:
```bash
npx playwright test tests/[selected-test].spec.ts --headed --slow-mo=1000
```

### Multiple Browser Support:
```
Which browser would you like to use?
1. Chromium (Chrome-like)
2. Firefox
3. WebKit (Safari-like)
```

Based on selection:
```bash
npx playwright test tests/[selected-test].spec.ts --headed --project=[browser]
```

## Error Handling:

### If browser doesn't open:
```
The browser didn't open. This might be because:
- Playwright browsers need to be installed
- Display/graphics issue

Would you like me to:
1. Install Playwright browsers
2. Try running in headless mode instead
3. Check the installation
```

## User Guidance:

Before running, show:
```
WHAT TO WATCH FOR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Does the page load correctly?
✓ Does it find the right elements?
✓ Do the actions complete successfully?
✓ Is the timing appropriate (not too fast)?
✓ Does the final result match expectations?

Keep your eyes on the browser window!
```
