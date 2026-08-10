import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const SCIENCE_BG = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=3000&auto=format&fit=crop';

export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground source={{ uri: SCIENCE_BG }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <View style={styles.mascotContainer}>
        <View style={styles.mascotPlaceholder}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sol</Text>
        </View>
        <View style={styles.speechBubble}>
          <Text style={styles.mascotName}>Sol</Text>
          <Text style={styles.speechText}>Welcome to the Science Hub! Which subject shall we explore today?</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>SELECT A SUBJECT</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        
        {/* Space Card */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SpaceHub')}>
          <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000' }} style={styles.cardBg} imageStyle={{ borderRadius: 20 }}>
            <View style={styles.cardDarken} />
            <Text style={styles.cardLevel}>ASTRONOMY</Text>
            <Text style={styles.cardTitle}>Explore the Cosmos</Text>
            <View style={styles.cardButton}>
              <Text style={styles.cardButtonText}>ENTER</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Anatomy Card */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AnatomyHub')}>
          <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1530213786676-4c5520e03e48?q=80&w=1000' }} style={styles.cardBg} imageStyle={{ borderRadius: 20 }}>
            <View style={styles.cardDarken} />
            <Text style={[styles.cardLevel, { color: '#FF5252' }]}>BIOLOGY</Text>
            <Text style={styles.cardTitle}>Human Anatomy</Text>
            <View style={[styles.cardButton, { borderColor: '#FF5252' }]}>
              <Text style={[styles.cardButtonText, { color: '#FF5252' }]}>ENTER</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Chemistry Card */}
        <TouchableOpacity style={styles.card} disabled={true}>
          <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1603126857599-f6e157824fce?q=80&w=1000' }} style={styles.cardBg} imageStyle={{ borderRadius: 20 }}>
            <View style={[styles.cardDarken, { backgroundColor: 'rgba(0,0,0,0.8)' }]} />
            <Text style={[styles.cardLevel, { color: '#69F0AE' }]}>CHEMISTRY</Text>
            <Text style={styles.cardTitle}>Coming Soon</Text>
            <View style={[styles.cardButton, { borderColor: '#555' }]}>
              <Text style={[styles.cardButtonText, { color: '#555' }]}>LOCKED</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10, 10, 20, 0.7)' },
  mascotContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 40, marginTop: 40, paddingHorizontal: 20 },
  mascotPlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 15px rgba(255, 215, 0, 0.6)', elevation: 10, borderWidth: 3, borderColor: '#fff' },
  mascotName: { color: '#FFD700', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  speechBubble: { flex: 1, backgroundColor: 'rgba(25, 25, 45, 0.85)', padding: 15, borderRadius: 15, marginLeft: 15, borderWidth: 1, borderColor: '#FFD700' },
  speechText: { color: '#fff', fontSize: 16, lineHeight: 24 },
  sectionTitle: { color: '#A0A0B0', fontSize: 18, fontWeight: 'bold', letterSpacing: 2, marginBottom: 20, paddingHorizontal: 20 },
  scrollContainer: { flexGrow: 0, paddingHorizontal: 20 },
  card: { width: 260, height: 350, marginRight: 20, borderRadius: 20, elevation: 5, boxShadow: '0px 5px 15px rgba(0,0,0,0.5)' },
  cardBg: { flex: 1, padding: 20, justifyContent: 'flex-end', borderRadius: 20 },
  cardDarken: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20 },
  cardLevel: { color: '#4FC3F7', fontSize: 16, fontWeight: 'bold', marginBottom: 5, letterSpacing: 1 },
  cardTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 30 },
  cardButton: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#4FC3F7', padding: 12, borderRadius: 25, alignItems: 'center' },
  cardButtonText: { color: '#4FC3F7', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});
