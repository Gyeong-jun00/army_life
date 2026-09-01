import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    // 배열의 0번째인 PreloadScene이 가장 먼저 실행됩니다.
    scene: [PreloadScene, GameScene]
};

const game = new Phaser.Game(config);