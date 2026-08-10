import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { planets } from '../data/planets';

const PLANET_DETAILS: Record<string, any> = {
  sun: {
    bg: 'https://images.unsplash.com/photo-1532687353974-9842426980ee?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '73%', label: 'Hydrogen' }, { val: '25%', label: 'Helium' }],
    trace: 'Oxygen, Carbon, Neon, Iron',
    data: { diameter: '1.39 million km', mass: '333,000 Earths', moons: '0', orbit: 'N/A', day: '27 Earth days' },
    missions: [{ year: '2018-Present', name: 'Parker Solar Probe', desc: 'Touching the Sun\'s corona' }]
  },
  mercury: {
    bg: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '42%', label: 'Oxygen' }, { val: '29%', label: 'Sodium' }],
    trace: 'Hydrogen, Helium, Potassium',
    data: { diameter: '4,879 km', mass: '0.055 Earths', moons: '0', orbit: '88 days', day: '59 Earth days' },
    missions: [{ year: '2004-2015', name: 'MESSENGER', desc: 'Orbited and mapped Mercury' }]
  },
  venus: {
    bg: 'https://images.unsplash.com/photo-1614726365723-4993b5443216?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '96.5%', label: 'Carbon Dioxide' }, { val: '3.5%', label: 'Nitrogen' }],
    trace: 'Sulfur dioxide, Argon, Water vapor',
    data: { diameter: '12,104 km', mass: '0.815 Earths', moons: '0', orbit: '225 days', day: '243 Earth days' },
    missions: [{ year: '1989-1994', name: 'Magellan', desc: 'Radar mapped the surface' }]
  },
  earth: {
    bg: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '78%', label: 'Nitrogen' }, { val: '21%', label: 'Oxygen' }],
    trace: 'Argon, Carbon Dioxide, Water vapor',
    data: { diameter: '12,742 km', mass: '1 Earth', moons: '1', orbit: '365.25 days', day: '24 hours' },
    missions: [{ year: '1957-Present', name: 'Thousands of Satellites', desc: 'Monitoring our home planet' }]
  },
  mars: {
    bg: 'https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '95%', label: 'Carbon Dioxide' }, { val: '2.6%', label: 'Nitrogen' }],
    trace: 'Argon, Oxygen, Carbon monoxide',
    data: { diameter: '6,779 km', mass: '0.107 Earths', moons: '2', orbit: '687 days', day: '24.6 hours' },
    missions: [{ year: '2012-Present', name: 'Curiosity', desc: 'Exploring Gale Crater' }]
  },
  jupiter: {
    bg: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '89.8%', label: 'Hydrogen' }, { val: '10.2%', label: 'Helium' }],
    trace: 'Methane, Ammonia, Water',
    data: { diameter: '139,820 km', mass: '318 Earths', moons: '95+', orbit: '11.86 yrs', day: '9.93 hrs' },
    missions: [{ year: '2016-Present', name: 'Juno', desc: 'Mapping gravity and magnetic fields' }]
  },
  saturn: {
    bg: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '96.3%', label: 'Hydrogen' }, { val: '3.2%', label: 'Helium' }],
    trace: 'Methane, Ammonia',
    data: { diameter: '116,460 km', mass: '95 Earths', moons: '146+', orbit: '29.5 yrs', day: '10.7 hrs' },
    missions: [{ year: '1997-2017', name: 'Cassini', desc: 'Studied the planet and its rings' }]
  },
  uranus: {
    bg: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1000&auto=format&fit=crop', // Reusing Saturn/Gas giant bg for now
    comp: [{ val: '83%', label: 'Hydrogen' }, { val: '15%', label: 'Helium' }],
    trace: 'Methane (gives it blue color)',
    data: { diameter: '50,724 km', mass: '14 Earths', moons: '27+', orbit: '84 yrs', day: '17.2 hrs' },
    missions: [{ year: '1986', name: 'Voyager 2', desc: 'Only spacecraft to visit Uranus' }]
  },
  neptune: {
    bg: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '80%', label: 'Hydrogen' }, { val: '19%', label: 'Helium' }],
    trace: 'Methane',
    data: { diameter: '49,244 km', mass: '17 Earths', moons: '14+', orbit: '165 yrs', day: '16.1 hrs' },
    missions: [{ year: '1989', name: 'Voyager 2', desc: 'Only spacecraft to visit Neptune' }]
  },
  pluto: {
    bg: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
    comp: [{ val: '90%', label: 'Nitrogen' }, { val: '10%', label: 'Methane' }],
    trace: 'Carbon monoxide',
    data: { diameter: '2,376 km', mass: '0.002 Earths', moons: '5', orbit: '248 yrs', day: '153.3 hrs' },
    missions: [{ year: '2015', name: 'New Horizons', desc: 'First flyby of Pluto' }]
  }
};

export default function PlanetDetailScreen({ routeParams }: any) {
  const planetId = routeParams?.planetId || 'jupiter';
  const planetBase = planets.find(p => p.id === planetId);
  const details = PLANET_DETAILS[planetId] || PLANET_DETAILS['jupiter'];

  return (
    <ImageBackground source={{ uri: details.bg }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.titleCard}>
          <Text style={[styles.mainTitle, { color: planetBase?.color || '#fff' }]}>{planetBase?.name?.toUpperCase()}</Text>
          <Text style={styles.mainSubtitle}>{planetBase?.info}</Text>
        </View>

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

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  titleCard: { backgroundColor: 'rgba(10,10,20,0.8)', padding: 20, borderRadius: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  mainTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, letterSpacing: 2 },
  mainSubtitle: { color: '#ddd', fontSize: 16, lineHeight: 24 },
  card: { backgroundColor: 'rgba(20,20,30,0.6)', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  cardTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 15, letterSpacing: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statGroup: { flex: 1 },
  statValue: { color: '#4FC3F7', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#A0A0B0', fontSize: 14 },
  traceText: { color: '#fff', fontSize: 12, fontStyle: 'italic', marginTop: 10 },
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dataLabel: { color: '#A0A0B0', fontSize: 14 },
  dataValue: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  timelineItem: { borderLeftWidth: 2, borderColor: '#4FC3F7', paddingLeft: 15, paddingBottom: 20, marginLeft: 5 },
  timelineYear: { color: '#A0A0B0', fontSize: 12 },
  timelineName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginVertical: 2 },
  timelineDesc: { color: '#A0A0B0', fontSize: 12 }
});
