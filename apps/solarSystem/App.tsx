import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import PlanetIdScreen from './screens/PlanetIdScreen';
import PlanetDetailScreen from './screens/PlanetDetailScreen';
import Level1Screen from './screens/Level1Screen';
import QuizScreen from './screens/QuizScreen';
import Level1GameScreen from './screens/Level1GameScreen';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    ::-webkit-scrollbar { height: 10px; width: 10px; }
    ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 5px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 5px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }
  `;
  document.head.append(style);
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  // Simple custom navigator to mock navigation
  const navigate = (screenName: string) => {
    setCurrentScreen(screenName);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Level1Game':
        return <Level1GameScreen navigation={{ navigate }} />;
      case 'Quiz':
        return <QuizScreen navigation={{ navigate }} />;
      case 'Level1':
        return <Level1Screen navigation={{ navigate }} />;
      case 'PlanetId':
        return <PlanetIdScreen navigation={{ navigate }} />;
      case 'PlanetDetail':
        return <PlanetDetailScreen navigation={{ navigate }} />;
      case 'Home':
      default:
        return <HomeScreen navigation={{ navigate }} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {currentScreen !== 'Home' && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigate('Home')}>
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>
      )}
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050515',
    paddingTop: Platform.OS === 'web' ? 0 : 40,
  },
  backButton: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 10,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
