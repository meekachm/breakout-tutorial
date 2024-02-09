class Score {
  constructor(x, y, color, font) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.score = 0;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }

  update(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
  }
}

export default Score;
