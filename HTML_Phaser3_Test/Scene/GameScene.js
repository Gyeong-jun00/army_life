export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // 1. 스프라이트 생성 및 3배 확대
        this.player = this.add.sprite(400, 300, 'knight');
        this.player.setScale(3);

        // 이동 속도 설정 (px/frame)
        this.speed = 2;

        // 2. 애니메이션 생성 (걷기 & 대기)
        if (!this.anims.exists('walk')) {
            this.anims.create({
                key: 'walk',
                frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 4 }),
                frameRate: 8,
                repeat: -1
            });
        }

        // 3. 키보드 방향키 입력 객체 생성
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        let isMoving = false;

        // --- 상하좌우 이동 처리 ---
        if (this.cursors.left.isDown) {
            this.player.x -= this.speed;
            this.player.flipX = true; // 왼쪽 이동 시 이미지 좌우 반전
            isMoving = true;
        } else if (this.cursors.right.isDown) {
            this.player.x += this.speed;
            this.player.flipX = false; // 오른쪽 이동 시 원래 방향
            isMoving = true;
        }

        if (this.cursors.up.isDown) {
            this.player.y -= this.speed;
            isMoving = true;
        } else if (this.cursors.down.isDown) {
            this.player.y += this.speed;
            isMoving = true;
        }

        // --- 애니메이션 재생 상태 제어 ---
        if (isMoving) {
            // 움직이는 중이고 애니메이션이 재생 중이 아니라면 실행
            if (!this.player.anims.isPlaying) {
                this.player.play('walk');
            }
        } else {
            // 정지 상태일 때는 애니메이션 멈추고 첫 번째 프레임으로 복귀
            this.player.stop();
            this.player.setFrame(0);
        }
    }
}