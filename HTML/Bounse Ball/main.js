import { InputHandler } from './Input.js';
import { Ball } from './Ball.js';
import { PlatformManager } from './Platform.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const input = new InputHandler();
const ball = new Ball(canvas.width / 2, 100);
const platformManager = new PlatformManager();

function gameLoop() {
  // 1. 상태 업데이트
  ball.update(input, canvas.width);
  platformManager.checkCollision(ball);

  // 2. 바닥 추락 시 리셋
  if (ball.y - ball.radius > canvas.height) {
    ball.reset();
  }

  // 3. 렌더링
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  platformManager.draw(ctx);
  ball.draw(ctx);

  requestAnimationFrame(gameLoop);
}

// 게임 시작
gameLoop();