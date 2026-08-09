$ErrorActionPreference = 'Stop'

Write-Host "Downgrading Solar System to Expo SDK 54..."
Set-Location C:\Users\alexn\Documents\gemini\learningApps\apps\solarSystem
npm install expo@^54.0.0
npx expo install --fix

Write-Host "Downgrading Periodic Table to Expo SDK 54..."
Set-Location C:\Users\alexn\Documents\gemini\learningApps\apps\periodicTable
npm install expo@^54.0.0
npx expo install --fix

Write-Host "Committing and pushing changes..."
Set-Location C:\Users\alexn\Documents\gemini\learningApps
git add .
git commit -m "Downgrade to Expo SDK 54 for Expo Go compatibility"
git push origin master

Write-Host "Done downgrading!"
