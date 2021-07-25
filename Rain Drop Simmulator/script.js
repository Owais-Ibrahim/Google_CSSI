// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, loadImage, image, noLoop,loop, isLooping, mouseButton, RIGHT, LEFT */

let  drops, drop1, drop2,drop3, drop4, count,globalHeight,globalY, grass, pauseState, lawnmower, cutGrass, x;

class Drop {
  constructor(x, y, diamter, fallSpeed) {
    this.x = x;
    this.y = y;
    this.diameter = diamter;
    this.fallSpeed = fallSpeed;
    
  }
}

function setup() {
  createCanvas(500, 500);   
  colorMode(HSB, 100);
  globalY = 460
  globalHeight = 50
  x = 10;
  grass = loadImage("https://cdn.glitch.com/35dd4742-7aef-4409-b56d-283add641f17%2F104-1046482_most-realistic-artificial-grass-v-1509364788-grass-blade.png?v=1626884297318");
  lawnmower = loadImage("https://cdn.glitch.com/35dd4742-7aef-4409-b56d-283add641f17%2Ffree-svg-lawn-mower-lawnmower-vector-11562956511l0fdf7rlao.png?v=1626886470188");
  drop1 = new Drop(200,0,10,8);
  drop2 = new Drop(random(width), random(height), random(5,15), random(8,20)); 
  drop3 = new Drop(random(width), random(height), random(5,15), random(8,20)); 
  drop4 = new Drop(random(width), random(height), random(5,15), random(8,20)); 
  drops = [drop1, drop2, drop3, drop4];
  
  

}

function draw() {
  count = drops.length;
  background(0, 0, 95);
  drawGrass();
  writeText();
  
  for(let i of drops){
    moveDroplet(i);
    displayDroplet(i);
    checkGrass(i);
  }
  
  if(cutGrass){
    x+=5;
    image(lawnmower, x, globalY,80,50);
    if(x>width){
      globalY = 460;
      globalHeight = 50;
      x = 10;
      cutGrass = false; 
    }
  }
  
}

//

function checkGrass(Drop){
  if(Drop.y > globalY && Drop.y<globalY+2){
    globalHeight++;
    globalY--;
  }
}

function moveDroplet(Drop){
  Drop.y += Drop.fallSpeed;
  // If it goes off the screen...
  if (Drop.y > height) {
    // ...reset it...
    Drop.y = 0;
    // ...and move it somewhere random.
    Drop.x = random(width);
  }
}

function displayDroplet(Drop){
  noStroke();
  fill(60, 80, 80);
  ellipse(Drop.x, Drop.y, Drop.diameter);

}
function drawGrass(){
  image(grass, 0,globalY,100,globalHeight);
  image(grass, 100,globalY,100,globalHeight);
  image(grass, 200,globalY,100,globalHeight);
  image(grass, 300,globalY,100,globalHeight);
  image(grass, 400,globalY,100,globalHeight);
  if(globalY < 100){
    cutGrass = true; 
  }
}
function writeText(){
  text("Press Your Mouse to Create New Droplet", 10,10);
  text("Press R to Reset", 10,20);
  text("Press P to Pause", 10,30);
  text("Press C to Cut Grass", 10,40);
  text(`Current Count ${count}`, 400,10);
  
}

function mouseClicked(){
    drops.push(new Drop(random(width), random(height), random(5,15), random(8,20)));
}
// function doubleClicked(){
//   drops.pop();
// }

function keyPressed(){
  if(keyCode == 82){//R
    setup();
  }
  else if(keyCode == 80){ //P
   if(pauseState){
     loop();
     pauseState = false;
   }
   else{
    noLoop();
    pauseState = true;
   }
  }
  else if(keyCode == 67){ //c
    cutGrass = true;
  }
}
