---
name: Rollback to Previous Commit
description: Go back to a previous version of your project (CAREFUL - this undoes recent changes)
---

# Rollback to Previous Commit

⚠️ **WARNING**: This will undo changes made after the selected commit. Use carefully!

This command helps you go back to an earlier version of your project if something went wrong.

## What this does:
1. Shows recent commits so you can choose which version to go back to
2. Creates a safety backup branch before rolling back
3. Resets your project to the selected earlier version

## Instructions for Cursor:

### Step 1: Show Recent Commits
Run: `git log --oneline --graph --decorate -10`

Display to user:
```
Recent commits - which version do you want to go back to?

1. abc1234 - Added checkout test (current)
2. def5678 - Fixed login test  
3. ghi9012 - Initial test setup
...

Type the number or commit hash of the version you want to return to.
```

### Step 2: Confirm with User
⚠️ **CRITICAL**: Before proceeding, confirm:
```
WARNING: This will undo all changes after commit [selected].
The following commits will be undone:
- [list commits that will be lost]

Do you want to continue? (yes/no)
```

If user says no, STOP immediately.

### Step 3: Create Safety Branch
```bash
git branch backup-[timestamp]
```
Confirm: "✓ Created safety backup at branch: backup-[timestamp]"

### Step 4: Perform Rollback
```bash
git reset --hard [selected-commit-hash]
```

### Step 5: Confirm Success
```
✓ Successfully rolled back to commit [hash]
✓ Your previous state is saved in branch: backup-[timestamp]

Current state:
[show git log -1]

If you need to undo this rollback, use the "Create New Branch" command 
and switch to: backup-[timestamp]
```

## Error handling:
- If there are uncommitted changes, warn user they will be lost
- Offer to commit changes first
- If git operation fails, explain the error clearly
- Never perform destructive operations without explicit confirmation

## Safety features:
- Always create backup branch before rollback
- Always require explicit confirmation
- Show exactly what will be undone
- Provide recovery instructions
