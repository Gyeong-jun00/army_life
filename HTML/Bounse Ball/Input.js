export class InputHandler {
  constructor() {
    this.left = false;
    this.right = false;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'Left') this.left = true;
      if (e.key === 'ArrowRight' || e.key === 'Right') this.right = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'Left') this.left = false;
      if (e.key === 'ArrowRight' || e.key === 'Right') this.right = false;
    });
  }
}