import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import Phaser from 'phaser';

const AnatomyTissueDefenseScreen = ({ navigation }: any) => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    class DefenseScene extends Phaser.Scene {
      constructor() {
        super('DefenseScene');
      }

      preload() {
        // No external assets, using shapes
      }

      create() {
        this.add.text(10, 10, 'Tissue Defense (Tower Defense)', { fontSize: '24px', color: '#fff' });
        
        // UI
        this.atp = 50;
        this.atpText = this.add.text(10, 40, 'ATP: ' + this.atp, { fontSize: '20px', color: '#ffea00' });
        
        this.selectedTower = 'muscle';
        
        const btnMuscle = this.add.rectangle(100, 550, 150, 40, 0xff4444).setInteractive();
        this.add.text(100, 550, 'Muscle (20)', { color: '#fff' }).setOrigin(0.5);
        btnMuscle.on('pointerdown', () => { this.selectedTower = 'muscle'; btnMuscle.setStrokeStyle(4, 0xffffff); btnEpi.setStrokeStyle(0); });
        
        const btnEpi = this.add.rectangle(280, 550, 150, 40, 0x4444ff).setInteractive();
        this.add.text(280, 550, 'Epithelial (10)', { color: '#fff' }).setOrigin(0.5);
        btnEpi.on('pointerdown', () => { this.selectedTower = 'epi'; btnEpi.setStrokeStyle(4, 0xffffff); btnMuscle.setStrokeStyle(0); });
        
        btnMuscle.setStrokeStyle(4, 0xffffff); // Default selected

        // Grid and Path
        this.pathY = 300;
        this.add.rectangle(400, this.pathY, 800, 60, 0x333333);
        
        this.enemies = this.physics.add.group();
        this.bullets = this.physics.add.group();
        this.towers = this.physics.add.group();
        
        // Spawn timer
        this.time.addEvent({ delay: 2000, callback: this.spawnEnemy, callbackScope: this, loop: true });
        
        // Input
        this.input.on('pointerdown', this.placeTower, this);
        
        // Collisions
        this.physics.add.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.collider(this.enemies, this.towers, this.hitTower, null, this);
      }
      
      spawnEnemy() {
        const enemy = this.add.circle(0, this.pathY, 15, 0x00ff00);
        this.physics.add.existing(enemy);
        enemy.body.setVelocityX(50);
        enemy.hp = 30;
        this.enemies.add(enemy);
      }
      
      placeTower(pointer) {
        if (pointer.y > 500) return; // UI area
        
        const isPath = Math.abs(pointer.y - this.pathY) < 30;
        
        if (this.selectedTower === 'epi' && isPath && this.atp >= 10) {
          this.atp -= 10;
          const wall = this.add.rectangle(pointer.x, this.pathY, 20, 60, 0x4444ff);
          this.physics.add.existing(wall, true);
          wall.hp = 100;
          wall.type = 'epi';
          this.towers.add(wall);
        } else if (this.selectedTower === 'muscle' && !isPath && this.atp >= 20) {
          this.atp -= 20;
          const tower = this.add.circle(pointer.x, pointer.y, 20, 0xff4444);
          this.physics.add.existing(tower, true);
          tower.type = 'muscle';
          tower.lastFired = 0;
          this.towers.add(tower);
        }
        
        this.atpText.setText('ATP: ' + this.atp);
      }
      
      hitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.hp -= 10;
        if (enemy.hp <= 0) {
          enemy.destroy();
          this.atp += 5;
          this.atpText.setText('ATP: ' + this.atp);
        }
      }
      
      hitTower(enemy, tower) {
        if (tower.type === 'epi') {
          tower.hp -= 1;
          if (tower.hp <= 0) tower.destroy();
        }
      }
      
      update(time) {
        this.towers.getChildren().forEach(tower => {
          if (tower.type === 'muscle' && time > tower.lastFired) {
            // Find nearest enemy
            let target = null;
            let minDist = 200;
            this.enemies.getChildren().forEach(enemy => {
              const dist = Phaser.Math.Distance.Between(tower.x, tower.y, enemy.x, enemy.y);
              if (dist < minDist) {
                minDist = dist;
                target = enemy;
              }
            });
            
            if (target) {
              const bullet = this.add.circle(tower.x, tower.y, 5, 0xffffff);
              this.physics.add.existing(bullet);
              this.physics.moveToObject(bullet, target, 300);
              this.bullets.add(bullet);
              tower.lastFired = time + 1000;
            }
          }
        });
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-tissue-container',
      backgroundColor: '#1a1a2e',
      physics: { default: 'arcade', arcade: { debug: false } },
      scene: DefenseScene
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
        <Text style={styles.title}>Tissue Defense</Text>
      </View>
      <View style={styles.canvasContainer}>
        {Platform.OS === 'web' ? (
          <div id="phaser-tissue-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
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

export default AnatomyTissueDefenseScreen;
