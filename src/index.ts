import Ball from './Ball';
import Brick from './Brick';
import Paddle from './Paddle';
import Game from './Game';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const score = new Game(8, 20, 0);
const lives = new Game(canvas.width - 65, 20, 3);

const ballRadius: number = 10;
const paddleHeight: number = 10;
const paddleWidth: number = 75;
const brickColumnCount: number = 14;
const brickRowCount: number = 8;
const brickWidth: number = 25;
const brickHeight: number = 8;
const brickPadding: number = 2;
const brickOffsetTop: number = 70;
const brickOffsetLeft: number = 1;

let x: number = canvas.width / 2;
let y: number = canvas.height - 30;
let dx: number = 2;
let dy: number = -2;
let paddleX: number = (canvas.width - paddleWidth) / 2;
let rightPressed: boolean = false;
let leftPressed: boolean = false;

const brickColors: string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
const bricks: Brick[][] = [];

// Create bricks
for (let c: number = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r: number = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = new Brick(0, 0);
  }
}

function keyDownHandler(event: KeyboardEvent): void {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = true;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(event: KeyboardEvent): void {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = false;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(event: MouseEvent): void {
  const relativeX: number = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function collisionDetection(): void {
  for (let c: number = 0; c < brickColumnCount; c += 1) {
    for (let r: number = 0; r < brickRowCount; r += 1) {
      const b: Brick = bricks[c][r];
      if (b.status === true) {
        if (
          x > b.x
          && x < b.x + brickWidth
          && y > b.y
          && y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = false;

          // Assign points based on the row
          if (r === 0) {
            score.update(30);
          } else if (r === 1) {
            score.update(20);
          } else {
            score.update(10);
          }

          if (score.value === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall(): void {
  const ball: Ball = new Ball(x, y, ballRadius);
  ball.render(ctx);
}

function drawPaddle(): void {
  const paddle: Paddle = new Paddle(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  paddle.render(ctx);
}

function drawBricks(): void {
  for (let c: number = 0; c < brickColumnCount; c += 1) {
    for (let r: number = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === true) {
        const brickX: number = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY: number = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        const color: string = brickColors[r % brickColors.length];
        const brick: Brick = new Brick(brickX, brickY, brickWidth, brickHeight, color, true);
        brick.render(ctx);
      }
    }
  }
}

function draw(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  score.render(ctx);
  lives.render(ctx);
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius - paddleHeight) {
    // Make ball bounce off paddle when it hits it
    if (x + ballRadius > paddleX && x - ballRadius < paddleX + paddleWidth) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      lives.update(-1); // Decrease lives by 1
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 2;
      dy = -2;
      paddleX = (canvas.width - paddleWidth) / 2;
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

// Start the game
draw();
