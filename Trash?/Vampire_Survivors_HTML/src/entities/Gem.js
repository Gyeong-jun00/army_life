export default class Gem extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, expValue = 5) {
    super(scene, x, y, 'gemTexture');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.expValue = expValue;
  }
}