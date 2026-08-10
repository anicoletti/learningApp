import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Platform, Image } from 'react-native';
import { planets } from '../data/planets';

const PLANET_DETAILS: Record<string, any> = {
  mercury: {
    bg: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '42%', label: 'Oxygen' }, { val: '29%', label: 'Sodium' }],
    trace: 'Hydrogen, Helium, Potassium',
    data: { diameter: '4,879 km', mass: '0.055 Earths', moons: '0', orbit: '88 days', day: '59 Earth days' },
    moonsList: ['Mercury has no moons because it is too close to the Sun! Its gravity is too weak to hold onto a moon against the immense gravitational pull of the Sun.'],
    missions: [
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
    bg: 'https://images.unsplash.com/photo-1614726365723-4993b5443216?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '96.5%', label: 'Carbon Dioxide' }, { val: '3.5%', label: 'Nitrogen' }],
    trace: 'Sulfur dioxide, Argon, Water vapor',
    data: { diameter: '12,104 km', mass: '0.815 Earths', moons: '0', orbit: '225 days', day: '243 Earth days' },
    moonsList: ['Venus has no moons. Scientists believe it may have had a moon in the distant past that crashed back into the planet!'],
    missions: [
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
  jupiter: {
    bg: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '89.8%', label: 'Hydrogen' }, { val: '10.2%', label: 'Helium' }],
    trace: 'Methane, Ammonia, Water',
    data: { diameter: '139,820 km', mass: '318 Earths', moons: '95+', orbit: '11.86 yrs', day: '9.93 hrs' },
    moonsList: ['Io', 'Europa', 'Ganymede', 'Callisto', '...and 91 more!'],
    missions: [{ year: '2016-Present', name: 'Juno', desc: 'Mapping gravity and magnetic fields' }],
    gallery: []
  },
  // Default fallback for others
  default: {
    bg: 'https://images.unsplash.com/photo-1532687353974-9842426980ee?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '50%', label: 'Unknown' }, { val: '50%', label: 'Unknown' }],
    trace: 'Unknown',
    data: { diameter: 'Unknown', mass: 'Unknown', moons: 'Unknown', orbit: 'Unknown', day: 'Unknown' },
    moonsList: ['Data coming soon!'],
    missions: [],
    gallery: []
  }
};

const WebIframe = ({ src }: { src: string }) => {
  if (Platform.OS === 'web') {
    // @ts-ignore
    return <iframe src={src} style={{ width: '100%', height: 400, border: 'none', borderRadius: 15 }} title="3D Viewer" />;
  }
  return <Text style={{color: '#fff'}}>3D Viewer only available on Web.</Text>;
};

export default function PlanetDetailScreen({ routeParams }: any) {
  const planetId = routeParams?.planetId || 'jupiter';
  const planetBase = planets.find(p => p.id === planetId);
  const details = PLANET_DETAILS[planetId] || PLANET_DETAILS['default'];

  return (
    <ImageBackground source={{ uri: details.bg }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.titleCard}>
          <Text style={[styles.mainTitle, { color: planetBase?.color || '#fff' }]}>{planetBase?.name?.toUpperCase()}</Text>
          <Text style={styles.mainSubtitle}>{planetBase?.info}</Text>
        </View>

        {/* 3D Viewer */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>INTERACTIVE 3D VIEWER</Text>
          <WebIframe src={`https://eyes.nasa.gov/apps/solar-system/#/${planetId === 'sun' ? 'sun' : planetId}?embed=true`} />
        </View>

        {/* Image Gallery */}
        {details.gallery.length > 0 && (
          <View style={[styles.card, { paddingHorizontal: 0 }]}>
            <Text style={[styles.cardTitle, { paddingHorizontal: 20 }]}>IMAGE GALLERY</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20 }}>
              {details.gallery.map((imgUrl: string, idx: number) => (
                <Image key={idx} source={{ uri: imgUrl }} style={styles.galleryImage} />
              ))}
              <View style={{ width: 40 }} />
            </ScrollView>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>ATMOSPHERIC COMPOSITION</Text>
          <View style={styles.row}>
            {details.comp.map((c: any, i: number) => (
              <View key={i} style={styles.statGroup}>
                <Text style={[styles.statValue, { color: planetBase?.color || '#4FC3F7' }]}>{c.val}</Text>
                <Text style={styles.statLabel}>{c.label}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.traceText}>Trace gases: {details.trace}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>PLANETARY DATA</Text>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Diameter:</Text><Text style={styles.dataValue}>{details.data.diameter}</Text></View>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Mass:</Text><Text style={styles.dataValue}>{details.data.mass}</Text></View>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Moons:</Text><Text style={styles.dataValue}>{details.data.moons}</Text></View>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Orbital Period:</Text><Text style={styles.dataValue}>{details.data.orbit}</Text></View>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Day Length:</Text><Text style={styles.dataValue}>{details.data.day}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>MOONS</Text>
          {details.moonsList.map((moon: string, i: number) => (
            <Text key={i} style={styles.moonText}>• {moon}</Text>
          ))}
        </View>

        {details.missions.length > 0 && (
          <View style={[styles.card, { marginTop: 20 }]}>
            <Text style={styles.cardTitle}>NOTABLE MISSIONS</Text>
            {details.missions.map((m: any, i: number) => (
              <View key={i} style={[styles.timelineItem, { borderColor: planetBase?.color || '#4FC3F7' }]}>
                <Text style={styles.timelineYear}>{m.year}</Text>
                <Text style={styles.timelineName}>{m.name}</Text>
                <Text style={styles.timelineDesc}>{m.desc}</Text>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(5, 5, 10, 0.7)' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  titleCard: { backgroundColor: 'rgba(10,10,20,0.8)', padding: 20, borderRadius: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  mainTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, letterSpacing: 2 },
  mainSubtitle: { color: '#ddd', fontSize: 16, lineHeight: 24 },
  card: { backgroundColor: 'rgba(20,20,30,0.8)', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  cardTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 15, letterSpacing: 1 },
  galleryImage: { width: 280, height: 180, borderRadius: 15, marginRight: 15, backgroundColor: '#000' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statGroup: { flex: 1 },
  statValue: { color: '#4FC3F7', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#A0A0B0', fontSize: 14 },
  traceText: { color: '#fff', fontSize: 12, fontStyle: 'italic', marginTop: 10 },
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dataLabel: { color: '#A0A0B0', fontSize: 14 },
  dataValue: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  moonText: { color: '#ddd', fontSize: 14, marginBottom: 5, lineHeight: 20 },
  timelineItem: { borderLeftWidth: 2, borderColor: '#4FC3F7', paddingLeft: 15, paddingBottom: 20, marginLeft: 5 },
  timelineYear: { color: '#A0A0B0', fontSize: 12 },
  timelineName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginVertical: 2 },
  timelineDesc: { color: '#A0A0B0', fontSize: 12 }
});
