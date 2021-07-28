// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,point,keyCode,UP_ARROW,
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width, line, fill, collidePointCircle, noLoop, textSize, keyIsDown, loop, keyIsPressed
 */

let backgroundColor,
  circlePosition,
  rectPosition,
  circle1,
  circle2,
  mouseDistance1,
  mouseDistance2,
  circles;

class Circle {
  constructor() {
    this.x = random(0, 500);
    this.y = random(0, 500);
  }
}
function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object
  circles = [];
  for (let i = 0; i <= 100; i++) {
    circles[i] = new Circle();
  }

  rectPosition = {
    x: 130,
    y: 140
  };
}

function draw() {
  background(color(backgroundColor, 80, 100));
  keyBoard();
  text(`Move around the screen without hitting the invisible circle`, 20, 40);
  text(`Press h for a hint and r for another try!`, 20, 60);

  let mousePosition = {
    x: mouseX,
    y: mouseY
  };
  let closestDistance = 500;
  let closestIndex = 0;
  for (let i = 0; i < circles.length; i++) {
    // ellipse(circles[i].x, circles[i].y, 20, 20);
    detectColision(mousePosition, circles[i]);
    if (round(computeDistance(mousePosition, circles[i])) < closestDistance) {
      closestDistance = round(computeDistance(mousePosition, circles[i]));
      closestIndex = i;
    }
  }
  text(`Your mouse is close to a cirlce by ${closestDistance} units.`, 20, 20);
  backgroundColor = determineBackgroundColor(closestDistance);
}

function keyBoard(){
  if(keyIsPressed){
    if(keyCode==82){
      setup();
    }
    if(keyIsDown(72)){
      for (let i = 0; i < circles.length; i++) {
        ellipse(circles[i].x, circles[i].y, 20, 20);
      }
    }
  }
}


function detectColision(mouse, circle) {
  if (collidePointCircle(mouse.x, mouse.y, circle.x, circle.y, 20)) {
    endGame();
  }
}

function computeDistance(point1, point2) {
  let a = point1.x - point2.x;
  let b = point1.y - point2.y;
  let c = sqrt(a ** 2 + b ** 2);
  return c;
}

function computeCategoryOfDistance(distance) {
  if (distance > 300) {
    return "super cold";
  } else if (distance > 200) {
    return "chillie";
  } else if (distance > 100) {
    return "warmer";
  } else {
    return "red hot";
  }
}
function determineBackgroundColor(distance) {
  return distance * 0.5;
  if (backgroundColor > 220) {
    return 220;
  }
}
function endGame() {
  background("White");
  textSize(50);
  text("YOU LOST!", 50, 100);
  textSize(0);
  fill("White");
  noLoop();  
}
