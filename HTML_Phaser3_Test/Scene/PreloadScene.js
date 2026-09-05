export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // --- 1. 단일 이미지 로드 ---
        // this.load.image(키값, 이미지 경로/URL)
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
        this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');

        // --- 2. 애니메이션용 스프라이트시트 로드 ---
        // this.load.spritesheet(키값, 경로, { frameWidth: 프레임 가로, frameHeight: 프레임 세로 })
        this.load.spritesheet('knight', 
            './assets/Knight.png',
            { frameWidth: 16, frameHeight: 24 }
        );
    }

    create() {
        // 모든 로딩이 완료되면 게임 화면으로 전환
        this.scene.start('GameScene');
    }
}