---
name: Generate New E2E Test
description: Create a new automated test by describing the behavior you want to test
---

# Generate New E2E Test

This command creates a new automated test based on your description. The AI will:
1. Verify the behavior works in a real browser
2. Generate a robust test script
3. Verify the test passes
4. Set up self-healing capabilities

## Instructions for Cursor:

This is a complex multi-step workflow. Follow each step carefully.

═══════════════════════════════════════════════════════════════
STEP 1: GATHER INFORMATION
═══════════════════════════════════════════════════════════════

Prompt the user for:

1. **Test Name**: "What would you like to name this test?"
   - Suggest format: feature-name (e.g., "login-flow", "checkout-process")
   - Must be lowercase with hyphens

2. **Starting URL**: "What is the starting URL for this test?"
   - Example: https://your-app.com/login
   - Save as: startUrl

3. **Behavior Description**: "Describe step-by-step what the test should do:"
   Example response:
   ```
   1. Navigate to login page
   2. Enter email address
   3. Enter password
   4. Click login button
   5. Verify user is redirected to dashboard
   6. Verify welcome message is visible
   ```
   - Save as: behaviorSteps (array)

4. **Expected Outcome**: "What should happen if everything works correctly?"
   - Example: "User should be logged in and see their dashboard"
   - Save as: expectedOutcome

═══════════════════════════════════════════════════════════════
STEP 2: CHECK ENVIRONMENT SETUP
═══════════════════════════════════════════════════════════════

Check if `.env` file exists:
```bash
test -f .env && echo "exists" || echo "not found"
```

If NOT EXISTS:
```
I notice this is your first test that needs credentials.

Let me set up the environment file for secure credential storage.
```

Create `.env` from template:
```bash
cp env.template .env
```

Prompt for credentials:
```
Please provide the following information:
(These will be stored securely in .env file - NOT in your test code)

1. Application URL: [prepopulate with startUrl base]
2. Test user email: 
3. Test user password: 

Enter each value:
```

Update `.env` file with provided values.

Confirm:
```
✓ Environment file created and configured
✓ Your credentials are stored securely in .env (git-ignored)
```

═══════════════════════════════════════════════════════════════
STEP 3: VERIFY BEHAVIOR WITH BROWSER PLUGIN
═══════════════════════════════════════════════════════════════

Inform user:
```
Step 1/5: Verifying behavior is achievable...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I'm going to test each step using a real browser to make sure 
everything works before creating the test script.

Watch for the browser actions...
```

For EACH step in behaviorSteps:

a) Use browser_navigate to starting URL (first step only)
b) Use browser_snapshot to see current page state
c) Identify elements needed for this step
d) Use browser plugin tools to perform the action:
   - browser_click for clicks
   - browser_type for text entry
   - browser_wait_for for waits
e) Record the element ref and action taken
f) Store in: capturedActions array

Example capturedActions structure:
```javascript
[
  {
    step: "Enter email address",
    action: "type",
    element: "textbox 'Email'",
    ref: "role=textbox[name='Email']",
    value: "[from env.TEST_USER_EMAIL]"
  },
  {
    step: "Click login button", 
    action: "click",
    element: "button 'Log In'",
    ref: "role=button[name='Log In']"
  }
]
```

If ANY step fails:
```
✗ Unable to verify behavior

Failed at step: [step description]
Error: [error message]

This means the behavior cannot be achieved through the browser.
Possible reasons:
- URL is incorrect or inaccessible
- Element selectors have changed
- Feature is not working
- Credentials are wrong

STOPPING test generation.

Please verify the behavior manually and try again, or contact 
the development team if there's a bug.
```
STOP execution if verification fails.

If ALL steps succeed:
```
✓ Behavior verified successfully!

I was able to complete all steps:
[list each step with ✓]

The expected outcome was achieved.
Moving on to test generation...
```

═══════════════════════════════════════════════════════════════
STEP 4: GENERATE PLAYWRIGHT LOCATORS
═══════════════════════════════════════════════════════════════

