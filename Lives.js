import Sprite from './Sprite.js';

class Lives extends Sprite {
  constructor(x, y, lives = 3, color = 'white', font = '36px Arial') {
    super(x, y, 0, 0, color);
    this.maxLives = lives;
    this.lives = lives.toString().padStart(3, '0');
    this.font = font;
  }

  loseLife() {
    this.maxLives -= 1;
    if (this.maxLives === 0) {
      alert('GAME OVER');
      document.location.reload();
    } else {
      this.lives = this.maxLives.toString().padStart(3, '0');
    }
  }

  reset() {
    this.maxLives = 3;
    this.lives = '003';
  }

  render(ctx, canvas) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    const yOffset = 20;
    ctx.fillText(`${this.lives}`, this.x, this.y + yOffset);
  }
}

export default Lives;
