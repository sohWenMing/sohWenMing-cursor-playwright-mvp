---
name: Create New Branch
description: Create a new workspace to try changes without affecting the main project
---

# Create New Branch

This command creates a new "branch" - think of it as a separate workspace where you can make changes without affecting your main project.

## What this does:
1. Asks for a name for your new branch
2. Creates the branch
3. Switches you to the new branch
4. Confirms you're now working in the new space

## When to use this:
- Testing new features
- Trying risky changes
- Working on multiple things at once
- Preparing changes before merging to main

## Instructions for Cursor:

### Step 1: Show Current Status
```bash
git branch --show-current
```
Display: "You're currently on branch: [current-branch]"

### Step 2: Ask for Branch Name
Prompt user: "What would you like to name the new branch?"

Naming guidelines to share:
- Use lowercase and hyphens
- Be descriptive
- Examples: "add-payment-test", "fix-login-bug", "experiment-new-selectors"

### Step 3: Validate Name
- Check if branch already exists: `git branch --list [name]`
- If exists, ask for different name
- If valid, proceed

### Step 4: Create and Switch
```bash
git checkout -b [branch-name]
```

### Step 5: Confirm Success
```
✓ Created new branch: [branch-name]
✓ Switched to: [branch-name]

You're now working in a separate workspace. Changes here won't affect 
your main branch until you choose to merge them.

To go back to your previous branch:
Use the command: git checkout [previous-branch]
```

## Additional info to provide:
```
Tip: Your branches:
[show: git branch]

The * indicates your current branch.
```

## Error handling:
- If branch name is invalid, explain valid naming
- If checkout fails, show error and suggest fixes
- If user cancels, don't create anything
