#!/bin/bash

# Script to purge sensitive data from Git repository
# WARNING: This rewrites Git history. Make sure all collaborators are aware and pull the new history.

# This script uses git filter-repo to remove sensitive information permanently from Git history
# Install git-filter-repo: pip install git-filter-repo

echo "WARNING: This script will rewrite Git history to remove sensitive data."
echo "Make sure you have communicated this with all collaborators."
echo "They will need to clone a fresh copy of the repository after this."
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# Make sure we have the latest code
git fetch --all

# Create a backup branch
git branch backup-before-purge

# Use git filter-repo to replace sensitive data
# Replace real email with placeholder
git filter-repo --replace-text <<EOF
regex:[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,4}=>[email protected]
supabase-auth=>PASSWORD_REMOVED
EOF

echo ""
echo "Sensitive data has been purged from the repository history."
echo "A backup branch 'backup-before-purge' has been created."
echo ""
echo "Next steps:"
echo "1. Force push the changes: git push origin --force"
echo "2. Ask all collaborators to clone a fresh copy of the repository"
echo "3. Delete the backup branch when everything is confirmed working: git branch -D backup-before-purge" 