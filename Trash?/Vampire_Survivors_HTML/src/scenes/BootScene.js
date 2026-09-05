export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // 도형 기반 그래픽 텍스처 동적 생성
    let g = this.add.graphics();

    // Player Texture
    g.fillStyle(0x44ff44, 1);
    g.fillCircle(12, 12, 12);
    g.generateTexture('playerTexture', 24, 24);
    g.clear();

    // Enemy Texture
    g.fillStyle(0xff4444, 1);
    g.fillCircle(10, 10, 10);
    g.generateTexture('enemyTexture', 20, 20);
    g.clear();

    // Bullet Texture
    g.fillStyle(0xffff00, 1);
    g.fillCircle(4, 4, 4);
    g.generateTexture('bulletTexture', 8, 8);
    g.clear();

    // Gem Texture
    g.fillStyle(0x00ffff, 1);
    g.fillCircle(5, 5, 5);
    g.generateTexture('gemTexture', 10, 10);
    g.destroy();

    // BootScene.js 의 preload() 메서드 내부에 추가
    // Orbit Weapon Texture (파란색 회전 구체)
    g.fillStyle(0x3388ff, 1);
    g.fillCircle(8, 8, 8);
    g.generateTexture('orbitWeaponTexture', 16, 16);
    g.clear(); 
  }

  create() {
    // 텍스처 생성 완료 후 메인 게임 씬으로 이동
    this.scene.start('GameScene');
  }
}