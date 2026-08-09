import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const SPACE_BG = 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=3000&auto=format&fit=crop';

export default function Level1GameScreen({ navigation }: any) {
  return (
    <ImageBackground source={{ uri: SPACE_BG }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <TouchableOpacity 
        style={styles.closeHeaderButton} 
        onPress={() => navigation.navigate('Level1')}
      >
        <Text style={styles.closeHeaderButtonText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Level 1: Orbit Assembly</Text>
        <Text style={styles.subtitle}>Drag and drop the planets into their correct orbits!</Text>
        
        {/* Placeholder for the drag and drop game mechanics */}
        <View style={styles.gameArea}>
          <Text style={styles.placeholderText}>[ Game Area Stub ]</Text>
          <Text style={styles.placeholderSub}>We will implement the drag-and-drop mechanics here.</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  closeHeaderButton: {
    position: 'absolute', top: 50, right: 20, width: 40, height: 40,
    borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center', zIndex: 100,
  },
  closeHeaderButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, padding: 40, alignItems: 'center' },
  title: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { color: '#80D8FF', fontSize: 18, marginBottom: 40, textAlign: 'center' },
  gameArea: { 
    flex: 1, width: '100%', maxWidth: 800, 
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'dashed',
    borderRadius: 20, justifyContent: 'center', alignItems: 'center' 
  },
  placeholderText: { color: '#fff', fontSize: 24, fontWeight: 'bold', opacity: 0.5 },
  placeholderSub: { color: '#888', marginTop: 10, textAlign: 'center' }
});
