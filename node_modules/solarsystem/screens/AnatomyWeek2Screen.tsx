import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const BG_URL = 'https://images.unsplash.com/photo-1530213786676-4c5520e03e48?q=80&w=3000&auto=format&fit=crop';

const BONES = [
  { id: 'skull', label: 'Skull', icon: '💀' },
  { id: 'sternum', label: 'Sternum', icon: '🦴' },
  { id: 'ribs', label: 'Ribs', icon: '🩻' },
  { id: 'vertebrae', label: 'Vertebrae', icon: '🦴' },
];

export default function AnatomyWeek2Screen({ navigation }: any) {
  // Simulating positions on a skeleton
  const [placed, setPlaced] = useState<Record<string, string | null>>({
    skull: null,
    sternum: null,
    ribs: null,
    vertebrae: null,
  });
  
  const [selectedBone, setSelectedBone] = useState<string | null>(null);

  const availableBones = BONES.filter(b => !Object.values(placed).includes(b.id));
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
      
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('AnatomyHub')}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.weekText}>WEEK 2</Text>
        <Text style={styles.questionText}>Which bones make up the axial skeleton?</Text>
      </View>

      <View style={styles.gameArea}>
        {/* Simple visual representation of a skeleton outline */}
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
                  selectedBone === bone.id && styles.selectedLabelBadge
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
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('AnatomyHub')}>
            <Text style={styles.nextButtonText}>Back to Hub</Text>
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
  
  gameArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  skeletonContainer: { alignItems: 'center', width: 300 },
  
  dropZone: { 
    borderWidth: 2, 
    borderColor: 'rgba(255,255,255,0.3)', 
    borderStyle: 'dashed', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  zoneHint: { color: 'rgba(255,255,255,0.4)', fontSize: 12, textTransform: 'uppercase' },
  zonePlaced: { borderColor: '#4FC3F7', borderStyle: 'solid', backgroundColor: 'rgba(79, 195, 247, 0.2)' },
  placedText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  zoneSkull: { width: 100, height: 120, borderRadius: 50, marginBottom: 10 },
  torsoContainer: { alignItems: 'center', width: 180, height: 250, position: 'relative' },
  zoneSternum: { width: 40, height: 80, borderRadius: 10, position: 'absolute', top: 30, zIndex: 2 },
  zoneRibs: { width: 140, height: 120, borderRadius: 30, position: 'absolute', top: 20, zIndex: 1 },
  zoneVertebrae: { width: 30, height: 200, borderRadius: 15, position: 'absolute', top: 0, zIndex: 0 },
  
  tray: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  trayTitle: { color: '#ccc', textAlign: 'center', marginBottom: 15, fontStyle: 'italic' },
  labelBank: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  labelBadge: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#fff', elevation: 5 },
  selectedLabelBadge: { transform: [{ scale: 1.1 }], backgroundColor: '#4FC3F7' },
  labelText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

  successTray: { backgroundColor: '#4FC3F7', padding: 40, borderTopLeftRadius: 40, borderTopRightRadius: 40, alignItems: 'center' },
  successTitle: { color: '#000', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  successText: { color: '#000', fontSize: 16, marginBottom: 20, textAlign: 'center' },
  nextButton: { backgroundColor: '#000', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30 },
  nextButtonText: { color: '#4FC3F7', fontWeight: 'bold', fontSize: 18 }
});
