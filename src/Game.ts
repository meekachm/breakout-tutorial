import Sprite from './Sprite.js';

class Game extends Sprite {
  constructor(x, y, value = 0, color = 'white', font = '36px Arial') {
    super(x, y, 0, 0, color);
    this.value = value.toString().padStart(3, '0');
    this.font = font;
  }

  update(points) {
    this.value = (parseInt(this.value, 10) + points).toString().padStart(3, '0');
    if (this.value === '000') {
      alert('GAME OVER');
      document.location.reload();
    }
  }

  reset() {
    this.value = '000';
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    const yOffset = 20;
    ctx.fillText(`${this.value}`, this.x, this.y + yOffset);
  }
}

export default Game;
