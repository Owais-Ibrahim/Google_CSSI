// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, createButton */

let backgroundColor, frogX, frogY, frogV, frogImage, score, lives, gameIsOver, car1X, car1Y, car1V, car1Image, restartButton;

function setup() {
  // Canvas & color settings
  createCanvas(500, 300);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogImage = loadImage("https://cdn.glitch.com/95a66b76-fbd9-406f-8fa3-83e9e30b02f1%2Ffrogger-frog.png?v=1594752103067");
  car1Image = loadImage("https://cdn.glitch.com/95a66b76-fbd9-406f-8fa3-83e9e30b02f1%2Ffrogger-car1.png?v=1594751603667");
  restartButton = createButton('restart');
  restartButton.position(width / 2, height / 2);
  restartButton.mousePressed(restartGame);
  restartGame();
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);

  // Code to display Frog
  // fill(120, 80, 80);
  // ellipse(frogX, frogY, 20);
  image(frogImage, frogX, frogY, 20, 20);

  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (gameIsOver) {
    console.log("Game over - user input ignored.");
  } else if (keyCode === UP_ARROW) {
    frogY -= frogV;
  } else if (keyCode === DOWN_ARROW) {
    frogY += frogV;
  } else if (keyCode === LEFT_ARROW) {
    frogX -= frogV;
  } else if (keyCode === RIGHT_ARROW) {
    frogX += frogV;
  }
}

function moveCars() {
  // Move the car
  car1X += car1V;
  // Reset if it moves off screen
  if (car1X >= width) {
    car1X = -30;
    car1Y = random(100, height * 0.8);
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
//  rect(car1X, car1Y, 40, 30);
  image(car1Image, car1X, car1Y, 40, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20)) {
    console.log("collided with Car 1");
    frogX = width / 2;
    frogY = height * 0.9;
    lives -= 1;
    car1V -= 1;
  }
  if (lives <= 0) {
    gameIsOver = true;
    frogV = 0;
    car1V = 0;
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (collideRectCircle(0, 0, width, 30, frogX, frogY, 20)) {
    score += 1;
    frogX = width / 2;
    frogY = height * 0.9;
    car1V += 2;
  }
  if (score >= 5) {
    gameIsOver = true;
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 38);
  // Display game over message if the game is over
  if (gameIsOver) {
    if (lives >= 1) {
      textSize(60);
      fill(120, 80, 80);
      text("YOU WIN!", 70, height/2);      
    } else {
      fill(0, 80, 80);
      textSize(60);
      text("GAME OVER", 70, height/2);      
    }
    restartButton.show();
  }
  fill(120, 80, 80);
  if (lives >= 1) {
    ellipse(50, 16, 10, 10);
  }
  if (lives >= 2) {
    ellipse(65, 16, 10, 10);
  }
  if (lives >= 3) {
    ellipse(80, 16, 10, 10);
  }
}

function restartGame() {
  frogX = width / 2;
  frogY = height * 0.9;
  frogV = 10;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  restartButton.hide();
}