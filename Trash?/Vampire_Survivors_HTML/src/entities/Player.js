export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'playerTexture');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    // 플레이어 기본 스탯
    this.speed = 200;
    this.hp = 100;
    this.maxHp = 100;
    this.level = 1;
    this.exp = 0;
    this.maxExp = 10;
    this.attackInterval = 1000; // ms
    this.lastFiredTime = 0;

    // 키보드 입력 바인딩
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update(time) {
    this.handleMovement();
  }

  handleMovement() {
    this.setVelocity(0);
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.left.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.wasd.right.isDown) vx += 1;
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.wasd.down.isDown) vy += 1;

    if (vx !== 0 || vy !== 0) {
      let vec = new Phaser.Math.Vector2(vx, vy).normalize().scale(this.speed);
      this.setVelocity(vec.x, vec.y);
    }
  }

  gainExp(amount) {
    this.exp += amount;
    let isLeveledUp = false;

    if (this.exp >= this.maxExp) {
      this.level++;
      this.exp -= this.maxExp;
      this.maxExp = Math.floor(this.maxExp * 1.4);
      this.hp = Math.min(this.maxHp, this.hp + 20);
      this.attackInterval = Math.max(200, this.attackInterval - 100);
      isLeveledUp = true;
    }
    return isLeveledUp;
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    return this.hp <= 0;
  }
}