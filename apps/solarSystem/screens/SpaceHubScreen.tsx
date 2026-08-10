import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { planets } from '../data/planets';

const SPACE_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop';

export default function SpaceHubScreen({ navigation }: any) {
  const modules = [
    { id: 'intro', title: 'Introduction to Our Solar System', desc: 'Learn the basics of our celestial neighborhood.' },
    { id: 'sun', title: 'The Sun', desc: 'Our Star' },
    { id: 'mercury', title: 'Mercury', desc: 'The Swift Planet' },
    { id: 'venus', title: 'Venus', desc: 'The Morning Star' },
    { id: 'earth', title: 'Earth', desc: 'Our Home' },
    { id: 'mars', title: 'Mars', desc: 'The Red Planet' },
    { id: 'jupiter', title: 'Jupiter', desc: 'Giant of Gas' },
    { id: 'saturn', title: 'Saturn', desc: 'The Ringed Planet' },
    { id: 'uranus', title: 'Uranus', desc: 'The Ice Giant' },
    { id: 'neptune', title: 'Neptune', desc: 'The Blue Planet' },
    { id: 'pluto', title: 'Pluto & Dwarf Planets', desc: 'The Outer Reaches' },
  ];

  return (
    <ImageBackground source={{ uri: SPACE_BG }} style={styles.container}>
      <View style={styles.mascotContainer}>
        <View style={styles.mascotPlaceholder}>
          <Text style={styles.mascotText}>Sol</Text>
        </View>
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>Hey, Explorer! Select a planet to start your celestial challenge!</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>ASTRONOMY MODULES</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {modules.map((m, index) => {
          const planetData = planets.find(p => p.id === m.id);
          return (
            <TouchableOpacity 
              key={m.id} 
              style={styles.cardWrapper}
              onPress={() => m.id === 'intro' ? navigation.navigate('Level1') : navigation.navigate('PlanetDetail', { planetId: m.id })}
            >
              <ImageBackground 
                source={planetData?.imageSource || { uri: SPACE_BG }} 
                style={styles.card}
                imageStyle={styles.cardImage}
                resizeMode="cover"
              >
                <View style={styles.cardDarkOverlay} />
                <Text style={styles.cardLevel}>MODULE {index + 1}</Text>
                <Text style={styles.cardTitle}>{m.title}</Text>
                <Text style={styles.cardDesc}>{m.desc}</Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  mascotContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 40, marginTop: 20 },
  mascotPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', elevation: 10 },
  mascotText: { color: '#000', fontWeight: 'bold', fontSize: 20 },
  speechBubble: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 15, marginLeft: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  speechText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  sectionTitle: { color: '#A0A0B0', fontSize: 16, fontWeight: 'bold', letterSpacing: 2, marginBottom: 20 },
  scrollContainer: { flexGrow: 0 },
  cardWrapper: { width: 220, height: 300, borderRadius: 20, marginRight: 20, overflow: 'hidden' },
  card: { flex: 1, padding: 20, justifyContent: 'flex-end' },
  cardImage: { opacity: 0.8 },
  cardDarkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10, 10, 20, 0.65)' },
  cardLevel: { color: '#4FC3F7', fontSize: 14, fontWeight: 'bold', marginBottom: 5, zIndex: 2 },
  cardTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 10, zIndex: 2 },
  cardDesc: { color: '#ddd', fontSize: 12, marginBottom: 10, zIndex: 2 }
});
