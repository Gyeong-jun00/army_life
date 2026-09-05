import PreloadScene from './Scene/PreloadScene.js';
import GameScene from './Scene/GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    pixelArt: true, // 픽셀 아트 선명도 유지
    scene: [PreloadScene, GameScene]
};

const game = new Phaser.Game(config);