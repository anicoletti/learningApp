export const planets = [
  { 
    id: 'sun', name: 'Sun', color: '#FFD700', type: 'Star', radius: 120, orbitRadius: 0, 
    info: 'The star at the center of our Solar System. A million Earths could fit inside the Sun!',
    funFact: 'The Sun makes up 99.8% of the mass of the entire solar system.',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/sun?embed=true',
    imageSource: require('../assets/planets/sun_clear.png')
  },
  { 
    id: 'mercury', name: 'Mercury', color: '#FF8A65', type: 'Planet', radius: 18, orbitRadius: 300, 
    info: 'The smallest planet and closest to the Sun. It has no moons and no atmosphere.',
    funFact: 'A year on Mercury is just 88 days long.',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/mercury?embed=true',
    imageSource: require('../assets/planets/mercury.png')
  },
  { 
    id: 'venus', name: 'Venus', color: '#FFD54F', type: 'Planet', radius: 34, orbitRadius: 450, 
    info: 'The hottest planet in the solar system, with a toxic atmosphere that traps heat.',
    funFact: 'Venus spins backwards, meaning the Sun rises in the west and sets in the east.',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/venus?embed=true',
    imageSource: require('../assets/planets/venus.png')
  },
  { 
    id: 'earth', name: 'Earth', color: '#4FC3F7', type: 'Planet', radius: 36, orbitRadius: 650, 
    info: 'Our home, perfectly suited for life with liquid water and a protective atmosphere.',
    funFact: 'Earth is the only planet we know of that has life.',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/earth?embed=true',
    imageSource: require('../assets/planets/earth.png')
  },
  { 
    id: 'mars', name: 'Mars', color: '#E57373', type: 'Planet', radius: 24, orbitRadius: 900, 
    info: 'The Red Planet. It is cold and desert-like with a very thin atmosphere.',
    funFact: 'Mars is home to Olympus Mons, the largest volcano in the solar system.',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/mars?embed=true',
    imageSource: require('../assets/planets/mars.png')
  },
  { 
    id: 'jupiter', name: 'Jupiter', color: '#D4A373', type: 'Gas Giant', radius: 70, orbitRadius: 1400, 
    info: 'The largest planet in our solar system. It is a gas giant made mostly of hydrogen and helium.',
    funFact: 'Jupiter has a Great Red Spot, which is a giant storm larger than Earth!',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/jupiter?embed=true',
    imageSource: require('../assets/planets/jupiter.png')
  },
  { 
    id: 'saturn', name: 'Saturn', color: '#E9C46A', type: 'Gas Giant', radius: 60, orbitRadius: 1900, 
    info: 'Famous for its stunning, expansive ring system made of ice and rock.',
    funFact: 'Saturn has 146 known moons, more than any other planet!',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/saturn?embed=true',
    imageSource: require('../assets/planets/saturn.png')
  },
  { 
    id: 'uranus', name: 'Uranus', color: '#4EA8DE', type: 'Ice Giant', radius: 45, orbitRadius: 2400, 
    info: 'An ice giant that is very cold and windy. It is surrounded by 13 faint rings.',
    funFact: 'Uranus rotates completely on its side, rolling like a barrel around the Sun.',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/uranus?embed=true',
    imageSource: require('../assets/planets/uranus.png')
  },
  { 
    id: 'neptune', name: 'Neptune', color: '#5390D9', type: 'Ice Giant', radius: 43, orbitRadius: 2900, 
    info: 'The windiest planet in the solar system, deep blue and freezing cold.',
    funFact: 'Neptune was the first planet located through mathematical calculations.',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/neptune?embed=true',
    imageSource: require('../assets/planets/neptune.png')
  },
  { 
    id: 'pluto', name: 'Pluto', color: '#E0E0E0', type: 'Dwarf Planet', radius: 15, orbitRadius: 3300, 
    info: 'A beloved dwarf planet in the Kuiper belt. It has a heart-shaped glacier.',
    funFact: 'Pluto is about two-thirds the diameter of Earth’s Moon.',
    url3D: 'https://eyes.nasa.gov/apps/solar-system/#/pluto?embed=true',
    imageSource: require('../assets/planets/pluto.png')
  },
];
