---
name: Commit Changes
description: Save your current changes to version control with a descriptive message
---

# Commit Changes to Git

This command helps you save your current work to version control (Git) so you can track changes over time.

## What this does:
1. Shows you what files have been changed
2. Asks for a description of what you changed
3. Saves those changes with your description

## Instructions for Cursor:

1. Run `git status` to show the user what has changed
2. Display a clear summary of:
   - New files
   - Modified files
   - Deleted files
3. If there are no changes, inform the user and stop
4. If there are changes:
   - Run `git add .` to stage all changes
   - Ask the user: "Please provide a commit message describing what you changed:"
   - Wait for user input
   - Run `git commit -m "[user's message]"`
   - Confirm success with a message like: "✓ Changes committed successfully!"
   - Show the commit hash and message

## Example conversation:
```
Agent: "I found the following changes:
- Modified: tests/login-flow.spec.ts
- New file: tests/checkout.spec.ts

Please provide a commit message describing what you changed:"

User: "Added checkout test and fixed login test"

Agent: "✓ Changes committed successfully!
Commit: abc1234 - Added checkout test and fixed login test"
```

## Error handling:
- If git is not initialized, explain that the repository needs to be set up first
- If user cancels, don't commit anything
- Show clear error messages if commit fails
