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
