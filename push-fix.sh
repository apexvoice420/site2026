#!/bin/bash
# Apex Voice Solutions - Push Fix Script
# Run this to push all local commits to GitHub

cd /data/.openclaw/workspace/apex-site

echo "=== Current Status ==="
git status
echo ""
echo "=== Commits to Push ==="
git log origin/main..HEAD --oneline
echo ""
echo "=== Pushing to GitHub ==="
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub."
    echo "Vercel will auto-deploy in 1-2 minutes."
else
    echo ""
    echo "❌ Push failed. You may need to authenticate."
    echo "Run: git config --global credential.helper store"
    echo "Then: git push origin main"
fi
