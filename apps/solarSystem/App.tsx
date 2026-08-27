import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import PlanetIdScreen from './screens/PlanetIdScreen';
import PlanetDetailScreen from './screens/PlanetDetailScreen';
import Level1Screen from './screens/Level1Screen';
import QuizScreen from './screens/QuizScreen';
import Level1GameScreen from './screens/Level1GameScreen';
import SpaceHubScreen from './screens/SpaceHubScreen';
import AnatomyHubScreen from './screens/AnatomyHubScreen';
import AnatomyWeek1Screen from './screens/AnatomyWeek1Screen';
import AnatomyWeek2Screen from './screens/AnatomyWeek2Screen';
import AnatomyGenericScreen from './screens/AnatomyGenericScreen';

const SolarSystem3DScreen = React.lazy(() => import('./screens/SolarSystem3DScreen'));
const SolarSystem2DScreen = React.lazy(() => import('./screens/SolarSystem2DScreen'));

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    ::-webkit-scrollbar { height: 10px; width: 10px; }
    ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 5px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 5px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }
    html, body, #root { width: 100%; height: 100%; overflow: hidden; }
  `;
  document.head.append(style);
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [routeParams, setRouteParams] = useState<any>({});
  const [history, setHistory] = useState<string[]>([]);

  // Simple custom navigator with history stack
  const navigate = (screenName: string, params: any = {}) => {
    setHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screenName);
    setRouteParams(params);
  };

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousScreen = newHistory.pop()!;
      setHistory(newHistory);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('Home');
    }
  };

  const replace = (screenName: string, params: any = {}) => {
    setCurrentScreen(screenName);
    setRouteParams(params);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Level1Game':
        return <Level1GameScreen navigation={{ navigate, goBack, replace }} />;
      case 'Quiz':
        return <QuizScreen navigation={{ navigate, goBack, replace }} />;
      case 'Level1':
        return <Level1Screen navigation={{ navigate, goBack, replace }} />;
      case 'PlanetId':
        return <PlanetIdScreen navigation={{ navigate, goBack, replace }} />;
      case 'PlanetDetail':
        return <PlanetDetailScreen navigation={{ navigate, goBack, replace }} routeParams={routeParams} />;
      case 'SpaceHub':
        return <SpaceHubScreen navigation={{ navigate, goBack, replace }} />;
      case 'AnatomyHub':
        return <AnatomyHubScreen navigation={{ navigate, goBack, replace }} />;
      case 'AnatomyWeek1':
        return <AnatomyWeek1Screen navigation={{ navigate, goBack, replace }} />;
      case 'AnatomyWeek2':
        return <AnatomyWeek2Screen navigation={{ navigate, goBack, replace }} />;
      case 'AnatomyWeek':
        return <AnatomyGenericScreen key={routeParams?.week} navigation={{ navigate, goBack, replace }} routeParams={routeParams} />;
      case 'SolarSystem3D':
        return <SolarSystem3DScreen navigation={{ navigate, goBack, replace }} route={{ params: { onBack: goBack } }} />;
      case 'SolarSystem2D':
        return <SolarSystem2DScreen navigation={{ navigate, goBack, replace }} route={{ params: { onBack: goBack } }} />;
      case 'Home':
      default:
        return <HomeScreen navigation={{ navigate, goBack, replace }} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {currentScreen !== 'Home' && (
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      )}
      <React.Suspense fallback={<View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{color: '#fff'}}>Loading...</Text></View>}>
        {renderScreen()}
      </React.Suspense>
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
    zIndex: 100,
    position: 'absolute',
    top: Platform.OS === 'web' ? 10 : 40,
    left: 10,
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
