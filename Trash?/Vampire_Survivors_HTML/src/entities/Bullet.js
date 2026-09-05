export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bulletTexture');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.damage = 10; // 데미지 값 지정
  }

  fire(targetX, targetY) {
    this.scene.physics.moveTo(this, targetX, targetY, 400);
  }
}