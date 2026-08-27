import React, { useRef, useState, Suspense } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const Planet = ({ distance, speed, size, color, name }) => {
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current && distance > 0) {
      // Orbit around the center
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * speed) * distance;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * speed) * distance;
    }
    if (meshRef.current) {
      // Rotate on axis
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[distance, 0, 0]} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={hovered ? '#ffffff' : color} />
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
        <Canvas camera={{ position: [0, 20, 40], fov: 45 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffddaa" />
          
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Sun */}
            <Planet distance={0} speed={0} size={4} color="#ffcc00" name="Sun" />
            
            {/* Inner Planets */}
            <Planet distance={8} speed={0.8} size={0.5} color="#aaaaaa" name="Mercury" />
            <Planet distance={12} speed={0.6} size={0.8} color="#eebb88" name="Venus" />
            <Planet distance={16} speed={0.5} size={1} color="#3366ff" name="Earth" />
            <Planet distance={20} speed={0.4} size={0.6} color="#ff4422" name="Mars" />
            
            {/* Gas Giants */}
            <Planet distance={30} speed={0.2} size={2.5} color="#ddaadd" name="Jupiter" />
            <Planet distance={40} speed={0.15} size={2} color="#eeccaa" name="Saturn" />
            
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
