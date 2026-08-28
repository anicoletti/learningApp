import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import Phaser from 'phaser';

const AnatomyActionPotentialScreen = ({ navigation }: any) => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    class ActionScene extends Phaser.Scene {
      constructor() {
        super('ActionScene');
      }

      create() {
        this.add.text(10, 10, 'Action Potential (Rhythm)', { fontSize: '24px', color: '#fff' });
        this.add.text(10, 40, 'Tap the screen exactly when the pulse hits the yellow Nodes to open Ion Channels!', { fontSize: '16px', color: '#aaa' });

        this.axonY = 300;
        this.add.rectangle(400, this.axonY, 800, 10, 0x555555);

        this.nodes = [200, 400, 600];
        this.nodeObjects = [];

        this.nodes.forEach(x => {
          const node = this.add.circle(x, this.axonY, 20, 0xffff00);
          this.add.text(x, this.axonY - 40, 'Na+', { color: '#ffff00', fontStyle: 'bold' }).setOrigin(0.5);
          this.nodeObjects.push({ x, obj: node, active: true });
        });

        this.pulse = this.add.circle(50, this.axonY, 15, 0x00ffff);
        this.physics.add.existing(this.pulse);
        this.pulse.body.setVelocityX(100); // initial speed

        this.score = 0;
        this.scoreText = this.add.text(650, 50, 'Score: 0', { fontSize: '24px', color: '#00ffff' });

        this.input.on('pointerdown', () => {
          // Check if pulse is near any active node
          let hit = false;
          this.nodeObjects.forEach(node => {
            if (node.active && Math.abs(this.pulse.x - node.x) < 30) {
              node.active = false;
              node.obj.setFillStyle(0x00ff00);
              this.score += 100;
              this.scoreText.setText('Score: ' + this.score);
              this.pulse.body.setVelocityX(this.pulse.body.velocity.x + 50); // Speed up
              
              // Flash
              const flash = this.add.circle(node.x, this.axonY, 40, 0x00ff00, 0.5);
              this.tweens.add({ targets: flash, scale: 2, alpha: 0, duration: 300, onComplete: () => flash.destroy() });
              hit = true;
            }
          });

          if (!hit) {
            // Miss penalty
            this.pulse.body.setVelocityX(Math.max(50, this.pulse.body.velocity.x - 50));
            this.cameras.main.shake(100, 0.01);
          }
        });
      }

      update() {
        if (this.pulse.x > 800) {
          // Reset for next wave
          this.pulse.x = 0;
          this.pulse.body.setVelocityX(100 + (this.score / 10)); // gets faster
          this.nodeObjects.forEach(node => {
            node.active = true;
            node.obj.setFillStyle(0xffff00);
          });
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-action-container',
      backgroundColor: '#1a1a2e',
      physics: { default: 'arcade' },
      scene: ActionScene
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
        <Text style={styles.title}>Action Potential</Text>
      </View>
      <View style={styles.canvasContainer}>
        {Platform.OS === 'web' ? (
          <div id="phaser-action-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
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

export default AnatomyActionPotentialScreen;
