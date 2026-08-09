export const planets = [
  { 
    id: 'sun', name: 'Sun', color: '#FFD700', type: 'Star', radius: 120, orbitRadius: 0, 
    info: 'The star at the center of our Solar System. It makes up 99.8% of the mass of the entire solar system!',
    imageSource: require('../assets/planets/sun.png')
  },
  { 
    id: 'mercury', name: 'Mercury', color: '#FF8A65', type: 'Planet', radius: 18, orbitRadius: 300, 
    info: 'The smallest planet and closest to the Sun. It has no moons and no atmosphere.',
    imageSource: require('../assets/planets/mercury.png')
  },
  { 
    id: 'venus', name: 'Venus', color: '#FFD54F', type: 'Planet', radius: 34, orbitRadius: 450, 
    info: 'The hottest planet in the solar system, and it spins backwards compared to most other planets!',
    imageSource: require('../assets/planets/venus.png')
  },
  { 
    id: 'earth', name: 'Earth', color: '#4FC3F7', type: 'Planet', radius: 36, orbitRadius: 650, 
    info: 'Our home, perfectly suited for life with liquid water and a protective atmosphere.',
    imageSource: require('../assets/planets/earth.png')
  },
  { 
    id: 'mars', name: 'Mars', color: '#E57373', type: 'Planet', radius: 24, orbitRadius: 900, 
    info: 'The Red Planet, home to Olympus Mons, the largest volcano in the entire solar system.',
    imageSource: require('../assets/planets/mars.png')
  },
  { 
    id: 'jupiter', name: 'Jupiter', color: '#D4A373', type: 'Gas Giant', radius: 70, orbitRadius: 1400, 
    info: 'The largest planet. It is a gas giant with a Great Red Spot that is a storm larger than Earth!',
    imageSource: require('../assets/planets/jupiter.png')
  },
  { 
    id: 'saturn', name: 'Saturn', color: '#E9C46A', type: 'Gas Giant', radius: 60, orbitRadius: 1900, 
    info: 'Famous for its stunning, expansive ring system made of ice and rock.',
    imageSource: require('../assets/planets/saturn.png')
  },
  { 
    id: 'uranus', name: 'Uranus', color: '#4EA8DE', type: 'Ice Giant', radius: 45, orbitRadius: 2400, 
    info: 'An ice giant that rotates completely on its side, rolling like a barrel around the sun.',
    imageSource: require('../assets/planets/uranus.png')
  },
  { 
    id: 'neptune', name: 'Neptune', color: '#5390D9', type: 'Ice Giant', radius: 43, orbitRadius: 2900, 
    info: 'The windiest planet in the solar system, deep blue and freezing cold.',
    imageSource: require('../assets/planets/neptune.png')
  },
  { 
    id: 'pluto', name: 'Pluto', color: '#E0E0E0', type: 'Dwarf Planet', radius: 15, orbitRadius: 3300, 
    info: 'A beloved dwarf planet in the Kuiper belt. Gotta represent Pluto!',
    imageSource: require('../assets/planets/pluto.png')
  },
];
