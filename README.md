# Sol's Learning Apps Monorepo

Welcome to the Learning Apps repository! This project houses interactive, educational science applications built for both mobile and web platforms. 

## Overview
This repository contains two main applications targeting kids and teenagers:
- **Solar System App:** An interactive tour through the galaxy guided by our mechanical orrery mascot, Sol. Features include planetary identification, fun facts, interactive orbital mechanics, and NASA photo galleries.
- **Periodic Table App:** An exploration of the quantum level, featuring element categorization, atomic structure building, and a virtual chemistry lab.

## Architecture & Tech Stack

This project is built using a **Monorepo** architecture to allow the applications to share styling, components, and logic while remaining independently deployable.

### Technologies Used
- **Monorepo Management:** [Turborepo](https://turbo.build/) & npm workspaces
- **App Framework:** [Expo (React Native)](https://expo.dev/) 
  - Allows us to write once in React and deploy natively to iOS, Android, and the Web (PWA).
- **Styling:** React Native / Expo compatible libraries (e.g., NativeWind/Tamagui) 
  - Components are centralized in the `packages/shared-ui` package.

### Repository Structure
```text
learningApps/
├── apps/
│   ├── solarSystem/     # Expo application for the Solar System
│   ├── periodicTable/   # Expo application for the Periodic Table
├── packages/
│   ├── shared-ui/       # Shared React Native components, typography, and the Sol mascot
│   ├── core-logic/      # Shared state management, level progression, and utilities
├── package.json         # Workspace configuration
└── turbo.json           # Turborepo pipeline configuration
```

## Local Development Prerequisites

Depending on which platform you intend to run locally, you will need to ensure your environment is set up properly:

### 1. Web
Web support is built-in, but requires standard web dependencies (`react-dom` and `react-native-web`).

### 2. Android
To run the app locally on an Android emulator, you MUST install **Android Studio** and the **Android SDK**. 
- Download Android Studio and ensure the Android SDK is installed.
- Ensure `adb` is available in your system PATH (or that `ANDROID_HOME` is set).
- *Alternative:* You can use the **Expo Go** app on your physical Android device to scan the QR code without needing the SDK installed on your PC! Just run `npx expo start`.

### 3. iOS
To run the app locally on an iOS simulator, you MUST be on a Mac and have **Xcode** installed.
- *Alternative:* Like Android, you can use the **Expo Go** app on your physical iPhone.

## Getting Started

1. Clone the repository: `git clone https://github.com/anicoletti/learningApp.git`
2. Install dependencies from the root: `npm install`
3. To run the Solar System app:
   ```bash
   cd apps/solarSystem
   npm run web      # For Web preview
   npm run ios      # For iOS Simulator (requires macOS)
   npm run android  # For Android Emulator
   ```
