// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize,circle,triangle,mousePressed */

// We'll use variables for most of our colors in this code-along.
let backgroundColor, color1, color2, color3, color4, textColor, globalSaturation, globalBrightness,resetSaturation;

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
  resetSaturation = globalSaturation;
  color1 = color(0, globalSaturation, globalBrightness);
  color2 = color(200, globalSaturation, globalBrightness);
  color3 = color(50,globalSaturation, globalBrightness);
  color4 = color(150,globalSaturation, globalBrightness);
  
}

function draw() {
  background(backgroundColor);
  color1 = color(0, globalSaturation, globalBrightness);
  color2 = color(200, globalSaturation, globalBrightness);
  color3 = color(50,globalSaturation, globalBrightness);
  color4 = color(150,globalSaturation, globalBrightness);
  
  
  fill(color1);
  rect(0,0,100,50);
  
  fill(color2);
  rect(0,height-50,100,50);
  
  fill(color3);
  rect(width-100,0,100,50);
  
  fill(color4);
  rect(width-100,height-50,100,50);
  
  //More Saturation
  fill(color(219,4,33));
  circle(25, height/2, 50);
  
  fill(0);
  textSize(10);
  text("Increase Saturation",0,height/2+50);
  
 //Less Saturated
  fill(color(219,2,69));
  circle(width-25,height/2,50);
  
  fill(0);
  textSize(10);
  text("Reduce Saturation",width-100,height/2+50);
  
  //Reset Button
  triangle(width/2-25,height/2,width/2,height/2-50,width/2+25,height/2);
  fill(0);
  textSize(10);
  text("Reset",width/2-10,height/2+25);
  
  
  if(mouseIsPressed &&mouseX<50 && mouseY<height/2+25 && mouseY>height/2-25){
    globalSaturation += 5
   
  }
  else if(mouseIsPressed && mouseX>width-50 && mouseY<height/2+25 && mouseY>height/2-25){
    globalSaturation -= 5
  }
  else if(mouseIsPressed && mouseY>height/2-50 && mouseY<height/2 && mouseX>width/2-25 && mouseX<width/2+25 ){
    globalSaturation = resetSaturation;
  }
  
  if(mouseX<100 && mouseY<50){
    backgroundColor = color1;
  }
  else if(mouseX<100 && mouseY>height-50)
  {
    backgroundColor = color2;
  }
  else if(mouseX>300 && mouseY<50)
  {
    backgroundColor = color3;
  }
  else if(mouseX>300 && mouseY>height-50)
  {
    backgroundColor = color4;
  }
  else{
    backgroundColor = color(95);
  }
  
    
}


