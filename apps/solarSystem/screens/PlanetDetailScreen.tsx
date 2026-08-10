import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Platform, Image, TouchableOpacity } from 'react-native';
import { planets } from '../data/planets';

const SPACE_BG = 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f41?q=80&w=3000&auto=format&fit=crop';

const PLANET_DETAILS: Record<string, any> = {
  mercury: {
    comp: [{ val: '42%', label: 'Oxygen' }, { val: '29%', label: 'Sodium' }],
    trace: 'Hydrogen, Helium, Potassium',
    data: { diameter: '4,879 km', mass: '0.055 Earths', moons: '0', orbit: '88 days', day: '59 Earth days' },
    moonsList: ['Mercury has no moons because it is too close to the Sun! Its gravity is too weak to hold onto a moon against the immense gravitational pull of the Sun.'],
    history: [
      { year: '14th Cent. BC', name: 'Assyrians', desc: 'First recorded observations.' },
      { year: '1974-1975', name: 'Mariner 10', desc: 'First spacecraft to visit Mercury.' },
      { year: '2004-2015', name: 'MESSENGER', desc: 'First orbiter, mapped 100% of the surface.' },
      { year: '2018-Present', name: 'BepiColombo', desc: 'En route, joint ESA/JAXA mission.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532687353974-9842426980ee?q=80&w=400&auto=format&fit=crop'
    ]
  },
  venus: {
    comp: [{ val: '96.5%', label: 'Carbon Dioxide' }, { val: '3.5%', label: 'Nitrogen' }],
    trace: 'Sulfur dioxide, Argon, Water vapor',
    data: { diameter: '12,104 km', mass: '0.815 Earths', moons: '0', orbit: '225 days', day: '243 Earth days' },
    moonsList: ['Venus has no moons. Scientists believe it may have had a moon in the distant past that crashed back into the planet!'],
    history: [
      { year: '17th Cent.', name: 'Galileo', desc: 'First observed the phases of Venus.' },
      { year: '1962', name: 'Mariner 2', desc: 'First successful planetary flyby.' },
      { year: '1970', name: 'Venera 7', desc: 'First successful landing on another planet.' },
      { year: '1989-1994', name: 'Magellan', desc: 'High-resolution radar mapping.' },
      { year: '2015-Present', name: 'Akatsuki', desc: 'Climate orbiter studying the atmosphere.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1614726365723-4993b5443216?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop'
    ]
  },
  // Default fallback for others
  default: {
    comp: [{ val: '50%', label: 'Unknown' }, { val: '50%', label: 'Unknown' }],
    trace: 'Unknown',
    data: { diameter: 'Unknown', mass: 'Unknown', moons: 'Unknown', orbit: 'Unknown', day: 'Unknown' },
    moonsList: ['Data coming soon!'],
    history: [],
    gallery: []
  }
};

const WebIframe = ({ src }: { src: string }) => {
  if (Platform.OS === 'web') {
    // @ts-ignore
    return <iframe src={src} style={{ width: '100%', height: '100%', border: 'none', borderRadius: 15 }} title="3D Viewer" />;
  }
  return <Text style={{color: '#fff'}}>3D Viewer only available on Web.</Text>;
};

export default function PlanetDetailScreen({ routeParams }: any) {
  const planetId = routeParams?.planetId || 'jupiter';
  const planetBase = planets.find(p => p.id === planetId);
  const details = PLANET_DETAILS[planetId] || PLANET_DETAILS['default'];

  const [activeTab, setActiveTab] = useState('Atmosphere');
  const tabs = ['Atmosphere', 'Details', 'History', 'Images', '3D Render'];

  return (
    <ImageBackground source={{ uri: SPACE_BG }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      {/* Massive half-planet in the background top right */}
      {planetBase?.imageSource && (
        <Image 
          source={planetBase.imageSource} 
          style={styles.giantPlanetGraphic} 
          resizeMode="contain"
        />
      )}

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        <View style={styles.headerArea}>
          <Text style={[styles.mainTitle, { color: planetBase?.color || '#fff' }]}>{planetBase?.name?.toUpperCase()}</Text>
          <Text style={styles.mainSubtitle}>{planetBase?.info}</Text>
        </View>

        <View style={styles.tabContentArea}>
          {activeTab === 'Atmosphere' && (
            <ScrollView>
              <Text style={styles.sectionHeading}>ATMOSPHERIC COMPOSITION</Text>
              <View style={styles.row}>
                {details.comp.map((c: any, i: number) => (
                  <View key={i} style={styles.statGroup}>
                    <Text style={[styles.statValue, { color: planetBase?.color || '#4FC3F7' }]}>{c.val}</Text>
                    <Text style={styles.statLabel}>{c.label}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.traceText}>Trace gases: {details.trace}</Text>
            </ScrollView>
          )}

          {activeTab === 'Details' && (
            <ScrollView>
              <Text style={styles.sectionHeading}>PLANETARY DATA</Text>
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
              <Text style={styles.sectionHeading}>IMAGE GALLERY</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {details.gallery.length > 0 ? details.gallery.map((imgUrl: string, idx: number) => (
                  <Image key={idx} source={{ uri: imgUrl }} style={styles.galleryImage} />
                )) : <Text style={{ color: '#aaa' }}>No images available.</Text>}
              </View>
            </ScrollView>
          )}

          {activeTab === '3D Render' && (
            <View style={{ flex: 1 }}>
              <Text style={[styles.sectionHeading, { marginBottom: 10 }]}>INTERACTIVE 3D VIEWER</Text>
              <View style={{ flex: 1, backgroundColor: '#000', borderRadius: 15 }}>
                <WebIframe src={`https://eyes.nasa.gov/apps/solar-system/#/${planetId === 'sun' ? 'sun' : planetId}?embed=true`} />
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Tab Navigation at Bottom */}
      <View style={styles.tabBar}>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(5, 5, 10, 0.85)' },
  giantPlanetGraphic: { position: 'absolute', top: -150, right: -250, width: 800, height: 800, opacity: 0.9 },
  
  contentContainer: { flex: 1, padding: 30, zIndex: 10, marginTop: 40 },
  headerArea: { marginBottom: 40, maxWidth: '60%' },
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
  
  galleryImage: { width: '48%', height: 200, borderRadius: 15, marginBottom: 10, backgroundColor: '#000' },

  tabBar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'rgba(10,10,20,0.9)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', gap: 10 },
  tabButton: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  tabText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  tabTextActive: { color: '#000' }
});
