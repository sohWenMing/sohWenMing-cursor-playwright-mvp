---
name: Analyze Test Results
description: Review the last test run and get guidance on what to do next
---

# Analyze Test Results

This command reviews the most recent test execution and provides clear guidance on what to do with any failures.

## What this does:
1. Reads the latest test results
2. Categorizes each test as passed or failed
3. Provides specific next steps for each failure
4. Helps you decide between self-healing or bug reporting

## Instructions for Cursor:

### Step 1: Check for Recent Test Results
```bash
test -f test-results/results.json && echo "exists" || echo "not found"
```

If not found:
```
No test results found.

You need to run tests first.
Would you like to:
1. Run all tests now
2. Run a specific test
```

### Step 2: Parse Results JSON
Read and parse: `test-results/results.json`

### Step 3: Display Summary
```
TEST RESULTS ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Last Run: [timestamp]
Total Tests: [X]
Duration: [time]

Status Breakdown:
✓ Passed: [Y] ([percentage]%)
✗ Failed: [Z] ([percentage]%)
⊘ Skipped: [W]

Overall Health: [Excellent/Good/Needs Attention/Critical]
```

### Step 4: Detail Passed Tests
```
PASSED TESTS ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ tests/login-flow.spec.ts (2.3s)
✓ tests/profile-update.spec.ts (1.8s)
✓ tests/search-functionality.spec.ts (3.1s)

These features are working correctly!
```

### Step 5: Detail Failed Tests with Guidance
```
FAILED TESTS ✗
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For each failed test, you need to determine:
Is this a FALSE NEGATIVE or TRUE NEGATIVE?

══════════════════════════════════════════

Test 1: tests/checkout.spec.ts
Duration: 5.2s (failed)
Error: locator.click: Timeout 30000ms exceeded

What this means:
The test couldn't find or click an element within 30 seconds.

Decision Matrix:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ask yourself:
"Can I manually complete the checkout process in my browser?"

→ YES, checkout works manually:
  ✓ This is a FALSE NEGATIVE (test script issue)
  ✓ Action: Use self-heal command
  ✓ Command: "Self-Heal Checkout Test"
  
→ NO, checkout is actually broken:
  ✗ This is a TRUE NEGATIVE (real bug)
  ✗ Action: Report to development team
  ✗ Do not self-heal yet
  
→ UNSURE:
  ? Action: Run in headed mode to see
  ? Command: "Run Test in Headed Mode"
  ? Select: checkout.spec.ts

══════════════════════════════════════════

Test 2: tests/login-flow.spec.ts
Duration: 1.1s (failed)
Error: expect(locator).toBeVisible: Locator not visible

What this means:
The test expected to see an element but couldn't find it.

Decision Matrix:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ask yourself:
"Can I log in successfully in my browser?"

→ YES, login works manually:
  ✓ This is a FALSE NEGATIVE (test script issue)
  ✓ Action: Use self-heal command
  ✓ Command: "Self-Heal Login Test"
  
→ NO, login is broken:
  ✗ This is a TRUE NEGATIVE (real bug)
  ✗ Action: Report to development team
  
→ UNSURE:
  ? Action: Run in headed mode
  ? Command: "Run Test in Headed Mode"

══════════════════════════════════════════
```

### Step 6: Provide Action Summary
```
RECOMMENDED ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Immediate Actions:

1. For FALSE NEGATIVES (feature works, test fails):
   
   Run these self-heal commands:
   → "Self-Heal Checkout Test"
   → "Self-Heal Login Test"
   
   These will regenerate the test scripts to match
   the current working behavior.

2. For TRUE NEGATIVES (feature is broken):
   
   Contact development team with:
   → Test name: [name]
   → Error message: [error]
   → Screenshot: [path]
   → Expected behavior: [from behavior doc]
   
   Do NOT self-heal until the bug is fixed.

3. For UNSURE cases:
   
   Run in headed mode to visually verify:
   → "Run Test in Headed Mode"
   → Watch what happens
   → Then decide: self-heal or bug report

Would you like me to:
a) Open the HTML report for detailed view
b) Help you run self-heal commands
c) Prepare bug report information
d) Run failed tests in headed mode
```

### Step 7: Trend Analysis (if historical data available)
```
TEST HEALTH TRENDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comparing to previous runs:

tests/checkout.spec.ts:
  Last 5 runs: ✓ ✓ ✓ ✗ ✗
  Status: Recently broken (was working)
  → Likely TRUE NEGATIVE (recent code change broke it)

tests/login-flow.spec.ts:
  Last 5 runs: ✗ ✗ ✗ ✗ ✗
  Status: Consistently failing
  → Likely FALSE NEGATIVE (test needs updating)

This helps prioritize what to fix first.
```

## Error Handling:

### If results file is corrupted:
```
Unable to parse test results.
The results file may be corrupted.

Try:
1. Run tests again
2. Check: test-results/results.json
```

### If very old results:
```
⚠️ Warning: These results are from [X days] ago.
They may not reflect the current state.

Run tests again for current results? (yes/no)
```

## Quick Actions:

At the end, provide buttons/commands:
```
Quick Actions:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] Run All Tests Again
[2] Open HTML Report
[3] Self-Heal All False Negatives
[4] Export Bug Reports
[5] Run Failed Tests in Headed Mode

Enter number (1-5) or 'q' to quit:
```
