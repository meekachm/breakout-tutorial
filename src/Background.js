class Background {
  constructor(
    canvas,
    color1 = '#fee08a',
    color2 = '#fee28b',
    color3 = '#fee18c',
  ) {
    this.canvas = canvas;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
  }

  render(ctx) {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      0,
      this.canvas.height,
      this.canvas.width,
    );

    gradient.addColorStop(0, this.color1);
    gradient.addColorStop(0.5, this.color2);
    gradient.addColorStop(1, this.color3);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Background;
