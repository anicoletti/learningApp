import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import Phaser from 'phaser';

const SolarSystem2DScreen = ({ route }) => {
  const gameRef = useRef(null);
  const onBack = route.params?.onBack;

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game-container',
      backgroundColor: '#000022',
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    let sun;
    let planets = [];

    function preload() {
      // Using graphics so no external assets are required
    }

    function create() {
      const cx = this.cameras.main.centerX;
      const cy = this.cameras.main.centerY;

      // Sun
      sun = this.add.circle(cx, cy, 40, 0xffcc00);

      // Planets: distance, speed, size, color
      const planetData = [
        { distance: 80, speed: 0.02, size: 5, color: 0xaaaaaa }, // Mercury
        { distance: 120, speed: 0.015, size: 8, color: 0xeebb88 }, // Venus
        { distance: 160, speed: 0.012, size: 10, color: 0x3366ff }, // Earth
        { distance: 200, speed: 0.01, size: 6, color: 0xff4422 }, // Mars
        { distance: 280, speed: 0.005, size: 25, color: 0xddaadd }, // Jupiter
        { distance: 360, speed: 0.004, size: 20, color: 0xeeccaa }, // Saturn
      ];

      planetData.forEach((pd) => {
        const p = this.add.circle(cx + pd.distance, cy, pd.size, pd.color);
        p.dist = pd.distance;
        p.speed = pd.speed;
        p.angle = Math.random() * Math.PI * 2;
        planets.push(p);
      });
    }

    function update() {
      const cx = this.cameras.main.centerX;
      const cy = this.cameras.main.centerY;

      planets.forEach((p) => {
        p.angle += p.speed;
        p.x = cx + Math.cos(p.angle) * p.dist;
        p.y = cy + Math.sin(p.angle) * p.dist;
      });
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>2D Solar System (Phaser)</Text>
      </View>
      
      <View style={styles.canvasContainer}>
        {Platform.OS === 'web' ? (
          <div id="phaser-game-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
        ) : (
          <Text style={styles.errorText}>Phaser game requires Web to run in this test environment.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4444',
    padding: 20,
    textAlign: 'center',
  }
});

export default SolarSystem2DScreen;
