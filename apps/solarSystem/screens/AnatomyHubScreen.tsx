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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {weeks.map((w) => {
          const isLocked = false;
          return (
            <TouchableOpacity 
              key={`week-${w.week}`} 
              style={[styles.card, isLocked && styles.cardLocked]} 
              disabled={isLocked}
              onPress={() => {
                if (w.week === 1) navigation.navigate('AnatomyWeek1');
                else if (w.week === 2) navigation.navigate('AnatomyWeek2');
                else navigation.navigate('AnatomyWeek', { week: w.week });
              }}
            >
              <Text style={[styles.cardWeek, isLocked && { color: '#777' }]}>WEEK {w.week}</Text>
              <Text style={[styles.cardTitle, isLocked && { color: '#555' }]}>{w.title}</Text>
              <View style={[styles.cardButton, isLocked && { borderColor: '#555' }]}>
                <Text style={[styles.cardButtonText, isLocked && { color: '#555' }]}>
                  {isLocked ? 'LOCKED' : 'PLAY'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(20, 10, 10, 0.75)' },
  header: { padding: 20, paddingTop: 40, alignItems: 'center', marginBottom: 20 },
  headerTitle: { color: '#FF5252', fontSize: 24, fontWeight: 'bold', letterSpacing: 2 },
  headerSubtitle: { color: '#fff', fontSize: 16, marginTop: 5 },
  scrollContainer: { flexGrow: 0, paddingLeft: 20 },
  card: { backgroundColor: 'rgba(30, 20, 20, 0.8)', width: 220, height: 300, borderRadius: 20, padding: 20, marginRight: 20, borderWidth: 1, borderColor: '#FF5252', justifyContent: 'flex-end' },
  cardLocked: { borderColor: '#444', backgroundColor: 'rgba(20,20,20,0.8)' },
  cardWeek: { color: '#FF5252', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  cardTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  cardButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FF5252', padding: 10, borderRadius: 20, alignItems: 'center' },
  cardButtonText: { color: '#FF5252', fontWeight: 'bold' }
});
