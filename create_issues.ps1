$ErrorActionPreference = 'Continue'

Write-Host "Creating Labels..."
gh label create structure --color "1D76DB" --description "Repository and monorepo structure"
gh label create styling --color "D4C5F9" --description "Shared UI and styling components"
gh label create app-specific --color "0E8A16" --description "Features specific to a single app"

Write-Host "Creating Issues..."

gh issue create --title "[Shared UI] Create Base Component Library" --body "Implement the base component library in ``packages/shared-ui``. Include the Mascot (Sol) component, buttons, typography, and color tokens." --label "styling"

gh issue create --title "[Core Logic] Setup Level Progression System" --body "Create the shared state management for level progression across apps in ``packages/core-logic``." --label "structure"

gh issue create --title "[Solar System] Global: Night Sky View" --body "Implement a standalone feature accessible from the start to see where planets are positioned in the real night sky for a given date." --label "app-specific"

gh issue create --title "[Solar System] Global: NASA Photo Gallery" --body "Add a dedicated gallery to view real, high-quality photos from NASA for each planet." --label "app-specific"

gh issue create --title "[Solar System] Global: Space Mission Timeline" --body "Implement a scrollable timeline on each planet detail page showing related space missions (e.g., Voyager). Clicking an event reveals details and photos." --label "app-specific"

gh issue create --title "[Solar System] Global: Quizzes" --body "Implement multiple-choice quizzes sprinkled throughout the app to test retention." --label "app-specific"

gh issue create --title "[Solar System] Level 1: Planet Identification" --body "Implement drag and drop mechanics to place planets in the correct orbital rings." --label "app-specific"

gh issue create --title "[Solar System] Level 2: Fun Facts" --body "Implement flashcards/matching game for planet facts (e.g. Venus is hottest)." --label "app-specific"

gh issue create --title "[Solar System] Level 3: Orbital Mechanics & Time" --body "Implement interactive simulations to visualize the speed of orbit, length of day/year, light travel time to the planet, and moon stats." --label "app-specific"

gh issue create --title "[Solar System] Level 4: Planetary Science" --body "Implement 'Build a Planet' mini-game mixing elements for gravity/atmosphere chemical makeup." --label "app-specific"

gh issue create --title "[Periodic Table] Level 1: Element Identification" --body "Implement element bingo or simple word spelling using basic element blocks." --label "app-specific"

gh issue create --title "[Periodic Table] Level 2: Element Families" --body "Implement color-coding game for groups like Noble Gases and Alkali Metals." --label "app-specific"

gh issue create --title "[Periodic Table] Level 3: Atomic Structure" --body "Implement 'Atom Builder' mini-game to add protons/neutrons/electrons." --label "app-specific"

gh issue create --title "[Periodic Table] Level 4: Chemistry & Reactions" --body "Implement safe 'Chemistry Lab' mixing elements to form compounds like H2O and NaCl." --label "app-specific"

Write-Host "Done creating issues."
