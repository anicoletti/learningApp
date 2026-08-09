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
