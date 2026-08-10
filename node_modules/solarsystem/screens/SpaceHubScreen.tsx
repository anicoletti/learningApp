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

      <Text style={styles.sectionTitle}>LEVEL SELECTION</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Level1')}>
          <Text style={styles.cardLevel}>Level 1</Text>
          <Text style={styles.cardTitle}>Introduction to Orbits</Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>PLAY</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PlanetDetail')}>
          <Text style={styles.cardLevel}>Level 5</Text>
          <Text style={styles.cardTitle}>Jupiter: Giant of Gas</Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>PLAY</Text>
          </View>
        </TouchableOpacity>
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
