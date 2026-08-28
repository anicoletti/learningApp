import React, { useRef, useState, Suspense } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const TEXTURES = {
  Sun: require('../assets/planets/sun_detailed.png'),
  Mercury: require('../assets/planets/mercury.png'),
  Venus: require('../assets/planets/venus.png'),
  Earth: require('../assets/planets/earth.png'),
  Mars: require('../assets/planets/mars.png'),
  Jupiter: require('../assets/planets/jupiter.png'),
  Saturn: require('../assets/planets/saturn.png'),
  Uranus: require('../assets/planets/uranus.png'),
  Neptune: require('../assets/planets/neptune.png'),
  Pluto: require('../assets/planets/pluto.png'),
};

const Planet = ({ distance, speed, size, name, isSun }) => {
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, TEXTURES[name]);
  
  useFrame((state, delta) => {
    if (meshRef.current && distance > 0) {
      // Orbit around the center
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * speed) * distance;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * speed) * distance;
    }
    if (meshRef.current) {
      // Rotate on axis
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[size, 32, 32]} />
      {isSun ? (
        <meshBasicMaterial map={texture} />
      ) : (
        <meshStandardMaterial map={texture} roughness={0.7} metalness={0.1} />
      )}
    </mesh>
  );
};

export default function SolarSystem3DScreen({ route }) {
  const onBack = route.params?.onBack;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>3D Solar System (R3F)</Text>
      </View>
      
      <View style={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 20, 50], fov: 45 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={3} distance={200} color="#fff1e0" />
          
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Sun */}
            <Planet distance={0} speed={0} size={5} name="Sun" isSun={true} />
            
            {/* Inner Planets */}
            <Planet distance={8} speed={0.8} size={0.3} name="Mercury" />
            <Planet distance={11} speed={0.6} size={0.6} name="Venus" />
            <Planet distance={15} speed={0.5} size={0.7} name="Earth" />
            <Planet distance={19} speed={0.4} size={0.4} name="Mars" />
            
            {/* Gas Giants */}
            <Planet distance={26} speed={0.2} size={1.8} name="Jupiter" />
            <Planet distance={33} speed={0.15} size={1.5} name="Saturn" />
            <Planet distance={40} speed={0.1} size={1.1} name="Uranus" />
            <Planet distance={46} speed={0.08} size={1.0} name="Neptune" />
            <Planet distance={50} speed={0.05} size={0.2} name="Pluto" />
            
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Suspense>
        </Canvas>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Drag to rotate. Scroll/Pinch to zoom.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4e',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
    backgroundColor: '#33334d',
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  canvasContainer: {
    flex: 1,
    width: '100%',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
  }
});
