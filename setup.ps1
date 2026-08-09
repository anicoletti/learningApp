$ErrorActionPreference = 'Stop'

Write-Host "Initializing git repository..."
git init

Write-Host "Creating package.json..."
$packageJson = @{
    name = "learning-apps-monorepo"
    version = "1.0.0"
    private = $true
    workspaces = @(
        "apps/*",
        "packages/*"
    )
    scripts = @{
        build = "turbo run build"
        dev = "turbo run dev"
        lint = "turbo run lint"
    }
    devDependencies = @{
        turbo = "^2.0.0"
    }
}
$packageJson | ConvertTo-Json -Depth 5 | Set-Content package.json

Write-Host "Creating turbo.json..."
$turboJson = @{
    '$schema' = "https://turbo.build/schema.json"
    pipeline = @{
        build = @{
            dependsOn = @("^build")
            outputs = @("dist/**")
        }
        lint = @{
            dependsOn = @("^lint")
        }
        dev = @{
            cache = $false
            persistent = $true
        }
    }
}
$turboJson | ConvertTo-Json -Depth 5 | Set-Content turbo.json

Write-Host "Creating folder structure..."
New-Item -ItemType Directory -Force -Path apps
New-Item -ItemType Directory -Force -Path packages/shared-ui
New-Item -ItemType Directory -Force -Path packages/core-logic

Write-Host "Creating shared-ui package.json..."
$sharedUiPackage = @{
    name = "shared-ui"
    version = "1.0.0"
    main = "index.js"
}
$sharedUiPackage | ConvertTo-Json -Depth 5 | Set-Content packages/shared-ui/package.json
Set-Content packages/shared-ui/index.js "export const Mascot = 'Sol';"

Write-Host "Creating core-logic package.json..."
$coreLogicPackage = @{
    name = "core-logic"
    version = "1.0.0"
    main = "index.js"
}
$coreLogicPackage | ConvertTo-Json -Depth 5 | Set-Content packages/core-logic/package.json
Set-Content packages/core-logic/index.js "export const Levels = [1, 2, 3, 4];"

Write-Host "Initializing Expo Apps..."
Set-Location apps
npx --yes create-expo-app@latest solarSystem --template blank-typescript
npx --yes create-expo-app@latest periodicTable --template blank-typescript
Set-Location ..

Write-Host "Installing dependencies..."
npm install

Write-Host "Committing initial setup..."
git add .
git commit -m "Initial monorepo setup for learning apps"

Write-Host "Creating GitHub Repository..."
gh repo create anicoletti/learningApp --public --source=. --remote=origin --push

Write-Host "Setup Complete!"
