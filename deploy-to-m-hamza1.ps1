# Deploy SoftMark to m-hamza1 GitHub Account
# This script will set up a new remote and push to your GitHub account

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  SoftMark Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Add new remote for m-hamza1
Write-Host "Step 1: Adding remote for m-hamza1..." -ForegroundColor Yellow
git remote add m-hamza1 https://github.com/m-hamza1/SoftMark.git 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Remote already exists, updating URL..." -ForegroundColor Yellow
    git remote set-url m-hamza1 https://github.com/m-hamza1/SoftMark.git
}

# Step 2: Ensure all changes are committed
Write-Host ""
Write-Host "Step 2: Checking for uncommitted changes..." -ForegroundColor Yellow
git add -A
$status = git status --porcelain

if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Green
    git commit -m "Deploy SoftMark site to m-hamza1"
} else {
    Write-Host "No changes to commit" -ForegroundColor Green
}

# Step 3: Push to master branch
Write-Host ""
Write-Host "Step 3: Pushing to m-hamza1/master..." -ForegroundColor Yellow
git push m-hamza1 master -f

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host "  ✓ Successfully pushed to master!" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
}

# Step 4: Create and push gh-pages branch
Write-Host ""
Write-Host "Step 4: Setting up GitHub Pages (gh-pages branch)..." -ForegroundColor Yellow

# Check if gh-pages branch exists locally
$ghPagesExists = git branch --list gh-pages

if (-not $ghPagesExists) {
    Write-Host "Creating gh-pages branch..." -ForegroundColor Yellow
    git checkout -b gh-pages
    git push m-hamza1 gh-pages -f
    git checkout master
} else {
    Write-Host "gh-pages branch exists, pushing..." -ForegroundColor Yellow
    $currentBranch = git branch --show-current
    git checkout gh-pages
    git merge master -m "Sync with master for deployment"
    git push m-hamza1 gh-pages -f
    git checkout $currentBranch
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "  ✓ Deployment Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/m-hamza1/SoftMark" -ForegroundColor White
Write-Host "2. Click on 'Settings' tab" -ForegroundColor White
Write-Host "3. Click on 'Pages' in the left sidebar" -ForegroundColor White
Write-Host "4. Under 'Source', select:" -ForegroundColor White
Write-Host "   - Branch: gh-pages" -ForegroundColor White
Write-Host "   - Folder: / (root)" -ForegroundColor White
Write-Host "5. Click 'Save'" -ForegroundColor White
Write-Host ""
Write-Host "Your live site will be available at:" -ForegroundColor Cyan
Write-Host "https://m-hamza1.github.io/SoftMark/" -ForegroundColor Green
Write-Host ""
Write-Host "Note: First, you need to create the repository on GitHub:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: SoftMark" -ForegroundColor White
Write-Host "3. Make it Public" -ForegroundColor White
Write-Host "4. Do NOT initialize with README" -ForegroundColor White
Write-Host "5. Click 'Create repository'" -ForegroundColor White
Write-Host ""
