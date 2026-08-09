import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Image, useWindowDimensions, Platform, Animated, PanResponder } from 'react-native';
import { planets } from '../data/planets';

const SPACE_BG = 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=3000&auto=format&fit=crop'; // Milky Way band without foreground

export default function Level1Screen({ navigation }: any) {
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
  const [visiblePlanetIds, setVisiblePlanetIds] = useState<string[]>(['sun']);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = useWindowDimensions();

  const scrollToPlanet = (orbitRadius: number) => {
    let xOffset = Math.max(0, orbitRadius - screenWidth / 2 + 200);
    scrollViewRef.current?.scrollTo({ x: xOffset, animated: true });
  };

  const currentScrollXRef = useRef(0);
  const startScrollXRef = useRef(0);

  const scrollPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gesture) => Platform.OS === 'web' && Math.abs(gesture.dx) > 10,
      onPanResponderGrant: () => {
        startScrollXRef.current = currentScrollXRef.current;
      },
      onPanResponderMove: (e, gesture) => {
        scrollViewRef.current?.scrollTo({ x: startScrollXRef.current - gesture.dx, animated: false });
      }
    })
  ).current;

  useEffect(() => {
    handleScroll({ nativeEvent: { contentOffset: { x: 0 } } });
  }, [screenWidth]);

  const handleScroll = (event: any) => {
    const scrollXVal = event.nativeEvent.contentOffset.x;
    currentScrollXRef.current = scrollXVal;
    
    const visibleStart = scrollXVal;
    const visibleEnd = scrollXVal + screenWidth;
    
    const visibleIds = planets.filter(p => {
       const pX = 250 + p.orbitRadius;
       return pX > visibleStart - 150 && pX < visibleEnd + 150;
    }).map(p => p.id);
    
    if (visibleIds.length === 0) {
      let closestPlanet = planets[0];
      let minDiff = Infinity;
      const viewCenter = scrollXVal + screenWidth / 2 - 100;
      for (const p of planets) {
        const diff = Math.abs(p.orbitRadius - viewCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestPlanet = p;
        }
      }
      visibleIds.push(closestPlanet.id);
    }
    
    setVisiblePlanetIds(prev => prev.join(',') === visibleIds.join(',') ? prev : visibleIds);
  };

  const translateX = scrollX.interpolate({
    inputRange: [0, 4000],
    outputRange: [0, -500],
    extrapolate: 'clamp',
  });

  const isMobile = screenWidth < 768;

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={{ uri: SPACE_BG }} 
        style={[
          StyleSheet.absoluteFillObject, 
          { width: screenWidth + 500, transform: [{ translateX }] }
        ]}
        resizeMode="cover"
      />
      <View style={styles.darkOverlay} />
      
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>LEVEL 1: MEET THE NEIGHBORS</Text>
          {!isMobile && (
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={[styles.quizButton, styles.gameButton]}
                onPress={() => navigation.navigate('Level1Game')}
              >
                <Text style={styles.quizButtonText}>Play Game!</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quizButton}
                onPress={() => navigation.navigate('Quiz')}
              >
                <Text style={styles.quizButtonText}>Take a Quiz!</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>Scroll right to explore. Tap a planet to learn more!</Text>
      </View>

      <Animated.ScrollView 
        ref={scrollViewRef as any} 
        horizontal 
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        {...(Platform.OS === 'web' ? scrollPanResponder.panHandlers : {})}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
        scrollEventThrottle={16}
        // @ts-ignore
        style={{ touchAction: 'none' }}
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
                <TouchableOpacity onPress={() => setSelectedPlanet(planet)}>
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
      </Animated.ScrollView>

      {/* Info Modal */}
      <Modal visible={!!selectedPlanet} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlanet && (
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
                
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={() => setSelectedPlanet(null)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Bottom Indicator */}
      <View style={[styles.indicatorContainer, { bottom: isMobile ? 35 : 15 }]}>
        <Text style={styles.indicatorText}>ORBITAL MAP</Text>
        <View style={styles.indicatorTrack}>
          {planets.map((planet, index, arr) => {
            const isActive = visiblePlanetIds.includes(planet.id);
            const isFirstActive = isActive && !visiblePlanetIds.includes(arr[index - 1]?.id);
            const isLastActive = isActive && !visiblePlanetIds.includes(arr[index + 1]?.id);

            return (
              <TouchableOpacity 
                key={`ind-${planet.id}`} 
                style={[
                  styles.indicatorDotWrapper,
                  isActive && { backgroundColor: 'rgba(255,255,255,0.25)' },
                  isFirstActive && { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
                  isLastActive && { borderTopRightRadius: 20, borderBottomRightRadius: 20 },
                ]}
                onPress={() => scrollToPlanet(planet.orbitRadius)}
              >
                <View style={[styles.indicatorDot, { backgroundColor: planet.color }]} />
              </TouchableOpacity>
            );
          })}
        </View>
        {isMobile && (
          <View style={[styles.buttonGroup, { marginTop: 15, justifyContent: 'center' }]}>
            <TouchableOpacity 
              style={[styles.quizButton, styles.gameButton, { marginLeft: 0, marginRight: 10 }]}
              onPress={() => navigation.navigate('Level1Game')}
            >
              <Text style={styles.quizButtonText}>Play Game!</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quizButton}
              onPress={() => navigation.navigate('Quiz')}
            >
              <Text style={styles.quizButtonText}>Take a Quiz!</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  quizButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  gameButton: {
    backgroundColor: '#ec4899', // Pinkish color for distinction
  },
  quizButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  indicatorDotWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  indicatorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff',
    boxShadow: '0px 0px 5px rgba(255,255,255,0.5)',
  }
});
