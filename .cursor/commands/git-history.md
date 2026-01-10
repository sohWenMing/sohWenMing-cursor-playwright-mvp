---
name: View Commit History
description: See the history of changes made to the project
---

# View Commit History

This command shows you the history of all changes (commits) made to the project, so you can see what was changed and when.

## What this does:
Shows the last 10 commits with:
- When the change was made
- Who made the change
- What they changed (commit message)
- A unique ID for each change

## Instructions for Cursor:

1. Run: `git log --oneline --graph --decorate -10`
2. Display the results in an easy-to-read format
3. Explain each column to the user:
   - The short hash (unique ID)
   - The branch indicator
   - The commit message
   - When it was made (if using --format)

Alternative format for more detail:
```bash
git log --pretty=format:"%h - %an, %ar : %s" -10
```

Display format:
```
Recent Commits (last 10):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
abc1234 - John Doe, 2 hours ago : Added checkout test
def5678 - John Doe, 1 day ago : Fixed login test
ghi9012 - Jane Smith, 3 days ago : Initial test setup
...
```

## Additional options:
- Ask user if they want to see more commits
- Offer to show detailed info for a specific commit: `git show [hash]`

## Error handling:
- If no commits exist yet, explain that no changes have been saved yet
- If git is not initialized, explain that version control is not set up
