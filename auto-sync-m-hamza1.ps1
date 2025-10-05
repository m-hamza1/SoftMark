# Auto-Sync Script for SoftMark
# This will automatically sync your local changes to GitHub Pages

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Auto-Sync to m-hamza1 GitHub" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Get current timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Stage all changes
Write-Host "Staging changes..." -ForegroundColor Yellow
git add -A

# Check if there are changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes to sync" -ForegroundColor Green
    exit 0
}

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Auto-sync: Updates on $timestamp"

# Push to master
Write-Host "Pushing to master branch..." -ForegroundColor Yellow
git push m-hamza1 master

# Update gh-pages for live site
Write-Host "Updating GitHub Pages..." -ForegroundColor Yellow
$currentBranch = git branch --show-current

# Checkout gh-pages
git checkout gh-pages 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Creating gh-pages branch..." -ForegroundColor Yellow
    git checkout -b gh-pages
}

# Merge from master
git merge master -m "Auto-sync to GitHub Pages: $timestamp"

# Push to gh-pages
git push m-hamza1 gh-pages -f

# Return to original branch
git checkout $currentBranch

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "  ✓ Auto-Sync Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your changes are now live at:" -ForegroundColor Cyan
Write-Host "https://m-hamza1.github.io/SoftMark/" -ForegroundColor Green
Write-Host ""
Write-Host "Synced at: $timestamp" -ForegroundColor White
Write-Host ""
