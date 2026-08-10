export const planets = [
  { 
    id: 'sun', name: 'Sun', color: '#FFD700', type: 'Star', radius: 120, orbitRadius: 0, 
    info: 'The star at the center of our Solar System. A million Earths could fit inside the Sun!',
    funFact: 'The Sun makes up 99.8% of the mass of the entire solar system.',
    imageSource: require('../assets/planets/sun_detailed.png')
  },
  { 
    id: 'mercury', name: 'Mercury', color: '#FF8A65', type: 'Planet', radius: 18, orbitRadius: 300, 
    info: 'Mercury is the smallest planet in our solar system. It’s just a little bigger than Earth’s Moon. Mercury itself, though, doesn’t have any moons. It is the closest planet to the Sun, but it’s actually not the hottest. Venus is hotter. It has no atmosphere.',
    funFact: 'A year on Mercury is just 88 days long.',
    imageSource: require('../assets/planets/mercury.png')
  },
  { 
    id: 'venus', name: 'Venus', color: '#FFD54F', type: 'Planet', radius: 34, orbitRadius: 450, 
    info: 'Even though Venus isn\'t the closest planet to the Sun, it is still the hottest. It has a thick atmosphere full of the greenhouse gas carbon dioxide and clouds made of sulfuric acid. The gas traps heat and keeps Venus toasty warm. It rotates so slowly that a day on Venus is actually longer than its year!',
    funFact: 'Venus spins backwards, meaning the Sun rises in the west and sets in the east.',
    imageSource: require('../assets/planets/venus.png')
  },
  { 
    id: 'earth', name: 'Earth', color: '#4FC3F7', type: 'Planet', radius: 36, orbitRadius: 650, 
    info: 'Our home planet Earth is a rocky, terrestrial planet. It has a solid and active surface with mountains, valleys, canyons, plains and so much more. Earth is special because it is an ocean planet. Water covers 70% of Earth\'s surface.',
    funFact: 'Earth is the only planet we know of that has life.',
    imageSource: require('../assets/planets/earth.png')
  },
  { 
    id: 'mars', name: 'Mars', color: '#E57373', type: 'Planet', radius: 24, orbitRadius: 900, 
    info: 'Mars is a cold desert world with a very thin atmosphere. The average temperature on Mars is minus 85 degrees Fahrenheit – way below freezing. It is half the size of Earth. Mars is sometimes called the Red Planet. It\'s red because of rusty iron in the ground.',
    funFact: 'Mars is home to Olympus Mons, the largest volcano in the solar system.',
    imageSource: require('../assets/planets/mars.png')
  },
  { 
    id: 'jupiter', name: 'Jupiter', color: '#D4A373', type: 'Gas Giant', radius: 70, orbitRadius: 1400, 
    info: 'Jupiter is the biggest planet in our solar system. It\'s similar to a star, but it never got massive enough to start burning. It is covered in swirling cloud stripes.',
    funFact: 'Jupiter has a Great Red Spot, which is a giant storm larger than Earth!',
    imageSource: require('../assets/planets/jupiter.png')
  },
  { 
    id: 'saturn', name: 'Saturn', color: '#E9C46A', type: 'Gas Giant', radius: 60, orbitRadius: 1900, 
    info: 'Saturn isn’t the only planet to have rings, but it definitely has the most beautiful ones. The rings we see are made of groups of tiny ringlets that surround Saturn. They’re made of chunks of ice and rock.',
    funFact: 'Saturn has 146 known moons, more than any other planet!',
    imageSource: require('../assets/planets/saturn.png')
  },
  { 
    id: 'uranus', name: 'Uranus', color: '#4EA8DE', type: 'Ice Giant', radius: 45, orbitRadius: 2400, 
    info: 'Uranus is made of water, methane, and ammonia fluids above a small rocky center. Its atmosphere is made of hydrogen and helium like Jupiter and Saturn, but it also has methane. The methane makes Uranus blue. It rotates completely on its side.',
    funFact: 'Uranus rotates completely on its side, rolling like a barrel around the Sun.',
    imageSource: require('../assets/planets/uranus.png')
  },
  { 
    id: 'neptune', name: 'Neptune', color: '#5390D9', type: 'Ice Giant', radius: 43, orbitRadius: 2900, 
    info: 'Neptune is dark, cold, and very windy. It\'s more than 30 times as far from the sun as Earth is. Neptune is very similar to Uranus. It\'s made of a thick fog of water, ammonia, and methane over an Earth-sized solid center.',
    funFact: 'Neptune was the first planet located through mathematical calculations.',
    imageSource: require('../assets/planets/neptune.png')
  },
  { 
    id: 'pluto', name: 'Pluto', color: '#E0E0E0', type: 'Dwarf Planet', radius: 15, orbitRadius: 3300, 
    info: 'Pluto is a dwarf planet that lies in the Kuiper Belt. It\'s an area full of icy bodies and other dwarf planets at the edge of our solar system. Pluto has a heart-shaped glacier.',
    funFact: 'Pluto is about two-thirds the diameter of Earth’s Moon.',
    imageSource: require('../assets/planets/pluto.png')
  },
];
