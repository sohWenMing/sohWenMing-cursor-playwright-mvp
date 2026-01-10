---
name: Push to Remote
description: Upload your saved changes to GitHub/GitLab (backup and share with team)
---

# Push to Remote Repository

This command uploads your locally saved changes to a remote server (like GitHub or GitLab) so others can see them and as a backup.

## What this does:
1. Shows your current branch
2. Confirms you want to push
3. Uploads your changes to the remote server
4. Confirms success

## Prerequisites:
- You must have commits to push (changes that have been saved locally)
- A remote repository must be configured (GitHub, GitLab, etc.)

## Instructions for Cursor:

### Step 1: Check Current Status
```bash
git branch --show-current
git status
```

Display:
```
Current branch: [branch-name]
Status: [ahead by X commits / up to date / behind]
```

If no commits ahead, inform user: "You're up to date. No changes to push."

### Step 2: Confirm with User
```
You're about to push branch '[branch-name]' to the remote repository.

This will upload [X] commit(s):
[show: git log origin/[branch]..HEAD --oneline]

Continue? (yes/no)
```

### Step 3: Determine Push Type
Check if this is first push for this branch:
```bash
git rev-parse --verify origin/[branch-name]
```

If branch doesn't exist remotely:
```bash
git push -u origin [branch-name]
```

If branch exists:
```bash
git push origin [branch-name]
```

### Step 4: Confirm Success
```
✓ Successfully pushed to remote!

Branch: [branch-name]
Remote: origin
Commits pushed: [X]

Your changes are now backed up and visible to your team.
```

## Error handling:

### If no remote configured:
```
❌ No remote repository configured.

You need to connect this project to GitHub/GitLab first.
Would you like instructions on how to do this?
```

### If push rejected (behind remote):
```
❌ Push rejected - the remote has changes you don't have locally.

You need to get the latest changes first:
1. Run: git pull origin [branch-name]
2. Resolve any conflicts if they occur
3. Try pushing again

Would you like me to pull the latest changes?
```

### If authentication fails:
```
❌ Authentication failed.

Make sure you're logged in to GitHub/GitLab.
Check your credentials or access tokens.
```

## Safety features:
- Never force push without explicit user request
- Always show what will be pushed
- Always require confirmation
- Explain errors in non-technical terms
- Offer solutions for common problems

## Special case - Force Push Warning:
If user explicitly requests force push (not recommended):
```
⚠️ DANGER: Force push will overwrite remote history!

This can cause problems for other team members.
Only do this if you're absolutely sure.

Type "FORCE PUSH CONFIRMED" to proceed:
```
