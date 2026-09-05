// src/scenes/GameScene.js
import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import Bullet from '../entities/Bullet.js';
import Gem from '../entities/Gem.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.gameTime = 0;

    // 병렬로 UI 씬 실행 (HUD 및 레벨업 창 관리)
    this.scene.launch('UIScene');

    // 물리 그룹 생성 (runChildUpdate: false로 설정하여 update 루프에서 직접 제어)
    this.enemies = this.physics.add.group();
    this.bullets = this.physics.add.group();
    this.gems = this.physics.add.group();

    // 플레이어 생성
    this.player = new Player(this, 400, 300);

    // 1초마다 생존 시간 카운트 타이머
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.player && this.player.active) {
          this.gameTime++;
          this.notifyUI();
        }
      },
      loop: true
    });

    // 1초마다 적 스폰 타이머
    this.time.addEvent({
      delay: 1000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    });

    // 물리 충돌/오버랩 설정
    this.physics.add.overlap(this.bullets, this.enemies, this.handleBulletEnemyCollision, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
    this.physics.add.overlap(this.player, this.gems, this.handlePlayerGemCollision, null, this);

    // 최초 UI 갱신
    this.notifyUI();
  }

  update(time, delta) {
    if (!this.player || !this.player.active) return;

    // 1. 플레이어 이동 및 상태 업데이트
    this.player.update(time);

    // 2. 적 몬스터 추적 움직임 업데이트
    this.enemies.getChildren().forEach(enemy => {
      if (enemy && enemy.active) {
        enemy.update(this.player);
      }
    });

    // 3. 총알 화면 밖 이탈 시 제거 처리
    this.bullets.getChildren().forEach(bullet => {
      if (bullet && bullet.active) {
        if (bullet.x < 0 || bullet.x > 800 || bullet.y < 0 || bullet.y > 600) {
          bullet.destroy();
        }
      }
    });

    // 4. 자동 발사 (쿨타임 체크)
    if (time > this.player.lastFiredTime + this.player.attackInterval) {
      this.shootNearestEnemy();
      this.player.lastFiredTime = time;
    }
  }

  // UIScene으로 데이터를 발송하는 함수
  notifyUI() {
    this.events.emit('updateUI', {
      hp: this.player.hp,
      maxHp: this.player.maxHp,
      level: this.player.level,
      exp: this.player.exp,
      maxExp: this.player.maxExp,
      gameTime: this.gameTime
    });
  }

  // 화면 바깥 가장자리에서 적 스폰
  spawnEnemy() {
    if (!this.player || !this.player.active) return;

    let x, y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? -20 : 820;
      y = Math.random() * 600;
    } else {
      x = Math.random() * 800;
      y = Math.random() < 0.5 ? -20 : 620;
    }

    let enemy = new Enemy(this, x, y, this.gameTime);
    this.enemies.add(enemy);
  }

  // 가장 가까운 적 추적 및 자동 발사
  shootNearestEnemy() {
    let closestEnemy = null;
    let minDistance = Infinity;

    this.enemies.getChildren().forEach(enemy => {
      if (enemy && enemy.active) {
        let dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
        if (dist < minDistance) {
          minDistance = dist;
          closestEnemy = enemy;
        }
      }
    });

    if (closestEnemy) {
      let bullet = new Bullet(this, this.player.x, this.player.y);
      this.bullets.add(bullet);
      bullet.fire(closestEnemy.x, closestEnemy.y);
    }
  }

  // 총알 - 적 충돌
  handleBulletEnemyCollision(bullet, enemy) {
    bullet.destroy();
    
    if (enemy.takeDamage(bullet.damage)) {
      let gem = new Gem(this, enemy.x, enemy.y);
      this.gems.add(gem);
      enemy.destroy();
    }
  }

  // 플레이어 - 적 충돌
  handlePlayerEnemyCollision(player, enemy) {
    let isDead = player.takeDamage(0.3);
    this.notifyUI();

    if (isDead) {
      this.physics.pause();
      player.setActive(false).setVisible(false);
      this.events.emit('gameOver');
    }
  }

  // 플레이어 - 경험치 보석 획득
  handlePlayerGemCollision(player, gem) {
    let isLeveledUp = player.gainExp(gem.expValue);
    gem.destroy();

    this.notifyUI();

    if (isLeveledUp) {
      this.events.emit('levelUp', this.player);
    }
  }
}