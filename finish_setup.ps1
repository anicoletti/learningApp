$ErrorActionPreference = 'Stop'
Set-Location C:\Users\alexn\Documents\gemini\learningApps

Write-Host "Temporarily hiding .git to avoid interactive prompt..."
Move-Item -Path .\.git -Destination ..\.git_temp

Write-Host "Initializing periodicTable Expo App..."
Set-Location apps
npx --yes create-expo-app@latest periodicTable --template blank-typescript
Set-Location ..

Write-Host "Restoring .git..."
Move-Item -Path ..\.git_temp -Destination .\.git

Write-Host "Installing monorepo dependencies..."
npm install

Write-Host "Committing setup..."
git add .
git commit -m "Initial monorepo setup for learning apps"

Write-Host "Creating GitHub Repository..."
gh repo create anicoletti/learningApp --public --source=. --remote=origin --push

Write-Host "Running issue creation script..."
.\create_issues.ps1

Write-Host "Complete!"
