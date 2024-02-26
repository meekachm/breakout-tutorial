import Sprite from './Sprite.js';

class Score extends Sprite {
  constructor(x, y, score = 0, color = 'white', font = '36px Arial') {
    super(x, y, 0, 0, color);
    this.score = '000';
    this.font = font;
  }

  update(points) {
    this.score = (parseInt(this.score, 10) + points).toString().padStart(3, '0');
  }

  reset() {
    this.score = '000';
  }

  render(ctx) {
    const {
      x, y, score, font, color,
    } = this;
    ctx.font = font;
    ctx.fillStyle = color;
    const scoreText = `${score}`;
    ctx.fillText(scoreText, x, y + 20);
  }
}

export default Score;
