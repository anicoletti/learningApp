import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const SPACE_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop';

export default function SpaceHubScreen({ navigation }: any) {
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
        
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Level1')}>
          <Text style={styles.cardLevel}>MODULE 1</Text>
          <Text style={styles.cardTitle}>Introduction to Our Solar System</Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>EXPLORE</Text>
          </View>
        </TouchableOpacity>

        {[
          { id: 'sun', title: 'The Sun', subtitle: 'Our Star' },
          { id: 'mercury', title: 'Mercury', subtitle: 'The Swift Planet' },
          { id: 'venus', title: 'Venus', subtitle: 'The Morning Star' },
          { id: 'earth', title: 'Earth', subtitle: 'Our Home' },
          { id: 'mars', title: 'Mars', subtitle: 'The Red Planet' },
          { id: 'jupiter', title: 'Jupiter', subtitle: 'Giant of Gas' },
          { id: 'saturn', title: 'Saturn', subtitle: 'The Ringed Planet' },
          { id: 'uranus', title: 'Uranus', subtitle: 'The Ice Giant' },
          { id: 'neptune', title: 'Neptune', subtitle: 'The Blue Planet' },
          { id: 'pluto', title: 'Pluto & Dwarf Planets', subtitle: 'The Outer Reaches' },
        ].map((item, index) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card} 
            onPress={() => navigation.navigate('PlanetDetail', { planetId: item.id })}
          >
            <Text style={styles.cardLevel}>MODULE {index + 2}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={{ color: '#aaa', marginBottom: 20 }}>{item.subtitle}</Text>
            <View style={styles.cardButton}>
              <Text style={styles.cardButtonText}>EXPLORE</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  mascotContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 40, marginTop: 20 },
  mascotPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.8)', elevation: 10 },
  mascotText: { color: '#000', fontWeight: 'bold', fontSize: 20 },
  speechBubble: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 15, marginLeft: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  speechText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  sectionTitle: { color: '#A0A0B0', fontSize: 16, fontWeight: 'bold', letterSpacing: 2, marginBottom: 20 },
  scrollContainer: { flexGrow: 0 },
  card: { backgroundColor: 'rgba(20,20,40,0.8)', width: 220, height: 300, borderRadius: 20, padding: 20, marginRight: 20, borderWidth: 1, borderColor: '#404060', justifyContent: 'flex-end' },
  cardLevel: { color: '#4FC3F7', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  cardTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  cardButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#4FC3F7', padding: 10, borderRadius: 20, alignItems: 'center' },
  cardButtonText: { color: '#4FC3F7', fontWeight: 'bold' }
});
