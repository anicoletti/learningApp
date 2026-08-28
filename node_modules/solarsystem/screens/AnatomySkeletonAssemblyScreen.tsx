import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import Phaser from 'phaser';

const AnatomySkeletonAssemblyScreen = ({ navigation }: any) => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    class AssemblyScene extends Phaser.Scene {
      constructor() {
        super('AssemblyScene');
      }

      create() {
        this.add.text(10, 10, 'Skeleton Assembly', { fontSize: '24px', color: '#fff' });
        this.add.text(10, 40, 'Drag the bones to their correct spots!', { fontSize: '16px', color: '#aaa' });

        const zones = [
          { id: 'skull', x: 250, y: 150, w: 80, h: 100, label: 'Skull' },
          { id: 'spine', x: 250, y: 300, w: 40, h: 150, label: 'Spine' },
          { id: 'ribs', x: 250, y: 280, w: 120, h: 100, label: 'Ribs' },
          { id: 'pelvis', x: 250, y: 420, w: 100, h: 60, label: 'Pelvis' },
        ];

        this.dropZones = {};

        zones.forEach(z => {
          // Draw dashed outline
          const graphics = this.add.graphics();
          graphics.lineStyle(2, 0x555555, 1);
          graphics.strokeRect(z.x - z.w/2, z.y - z.h/2, z.w, z.h);
          this.add.text(z.x, z.y, z.label, { color: '#555' }).setOrigin(0.5);

          const zone = this.add.zone(z.x, z.y, z.w, z.h).setRectangleDropZone(z.w, z.h);
          zone.boneId = z.id;
          this.dropZones[z.id] = zone;
        });

        // Create draggable bones on the right side
        const bones = [
          { id: 'ribs', w: 120, h: 100, color: 0xcccccc },
          { id: 'pelvis', w: 100, h: 60, color: 0xbbbbbb },
          { id: 'skull', w: 80, h: 100, color: 0xdddddd },
          { id: 'spine', w: 40, h: 150, color: 0xaaaaaa },
        ];

        let startY = 150;
        this.score = 0;
        this.scoreText = this.add.text(600, 50, 'Assembled: 0/4', { fontSize: '20px', color: '#00ff00' });

        bones.forEach((b, i) => {
          const bone = this.add.rectangle(600, startY + (i * 100), b.w, b.h, b.color);
          bone.setInteractive({ draggable: true });
          bone.boneId = b.id;
          this.add.text(600, startY + (i * 100), b.id.toUpperCase(), { color: '#000' }).setOrigin(0.5);
          
          this.input.setDraggable(bone);
        });

        this.input.on('dragstart', (pointer, gameObject) => {
          this.children.bringToTop(gameObject);
          gameObject.setStrokeStyle(4, 0xffea00);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });

        this.input.on('dragenter', (pointer, gameObject, dropZone) => {
          if (dropZone.boneId === gameObject.boneId) {
            // Highlight correct zone
            let graphics = this.add.graphics();
            graphics.lineStyle(4, 0x00ff00);
            graphics.strokeRect(dropZone.x - dropZone.input.hitArea.width/2, dropZone.y - dropZone.input.hitArea.height/2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
            dropZone.highlight = graphics;
          }
        });

        this.input.on('dragleave', (pointer, gameObject, dropZone) => {
          if (dropZone.highlight) {
            dropZone.highlight.destroy();
            dropZone.highlight = null;
          }
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
          if (dropZone.highlight) {
            dropZone.highlight.destroy();
            dropZone.highlight = null;
          }
          if (gameObject.boneId === dropZone.boneId) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
            gameObject.setStrokeStyle(0);
            this.score++;
            this.scoreText.setText('Assembled: ' + this.score + '/4');
            if (this.score === 4) {
              this.add.text(400, 300, 'ASSEMBLY COMPLETE!', { fontSize: '40px', color: '#ffff00', fontStyle: 'bold' }).setOrigin(0.5);
            }
          } else {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            gameObject.setStrokeStyle(0);
          }
        });

        this.input.on('dragend', (pointer, gameObject, dropped) => {
          if (!dropped) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            gameObject.setStrokeStyle(0);
          }
        });
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-skeleton-container',
      backgroundColor: '#1a1a2e',
      scene: AssemblyScene
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
        <Text style={styles.title}>Skeleton Assembly</Text>
      </View>
      <View style={styles.canvasContainer}>
        {Platform.OS === 'web' ? (
          <div id="phaser-skeleton-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
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

export default AnatomySkeletonAssemblyScreen;
