import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Image, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { planets } from '../data/planets';

const SPACE_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop';

export default function Level1Screen({ navigation }: any) {
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
  const [activePlanetId, setActivePlanetId] = useState<string>('sun');
  const [show3D, setShow3D] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = useWindowDimensions();

  const scrollToPlanet = (orbitRadius: number) => {
    let xOffset = Math.max(0, orbitRadius - screenWidth / 2 + 200);
    scrollViewRef.current?.scrollTo({ x: xOffset, animated: true });
  };

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const viewCenter = scrollX + screenWidth / 2 - 100;
    
    let closestPlanet = planets[0];
    let minDiff = Infinity;
    for (const p of planets) {
      const diff = Math.abs(p.orbitRadius - viewCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestPlanet = p;
      }
    }
    
    if (closestPlanet.id !== activePlanetId) {
      setActivePlanetId(closestPlanet.id);
    }
  };

  return (
    <ImageBackground source={{ uri: SPACE_BG }} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LEVEL 1: MEET THE NEIGHBORS</Text>
        <Text style={styles.subtitle}>Scroll right to explore. Tap a planet to learn more!</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef} 
        horizontal 
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.scrollContent}>
          <View style={styles.mapCenter}>
            
            {/* Orbit Arcs */}
            {planets.filter(p => p.id !== 'sun').map(planet => (
              <View key={`orbit-${planet.id}`} style={[styles.orbitArc, {
                top: -planet.orbitRadius,
                left: -planet.orbitRadius,
                width: planet.orbitRadius * 2,
                height: planet.orbitRadius * 2,
                borderRadius: planet.orbitRadius,
              }]} />
            ))}

            {/* Sun */}
            <TouchableOpacity 
              style={[styles.sunContainer, { top: -200, left: -200 }]}
              onPress={() => setSelectedPlanet(planets.find(p => p.id === 'sun'))}
            >
              <Image source={planets.find(p => p.id === 'sun')?.imageSource} style={styles.sun} />
              <Text style={styles.sunText}>Sun</Text>
            </TouchableOpacity>

            {/* Planets */}
            {planets.filter(p => p.id !== 'sun').map((planet, index) => (
              <View key={planet.id} style={[styles.planetWrapper, { 
                left: planet.orbitRadius, 
                top: -planet.radius 
              }]}>
                <TouchableOpacity onPress={() => {
                  setSelectedPlanet(planet);
                  setShow3D(false);
                }}>
                  {planet.imageSource ? (
                    <Image 
                      source={planet.imageSource}
                      style={[
                        styles.planet, 
                        { 
                          width: planet.radius * 2, 
                          height: planet.radius * 2, 
                          borderRadius: planet.id === 'saturn' ? 0 : planet.radius 
                        }
                      ]} 
                      resizeMode={planet.id === 'saturn' ? 'contain' : 'cover'}
                    />
                  ) : (
                    <View style={[
                      styles.planet,
                      {
                        backgroundColor: planet.color,
                        width: planet.radius * 2,
                        height: planet.radius * 2,
                        borderRadius: planet.radius,
                      }
                    ]} />
                  )}
                </TouchableOpacity>
                <Text style={styles.planetLabel}>{planet.name}</Text>
              </View>
            ))}
            
          </View>
        </View>
      </ScrollView>

      {/* Info Modal */}
      <Modal visible={!!selectedPlanet} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlanet && (
              <>
                {!show3D ? (
                  <>
                    {selectedPlanet.imageSource ? (
                      <Image 
                        source={selectedPlanet.imageSource} 
                        style={[styles.modalPlanetIcon, { borderRadius: selectedPlanet.id === 'saturn' ? 0 : 40 }]} 
                        resizeMode={selectedPlanet.id === 'saturn' ? 'contain' : 'cover'}
                      />
                    ) : (
                      <View style={[styles.modalPlanetIcon, { backgroundColor: selectedPlanet.color, borderRadius: 40 }]} />
                    )}
                    <Text style={styles.modalTitle}>{selectedPlanet.name}</Text>
                    <Text style={styles.modalType}>{selectedPlanet.type}</Text>
                    <Text style={styles.modalInfo}>{selectedPlanet.info}</Text>
                    {selectedPlanet.funFact && (
                      <View style={styles.funFactBox}>
                        <Text style={styles.funFactTitle}>Did you know?</Text>
                        <Text style={styles.funFactText}>{selectedPlanet.funFact}</Text>
                      </View>
                    )}
                    
                    {selectedPlanet.url3D && (
                      <TouchableOpacity style={styles.button3D} onPress={() => setShow3D(true)}>
                        <Text style={styles.button3DText}>View 3D Model</Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity 
                      style={styles.closeButton} 
                      onPress={() => setSelectedPlanet(null)}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.webViewContainer}>
                    <WebView 
                      source={{ uri: selectedPlanet.url3D }} 
                      style={styles.webView} 
                      scrollEnabled={false}
                    />
                    <TouchableOpacity 
                      style={[styles.closeButton, styles.close3DButton]} 
                      onPress={() => setShow3D(false)}
                    >
                      <Text style={styles.closeButtonText}>Back to Info</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Bottom Indicator */}
      <View style={styles.indicatorContainer}>
        <Text style={styles.indicatorText}>ORBITAL MAP</Text>
        <View style={styles.indicatorTrack}>
          {planets.map(planet => {
            const isActive = planet.id === activePlanetId;
            return (
              <TouchableOpacity 
                key={`ind-${planet.id}`} 
                style={[
                  styles.indicatorDot, 
                  { backgroundColor: planet.color },
                  isActive && styles.indicatorDotActive
                ]}
                onPress={() => scrollToPlanet(planet.orbitRadius)}
              />
            );
          })}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050515',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#80D8FF',
    fontSize: 14,
    marginTop: 5,
  },
  scrollContent: {
    width: 3600,
    justifyContent: 'center',
    paddingLeft: 250, 
  },
  mapCenter: {
    height: 0,
    position: 'relative',
  },
  sunContainer: {
    position: 'absolute',
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  sun: {
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#FFD700',
    elevation: 20,
  },
  sunText: {
    color: '#fff',
    position: 'absolute',
    right: 50,
    fontSize: 28,
    fontWeight: 'bold',
  },
  planetWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: 200,
    marginLeft: -100,
    zIndex: 200,
  },
  orbitArc: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    borderStyle: 'dashed',
  },
  planet: {
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  planetLabel: {
    color: '#fff',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'rgba(20,20,35,0.95)',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  modalPlanetIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalType: {
    color: '#4FC3F7',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  modalInfo: {
    color: '#ddd',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  funFactBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
    width: '100%',
  },
  funFactTitle: {
    color: '#FFD54F',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  funFactText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button3D: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  button3DText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  webViewContainer: {
    width: '100%',
    height: 400,
    alignItems: 'center',
  },
  webView: {
    width: 320,
    height: 320,
    backgroundColor: 'transparent',
    borderRadius: 15,
  },
  close3DButton: {
    marginTop: 20,
    backgroundColor: '#333',
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4FC3F7',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  closeButtonText: {
    color: '#4FC3F7',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 300,
  },
  indicatorText: {
    color: '#80D8FF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },
  indicatorTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,40,0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  indicatorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fff',
    boxShadow: '0px 0px 5px rgba(255,255,255,0.5)',
  },
  indicatorDotActive: {
    transform: [{ scale: 1.5 }],
    borderWidth: 2,
    boxShadow: '0px 0px 10px rgba(255,255,255,1)',
  }
});
