$ErrorActionPreference = 'Stop'

Write-Host "Installing web dependencies for Solar System..."
Set-Location C:\Users\alexn\Documents\gemini\learningApps\apps\solarSystem
npx expo install react-dom react-native-web @expo/metro-runtime

Write-Host "Installing web dependencies for Periodic Table..."
Set-Location C:\Users\alexn\Documents\gemini\learningApps\apps\periodicTable
npx expo install react-dom react-native-web @expo/metro-runtime

Write-Host "Committing and pushing..."
Set-Location C:\Users\alexn\Documents\gemini\learningApps
git add .
git commit -m "Add web dependencies and update README prerequisites"
git push origin master

Write-Host "Done!"
