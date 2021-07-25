// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, colorMode, createCanvas, ellipse, fill, height, loadImage, createImage,
 *    noStroke, random, windowHeight, windowWidth, width, mouseX, mouseY,constrain
      collideCircleCircle, HSB, keyCode, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, UP_ARROW,
      keyIsDown, text, noFill, stroke, rect, strokeWeight, text, textSize, textAlign, CENTER,LEFT p5
      
 */

let x1,
  y1,
  diameter1,
  color1 = "red",
  player1Velocity,
  x2,
  y2,
  diameter2,
  color2 = "blue",
  player2Velocity,
  hit,
  winnerSound,
  time,
  gameIsOver,
  currentlyTouching = false,
  announceWinner,
  explodeImg,
  image,
  winner,
  explosion;

function preload() {
  explosion = loadImage(
    "https://cdn.glitch.com/696de7d0-8a78-48db-b278-5c08364d2ffc%2Fc2e5b72c0138a2e0230e5fcb694d5d59.gif?v=1627061259043"
  );
}

function setup() {
  //setup variables
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);

  //player1 variables
  x1 = windowWidth * (1 / 6);
  y1 = windowHeight / 2;
  diameter1 = 50;
  player1Velocity = 3;

  //player2 variables
  x2 = windowWidth * (5 / 6);
  y2 = windowHeight / 2;
  diameter2 = 50;
  player2Velocity = 3;

  //other variables
  gameIsOver = false;
  time = 1000;
  winnerSound = new p5.Speech();
  announceWinner = "";
}

function draw() {
  background(220, 0, 90);
  drawBox();
  //image(explosion, 50, 50, 50, 50);
  //While game is not over
  if (!gameIsOver) {
    //Draw players
    player1();
    player2();

    //Handle movement,collision, & time
    test();
    checkCollision();
    handleTime();

    //Text
    textAlign(LEFT);
    textSize(15);
    text(`Time remaining: ${time}`, 10, 20);
  }
  //If player 1 wins
  else if (gameIsOver && winner == "player1") {
    //Text anouncement and redraw player 1
    textAlign(LEFT);
    textSize(10);
    text(`Time remaining: ${time}`, 10, 20);
    player1();
    textAlign(CENTER);
    textSize(30);
    text(`${announceWinner}`, 200, height / 2);
  }
  //If player 2 wins
  else if (gameIsOver && winner == "player2") {
    //Text anouncement and redraw player 1
    player2();
    textAlign(LEFT);
    textSize(10);
    text(`Time remaining: ${time}`, 10, 20);
    textAlign(CENTER);
    textSize(30);
    text(`${announceWinner}`, 200, height / 2);
  }
}

function player1() {
  //draw player 1
  fill(color1);
  strokeWeight(2);
  ellipse(x1, y1, diameter1);
  strokeWeight(0.25);
}

function player2() {
  //draw player 2
  fill(color2);
  strokeWeight(2);
  ellipse(x2, y2, diameter2);
  strokeWeight(0.25);
}

function test() {
  //Handling movement
  //Arrow keys for player 1 and WASD for player 2
  if (!gameIsOver) {
    if (keyIsDown(DOWN_ARROW) && y1 <= (windowHeight * 371) / 400) {
      y1 += player1Velocity;
    }
    if (keyIsDown(UP_ARROW) && y1 >= (windowHeight * 9) / 200) {
      y1 -= player1Velocity;
    }
    if (keyIsDown(RIGHT_ARROW) && x1 <= (windowWidth * 113) / 120) {
      x1 += player1Velocity;
    }
    if (keyIsDown(LEFT_ARROW) && x1 >= (windowWidth * 1) / 30) {
      x1 -= player1Velocity;
    }
    if (keyIsDown(87) && y2 >= (windowHeight * 9) / 200) {
      y2 -= player2Velocity;
      //W
    }
    if (keyIsDown(65) && x2 >= (windowWidth * 1) / 30) {
      x2 -= player2Velocity;
      //A
    }
    if (keyIsDown(68) && x2 <= (windowWidth * 113) / 120) {
      x2 += player2Velocity;
      //D
    }
    if (keyIsDown(83) && y2 <= (windowHeight * 371) / 400) {
      y2 += player2Velocity;
      //S
    }
  }
  x1 = constrain(x1, 0, windowWidth - 20);
  x2 = constrain(x2, 0, windowWidth - 20);
  y1 = constrain(y1, 0, windowHeight - 20);
  y2 = constrain(y2, 0, windowHeight - 20);
}

function checkCollision() {
  //Checking collisions and making the colliding players red
  hit = collideCircleCircle(x1, y1, diameter1, x2, y2, diameter2);
  if (hit) {
    if (color1 == "red" && !currentlyTouching) {
      color1 = "blue";
      color2 = "red";
      currentlyTouching = true;
    } else if (color1 == "blue" && !currentlyTouching) {
      color1 = "red";
      color2 = "blue";
      currentlyTouching = true;
    }
    if (color2 == "blue" && !currentlyTouching) {
      color2 = "red";
      color1 = "blue";
      currentlyTouching = true;
    } else if (color2 == "red" && !currentlyTouching) {
      color2 = "blue";
      color1 = "red";
      currentlyTouching = true;
    }
  } else {
    currentlyTouching = false;
  }
}

function handleTime() {
  //Handling time and when time is up handle end game screen and sound
  if (time > 0) {
    time -= 1;
  } else {
    if (color1 == "red") {
      winner = "player2";
      announceWinner = `Player 2 is the winner!`;
      winnerSound.speak(announceWinner);
      gameIsOver = true;
    } else if (color2 == "red") {
      winner = "player1";
      announceWinner = `Player 1 is the winner!`;
      winnerSound.speak(announceWinner);
      gameIsOver = true;
    }
  }
}

function drawBox() {
  //Outlining the box
  stroke("black");
  strokeWeight(10);
  noFill();
  rect(0, 0, windowWidth - 20, windowHeight - 20);
  strokeWeight(0.25);
}

function explode() {
  // explodeImage = loadImage("https://media2.giphy.com/media/3ohuPBA3489AkQk1i0/giphy.gif");
  if (time <= 0) {
    if (color1 == "red") {
      image(explodeImg, 50, 50, 50, 50);
    } else {
      image(explodeImg, 50, 50);
    }
  }
}
