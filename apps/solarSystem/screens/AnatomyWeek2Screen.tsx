import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const BG_URL = 'https://images.unsplash.com/photo-1530213786676-4c5520e03e48?q=80&w=3000&auto=format&fit=crop';

const BONES = [
  { id: 'skull', label: 'Skull', icon: '💀', color: '#FFB74D', info: 'The skull acts like a tough helmet that protects your brain.' },
  { id: 'sternum', label: 'Sternum', icon: '🦴', color: '#E57373', info: 'The sternum is the flat bone in the center of your chest that holds your ribs together.' },
  { id: 'ribs', label: 'Ribs', icon: '🩻', color: '#FFF176', info: 'Your ribs form a cage that protects your heart and lungs.' },
  { id: 'vertebrae', label: 'Vertebrae', icon: '🦴', color: '#64B5F6', info: 'Vertebrae are the stack of small bones that make up your spine and help you stand up straight.' },
];

export default function AnatomyWeek2Screen({ navigation }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [placed, setPlaced] = useState<Record<string, string | null>>({
    skull: null,
    sternum: null,
    ribs: null,
    vertebrae: null,
  });
  
  const [selectedBone, setSelectedBone] = useState<string | null>(null);

  const shuffledBones = useMemo(() => [...BONES].sort(() => Math.random() - 0.5), []);
  const availableBones = shuffledBones.filter(b => !Object.values(placed).includes(b.id));
  const isComplete = Object.values(placed).every(v => v !== null);

  const handleZoneTap = (zoneId: string) => {
    if (selectedBone) {
      if (zoneId === selectedBone) {
        setPlaced(prev => ({ ...prev, [zoneId]: selectedBone }));
      }
      setSelectedBone(null);
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
        <Text style={styles.weekText}>WEEK 2</Text>
        <Text style={styles.questionText}>Which bones make up the axial skeleton?</Text>
      </View>

      {!isPlaying ? (
        <View style={styles.lessonArea}>
          <ScrollView contentContainerStyle={styles.accordionContainer}>
            {BONES.map((bone) => {
              const isExpanded = expandedId === bone.id;
              return (
                <TouchableOpacity 
                  key={bone.id} 
                  style={[styles.accordionHeader, { borderLeftColor: bone.color }]} 
                  onPress={() => setExpandedId(isExpanded ? null : bone.id)}
                >
                  <View style={styles.accordionTitleRow}>
                    <Text style={styles.accordionEmoji}>{bone.icon}</Text>
                    <Text style={styles.accordionTitle}>{bone.label}</Text>
                    <Text style={styles.accordionIcon}>{isExpanded ? '▼' : '▶'}</Text>
                  </View>
                  {isExpanded && (
                    <View style={styles.accordionContent}>
                      <Text style={styles.accordionText}>{bone.info}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <View style={styles.playButtonWrapper}>
            <TouchableOpacity style={styles.playButton} onPress={() => setIsPlaying(true)}>
              <Text style={styles.playButtonText}>Play Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.gameArea}>
            <View style={styles.skeletonContainer}>
              <TouchableOpacity 
                style={[styles.dropZone, styles.zoneSkull, placed.skull && styles.zonePlaced]} 
                onPress={() => handleZoneTap('skull')}
              >
                {placed.skull ? <Text style={styles.placedText}>Skull 💀</Text> : <Text style={styles.zoneHint}>Head</Text>}
              </TouchableOpacity>
              
              <View style={styles.torsoContainer}>
                <TouchableOpacity 
                  style={[styles.dropZone, styles.zoneSternum, placed.sternum && styles.zonePlaced]} 
                  onPress={() => handleZoneTap('sternum')}
                >
                  {placed.sternum ? <Text style={styles.placedText}>Sternum</Text> : <Text style={styles.zoneHint}>Chest Center</Text>}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.dropZone, styles.zoneRibs, placed.ribs && styles.zonePlaced]} 
                  onPress={() => handleZoneTap('ribs')}
                >
                  {placed.ribs ? <Text style={styles.placedText}>Ribs 🩻</Text> : <Text style={styles.zoneHint}>Chest Cage</Text>}
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.dropZone, styles.zoneVertebrae, placed.vertebrae && styles.zonePlaced]} 
                  onPress={() => handleZoneTap('vertebrae')}
                >
                  {placed.vertebrae ? <Text style={styles.placedText}>Vertebrae</Text> : <Text style={styles.zoneHint}>Spine</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {!isComplete ? (
            <View style={styles.tray}>
              <Text style={styles.trayTitle}>Select a bone, then tap its correct spot on the body!</Text>
              <View style={styles.labelBank}>
                {availableBones.map(bone => (
                  <TouchableOpacity 
                    key={`bone-${bone.id}`} 
                    style={[
                      styles.labelBadge, 
                      selectedBone === bone.id && styles.selectedLabelBadge,
                      { backgroundColor: bone.color }
                    ]}
                    onPress={() => setSelectedBone(bone.id === selectedBone ? null : bone.id)}
                  >
                    <Text style={styles.labelText}>{bone.label} {bone.icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.successTray}>
              <Text style={styles.successTitle}>Skeleton Assembled!</Text>
              <Text style={styles.successText}>The Axial Skeleton is made of the Skull, Ribs, Vertebrae, and Sternum!</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.nextButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]} onPress={() => navigation.navigate('AnatomyHub')}>
                  <Text style={[styles.nextButtonText, { color: '#fff' }]}>Back to Hub</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('AnatomyWeek', { week: 3 })}>
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

  gameArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  skeletonContainer: { width: 200, alignItems: 'center', paddingVertical: 20 },
  
  torsoContainer: { alignItems: 'center', width: '100%', position: 'relative', marginTop: 20, height: 200 },
  
  dropZone: { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  zonePlaced: { borderStyle: 'solid', borderColor: '#4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.2)' },
  zoneHint: { color: '#A0A0B0', fontSize: 12 },
  placedText: { color: '#fff', fontWeight: 'bold' },

  zoneSkull: { width: 80, height: 90, borderRadius: 40 },
  zoneSternum: { width: 40, height: 80, position: 'absolute', top: 20, zIndex: 2, backgroundColor: 'rgba(50,50,50,0.5)' },
  zoneRibs: { width: 140, height: 100, position: 'absolute', top: 10, borderRadius: 30 },
  zoneVertebrae: { width: 30, height: 180, position: 'absolute', top: 0, zIndex: 0 },

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
