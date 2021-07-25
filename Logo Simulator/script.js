// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, circle, triangle,rectangle */

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

function setup(){
  // Code here runs only once
  createCanvas(800, 600)
}

function draw(){
  // Code here runs continuously
  background(220)
  strokeWeight(0);

  
  /*Master Card*/
  fill("red");
  circle(180,50,60);
  fill("orange");
  circle(220,50,60);
  fill("red");
  var y = 25;
  var size = 15;
  for(let i = 0; i<8;i++){
    y += 5;
    if(i<1 || i>6){
      rect(190,y,size-3,3,5);
    }
    else if(i>=2 && i<=5){
      rect(190,y,size+1,3,5);
    }
    else if(i>=3 && i<=4){
      rect(190,y,size+2,3,5);
    }
    else{
      rect(190,y,size,3,5);
    }    
  }


  
  /* STAR */
  fill(70,130,180);
  triangle(30, 70, 83.5, 25, 80, 79);
  triangle(50, 130, 30, 73, 79, 86);
  triangle(52, 133, 85, 91, 118, 133);
  triangle(120, 130, 91, 86, 139, 73);
  triangle(90, 79, 86.5, 25, 139, 70);
  
}