Inform user:
```
Step 2/5: Generating robust test locators...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

For each captured action that interacted with an element:

Use Playwright MCP tool: `browser_generate_locator`
- Input: element description and ref from capturedActions
- Output: Playwright locator code

Example:
```typescript
// Input ref: "role=textbox[name='Email']"
// Generated: page.getByRole('textbox', { name: 'Email' })
```

Store in: playwrightLocators array mapped to actions

If Playwright MCP not available or fails:
```
Note: Playwright MCP not available, using best-practice locators directly.
```

Convert refs to Playwright locators using priority:
1. getByRole - for role-based refs
2. getByLabel - for form labels
3. getByPlaceholder - for placeholders
4. getByText - for text content
5. getByTestId - if data-testid present

═══════════════════════════════════════════════════════════════
STEP 5: QUERY CONTEXT7 FOR BEST PRACTICES
═══════════════════════════════════════════════════════════════

Query Context7 for latest Playwright guidance:
- Query: "Playwright test best practices non-brittle selectors"
- Library: playwright

Use the returned best practices to inform test structure.

═══════════════════════════════════════════════════════════════
STEP 6: WRITE TEST FILE
═══════════════════════════════════════════════════════════════

Inform user:
```
Step 3/5: Writing test script...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Create test file: `tests/[test-name].spec.ts`

Template:
```typescript
import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('[Test Name in Title Case]', () => {
  test('[behavior description]', async ({ page }) => {
    // Step 1: [first step description]
    await page.goto(process.env.APP_URL + '[path]');
    
    // Step 2: [second step description]
    [generated locator action]
    
    // Continue for each step...
    
    // Verify: [expected outcome]
    [generated assertions]
  });
});
```

Key requirements:
- Import dotenv and configure
- Use process.env for ALL credentials and URLs
- Use generated Playwright locators
- Add descriptive comments for each step
- Include proper assertions for expected outcome
- Use await for all async operations
- Follow Playwright best practices from Context7

═══════════════════════════════════════════════════════════════
STEP 7: EXECUTE TEST TO VERIFY
═══════════════════════════════════════════════════════════════

Inform user:
```
Step 4/5: Verifying generated test...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Running the test to make sure it works...
```

Execute:
```bash
npx playwright test tests/[test-name].spec.ts
```

Attempt counter: 1 (max 5 attempts)

If TEST FAILS:
```
Test attempt [X]/5 failed.
Error: [error message]

Analyzing failure and regenerating test...
```

Analyze the error:
- Wrong locator? Try alternative selector strategy
- Timing issue? Add explicit waits
- Wrong assertion? Adjust expected values
- Navigation issue? Check URL paths

Regenerate test with fixes and try again.
Increment attempt counter.

If all 5 attempts fail:
```
✗ Unable to generate working test after 5 attempts.

The behavior works in the browser, but I couldn't create a 
reliable test script.

Possible issues:
- Complex dynamic behavior
- Timing-sensitive operations
- Authentication complications

Manual intervention needed. The test file has been saved at:
tests/[test-name].spec.ts

You can manually adjust the test or contact support.
```
STOP execution.

If TEST PASSES:
```
✓ Test passed successfully!

The generated test correctly performs all steps and verifies 
the expected outcome.
```

═══════════════════════════════════════════════════════════════
STEP 8: CREATE SUPPORTING FILES
═══════════════════════════════════════════════════════════════

Inform user:
```
Step 5/5: Creating documentation and self-heal command...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 8a: Create Behavior Documentation

**CRITICAL SECURITY RULE**: Never include actual credentials (usernames, passwords, API keys) in behavior documentation files. Always reference `.env` file variables instead.

Create: `test-behaviors/[test-name].md`

Content:
```markdown
# [Test Name] - Expected Behavior

## Test File
`tests/[test-name].spec.ts`

## Purpose
[purpose of test]

## Starting Point
- URL: [startUrl]
- Prerequisites: Valid test credentials stored in `.env` file (TEST_USER_EMAIL and TEST_USER_PASSWORD)

## Steps

1. [step 1]
2. [step 2]
3. [step 3]
...

