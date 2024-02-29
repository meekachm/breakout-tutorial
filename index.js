/* eslint-disable no-alert */
import Ball from './Ball.js';
import Brick from './Brick.js';
import Paddle from './Paddle.js';
import Game from './Game.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const score = new Game(8, 20, 0);
const lives = new Game(canvas.width - 65, 20, 3);

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickColumnCount = 14;
const brickRowCount = 8;
const brickWidth = 25;
const brickHeight = 8;
const brickPadding = 2;
const brickOffsetTop = 70;
const brickOffsetLeft = 1;

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const brickColors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
const bricks = [];

// Create bricks
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = new Brick(0, 0);
  }
}

function keyDownHandler({ key }) {
  if (key === 'Right' || key === 'ArrowRight') {
    rightPressed = true;
  } else if (key === 'Left' || key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler({ key }) {
  if (key === 'Right' || key === 'ArrowRight') {
    rightPressed = false;
  } else if (key === 'Left' || key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler({ clientX }) {
  const relativeX = clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === true) {
        if (
          x > b.x
          && x < b.x + brickWidth
          && y > b.y
          && y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;

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

function drawBall() {
  const ball = new Ball(x, y, ballRadius);
  ball.render(ctx);
}

function drawPaddle() {
  const paddle = new Paddle(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  paddle.render(ctx);
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === true) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        const color = brickColors[r % brickColors.length];
        const brick = new Brick(brickX, brickY, brickWidth, brickHeight, color);
        brick.render(ctx);
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  score.render(ctx);
  lives.render(ctx);
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  } if (y + dy < ballRadius) {
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
