// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width,
 *    frameRate, stroke, noFill, keyCode, UP_ARROW, DOWN_ARROW,image,ml5, strokeWeight,
 *    RIGHT_ARROW, LEFT_ARROW, fill, collideRectRect, noLoop, loop, isLooping, textSize, redraw, createCapture, VIDEO, textAlign,CENTER,line,
 */

let backgroundColor, playerSnake, currentApple, score, squareSize, pause, fps, goldApple, 
    rightTeleport, teleport, timerRed, timerGold, teleportTime;


// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/7wROUkt1S/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  video = createCapture(VIDEO);
  video.size(300, 200);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}


function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  // Video
  video = createCapture(VIDEO);
  video.size(250, 200);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
  
  //Everything Else
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 90;
  fps = 12;
  frameRate(fps);
  squareSize = 10;
  pause = false;
  teleport = false 
  playerSnake = new Snake();
  currentApple = new Apple();
  goldApple = new GoldApple();
  teleportTime = random(0,25);
  rightTeleport = new Teleporter();
  score = 0;
  timerRed = 120;
  timerGold = 100;  
}

function draw() {
  background(backgroundColor);
  // Display Image
 image(flippedVideo, 0, 300);

  // Draw the label
  fill(0);
  text(label, 0, 300);
  
  instructions();
  displayScore();
  frameRate(fps);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  goldApple.showSelf();
  
  // Displays the apple timers and resets them
  manageTime();
  
  // Displays a teleporter based on time and also handles its collisions
  teleporter();
  
  
}

 // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    controlSnake();
    // Classifiy again!
    classifyVideo();
  }


function instructions(){
  fill(0);
  text("Collect the apples in the allotted time to get points. Watch out for the blue teleporter! ", 10, 20);
}



function teleporter(){
  if(teleportTime > 0){
    fill(0);
    text(`Time Until Next Teleport: ${round(teleportTime)}`, 10, 100);
  }
  teleportTime--;
  console.log(teleportTime);
  if(teleportTime< 0){
    rightTeleport.showSelf();
    playerSnake.checkTeleport();
  }
}

function manageTime(){
  timerRed--;
  timerGold --;
  fill(0);
  text(`Red Apple Time Left: ${timerRed}`, 10, 60);
  text(`Gold Apple Time Left: ${timerGold}`, 10, 80);
  if(timerRed <= 0){
    currentApple = new Apple();
    timerRed = 120;
  }
  if(timerGold <= 0){
    goldApple = new GoldApple();
    timerGold = 100;
  }
}

function displayScore() {
  fill(0);
  text(`Score: ${score}`, 10, 40);
}

class Snake {
  constructor() {
    this.size = squareSize;
    this.x = width/2;
    this.y = height - 10;
    this.direction = 'N';
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)];
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
    // Add new head to front of tail
    this.tail.unshift(new TailSegment(this.x, this.y));
    
    // Remove last segment of tail
    this.tail.pop();
  }

  showSelf() {
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
  }
  
  checkTeleport(){
    if(collideRectRect(this.x, this.y, this.size, this.size,
                       rightTeleport.x, rightTeleport.y, rightTeleport.size, rightTeleport.size)) {
      teleport = true;
      this.x = 0; 
      rightTeleport = new Teleporter();
      teleportTime = random(75, 200);
      teleport = false;
    }
  }

  checkApples() {
    // Check if snake head has collided with apple
    if(collideRectRect(this.x, this.y, this.size, this.size,
                       currentApple.x, currentApple.y, currentApple.size, currentApple.size)) {
      score++;
      // fps += 0.25;
      currentApple = new Apple();
      this.extendTail();
      timerRed = 120;
    }
    if(collideRectRect(this.x, this.y, this.size, this.size,
                      goldApple.x, goldApple.y, goldApple.size, goldApple.size)) {
      score += 3;
      // fps += 0.25;
      goldApple = new GoldApple();
      this.extendTail();
      timerGold = 100;
    }
  }

  checkCollisions() {
    //Check every tail segment for collision with the head
    let tailHead = this.tail[0];
    for (let i = 1; i<this.tail.length;i++){
      if(collideRectRect(tailHead.x, tailHead.y, tailHead.size, tailHead.size, 
                        this.tail[i].x, this.tail[i].y, this.tail[i].size, this.tail[i].size)){
        gameOver();
      }
    }
    if((this.x < 0 || this.x > 500 || this.y < 0 || this.y > 500) && teleport == false){
      gameOver();
    }
  }
  

  extendTail() {
    let lastTailSegment = this.tail[this.tail.length-1];
    this.tail.push(new TailSegment(lastTailSegment.x, lastTailSegment.y));
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = squareSize;
  }

  showSelf() {
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();    
  } 
  
}

class Apple {
  constructor() {
    this.x = random(width - squareSize) ;
    this.y = random(height - squareSize) ;
    this.size = squareSize;
  }

  showSelf() {
    fill(0, 80, 80);
    rect(this.x, this.y, this.size, this.size);
  }
}

class GoldApple{
  constructor(){
    this.x = random(width - squareSize) ;
    this.y = random(height - squareSize) ;
    this.size = squareSize;
  }
  
  showSelf(){
    fill(60, 80, 80);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Teleporter{
  constructor(){
    this.x = 490;
    this.y = random(height - squareSize);
    this.size = 15; 
  }
  showSelf(){
    fill("Blue");
    rect(this.x, this.y, this.size, this.size);
  }
}

function controlSnake() {
  if (label === "Up" && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (label === "Down" && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (label === "Right" && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (label === "Left" && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  }
  // } else if(label === "Restart"){
  //   restartGame();   
  // else if (label === "Pause"){
  //   if(pause){
  //     loop();
  //     pause = false;
  //   }
  //   else{
  //     noLoop();
  //     pause = true;
  //   }   
  // }
  else {
    console.log("Nothing");
  }
}


function restartGame() {
  playerSnake = new Snake();
  currentApple = new Apple();
  goldApple = new GoldApple();
  rightTeleport = new Teleporter();
  timerRed = 120;
  timerGold = 100;
  score = 0;
  loop();
}

function gameOver() {
  stroke(0);
  textSize(30);
  text("GAME OVER", width/2, height/2);
  noLoop();
  noStroke();
  textSize(12);
}





function keyPressed() {
  console.log("key pressed: ", keyCode)
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  } else if(keyCode === 32){
    restartGame();   
  }else if (keyCode === 80){
    if(pause){
      loop();
      pause = false;
    }
    else{
      noLoop();
      pause = true;
    }   
  }
  else {
    console.log("wrong key");
  }
}
