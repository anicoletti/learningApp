import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const BG_URL = 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=3000&auto=format&fit=crop';

const SLIDES = [
  { id: 'connective', label: 'Connective', color: '#FFB74D', emoji: '🦴', info: 'Connective tissue holds our body together and supports it! Bones and blood are types of connective tissue.' },
  { id: 'muscle', label: 'Muscle', color: '#E57373', emoji: '💪', info: 'Muscle tissue helps us move! It makes our heart beat and lets us run and jump.' },
  { id: 'epithelial', label: 'Epithelial', color: '#FFF176', emoji: '🛡️', info: 'Epithelial tissue is the outer layer that protects us, just like our skin!' },
  { id: 'nerve', label: 'Nerve', color: '#64B5F6', emoji: '⚡', info: 'Nerve tissue sends fast messages to and from the brain, like a super-speed telephone network!' },
];

export default function AnatomyWeek1Screen({ navigation }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string | null>>({
    0: null, 1: null, 2: null, 3: null
  });
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const shuffledSlides = useMemo(() => [...SLIDES].sort(() => Math.random() - 0.5), []);
  const availableLabels = shuffledSlides.filter(s => !Object.values(placed).includes(s.id));
  const isComplete = Object.values(placed).every(v => v !== null);

  const handleSlideTap = (index: number) => {
    if (selectedLabel) {
      if (SLIDES[index].id === selectedLabel) {
        setPlaced(prev => ({ ...prev, [index]: selectedLabel }));
      }
      setSelectedLabel(null);
    } else if (placed[index]) {
      setPlaced(prev => ({ ...prev, [index]: null }));
    }
  };

  return (
    <ImageBackground source={{ uri: BG_URL }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <TouchableOpacity 
        style={[styles.closeButton, isPlaying && { backgroundColor: 'rgba(79, 195, 247, 0.2)', paddingHorizontal: 15 }]} 
        onPress={() => isPlaying ? setIsPlaying(false) : navigation.navigate('AnatomyHub')}
      >
        <Text style={styles.closeText}>{isPlaying ? '← Back to Lesson' : '✕'}</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.weekText}>WEEK 1</Text>
        <Text style={styles.questionText}>What are four types of tissue?</Text>
      </View>

      {!isPlaying ? (
        <View style={styles.lessonArea}>
          <ScrollView contentContainerStyle={styles.accordionContainer}>
            {SLIDES.map((slide) => {
              const isExpanded = expandedId === slide.id;
              return (
                <TouchableOpacity 
                  key={slide.id} 
                  style={[styles.accordionHeader, { borderLeftColor: slide.color }]} 
                  onPress={() => setExpandedId(isExpanded ? null : slide.id)}
                >
                  <View style={styles.accordionTitleRow}>
                    <Text style={styles.accordionEmoji}>{slide.emoji}</Text>
                    <Text style={styles.accordionTitle}>{slide.label}</Text>
                    <Text style={styles.accordionIcon}>{isExpanded ? '▼' : '▶'}</Text>
                  </View>
                  {isExpanded && (
                    <View style={styles.accordionContent}>
                      <Text style={styles.accordionText}>{slide.info}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <View style={styles.playButtonWrapper}>
            <TouchableOpacity style={styles.playButton} onPress={() => setIsPlaying(true)}>
              <Text style={styles.playButtonText}>Play Game (OLD)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.playButton, { marginTop: 12, backgroundColor: '#FF7043' }]} onPress={() => alert('Coming Soon: Tissue Defense (2D)')}>
              <Text style={styles.playButtonText}>Tissue Defense (2D)</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
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
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.nextButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]} onPress={() => navigation.navigate('AnatomyHub')}>
                  <Text style={[styles.nextButtonText, { color: '#fff' }]}>Back to Hub</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace('AnatomyWeek2')}>
                  <Text style={styles.nextButtonText}>Next Week →</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
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
  
  lessonArea: { flex: 1, padding: 20, maxWidth: 600, width: '100%', alignSelf: 'center' },
  accordionContainer: { paddingBottom: 20 },
  accordionHeader: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, marginBottom: 10, padding: 20, borderLeftWidth: 4, overflow: 'hidden' },
  accordionTitleRow: { flexDirection: 'row', alignItems: 'center' },
  accordionEmoji: { fontSize: 24, marginRight: 15 },
  accordionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', flex: 1 },
  accordionIcon: { color: '#A0A0B0', fontSize: 16 },
  accordionContent: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  accordionText: { color: '#ddd', fontSize: 16, lineHeight: 24 },
  
  playButtonWrapper: { alignItems: 'center', paddingVertical: 20 },
  playButton: { backgroundColor: '#4FC3F7', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, elevation: 5 },
  playButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },

  microscopeArea: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 20, padding: 20 },
  slide: { width: 140, height: 180, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  slideEmoji: { fontSize: 60, opacity: 0.5 },
  placedLabel: { ...StyleSheet.absoluteFillObject, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  placedLabelText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  
  tray: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center' },
  trayTitle: { color: '#fff', fontSize: 18, marginBottom: 20 },
  labelBank: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  labelBadge: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, opacity: 0.8 },
  selectedLabelBadge: { opacity: 1, transform: [{ scale: 1.1 }], borderWidth: 2, borderColor: '#fff' },
  labelText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

  successTray: { backgroundColor: 'rgba(76, 175, 80, 0.9)', padding: 40, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center' },
  successTitle: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  successText: { color: '#fff', fontSize: 18, textAlign: 'center', marginBottom: 30 },
  buttonRow: { flexDirection: 'row', gap: 15, justifyContent: 'center' },
  nextButton: { backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25 },
  nextButtonText: { color: '#4CAF50', fontSize: 18, fontWeight: 'bold' }
});
