import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // 부모 Sprite 클래스 생성자 호출 ('dude' 이미지 키 사용)
        super(scene, x, y, 'dude');

        // Scene 화면 및 물리 엔진에 이 객체를 등록
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // 기본 속성 설정
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        // 키보드 방향키 입력 객도 선언
        this.cursors = scene.input.keyboard.createCursorKeys();

        // 애니메이션 등록
        this.initAnimations(scene);
    }

    initAnimations(scene) {
        if (!scene.anims.exists('left')) {
            scene.anims.create({
                key: 'left',
                frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
            scene.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20
            });
            scene.anims.create({
                key: 'right',
                frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    // 매 프레임 실행될 플레이어 이동 제어 로직
    update() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play('right', true);
        } else {
            this.setVelocityX(0);
            this.anims.play('turn');
        }

        // 상하좌우 자유 이동 (중력이 없는 탑다운 시점 형태 예시)
        if (this.cursors.up.isDown) {
            this.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(160);
        } else {
            this.setVelocityY(0);
        }
    }
}