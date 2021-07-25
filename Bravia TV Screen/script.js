// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, windowHeight, windowWidth, width, mouseX, mouseY, collideCircleCircle
 */

let dots, globalDiameter;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);
  globalDiameter = 20;
  dots = []
  
  for(let i = 0; i<5; i++){
    dots.push(new BouncyDot());
  }
 
}

function draw() {
  background(220, 0, 80);
  ellipse(mouseX, mouseY, globalDiameter);
  for (let dot of dots) {
    dot.move();
    dot.draw();
    dot.collide();
  }
}

class BouncyDot {
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.r = random(5,12);
    this.color = random(360);
    this.baseXVelocity = random(0.5,3);
    this.baseYVelocity = random(0.5,3);
    this.xVelocity = this.baseXVelocity;
    this.yVelocity = this.baseYVelocity;
  }
  move(){
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.baseXVelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.baseXVelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.baseYVelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.baseYVelocity;
    }
    
  }
  
  collide(){
      if(collideCircleCircle(mouseX,mouseY,globalDiameter,this.x,this.y, this.r*2)){
        this.hide();
      }
  }
  hide(){
    if(globalDiameter<100){
      globalDiameter+=this.r;
    }
    this.r = null;
    dots.push(new BouncyDot());
  }
  //If you play rn there is a bug since theres alot of balls and size of the cursor
  
  draw(){
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
    
  }
}

function mousePressed() {
  dots.push(new BouncyDot());
}