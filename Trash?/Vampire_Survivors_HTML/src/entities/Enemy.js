export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, gameTime) {
    super(scene, x, y, 'enemyTexture');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.hp = 10 + Math.floor(gameTime / 10) * 5;
    this.speed = 80 + Math.random() * 30;
    
    this.setCircle(10);
  }

  update(player) {
    if (!player || !player.active) return;
    this.scene.physics.moveToObject(this, player, this.speed);

    if (player.x < this.x) {
      this.setFlipX(true);
    } else {
      this.setFlipX(false);
    }
  }

  // 총알에 맞았을 때 호출되는 체력 차감 메서드 (누락 시 게임 멈춤)
  takeDamage(damage) {
    this.hp -= damage;
    return this.hp <= 0; // 체력이 0 이하이면 true 반환
  }
}