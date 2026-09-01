import pygame
import sys

# 1. Pygame 초기화
pygame.init()

# 2. 화면 크기 설정 (가로, 세로)
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("My First Pygame")

# 3. FPS(초당 프레임 수) 설정을 위한 시계 객체 생성
clock = pygame.time.Clock()

# 색상 정의 (RGB 값)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)

# 사각형의 초기 위치 및 크기
player_x = 400
player_y = 300
player_size = 50
speed = 5

# 4. 게임 메인 루프 (무한 반복)
running = True
while running:
    # --- A. 이벤트 처리 (키보드, 마우스 입력 등) ---
    for event in pygame.event.get():
        if event.type == pygame.QUIT:  # 창 닫기 버튼을 누르면
            running = False

    # 키보드 연속 입력 처리 (방향키로 이동)
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player_x -= speed
    if keys[pygame.K_RIGHT]:
        player_x += speed
    if keys[pygame.K_UP]:
        player_y -= speed
    if keys[pygame.K_DOWN]:
        player_y += speed

    # --- B. 게임 상태 업데이트 (화면 밖으로 나가지 않게 제어) ---
    player_x = max(0, min(SCREEN_WIDTH - player_size, player_x))
    player_y = max(0, min(SCREEN_HEIGHT - player_size, player_y))

    # --- C. 화면 그리기 (Draw) ---
    # 1) 이전 프레임 잔상을 지우기 위해 배경을 검은색으로 덮기
    screen.fill(BLACK)

    # 2) 빨간색 사각형(플레이어) 그리기: (화면객체, 색상, [x, y, 가로, 세로])
    pygame.draw.rect(screen, RED, [player_x, player_y, player_size, player_size])

    # 3) 그려진 화면을 모니터에 새로고침(업데이트)
    pygame.display.flip()

    # --- D. 프레임 제어 (초당 60프레임 유지) ---
    clock.tick(60)

# 5. 게임 종료 처리
pygame.quit()
sys.exit()