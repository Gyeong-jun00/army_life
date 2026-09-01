import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
        // 플레이어 캐릭터 스프라이트 시트 추가
        this.load.spritesheet('dude', 
            '/assets/player.png',
            { frameWidth: 168, frameHeight: 210 }
        );
    }

    create() {
        this.scene.start('GameScene');
    }
}