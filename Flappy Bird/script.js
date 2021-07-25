// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, tint,frameRate, noLoop, loadSound, soundFormats,p5  */

let counter,rectX,rectX2, rectwidth, topRectangleHeight, bottomRectangleHeight, bottomRectangleY, needNewRectangle,
  topH, bottomY, bottomHeight, topRectangleHeight2, bottomRectangleHeight2,drawNewRectangle, bird, score, birdX, birdY;

var song, hi;



function setup() {
  
  createCanvas(600, 600);
  rectX = width-50;
  rectX2 = width-50;
  rectwidth = 50;
  counter = 0;
  bottomY = 0;
  drawNewRectangle = false;
  needNewRectangle = false;
  score = 0;
  
  birdX = 20;
  birdY = 300;
  
  //Initial randomization
  rectangleRandomization();
 
  
  //Bird Image
  bird = loadImage("https://cdn.glitch.com/6db7cc22-1509-4d9d-8235-3ca8cdcf3d3a%2FflappyBird-removebg-preview.png?v=1626454166967");
  song = new p5.SoundFile();
  song = loadSound('https://cdn.glitch.com/6db7cc22-1509-4d9d-8235-3ca8cdcf3d3a%2FTest.mp3?v=1626458990338');
  
  
}

function draw() {
  background("green");
  
  //Text for score
  fill("White");
  text('Score: ' + score, 10,40);
  text('Press Space To Move Bird', 10,60);
  
  //Drawing Rectangles on Canvas
  drawRectangles();
  
  
  //Loading brid image 
  image(bird, birdX, birdY, 50, 50);
  //Bird falling (Gravity) but not off of the screen
  if(birdY>=550){
    birdY=550;
  }
  else{
    birdY++;
  }
  
  
  //(x,0)(x+50,0)
  //(x,height) (x+50, height)
  if(rectX == 30 || rectX2 ==20){
    if(birdY>topRectangleHeight && birdY<bottomRectangleHeight){
      score++
    }
    else{
      gameOver();
      noLoop();
    }
  }
  
  
  
}


//Draw Top Rectangles
function drawTopRectangle(rectX, y, width, height) {
  rect(rectX, y, width, height);
}

//Draw Bottom Rectangles
function drawBottomRectangle(x, y, width, height) {
  rect(x, y, width, height);
}

//Randomizing rectangle heights and using moduler for second pair of rectangles
function rectangleRandomization() {
  counter++;
  if (counter % 2 == 0) {
    topRectangleHeight2 = random(100, 275);
    bottomRectangleHeight2 = random(325, 500);
  } else {
    topRectangleHeight = random(100, 275);
    bottomRectangleHeight = random(325, 500);
  }
}
  
function drawRectangles(){
  fill("black");
  drawTopRectangle(rectX, 0, rectwidth, topRectangleHeight);
  drawBottomRectangle(rectX,bottomRectangleHeight,rectwidth,600 - bottomRectangleHeight);
  rectX--;

  if (rectX == 100) {
    needNewRectangle = true;
  }

  if (needNewRectangle) {
    rectangleRandomization();
    drawNewRectangle = true;
    needNewRectangle = false;
  }
  if (drawNewRectangle) {
    drawTopRectangle(rectX2, 0, rectwidth, topRectangleHeight2);
    drawBottomRectangle(rectX2, bottomRectangleHeight2, rectwidth, 600 - bottomRectangleHeight2
    );
    rectX2--;
  }
  if (rectX2 == 100) {
    rectX = width-50;
  }

  if (rectX2<0) {
    drawNewRectangle = false;
    rectX2 = width - 50;
  }
}

function keyPressed(){

  //Runs everytime a key is pressed
  if(keyCode==32){
      birdY-=20;
      song.play();
      
  }
}
  
function gameOver(){

  background(255,255,255);
  fill(255,0,0);
  textSize(50);
  text("GAME OVER!", 300,300)
}



