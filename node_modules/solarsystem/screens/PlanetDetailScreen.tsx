import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Platform, Image, TouchableOpacity, Modal } from 'react-native';
import { planets } from '../data/planets';

const SPACE_BG = 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f41?q=80&w=3000&auto=format&fit=crop';

const PLANET_DETAILS: Record<string, any> = {
  mercury: {
    comp: [
      { val: 42, label: 'Oxygen', color: '#4FC3F7' }, 
      { val: 29, label: 'Sodium', color: '#FFD54F' },
      { val: 22, label: 'Hydrogen', color: '#81C784' }
    ],
    trace: 'Helium (6%), Potassium, Argon',
    atmosphereDetails: {
      temperature: '-173°C to 427°C',
      pressure: 'Trace (Exosphere)',
      wind: 'N/A',
      features: 'None (no significant atmosphere)'
    },
    data: { diameter: '4,879 km', mass: '0.055 Earths', moons: '0', orbit: '88 days', day: '59 Earth days', distance: '57.9 million km', lightTime: '3.2 minutes', gravity: '3.7 m/s²' },
    moonsList: ['Mercury has no moons because it is too close to the Sun! Its gravity is too weak to hold onto a moon against the immense gravitational pull of the Sun.'],
    history: [
      { year: '14th Cent. BC', name: 'Assyrians', desc: 'First recorded observations.' },
      { year: '1974-1975', name: 'Mariner 10', desc: 'First spacecraft to visit Mercury.' },
      { year: '2004-2015', name: 'MESSENGER', desc: 'First orbiter, mapped 100% of the surface.' },
      { year: '2018-Present', name: 'BepiColombo', desc: 'En route, joint ESA/JAXA mission.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/PIA13477/PIA13477~medium.jpg', desc: 'Long Scarps on Mercury Tell of the Planet\'s Unique History' },
      { url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001918/GSFC_20171208_Archive_e001918~small.jpg', desc: 'From Orbit, Looking toward Mercury\'s Horizon' },
      { url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001625/GSFC_20171208_Archive_e001625~small.jpg', desc: 'Happy Little Crater on Mercury' }
    ]
  },
  venus: {
    comp: [
      { val: 96.5, label: 'Carbon Dioxide', color: '#FFB74D' }, 
      { val: 3.5, label: 'Nitrogen', color: '#64B5F6' }
    ],
    trace: 'Sulfur dioxide, Argon, Water vapor',
    atmosphereDetails: {
      temperature: '462°C (average)',
      pressure: '92 times Earth\'s pressure',
      wind: 'Up to 360 km/h',
      features: 'Thick sulfuric acid clouds, polar vortexes'
    },
    data: { diameter: '12,104 km', mass: '0.815 Earths', moons: '0', orbit: '225 days', day: '243 Earth days', distance: '108.2 million km', lightTime: '6.0 minutes', gravity: '8.87 m/s²' },
    moonsList: ['Venus has no moons. Scientists believe it may have had a moon in the distant past that crashed back into the planet!'],
    history: [
      { year: '17th Cent.', name: 'Galileo', desc: 'First observed the phases of Venus.' },
      { year: '1962', name: 'Mariner 2', desc: 'First successful planetary flyby.' },
      { year: '1970', name: 'Venera 7', desc: 'First successful landing on another planet.' },
      { year: '1989-1994', name: 'Magellan', desc: 'High-resolution radar mapping.' },
      { year: '2015-Present', name: 'Akatsuki', desc: 'Climate orbiter studying the atmosphere.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/PIA00110/PIA00110~medium.jpg', desc: 'Four Views of Venus High Pass Filter' },
      { url: 'https://images-assets.nasa.gov/image/iss006e48523/iss006e48523~medium.jpg', desc: 'View of crescent moon and the planet Venus' }
    ]
  },
  jupiter: {
    comp: [
      { val: 89.8, label: 'Hydrogen', color: '#E57373' }, 
      { val: 10.2, label: 'Helium', color: '#FFF176' }
    ],
    trace: 'Methane, Ammonia, Water',
    atmosphereDetails: {
      temperature: '-145°C (average)',
      pressure: '>1000 atm deep inside',
      wind: 'Up to 600 km/h',
      features: 'Great Red Spot, banded cloud layers, auroras'
    },
    data: { diameter: '139,820 km', mass: '318 Earths', moons: '95+', orbit: '11.86 yrs', day: '9.93 hrs', distance: '778.5 million km', lightTime: '43.2 minutes', gravity: '24.79 m/s²' },
    moonsList: ['Io', 'Europa', 'Ganymede', 'Callisto', '...and 91 more!'],
    history: [{ year: '2016-Present', name: 'Juno', desc: 'Mapping gravity and magnetic fields' }],
    gallery: []
  },
  earth: {
    comp: [
      { val: 78, label: 'Nitrogen', color: '#64B5F6' }, 
      { val: 21, label: 'Oxygen', color: '#4FC3F7' },
      { val: 1, label: 'Argon', color: '#81C784' }
    ],
    trace: 'Carbon dioxide, Neon, Helium',
    atmosphereDetails: {
      temperature: '-89°C to 58°C',
      pressure: '1 atm (Sea level)',
      wind: 'Up to 400 km/h',
      features: 'Clouds, weather systems, auroras'
    },
    data: { diameter: '12,742 km', mass: '1 Earth', moons: '1', orbit: '365.25 days', day: '24 hrs', distance: '149.6 million km', lightTime: '8.3 minutes', gravity: '9.8 m/s²' },
    moonsList: ['The Moon (Luna)'],
    history: [
      { year: '4.5 Billion Years Ago', name: 'Formation', desc: 'Earth forms from the solar nebula.' },
      { year: '1957', name: 'Sputnik 1', desc: 'First artificial satellite orbits Earth.' },
      { year: '1961', name: 'Yuri Gagarin', desc: 'First human to orbit the Earth.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~medium.jpg', desc: 'Blue Marble: Earth from Space' },
      { url: 'https://images-assets.nasa.gov/image/iss064e022067/iss064e022067~medium.jpg', desc: 'Earth from the International Space Station' }
    ]
  },
  mars: {
    comp: [
      { val: 95.3, label: 'Carbon Dioxide', color: '#FFB74D' }, 
      { val: 2.7, label: 'Nitrogen', color: '#64B5F6' },
      { val: 1.6, label: 'Argon', color: '#81C784' }
    ],
    trace: 'Oxygen, Carbon monoxide, Water vapor',
    atmosphereDetails: {
      temperature: '-153°C to 20°C',
      pressure: '0.006 atm (Very thin)',
      wind: 'Up to 100 km/h',
      features: 'Global dust storms, polar ice caps'
    },
    data: { diameter: '6,779 km', mass: '0.107 Earths', moons: '2', orbit: '687 days', day: '24.6 hrs', distance: '227.9 million km', lightTime: '12.6 minutes', gravity: '3.7 m/s²' },
    moonsList: ['Phobos', 'Deimos'],
    history: [
      { year: '1976', name: 'Viking 1 & 2', desc: 'First successful Mars landings.' },
      { year: '2012', name: 'Curiosity', desc: 'Rover lands in Gale Crater.' },
      { year: '2021', name: 'Perseverance', desc: 'Rover lands in Jezero Crater to seek signs of ancient life.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/S91-32389/S91-32389~medium.jpg', desc: 'Composite image of the planet Mars taken by Hubble Space Telescope' },
      { url: 'https://images-assets.nasa.gov/image/PIA10376/PIA10376~small.jpg', desc: 'Mars Radar Opens a Planet\'s Third Dimension' },
      { url: 'https://images-assets.nasa.gov/image/PIA01253/PIA01253~small.jpg', desc: 'Springtime on Mars: Hubble Best View of the Red Planet' }
    ]
  },
  saturn: {
    comp: [
      { val: 96.3, label: 'Hydrogen', color: '#E57373' }, 
      { val: 3.2, label: 'Helium', color: '#FFF176' }
    ],
    trace: 'Methane, Ammonia',
    atmosphereDetails: {
      temperature: '-178°C (average)',
      pressure: '>1000 atm deep inside',
      wind: 'Up to 1,800 km/h',
      features: 'Hexagon-shaped storm at the north pole'
    },
    data: { diameter: '116,460 km', mass: '95 Earths', moons: '146', orbit: '29.4 yrs', day: '10.7 hrs', distance: '1.4 billion km', lightTime: '80 minutes', gravity: '10.44 m/s²' },
    moonsList: ['Titan', 'Enceladus', 'Mimas', '...and 143 more!'],
    history: [
      { year: '1610', name: 'Galileo', desc: 'First observed Saturn\'s rings.' },
      { year: '2004-2017', name: 'Cassini', desc: 'Orbited Saturn and studied its rings and moons in unprecedented detail.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/PIA08255/PIA08255~small.jpg', desc: 'Penumbral Fade on Saturn\'s rings' },
      { url: 'https://images-assets.nasa.gov/image/PIA11141/PIA11141~small.jpg', desc: 'Saturn\'s Rings in stunning detail from Cassini' }
    ]
  },
  uranus: {
    comp: [
      { val: 82.5, label: 'Hydrogen', color: '#E57373' }, 
      { val: 15.2, label: 'Helium', color: '#FFF176' },
      { val: 2.3, label: 'Methane', color: '#4FC3F7' }
    ],
    trace: 'Ammonia, Water',
    atmosphereDetails: {
      temperature: '-224°C',
      pressure: 'High pressure deep inside',
      wind: 'Up to 900 km/h',
      features: 'Featureless blue-green disk, extreme seasonal changes'
    },
    data: { diameter: '50,724 km', mass: '14 Earths', moons: '28', orbit: '84 yrs', day: '17.2 hrs', distance: '2.9 billion km', lightTime: '160 minutes', gravity: '8.69 m/s²' },
    moonsList: ['Titania', 'Oberon', 'Umbriel', 'Ariel', 'Miranda', '...and 23 more!'],
    history: [
      { year: '1781', name: 'William Herschel', desc: 'Discovered Uranus with a telescope.' },
      { year: '1986', name: 'Voyager 2', desc: 'First and only spacecraft to visit Uranus.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/PIA01282/PIA01282~small.jpg', desc: 'Hubble Observes the Planet Uranus' },
      { url: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~medium.jpg', desc: 'Uranus as seen by NASA Voyager 2' }
    ]
  },
  neptune: {
    comp: [
      { val: 80, label: 'Hydrogen', color: '#E57373' }, 
      { val: 19, label: 'Helium', color: '#FFF176' },
      { val: 1.5, label: 'Methane', color: '#4FC3F7' }
    ],
    trace: 'Ammonia, Water',
    atmosphereDetails: {
      temperature: '-214°C',
      pressure: 'High pressure deep inside',
      wind: 'Up to 2,100 km/h (Supersonic!)',
      features: 'Great Dark Spot, supersonic winds, cirrus-like clouds'
    },
    data: { diameter: '49,244 km', mass: '17 Earths', moons: '16', orbit: '165 yrs', day: '16.1 hrs', distance: '4.5 billion km', lightTime: '250 minutes', gravity: '11.15 m/s²' },
    moonsList: ['Triton', 'Proteus', 'Nereid', '...and 13 more!'],
    history: [
      { year: '1846', name: 'Urbain Le Verrier', desc: 'Discovered Neptune via mathematics before it was seen.' },
      { year: '1989', name: 'Voyager 2', desc: 'First and only spacecraft to visit Neptune.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/PIA02220/PIA02220~small.jpg', desc: 'Neptune Shadows and Cloud tops' },
      { url: 'https://images-assets.nasa.gov/image/PIA17304/PIA17304~medium.jpg', desc: 'Neptune captured by Voyager' }
    ]
  },
  pluto: {
    comp: [
      { val: 90, label: 'Nitrogen', color: '#64B5F6' }, 
      { val: 9, label: 'Methane', color: '#4FC3F7' },
      { val: 1, label: 'Carbon Monoxide', color: '#FFB74D' }
    ],
    trace: 'None',
    atmosphereDetails: {
      temperature: '-225°C',
      pressure: '0.00001 atm',
      wind: 'Unknown',
      features: 'Blue haze visible when backlit by the Sun'
    },
    data: { diameter: '2,376 km', mass: '0.002 Earths', moons: '5', orbit: '248 yrs', day: '153.3 hrs', distance: '5.9 billion km', lightTime: '330 minutes', gravity: '0.62 m/s²' },
    moonsList: ['Charon', 'Nix', 'Hydra', 'Kerberos', 'Styx'],
    history: [
      { year: '1930', name: 'Clyde Tombaugh', desc: 'Discovered Pluto.' },
      { year: '2006', name: 'IAU', desc: 'Pluto reclassified as a dwarf planet.' },
      { year: '2015', name: 'New Horizons', desc: 'First spacecraft to visit Pluto, revealing a complex world.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/PIA21944/PIA21944~medium.jpg', desc: 'First Official Pluto Feature Names' },
      { url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000683/GSFC_20171208_Archive_e000683~small.jpg', desc: 'Pluto and its moon Charon Shine in False Color' },
      { url: 'https://images-assets.nasa.gov/image/PIA08003/PIA08003~medium.jpg', desc: 'Newest Member of Our Solar System Artist Concept' }
    ]
  },
  sun: {
    comp: [
      { val: 73, label: 'Hydrogen', color: '#E57373' }, 
      { val: 25, label: 'Helium', color: '#FFF176' },
      { val: 2, label: 'Other', color: '#ccc' }
    ],
    trace: 'Oxygen, Carbon, Neon, Iron',
    atmosphereDetails: {
      temperature: '5,500°C (Surface), 15M°C (Core)',
      pressure: 'Over 265 billion atm (Core)',
      wind: 'N/A (Solar Wind streams out)',
      features: 'Sunspots, solar flares, coronal mass ejections'
    },
    data: { diameter: '1.39 million km', mass: '333,000 Earths', moons: '0', orbit: '230M yrs (Milky Way)', day: '25 Earth days', distance: '0 km', lightTime: '0 minutes', gravity: '274 m/s²' },
    moonsList: ['The Sun does not have moons, but it holds all the planets in orbit!'],
    history: [
      { year: '1995', name: 'SOHO', desc: 'Solar observatory launched.' },
      { year: '2010', name: 'SDO', desc: 'Solar Dynamics Observatory launched.' },
      { year: '2018', name: 'Parker Solar Probe', desc: 'Launched to become the closest spacecraft to the Sun.' }
    ],
    gallery: [
      { url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001434/GSFC_20171208_Archive_e001434~small.jpg', desc: 'A stunning solar flare erupting from the Sun' },
      { url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001435/GSFC_20171208_Archive_e001435~small.jpg', desc: 'Active regions on the sun' }
    ]
  },
  // Default fallback for others
  default: {
    comp: [
      { val: 50, label: 'Unknown', color: '#aaa' }, 
      { val: 50, label: 'Unknown', color: '#666' }
    ],
    trace: 'Unknown',
    atmosphereDetails: {
      temperature: 'Unknown',
      pressure: 'Unknown',
      wind: 'Unknown',
      features: 'Unknown'
    },
    data: { diameter: 'Unknown', mass: 'Unknown', moons: 'Unknown', orbit: 'Unknown', day: 'Unknown', distance: 'Unknown', lightTime: 'Unknown', gravity: 'Unknown' },
    moonsList: ['Data coming soon!'],
    history: [],
    gallery: []
  }
};

const RadialProgress = ({ percentage, color, label }: { percentage: number, color: string, label: string }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={{ alignItems: 'center', marginHorizontal: 15 }}>
        {/* @ts-ignore */}
        <div style={{
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: `conic-gradient(${color} ${percentage}%, rgba(255,255,255,0.1) 0)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* @ts-ignore */}
          <div style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            backgroundColor: 'rgba(20,20,30,1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            {percentage}%
          </div>
        </div>
        <Text style={[styles.statLabel, { marginTop: 15, color: '#fff', fontWeight: 'bold' }]}>{label.toUpperCase()}</Text>
      </View>
    );
  }
  return (
    <View style={styles.statGroup}>
      <Text style={[styles.statValue, { color }]}>{percentage}%</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

export default function PlanetDetailScreen({ routeParams }: any) {
  const planetId = routeParams?.planetId || 'jupiter';
  const planetBase = planets.find(p => p.id === planetId);
  const details = PLANET_DETAILS[planetId] || PLANET_DETAILS['default'];

  const [activeTab, setActiveTab] = useState('Details');
  const tabs = ['Details', 'Atmosphere', 'History', 'Images'];

  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxVisible(true);
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
  };

  const nextImage = () => {
    if (lightboxIndex < details.gallery.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  return (
    <ImageBackground source={{ uri: SPACE_BG }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      {/* Massive half-planet in the background top right */}
      {planetBase?.imageSource && (
        <Image 
          source={planetBase.imageSource} 
          style={styles.giantPlanetGraphic} 
          resizeMode="cover"
        />
      )}

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        <View style={styles.headerArea}>
          <Text style={[styles.mainTitle, { color: planetBase?.color || '#fff' }]}>{planetBase?.name?.toUpperCase()}</Text>
          <Text style={styles.mainSubtitle}>{planetBase?.info}</Text>
        </View>

        <View style={styles.tabContentArea}>
          {activeTab === 'Details' && (
            <ScrollView>
              <Text style={styles.sectionHeading}>PLANETARY DATA</Text>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Distance from Sun:</Text><Text style={styles.dataValue}>{details.data.distance}</Text></View>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Light Travel Time:</Text><Text style={styles.dataValue}>{details.data.lightTime}</Text></View>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Gravity:</Text><Text style={styles.dataValue}>{details.data.gravity}</Text></View>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Diameter:</Text><Text style={styles.dataValue}>{details.data.diameter}</Text></View>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Mass:</Text><Text style={styles.dataValue}>{details.data.mass}</Text></View>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Orbital Period:</Text><Text style={styles.dataValue}>{details.data.orbit}</Text></View>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Day Length:</Text><Text style={styles.dataValue}>{details.data.day}</Text></View>
              
              <Text style={[styles.sectionHeading, { marginTop: 30 }]}>MOONS ({details.data.moons})</Text>
              {details.moonsList.map((moon: string, i: number) => (
                <Text key={i} style={styles.moonText}>• {moon}</Text>
              ))}
            </ScrollView>
          )}

          {activeTab === 'Atmosphere' && (
            <ScrollView>
              <Text style={styles.sectionHeading}>ATMOSPHERIC COMPOSITION</Text>
              <View style={[styles.row, { flexWrap: 'wrap', justifyContent: 'flex-start' }]}>
                {details.comp.map((c: any, i: number) => (
                  <RadialProgress key={i} percentage={c.val} color={c.color} label={c.label} />
                ))}
              </View>
              <Text style={[styles.traceText, { marginBottom: 25 }]}>Other Gases (Traces): {details.trace}</Text>

              <Text style={styles.sectionHeading}>ATMOSPHERIC CONDITIONS</Text>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Temperature:</Text><Text style={styles.dataValue}>{details.atmosphereDetails?.temperature}</Text></View>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Pressure:</Text><Text style={styles.dataValue}>{details.atmosphereDetails?.pressure}</Text></View>
              <View style={styles.dataRow}><Text style={styles.dataLabel}>Wind Speeds:</Text><Text style={styles.dataValue}>{details.atmosphereDetails?.wind}</Text></View>
              
              <Text style={[styles.sectionHeading, { marginTop: 20 }]}>VISIBLE FEATURES</Text>
              <Text style={styles.moonText}>{details.atmosphereDetails?.features}</Text>
            </ScrollView>
          )}

          {activeTab === 'History' && (
            <ScrollView>
              <Text style={styles.sectionHeading}>DISCOVERY & MISSIONS</Text>
              {details.history.map((m: any, i: number) => (
                <View key={i} style={[styles.timelineItem, { borderColor: planetBase?.color || '#4FC3F7' }]}>
                  <Text style={styles.timelineYear}>{m.year}</Text>
                  <Text style={styles.timelineName}>{m.name}</Text>
                  <Text style={styles.timelineDesc}>{m.desc}</Text>
                </View>
              ))}
            </ScrollView>
          )}

          {activeTab === 'Images' && (
            <ScrollView>
              <Text style={styles.sectionHeading}>NASA IMAGE GALLERY</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {details.gallery.length > 0 ? details.gallery.map((img: any, idx: number) => (
                  <TouchableOpacity key={idx} onPress={() => openLightbox(idx)} style={styles.galleryItem}>
                    <Image source={{ uri: img.url }} style={styles.galleryImage} />
                    <Text style={styles.galleryCaption} numberOfLines={2}>{img.desc}</Text>
                  </TouchableOpacity>
                )) : <Text style={{ color: '#aaa' }}>No images available.</Text>}
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      {/* Tab Navigation at Bottom */}
      <View style={styles.tabBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBar}>
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity 
                key={tab} 
                style={[styles.tabButton, isActive && { backgroundColor: planetBase?.color || '#4FC3F7' }]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Lightbox Modal */}
      <Modal visible={lightboxVisible} transparent={true} animationType="fade">
        <View style={styles.lightboxContainer}>
          <TouchableOpacity style={styles.lightboxClose} onPress={closeLightbox}>
            <Text style={styles.lightboxCloseText}>✕</Text>
          </TouchableOpacity>
          
          <View style={styles.lightboxContent}>
            {lightboxIndex > 0 ? (
              <TouchableOpacity style={styles.lightboxNav} onPress={prevImage}>
                <Text style={styles.lightboxNavText}>‹</Text>
              </TouchableOpacity>
            ) : <View style={styles.lightboxNav} />}
            
            <View style={styles.lightboxImageWrapper}>
              {details.gallery[lightboxIndex] && (
                <>
                  <Image 
                    source={{ uri: details.gallery[lightboxIndex].url }} 
                    style={styles.lightboxImage} 
                    resizeMode="contain" 
                  />
                  <Text style={styles.lightboxDesc}>{details.gallery[lightboxIndex].desc}</Text>
                  <Text style={styles.lightboxCredit}>Credit: NASA</Text>
                </>
              )}
            </View>

            {lightboxIndex < details.gallery.length - 1 ? (
              <TouchableOpacity style={styles.lightboxNav} onPress={nextImage}>
                <Text style={styles.lightboxNavText}>›</Text>
              </TouchableOpacity>
            ) : <View style={styles.lightboxNav} />}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(5, 5, 10, 0.85)', zIndex: 1 },
  giantPlanetGraphic: { position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', opacity: 0.9, zIndex: 2 },
  
  contentContainer: { flex: 1, padding: 30, zIndex: 10, marginTop: 40 },
  headerArea: { marginBottom: 40 },
  mainTitle: { fontSize: 48, fontWeight: '900', marginBottom: 10, letterSpacing: 4 },
  mainSubtitle: { color: '#ddd', fontSize: 18, lineHeight: 26 },

  tabContentArea: { flex: 1, backgroundColor: 'rgba(20,20,30,0.6)', borderRadius: 20, padding: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sectionHeading: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 20, letterSpacing: 2 },
  
  row: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 20, gap: 50 },
  statGroup: { },
  statValue: { fontSize: 36, fontWeight: 'bold' },
  statLabel: { color: '#A0A0B0', fontSize: 16 },
  traceText: { color: '#bbb', fontSize: 14, fontStyle: 'italic', marginTop: 10 },
  
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 10 },
  dataLabel: { color: '#A0A0B0', fontSize: 16 },
  dataValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  moonText: { color: '#ddd', fontSize: 16, marginBottom: 10, lineHeight: 24 },
  
  timelineItem: { borderLeftWidth: 3, paddingLeft: 20, paddingBottom: 25, marginLeft: 10 },
  timelineYear: { color: '#A0A0B0', fontSize: 14, fontWeight: 'bold' },
  timelineName: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginVertical: 4 },
  timelineDesc: { color: '#bbb', fontSize: 16, lineHeight: 24 },
  
  galleryItem: { width: '48%', marginBottom: 20 },
  galleryImage: { width: '100%', height: 200, borderRadius: 15, backgroundColor: '#000' },
  galleryCaption: { color: '#fff', fontSize: 12, marginTop: 8, paddingHorizontal: 5 },

  tabBarContainer: { zIndex: 10, backgroundColor: 'rgba(10,10,20,0.9)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  tabBar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, gap: 10, minWidth: '100%' },
  tabButton: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  tabText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  tabTextActive: { color: '#000' },

  lightboxContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  lightboxClose: { position: 'absolute', top: 40, right: 30, zIndex: 100, padding: 10 },
  lightboxCloseText: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  lightboxContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 },
  lightboxNav: { padding: 20, width: 80, alignItems: 'center' },
  lightboxNavText: { color: '#fff', fontSize: 60, fontWeight: '200' },
  lightboxImageWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', padding: 20 },
  lightboxImage: { flex: 1, width: '100%', minHeight: 300, maxHeight: 600 },
  lightboxDesc: { color: '#fff', fontSize: 18, marginTop: 20, textAlign: 'center', maxWidth: '80%' },
  lightboxCredit: { color: '#A0A0B0', fontSize: 12, marginTop: 10, textAlign: 'center' }
});
