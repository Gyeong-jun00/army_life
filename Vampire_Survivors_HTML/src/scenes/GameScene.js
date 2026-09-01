import Phaser from 'phaser';
import Player from '../objects/Player.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // 배경 생성
        this.add.image(400, 300, 'sky');

        // 분리한 Player 객체 생성 (x: 400, y: 300)
        this.player = new Player(this, 400, 300);
    }

    update() {
        // Player 클래스 내부의 update() 이동 로직 실행
        if (this.player) {
            this.player.update();
        }
    }
}