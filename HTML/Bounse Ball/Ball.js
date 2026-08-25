export class Ball {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.reset();
    
<<<<<<< HEAD
    this.radius = 8;
    this.speed = 4;
    this.gravity = 0.35;
    this.bouncePower = -7.5;
    this.color = '#fffb00';
    this.borderColor = '#000000';
    this.borderWidth = 1;
=======
    this.radius = 12;
    this.speed = 4;
    this.gravity = 0.35;
    this.bouncePower = -9.5;
    this.color = '#fffb00';
>>>>>>> a9ddc98e21e04a273b7400480232b3fbe8b8b069
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
    
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.borderWidth;
    ctx.stroke();

    ctx.closePath();
  }
}