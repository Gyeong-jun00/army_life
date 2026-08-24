export class Ball {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.reset();
    
    this.radius = 12;
    this.speed = 4;
    this.gravity = 0.35;
    this.bouncePower = -9.5;
    this.color = '#fffb00';
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.vx = 0;
    this.vy = 0;
  }

  update(input, canvasWidth) {
    // 좌우 이동
    if (input.left) this.x -= this.speed;
    if (input.right) this.x += this.speed;

    // 벽 경계 처리
    if (this.x - this.radius < 0) this.x = this.radius;
    if (this.x + this.radius > canvasWidth) this.x = canvasWidth - this.radius;

    // 중력 및 이동 연산
    this.vy += this.gravity;
    this.y += this.vy;
  }

  bounce() {
    this.vy = this.bouncePower;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}