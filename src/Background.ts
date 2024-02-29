import Sprite from './Sprite.ts';

class Background extends Sprite {
  constructor(color, image) {
    super(color);
    this.image = image;
  }

  render(ctx, canvas) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (this.image) {
      ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
  }
}

export default Background;
