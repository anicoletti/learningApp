import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import Phaser from 'phaser';

const AnatomySystemOperatorScreen = ({ navigation }: any) => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    class OperatorScene extends Phaser.Scene {
      constructor() {
        super('OperatorScene');
      }

      create() {
        this.add.text(10, 10, 'System Operator (Muscle Management)', { fontSize: '24px', color: '#fff' });
        this.add.text(10, 40, 'Keep all systems above 0%! Tap muscles to pump them.', { fontSize: '16px', color: '#aaa' });

        this.systems = {
          cardiac: { val: 100, decay: 0.1, label: 'Heart Rate (Cardiac)', color: 0xff4444 },
          smooth: { val: 100, decay: 0.05, label: 'Digestion (Smooth)', color: 0x44ff44 },
          skeletal: { val: 100, decay: 0.15, label: 'Movement (Skeletal)', color: 0x4444ff }
        };

        this.bars = {};

        let startY = 100;
        Object.keys(this.systems).forEach(key => {
          this.add.text(50, startY, this.systems[key].label, { fontSize: '18px', color: '#fff' });
          const bg = this.add.rectangle(50, startY + 25, 300, 20, 0x333333).setOrigin(0, 0);
          const fill = this.add.rectangle(50, startY + 25, 300, 20, this.systems[key].color).setOrigin(0, 0);
          this.bars[key] = fill;
          
          // Button to pump
          const btn = this.add.circle(450, startY + 35, 30, this.systems[key].color).setInteractive();
          this.add.text(450, startY + 35, 'PUMP', { color: '#000', fontStyle: 'bold' }).setOrigin(0.5);
          
          btn.on('pointerdown', () => {
            this.systems[key].val += 15;
            if (this.systems[key].val > 100) this.systems[key].val = 100;
            this.tweens.add({ targets: btn, scale: 1.2, duration: 50, yoyo: true });
          });

          startY += 100;
        });

        this.energy = 100;
        this.add.text(600, 100, 'Total Energy', { fontSize: '18px', color: '#ffea00' });
        this.energyBar = this.add.rectangle(600, 130, 20, 200, 0xffea00).setOrigin(0.5, 0);

        this.gameOver = false;
      }

      update() {
        if (this.gameOver) return;

        let anyDead = false;

        Object.keys(this.systems).forEach(key => {
          const sys = this.systems[key];
          sys.val -= sys.decay;
          
          if (sys.val <= 0) {
            sys.val = 0;
            anyDead = true;
          }

          this.bars[key].width = (sys.val / 100) * 300;
        });

        if (anyDead) {
          this.gameOver = true;
          this.add.text(400, 300, 'SYSTEM FAILURE!', { fontSize: '48px', color: '#ff0000', fontStyle: 'bold' }).setOrigin(0.5);
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-operator-container',
      backgroundColor: '#1a1a2e',
      scene: OperatorScene
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>System Operator</Text>
      </View>
      <View style={styles.canvasContainer}>
        {Platform.OS === 'web' ? (
          <div id="phaser-operator-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
        ) : (
          <Text style={styles.errorText}>This game requires Web to run.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#2a2a4e' },
  backButton: { padding: 8, marginRight: 16, backgroundColor: '#33334d', borderRadius: 8 },
  backText: { color: '#fff', fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  canvasContainer: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#ff4444', padding: 20, textAlign: 'center' }
});

export default AnatomySystemOperatorScreen;
