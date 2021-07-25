// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, tint*/

//Declaring all our variables
let dvdImage, x, xVelocity, y, yVelocity, r,g,b , ballImage, ballX, ballY, ballXVelocity, ballYVelocity, ballR,ballG, ballB;

function setup() {
  createCanvas(800, 600);
  // We only want to load the logo once.
  dvdImage = loadImage(
    "https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387"
  );
  //Creating a ball
  ballImage = loadImage('data:image/jpeg;base64,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');
  //Seting constant positions to start off 
  x = 50;
  y = 50;
  //Creating a steady movement constant
  xVelocity = 3;
  yVelocity = 3;
  //Initiating the tint to white
  r = 255;
  g = 255;
  b = 255;
  
  //ball values
  ballR = 255;
  ballG = 255;
  ballB = 255;
  
  //Has different velocity and orgin
  ballX = 550;
  ballY = 50;
  ballXVelocity = 5;
  ballYVelocity = 5;
  
  
}

function draw() {
  // Draw the logo at the new position.
  
  background(225);
  
  //Checking to see if we have hit a wall horizontally
  if (x > width-200 || x<0) {
    //If we have hit either right or left wall we need to start moving to the opposite direction
    xVelocity *= -1;
    
    //Randomize R,G,B values to change color whenever we hit a wall
    r = random(0,255);
    g = random(0,255);
    b = random(0,255);
  } 
  //Same check just done on the y axis to monitor vertical movement
  if (y > height - 150 || y<0) {
    yVelocity *= -1;
    
    r = random(0,255);
    g = random(0,255);
    b = random(0,255);
  } 
  
  
  //Same concept just different for the ball object
  if(ballX >width - 50 || ballX<0){
    ballXVelocity *= -1;
    
    ballR = random(255);
    ballG = random(255);
    ballB = random(255);
  }
  if(ballY>height -50 || ballY <0){
    ballYVelocity*= -1;
    
    ballR = random(255);
    ballG = random(255);
    ballB = random(255);
  }
  
  
  
  //Adding velocity to the x and y coordinates innitating movement
  x += xVelocity;
  y += yVelocity;
  
  ballX += ballXVelocity;
  ballY += ballYVelocity;
  
  //Checking if the two objects are colliding and changing ball velocity to go the opposite
  //Needs work on logic
  if(x-100 < ballX && y-50 <ballY && x+200>ballX && y+50>ballY){
    ballXVelocity *= -1;

    
  }

  //Initiating the image of the DVD
  tint(r,g,b);
  image(dvdImage, x, y, 200, 150);
  tint(ballR,ballG,ballB);
  image(ballImage,ballX,ballY,50,50);
  
  
}
