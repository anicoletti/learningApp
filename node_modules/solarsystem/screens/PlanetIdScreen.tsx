import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const SPACE_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop';

export default function PlanetIdScreen() {
  return (
    <ImageBackground source={{ uri: SPACE_BG }} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BUILD THE INNER SOLAR SYSTEM</Text>
        <Text style={styles.subtitle}>0/4 Planets Placed</Text>
      </View>

      <View style={styles.puzzleContainer}>
        {/* Mocking the concentric rings and the sun */}
        <View style={[styles.ring, { width: 300, height: 300, borderColor: '#B388FF' }]}>
          <View style={[styles.ring, { width: 220, height: 220, borderColor: '#80D8FF' }]}>
            <View style={[styles.ring, { width: 140, height: 140, borderColor: '#FFD180' }]}>
              <View style={styles.sun} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.dock}>
        <Text style={styles.dockTitle}>VECTOR PLANET DOCK</Text>
        <View style={styles.planetList}>
          <View style={styles.planetItem}>
            <View style={[styles.planetIcon, { backgroundColor: '#FF8A65' }]} />
            <Text style={styles.planetName}>Mercury</Text>
          </View>
          <View style={styles.planetItem}>
            <View style={[styles.planetIcon, { backgroundColor: '#FFD54F' }]} />
            <Text style={styles.planetName}>Venus</Text>
          </View>
          <View style={styles.planetItem}>
            <View style={[styles.planetIcon, { backgroundColor: '#4FC3F7' }]} />
            <Text style={styles.planetName}>Earth</Text>
          </View>
          <View style={styles.planetItem}>
            <View style={[styles.planetIcon, { backgroundColor: '#E57373' }]} />
            <Text style={styles.planetName}>Mars</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  header: { padding: 20, paddingTop: 40 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  subtitle: { color: '#80D8FF', fontSize: 14, marginTop: 5 },
  puzzleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ring: { borderRadius: 200, borderWidth: 2, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  sun: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFD700', boxShadow: '0px 0px 20px #FFD700', elevation: 10 },
  dock: { backgroundColor: 'rgba(10,10,30,0.9)', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, paddingBottom: 40, borderWidth: 1, borderColor: '#404060' },
  dockTitle: { color: '#4FC3F7', fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, letterSpacing: 2 },
  planetList: { flexDirection: 'row', justifyContent: 'space-around' },
  planetItem: { alignItems: 'center' },
  planetIcon: { width: 50, height: 50, borderRadius: 25, marginBottom: 10 },
  planetName: { color: '#fff', fontSize: 12 }
});
