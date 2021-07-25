// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize,noFill, circle,quad,square
          triangle, createImg*/

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

function setup() {
  // Code here runs only once
  createCanvas(800, 600);
}

function draw() {
  // Code here runs continuously
  background(200);
  //   rect(80,150,150,50);
  //   square(200,250,50);
  //   fill(color(0))
  //   ellipse(80, 100, 100, 60);
  
  
  /*OLYMPIC RINGS*/

  strokeWeight(5);
  noFill();
  stroke(0, 150, 255);
  circle(180, 180, 80);
  stroke(0, 0, 0);
  circle(270, 180, 80);
  stroke(255, 0, 0);
  circle(360, 180, 80);
  stroke(255, 255, 0);
  circle(226, 220, 80);
  stroke(30, 125, 55);
  circle(316, 220, 80);

  /*OLYMPIC TORCH*/

  //torch base
  fill("white");
  noStroke();
  ellipse(55, 102, 100, 10);
  ellipse(55, 110, 100, 10);
  ellipse(55, 150, 60, 10);
  ellipse(55, 160, 60, 10);
  ellipse(55, 260, 15, 8);
  fill("lightblue");
  quad(10, 110, 100, 110, 80, 150, 30, 150);
  quad(30, 160, 80, 160, 60, 250, 50, 250);
  square(50, 250, 10);

  //flames
  fill(255, 215, 0);
  triangle(10, 100, 40, 25, 110, 100);

  fill("orange");
  triangle(10, 100, 45, 55, 100, 100);

  //circles
  noFill();
  strokeWeight(4);
  stroke(25, 25, 112);
  ellipse(25, 230, 50, 50);

  stroke(255, 255, 0);
  ellipse(55, 230, 50, 50);

  stroke(255, 0, 0);
  ellipse(80, 200, 50, 50);

  stroke(0, 0, 0);
  ellipse(97, 167, 50, 50);

  stroke(34, 139, 34);
  ellipse(110, 134, 50, 50);

  //image
  var img;
  img = createImg(
    "https://arapahoenews.com/wp-content/uploads/2019/12/torch-523x900.jpg"
  );
  image(img, 35, 300, 80, 120);
}

