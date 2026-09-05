export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    // 1. HUD 텍스트 생성
    this.hpText = this.add.text(16, 16, '체력: 100/100', { fontSize: '16px', fill: '#fff' });
    this.levelText = this.add.text(16, 40, '레벨: 1', { fontSize: '16px', fill: '#fff' });
    this.expText = this.add.text(16, 64, '경험치: 0/10', { fontSize: '16px', fill: '#fff' });
    this.timeText = this.add.text(16, 88, '생존 시간: 0초', { fontSize: '16px', fill: '#fff' });

    // 2. GameScene의 이벤트를 수신하도록 리스너 등록
    const gameScene = this.scene.get('GameScene');

    gameScene.events.on('updateUI', this.updateUI, this);
    gameScene.events.on('levelUp', this.showLevelUpMenu, this);
    gameScene.events.on('gameOver', this.showGameOver, this);

    // 레벨업 카드 UI 컨테이너
    this.levelUpContainer = this.add.container(0, 0).setVisible(false);
  }

  updateUI(data) {
    this.hpText.setText(`체력: ${Math.floor(data.hp)}/${data.maxHp}`);
    this.levelText.setText(`레벨: ${data.level}`);
    this.expText.setText(`경험치: ${data.exp}/${data.maxExp}`);
    this.timeText.setText(`생존 시간: ${data.gameTime}초`);
  }

  showLevelUpMenu(player) {
    const gameScene = this.scene.get('GameScene');
    gameScene.scene.pause(); // 게임 일시정지

    this.levelUpContainer.removeAll(true);
    this.levelUpContainer.setVisible(true);

    // 반투명 배경
    const bg = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);
    const title = this.add.text(400, 120, 'LEVEL UP!', { fontSize: '32px', fill: '#ffff00', fontweight: 'bold' }).setOrigin(0.5);
    this.levelUpContainer.add([bg, title]);

    // 선택지 옵션 정의
    const options = [
      { id: 'attackSpeed', title: '공격 속도 증가', desc: '공격 주기 15% 감소', apply: () => player.attackInterval = Math.max(150, player.attackInterval * 0.85) },
      { id: 'moveSpeed', title: '이동 속도 증가', desc: '플레이어 이동 속도 +30', apply: () => player.speed += 30 },
      { id: 'heal', title: '체력 회복 & 최대체력', desc: '최대 체력 +20 및 회복', apply: () => { player.maxHp += 20; player.hp = Math.min(player.maxHp, player.hp + 40); } }
    ];

    // 카드 3개 생성
    options.forEach((opt, idx) => {
      const cardX = 200 + idx * 200;
      const cardY = 320;

      const cardBg = this.add.rectangle(cardX, cardY, 170, 220, 0x222244)
        .setStrokeStyle(2, 0x6666ff)
        .setInteractive({ useHandCursor: true });

      const optTitle = this.add.text(cardX, cardY - 60, opt.title, { fontSize: '16px', fill: '#ffffff', wordWrap: { width: 150 } }).setOrigin(0.5);
      const optDesc = this.add.text(cardX, cardY + 10, opt.desc, { fontSize: '13px', fill: '#aaaaff', wordWrap: { width: 140 } }).setOrigin(0.5);

      cardBg.on('pointerover', () => cardBg.setFillStyle(0x333366));
      cardBg.on('pointerout', () => cardBg.setFillStyle(0x222244));
      cardBg.on('pointerdown', () => {
        opt.apply(); // 선택한 효과 적용
        this.levelUpContainer.setVisible(false);
        
        // UI 갱신 및 게임 재개
        this.updateUI({
          hp: player.hp,
          maxHp: player.maxHp,
          level: player.level,
          exp: player.exp,
          maxExp: player.maxExp,
          gameTime: gameScene.gameTime
        });
        
        gameScene.scene.resume(); // 게임 다시 시작
      });

      this.levelUpContainer.add([cardBg, optTitle, optDesc]);
    });
  }

  showGameOver() {
    this.add.text(400, 300, 'GAME OVER\n새로고침(F5)하여 재시작', {
      fontSize: '32px',
      fill: '#ff0000',
      align: 'center'
    }).setOrigin(0.5);
  }
}