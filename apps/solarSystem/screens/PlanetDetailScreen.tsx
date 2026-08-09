import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

// High res NASA Jupiter image placeholder
const JUPITER_BG = 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop';

export default function PlanetDetailScreen() {
  return (
    <ImageBackground source={{ uri: JUPITER_BG }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ATMOSPHERIC COMPOSITION</Text>
          <View style={styles.row}>
            <View style={styles.statGroup}>
              <Text style={styles.statValue}>89.8%</Text>
              <Text style={styles.statLabel}>Hydrogen</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statValue}>10.2%</Text>
              <Text style={styles.statLabel}>Helium</Text>
            </View>
          </View>
          <Text style={styles.traceText}>Trace gases: Methane, Ammonia, Water</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>PLANETARY DATA</Text>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Diameter:</Text><Text style={styles.dataValue}>139,820 km</Text></View>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Mass:</Text><Text style={styles.dataValue}>318 Earths</Text></View>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Moons:</Text><Text style={styles.dataValue}>95+</Text></View>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Orbital Period:</Text><Text style={styles.dataValue}>11.86 yrs</Text></View>
          <View style={styles.dataRow}><Text style={styles.dataLabel}>Day Length:</Text><Text style={styles.dataValue}>9.93 hrs</Text></View>
        </View>

        <View style={[styles.card, { marginTop: 20 }]}>
          <Text style={styles.cardTitle}>MISSIONS TO JUPITER</Text>
          <View style={styles.timelineItem}>
            <Text style={styles.timelineYear}>1979</Text>
            <Text style={styles.timelineName}>Voyager 1</Text>
            <Text style={styles.timelineDesc}>Detailed images of the Great Red Spot</Text>
          </View>
          <View style={styles.timelineItem}>
            <Text style={styles.timelineYear}>1995-2003</Text>
            <Text style={styles.timelineName}>Galileo</Text>
            <Text style={styles.timelineDesc}>First orbiter and atmospheric probe</Text>
          </View>
          <View style={[styles.timelineItem, { borderLeftWidth: 0 }]}>
            <Text style={styles.timelineYear}>2016-Present</Text>
            <Text style={styles.timelineName}>Juno</Text>
            <Text style={styles.timelineDesc}>Mapping gravity and magnetic fields</Text>
          </View>
        </View>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
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
