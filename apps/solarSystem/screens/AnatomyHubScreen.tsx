import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const ANATOMY_BG = 'https://images.unsplash.com/photo-1530213786676-4c5520e03e48?q=80&w=3000&auto=format&fit=crop';

export default function AnatomyHubScreen({ navigation }: any) {
  const weeks = [
    { week: 1, title: 'Four Types of Tissue' },
    { week: 2, title: 'Axial Skeleton' },
    { week: 3, title: 'Three Kinds of Muscle' },
    { week: 4, title: 'Nervous System' },
    { week: 5, title: 'Five Main Senses' },
    { week: 6, title: 'Digestive System' },
    { week: 7, title: 'Excretory System' },
    { week: 8, title: 'Circulatory System' },
    { week: 9, title: 'Lymph System' },
    { week: 10, title: 'Respiratory System' },
    { week: 11, title: 'Endocrine System' },
    { week: 12, title: 'Purposes of Blood' },
  ];

  return (
    <ImageBackground source={{ uri: ANATOMY_BG }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HUMAN ANATOMY</Text>
        <Text style={styles.headerSubtitle}>12 Weeks of Biology</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {weeks.map((w) => (
            <TouchableOpacity key={`week-${w.week}`} style={styles.card} onPress={() => {}}>
              <Text style={styles.cardWeek}>WEEK {w.week}</Text>
              <Text style={styles.cardTitle}>{w.title}</Text>
              <View style={styles.cardButton}>
                <Text style={styles.cardButtonText}>START</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(20, 10, 10, 0.75)' },
  header: { padding: 20, paddingTop: 40, alignItems: 'center' },
  headerTitle: { color: '#FF5252', fontSize: 24, fontWeight: 'bold', letterSpacing: 2 },
  headerSubtitle: { color: '#fff', fontSize: 16, marginTop: 5 },
  scrollContent: { padding: 20, paddingBottom: 60 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 },
  card: { backgroundColor: 'rgba(30, 20, 20, 0.8)', width: 160, height: 200, borderRadius: 15, padding: 15, borderWidth: 1, borderColor: '#FF5252', justifyContent: 'space-between', alignItems: 'center' },
  cardWeek: { color: '#FF5252', fontSize: 14, fontWeight: 'bold' },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  cardButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FF5252', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 15 },
  cardButtonText: { color: '#FF5252', fontWeight: 'bold', fontSize: 12 }
});
