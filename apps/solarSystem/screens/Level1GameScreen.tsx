import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, PanResponder, Image, useWindowDimensions } from 'react-native';
import { planets } from '../data/planets';

const SPACE_BG = 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=3000&auto=format&fit=crop';

const gameOrbits = [
  { id: 'mercury', radius: 70, angle: Math.PI / 4 },
  { id: 'venus', radius: 110, angle: Math.PI * 1.2 },
  { id: 'earth', radius: 150, angle: Math.PI * 1.7 },
  { id: 'mars', radius: 190, angle: Math.PI / 1.5 },
  { id: 'jupiter', radius: 250, angle: Math.PI * 0.1 },
  { id: 'saturn', radius: 320, angle: Math.PI * 1.4 },
  { id: 'uranus', radius: 390, angle: Math.PI * 0.8 },
  { id: 'neptune', radius: 460, angle: Math.PI * 1.9 },
];

const DraggablePlanet = ({ planet, onDrop, isPlaced }: any) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [showName, setShowName] = useState(false);
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
        setShowName(true);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        setShowName(false);
        // If it was just a tap (didn't move much), just return.
        if (Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5) {
           Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
           return;
        }

        const dropSuccess = onDrop(planet.id, gesture.moveX, gesture.moveY);
        if (!dropSuccess) {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      }
    })
  ).current;

  if (isPlaced) return null;

  return (
    <Animated.View {...panResponder.panHandlers} style={[pan.getLayout(), styles.draggableItem]}>
      <Image 
        source={planet.imageSource} 
        style={styles.draggableImage} 
        resizeMode={planet.id === 'saturn' ? 'contain' : 'cover'} 
      />
      {showName && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{planet.name}</Text>
        </View>
      )}
    </Animated.View>
  );
};

export default function Level1GameScreen({ navigation }: any) {
  const { width, height } = useWindowDimensions();
  const [placedPlanets, setPlacedPlanets] = useState<string[]>([]);
  const [shuffledPlanets, setShuffledPlanets] = useState<any[]>([]);

  const sunX = width / 2;
  const sunY = height / 2;

  useEffect(() => {
    const p = planets.filter(p => p.id !== 'sun');
    setShuffledPlanets(p.sort(() => 0.5 - Math.random()));
  }, []);

  const handleDrop = (planetId: string, dropX: number, dropY: number) => {
    const targetOrbit = gameOrbits.find(o => o.id === planetId);
    if (!targetOrbit) return false;

    const distance = Math.sqrt(Math.pow(dropX - sunX, 2) + Math.pow(dropY - sunY, 2));
    
    // Find the closest orbit to the drop position
    let nearestOrbit = gameOrbits[0];
    let minDiff = Math.abs(distance - gameOrbits[0].radius);
    
    for (const orbit of gameOrbits) {
      const diff = Math.abs(distance - orbit.radius);
      if (diff < minDiff) {
        minDiff = diff;
        nearestOrbit = orbit;
      }
    }

    // If the closest orbit is the correct one, and they are within a generous 60px tolerance
    if (nearestOrbit.id === planetId && minDiff < 60) {
      setPlacedPlanets(prev => [...prev, planetId]);
      return true;
    }
    
    return false;
  };

  const isComplete = placedPlanets.length === gameOrbits.length;

  return (
    <ImageBackground source={{ uri: SPACE_BG }} style={styles.container}>
      <View style={styles.darkOverlay} />
      
      <TouchableOpacity 
        style={styles.closeHeaderButton} 
        onPress={() => navigation.navigate('Level1')}
      >
        <Text style={styles.closeHeaderButtonText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Level 1: Orbit Assembly</Text>
      <Text style={styles.headerSubtitle}>Drag and drop the planets into their correct orbits!</Text>

      {/* Map Area */}
      <View style={StyleSheet.absoluteFill}>
        
        {/* Draw Orbits */}
        {gameOrbits.map((orbit, index) => (
          <View 
            key={`ring-${orbit.id}`} 
            style={[styles.orbitRing, {
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              borderRadius: orbit.radius,
              left: sunX - orbit.radius,
              top: sunY - orbit.radius,
              alignItems: 'center',
              justifyContent: 'flex-start'
            }]} 
          >
            <Text style={styles.orbitNumber}>{index + 1}</Text>
          </View>
        ))}

        {/* Draw Sun */}
        <Image 
          source={planets.find(p => p.id === 'sun')?.imageSource} 
          style={[styles.sunImage, { left: sunX - 40, top: sunY - 40 }]} 
        />

        {/* Draw Placed Planets */}
        {placedPlanets.map(id => {
          const planet = planets.find(p => p.id === id);
          const orbit = gameOrbits.find(o => o.id === id);
          if (!planet || !orbit) return null;
          
          const pSize = id === 'saturn' ? 60 : 40;
          return (
            <View 
              key={`placed-${id}`} 
              style={[styles.placedPlanet, {
                left: sunX + orbit.radius * Math.cos(orbit.angle) - (pSize / 2),
                top: sunY + orbit.radius * Math.sin(orbit.angle) - (pSize / 2),
                width: pSize,
                height: pSize,
              }]}
            >
              <Image source={planet.imageSource} style={{ width: '100%', height: '100%' }} resizeMode={id === 'saturn' ? 'contain' : 'cover'} />
            </View>
          );
        })}

      </View>

      {/* Bottom Tray */}
      <View style={styles.tray}>
        {shuffledPlanets.map(planet => (
          <DraggablePlanet 
            key={`tray-${planet.id}`} 
            planet={planet} 
            onDrop={handleDrop} 
            isPlaced={placedPlanets.includes(planet.id)} 
          />
        ))}
      </View>

      {/* Success Modal */}
      {isComplete && (
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>System Assembled!</Text>
            <Text style={styles.successText}>You successfully put all the planets in order.</Text>
            <TouchableOpacity 
              style={styles.successButton} 
              onPress={() => {
                setPlacedPlanets([]);
                setShuffledPlanets([...shuffledPlanets].sort(() => 0.5 - Math.random()));
              }}
            >
              <Text style={styles.successButtonText}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.successButton, { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#4ade80' }]} 
              onPress={() => navigation.navigate('Level1')}
            >
              <Text style={[styles.successButtonText, { color: '#4ade80' }]}>Back to Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.8)' },
  closeHeaderButton: {
    position: 'absolute', top: 30, right: 20, width: 40, height: 40,
    borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center', zIndex: 100,
  },
  closeHeaderButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 30, zIndex: 10 },
  headerSubtitle: { color: '#80D8FF', fontSize: 16, textAlign: 'center', marginTop: 5, zIndex: 10 },
  orbitRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderStyle: 'dashed',
  },
  sunImage: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  placedPlanet: {
    position: 'absolute',
  },
  tray: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    zIndex: 50,
  },
  draggableItem: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggableImage: {
    width: 45,
    height: 45,
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  successCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  successTitle: { color: '#4ade80', fontSize: 36, fontWeight: 'bold', marginBottom: 10 },
  successText: { color: '#fff', fontSize: 18, marginBottom: 30 },
  successButton: {
    backgroundColor: '#4ade80',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 10,
    width: 200,
    alignItems: 'center'
  },
  successButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  orbitNumber: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: 'hidden'
  },
  tooltip: {
    position: 'absolute',
    top: -30,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tooltipText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
