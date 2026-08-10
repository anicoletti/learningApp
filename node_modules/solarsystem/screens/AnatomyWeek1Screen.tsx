import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const BG_URL = 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=3000&auto=format&fit=crop';

const SLIDES = [
  { id: 'connective', label: 'Connective', color: '#FFB74D', emoji: '🦴' },
  { id: 'muscle', label: 'Muscle', color: '#E57373', emoji: '💪' },
  { id: 'epithelial', label: 'Epithelial', color: '#FFF176', emoji: '🛡️' },
  { id: 'nerve', label: 'Nerve', color: '#64B5F6', emoji: '⚡' },
];

export default function AnatomyWeek1Screen({ navigation }: any) {
  const [placed, setPlaced] = useState<Record<string, string | null>>({
    0: null, 1: null, 2: null, 3: null
  });
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const availableLabels = SLIDES.filter(s => !Object.values(placed).includes(s.id));
  const isComplete = Object.values(placed).every(v => v !== null);

  const handleSlideTap = (index: number) => {
    if (selectedLabel) {
      // Check if it's correct! (Slide index must match SLIDES index for simplicity in this game)
      if (SLIDES[index].id === selectedLabel) {
        setPlaced(prev => ({ ...prev, [index]: selectedLabel }));
      }
      setSelectedLabel(null);
    } else if (placed[index]) {
      // Allow removing
      const labelId = placed[index];
      setPlaced(prev => ({ ...prev, [index]: null }));
    }
  };

  return (
    <ImageBackground source={{ uri: BG_URL }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('AnatomyHub')}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.weekText}>WEEK 1</Text>
        <Text style={styles.questionText}>What are four types of tissue?</Text>
      </View>

      <View style={styles.microscopeArea}>
        {SLIDES.map((slide, index) => {
          const isPlaced = placed[index] === slide.id;
          return (
            <TouchableOpacity 
              key={`slide-${index}`} 
              style={[styles.slide, isPlaced && { borderColor: slide.color }]} 
              onPress={() => handleSlideTap(index)}
            >
              <Text style={styles.slideEmoji}>{slide.emoji}</Text>
              {isPlaced && (
                <View style={[styles.placedLabel, { backgroundColor: slide.color }]}>
                  <Text style={styles.placedLabelText}>{slide.label}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {!isComplete ? (
        <View style={styles.tray}>
          <Text style={styles.trayTitle}>Tap a label, then tap its matching slide!</Text>
          <View style={styles.labelBank}>
            {availableLabels.map(slide => (
              <TouchableOpacity 
                key={`label-${slide.id}`} 
                style={[
                  styles.labelBadge, 
                  selectedLabel === slide.id && styles.selectedLabelBadge,
                  { backgroundColor: slide.color }
                ]}
                onPress={() => setSelectedLabel(slide.id === selectedLabel ? null : slide.id)}
              >
                <Text style={styles.labelText}>{slide.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.successTray}>
          <Text style={styles.successTitle}>Excellent!</Text>
          <Text style={styles.successText}>Connective, Muscle, Epithelial, and Nerve tissues!</Text>
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('AnatomyWeek2')}>
            <Text style={styles.nextButtonText}>Next Week →</Text>
          </TouchableOpacity>
        </View>
      )}

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10, 20, 30, 0.85)' },
  closeButton: { position: 'absolute', top: 40, right: 20, zIndex: 10, padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20 },
  closeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  header: { padding: 30, paddingTop: 60, alignItems: 'center' },
  weekText: { color: '#FF5252', fontSize: 16, fontWeight: 'bold', letterSpacing: 2, marginBottom: 5 },
  questionText: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  
  microscopeArea: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', gap: 20, padding: 20 },
  slide: { width: 140, height: 140, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 70, borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  slideEmoji: { fontSize: 40, opacity: 0.5 },
  placedLabel: { position: 'absolute', bottom: -10, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15 },
  placedLabelText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  
  tray: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  trayTitle: { color: '#ccc', textAlign: 'center', marginBottom: 15, fontStyle: 'italic' },
  labelBank: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  labelBadge: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, elevation: 5 },
  selectedLabelBadge: { transform: [{ scale: 1.1 }], borderWidth: 2, borderColor: '#fff' },
  labelText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

  successTray: { backgroundColor: '#FF5252', padding: 40, borderTopLeftRadius: 40, borderTopRightRadius: 40, alignItems: 'center' },
  successTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  successText: { color: '#fff', fontSize: 16, marginBottom: 20, textAlign: 'center' },
  nextButton: { backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30 },
  nextButtonText: { color: '#FF5252', fontWeight: 'bold', fontSize: 18 }
});
