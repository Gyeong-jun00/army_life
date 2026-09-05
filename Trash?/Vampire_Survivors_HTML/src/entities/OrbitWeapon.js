export default class OrbitWeapon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, owner, index = 0, totalWeapons = 1) {
    super(scene, owner.x, owner.y, 'orbitWeaponTexture');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.owner = owner; // 플레이어 참조
    this.index = index; // 여러 개일 때 배치 순서
    this.totalWeapons = totalWeapons; // 전체 개수

    // 무기 기본 스탯
    this.radius = 65;         // 회전 반지름 (플레이어와의 거리)
    this.orbitSpeed = 0.04;   // 회전 속도 (라디안/프레임)
    this.angleOffset = (Math.PI * 2 / totalWeapons) * index; // 개수에 따른 간격 자동 배치
    this.currentAngle = this.angleOffset;
    this.damage = 5;          // 회전 무기 데미지

    this.setCircle(8); // Hitbox 크기 설정
  }

  update(time) {
    if (!this.owner || !this.owner.active) {
      this.destroy();
      return;
    }

    // 1. 회전 각도 갱신
    this.currentAngle += this.orbitSpeed;

    // 2. 플레이어 중심 오프셋 좌표 계산
    const targetX = this.owner.x + Math.cos(this.currentAngle) * this.radius;
    const targetY = this.owner.y + Math.sin(this.currentAngle) * this.radius;

    // 3. 위치 업데이트
    this.setPosition(targetX, targetY);
  }

  // 전체 무기 개수나 회전 속도/반지름 재설정 메서드
  reposition(index, totalWeapons) {
    this.index = index;
    this.totalWeapons = totalWeapons;
    this.angleOffset = (Math.PI * 2 / totalWeapons) * index;
    this.currentAngle = this.angleOffset;
  }
}