## Expected Outcome

[expectedOutcome]

## Test Created
[timestamp]

## Last Verified
[timestamp]

## Notes
- **Credentials**: All credentials are read from `.env` file (TEST_USER_EMAIL and TEST_USER_PASSWORD)
- **Security**: Never hardcode credentials in test files or documentation
- [any other special notes about the test]
```

### 8b: Create Self-Heal Command

Create: `.cursor/commands/self-heal-[test-name].md`

Content:
```markdown
---
name: Self-Heal [Test Name]
description: Regenerate the [test-name] test script when it fails but behavior still works
---

# Self-Heal [Test Name] Test

⚠️ **IMPORTANT**: Only use this command if you have verified that the 
behavior STILL WORKS when you test it manually in your browser, but the 
automated test is failing.

## Behavior Reference

**Read the expected behavior from:** `test-behaviors/[test-name].md`

The behavior file is the single source of truth for what this test should do. 
All behavior steps, expected outcomes, and special notes are documented there.

## Test File Location
`tests/[test-name].spec.ts`

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

1. Read the behavior steps from `test-behaviors/[test-name].md`
2. Use browser plugin to verify each step still works
3. Capture new element refs if they've changed
4. Generate new Playwright locators (using MCP if available)
5. Write updated test file
6. Verify test passes
7. Maximum 5 regeneration attempts

### Regeneration Protocol

Follow the EXACT same steps as "Generate New E2E Test" command, but:
- Read the behavior steps from `test-behaviors/[test-name].md` (the single source of truth)
- Overwrite the existing test file: tests/[test-name].spec.ts
- Update the behavior doc with "Last Verified: [new timestamp]"
- Report what changed (if you can detect it)
- Overwrite the existing test file: tests/[test-name].spec.ts
- Update the behavior doc with "Last Verified: [new timestamp]"
- Report what changed (if you can detect it)

### After Successful Regeneration

Report to user:
```
✓ Test successfully regenerated and verified!

What changed:
- [list any detectable differences in selectors, structure, etc.]

The test now passes and is ready for regression testing.

Updated files:
- tests/[test-name].spec.ts
- test-behaviors/[test-name].md

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

Please:
1. Manually verify the behavior again
2. Check if any steps have changed
3. Consider updating the behavior description
4. Manual test modification may be needed
```
```

═══════════════════════════════════════════════════════════════
STEP 9: FINAL CONFIRMATION
═══════════════════════════════════════════════════════════════

Display success message:
```
═══════════════════════════════════════════════════════════════
✓ TEST GENERATION COMPLETE!
═══════════════════════════════════════════════════════════════

Test Name: [test-name]
Test File: tests/[test-name].spec.ts

What was created:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Test script (TypeScript)
✓ Behavior documentation
✓ Self-heal command

The test:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Behavior verified in real browser
✓ Test script generated with robust locators
✓ Test execution passed
✓ Ready for regression testing

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. VERIFY IN HEADED MODE (Recommended):
   Run command: "Run Test in Headed Mode"
   Select: [test-name].spec.ts
   
   This lets you watch the test execute to confirm it works correctly.

2. COMMIT YOUR CHANGES:
   Run command: "Commit Changes"
   Message: "Add [test-name] test"

3. ADD TO REGRESSION SUITE:
   This test will automatically run when you use "Run All Tests"

═══════════════════════════════════════════════════════════════

🎉 Your test is ready! Would you like to run it in headed mode now 
to see it in action? (yes/no)
```

If yes:
```bash
npx playwright test tests/[test-name].spec.ts --headed
```

═══════════════════════════════════════════════════════════════
ERROR HANDLING SUMMARY
═══════════════════════════════════════════════════════════════

Throughout the process:

- If browser verification fails → Stop, report to user
- If test generation fails after 5 attempts → Save attempt, report to user
- If file creation fails → Report error, offer retry
- If environment setup fails → Guide user through manual setup
- Always provide clear, actionable error messages
- Never leave the user stuck without next steps

═══════════════════════════════════════════════════════════════
