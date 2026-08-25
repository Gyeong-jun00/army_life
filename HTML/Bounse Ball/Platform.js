export class PlatformManager {
  constructor() {
    this.platforms = [
      { x: 50,  y: 500, width: 130, height: 20, color: '#8d99ae' },
      { x: 220, y: 420, width: 130, height: 20, color: '#8d99ae' },
      { x: 80,  y: 310, width: 130, height: 20, color: '#8d99ae' },
      { x: 230, y: 200, width: 130, height: 20, color: '#8d99ae' },
      { x: 140, y: 100, width: 130, height: 20, color: '#8d99ae' }
      { x: 50,  y: 500, width: 120, height: 15, color: '#8d99ae' },
      { x: 220, y: 420, width: 130, height: 15, color: '#8d99ae' },
      { x: 80,  y: 310, width: 110, height: 15, color: '#8d99ae' },
      { x: 230, y: 200, width: 120, height: 15, color: '#8d99ae' },
      { x: 140, y: 100, width: 120, height: 15, color: '#8d99ae' }
    ];
  }

  // 공과의 충돌 검사
  checkCollision(ball) {
    // 낙하 중일 때만 검사
    if (ball.vy <= 0) return;

    this.platforms.forEach(plat => {
      const isBallOverPlat = ball.x + ball.radius > plat.x && ball.x - ball.radius < plat.x + plat.width;
      const isBallAtPlatTop = ball.y + ball.radius >= plat.y && ball.y + ball.radius <= plat.y + plat.height;

      if (isBallOverPlat && isBallAtPlatTop) {
        ball.y = plat.y - ball.radius;
        ball.bounce();
      }
    });
  }

  draw(ctx) {
    this.platforms.forEach(plat => {
      ctx.fillStyle = plat.color;
      ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    });
  }
}