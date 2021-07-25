// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

// We'll use variables for most of our colors in this code-along.
let backgroundColor, color1, color2, textColor, globalSaturation, globalBrightness;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  backgroundColor = color(95);
  textColor = color(20);
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  globalSaturation = 80;
  globalBrightness = 80;
  color1 = color(0, globalSaturation, globalBrightness);
  color2 = color(200, globalSaturation, globalBrightness);
}

function draw() {
  background(backgroundColor);
  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.

  drawHorizontalLine(width/2)  
  drawVerticalLine(height/2);

  // The red and blue circles:
  fill(color1);
  ellipse(100, 200, 50);
  fill(color2);
  ellipse(300, 200, 50);

  // The grey circle and the text:
  
  fill(textColor);
  text("Flip the switch", 20, 20);
  
  //Creates the grey circle and also makes it follow the mouse
  mouseMoved();
  
  
  
  
  //Creating logic if mouse moves past the vertical line on the x-axis inversion of color occurs
  if(mouseX > width/2 ){
   nightMode()
  }
  else{
     dayMode();
  }
  
  //Vertical Momvement
  if(mouseY < height/2){
    vertUp();
  }
  else{
    vertDown();
  }
  
}

function drawHorizontalLine(x) {
  // This function will turn stroke on, draw the line, and then turn stroke
  // back off.
  // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
  stroke(textColor);
  line(x, 0, x, height);
  noStroke();
}

function drawVerticalLine(x){
  stroke(textColor);
  line(0,x, width, x);
  noStroke();  
}


function mouseMoved(){
  //This function creates a grey elipse that moves with the mouse it does this using the mouseX and mouseY coordinate
  
  fill(textColor);
  ellipse(mouseX, mouseY, 50);
}

function nightMode(){
  //Inverts color to black background and others respectively
  backgroundColor = color(0);
  color2 = color(0, globalSaturation, globalBrightness);
  color1 = color(200, globalSaturation, globalBrightness);
  textColor = color(95);
}

function dayMode(){
  //Inverts color back to original
  backgroundColor = color(95);
  color1 = color(0, globalSaturation, globalBrightness);
  color2 = color(200, globalSaturation, globalBrightness);
  textColor = color(20);
}

function vertUp(){
  background(backgroundColor);
  drawHorizontalLine(width/2);  
  drawVerticalLine(height/2);
  
  fill(color1);
  ellipse(100, 100, 50);
  fill(color2);
  ellipse(300, 300, 50);

  
  fill(textColor);
  text("Flip the switch", 20, 20);
  ellipse(mouseX, mouseY, 50);
}

function vertDown(){
  background(backgroundColor);
  drawHorizontalLine(width/2);  
  drawVerticalLine(height/2);
  
  
  fill(color1);
  ellipse(100, 300, 50);
  fill(color2);
  ellipse(300, 100, 50);

  
  fill(textColor);
  text("Flip the switch", 20, 20);
  ellipse(mouseX, mouseY, 50);
}
