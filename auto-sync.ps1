# Auto GitHub Sync Script for Windows PowerShell
# Run this script in your project folder after making any changes

while ($true) {
    git add .
    $status = git status --porcelain
    if ($status) {
        $msg = "Auto update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m $msg
        git push origin master
        Write-Host "Changes pushed to GitHub at $msg"
    }
    Start-Sleep -Seconds 10 # Check every 10 seconds
}
