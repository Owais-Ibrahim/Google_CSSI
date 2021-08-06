// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,textSize, collideRectCircle
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width, p5, loadSound, 
 *    frameRate, stroke, noFill, keyCode, UP_ARROW, DOWN_ARROW
 *    RIGHT_ARROW, LEFT_ARROW, loadImang, fill, cursor,HAND,collideRectRect,textAlign,CENTER,textFont,loadVideo,loadFont, noLoop, loop, loadImage, image, getItem, storeItem, keyIsDown, keyPressed,collidePointRect
 */

let screenNumber, mouse = false;
let gameBackground,imgX, img2X, gameBackgroundSound, padel1, padel2, padel3, padel4, padels, level1Start = false, level2Start = false, gameFont;
let level2Background, level2FarBuildings, level2Buildings, level2Foreground, l2imgX, l2img2X;
let character, characterPosX,forest,gameScreen,baby,characterPosY, isOnPlatform, zombie, zombiePosY, characterSpeed;
let mask, masks, maskPowerUp, currentMask;
let padelsY, hasMaskPowerUp, hasSanitizerPowerUp, sanitizerPowerUp, currentSanitizer;
let prevScreen = 1;
var score = 0;
var lives = 4;
var zX = 50;
var zY = 700;
var zW = 80;
var zH = 100;
var z2x = 0;
var z2y = 715;
var pW = 50;
var pH = 80;

//var zombiePosX = 200; // center positions
var zSpeed = 2;
var zDirection = 1;//1 moves right and -1 moves left
var zDistance = 50;
var z2Direction = 1;
var z2Speed = 6;


function preload(){
  gameBackgroundSound = loadSound("https://cdn.glitch.com/12583e6a-2eea-4541-beb6-c9ac421ac359%2FCome-Play-with-Me.mp3?v=1627667248547");
  forest =  loadImage("https://cdn.glitch.com/13bca4f8-dede-482b-9750-28506aef5a42%2Fvector-abstract-forest-landscape.jpg?v=1627924277781");  
  baby = loadImage("https://cdn.glitch.com/13bca4f8-dede-482b-9750-28506aef5a42%2Finfant1.png?v=1627925275371")
  gameScreen = loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2FEnd%20of%20the%20World.png?v=1627942718613")
  gameFont = loadFont("https://cdn.glitch.com/13bca4f8-dede-482b-9750-28506aef5a42%2FGamePlayed-vYL7.ttf?v=1627674336507")
  gameBackgroundSound.setVolume(0.10);
  gameBackgroundSound.setLoop(true);  
}

function setup() {
  createCanvas(800, 800);
  textAlign(CENTER);
  frameRate(24);
  screenNumber = 1;
    
  //characters, background, and platforms
  gameSetup();
  
}

function draw() {
   textFont(gameFont);
   switch(screenNumber){
     case 1:
       scene1();
       break;
     case 2:
       scene2(); 
       break;
     case 3: 
       scene3();
       break;
     case 4:
       scene4();
       break;
     case 5:
       scene5();
       break;
     case 6:
       levelSelector();
       break;
     case 7:  
       level1();
       characterMove();
       zombieMove();
       break;
     case 8:
       level2();
       characterMove();
       zombieMove();
       break;
     case 9:
       if(gameBackgroundSound.isPlaying()){
         gameBackgroundSound.pause();
       }
       gameOver();
       break;
     case 10:
       if(gameBackgroundSound.isPlaying()){
         gameBackgroundSound.pause();
       }
       win();
       break;
   }
}

// Game Level 1 
function level1(){
  if(!level1Start){
    gameSetup();
    level1Start = true;
  }
  image(gameBackground, imgX, 0, 1600, height+100); 
  image(gameBackground, img2X,0, 1600, height+100); 
  image(character, characterPosX,characterPosY,50, 80)
  image(zombie, zX, zY, zW, zH);
  textSize(24)
  text("Level 1", 60, 50);
  text(`Lives: ${lives}`, 60, 100);
  text(`Points: ${score}`, 65, 140);
  if(!gameBackgroundSound.isPlaying()){
    gameBackgroundSound.play();
  }
  stroke ("black");
  fill("White");
  for(let padel of padels){
    padel.draw();
    padel.move();  
    padel.checkOnPlatform();
    if(padel.x<-75){
      padel.reset();
    }
  } 
  currentMask.draw();
  currentMask.move();
  currentMask.checkCollision();
  currentSanitizer.draw();
  currentSanitizer.move();
  currentSanitizer.checkCollision();
  if(imgX< -1600 ){
    imgX = 1600;
  }
  else if(img2X< -1600){
    img2X = 1600;
  }
  imgX-=0.5;
  img2X-=0.5;
  
  if(lives<0){
    prevScreen = 7;
    screenNumber = 9;
  }
  
  if(score>20){
    prevScreen = 7;
    screenNumber = 10;
  }
}

// Game Level 2
function level2(){
   if(!level2Start){
    if(gameBackgroundSound.isPlaying()){
      gameBackgroundSound.stop();
    }
    gameSetup();
    level2Start = true;
  }
  image(level2Background, 0,0, width, height); 
  image(level2FarBuildings, 0,0, 800, height); 
  image(level2Buildings, 0, 200, 800, 600); 
  image(level2Foreground, l2imgX, 400, 800 , 400); 
  image(level2Foreground, l2img2X, 400, 800 , 400); 
  
  image(character, characterPosX,characterPosY, pW, pH)
  image(zombie, zX, zY, zW, zH);
  image(zombie, z2x, z2y, zW, zH);
  textSize(24);
  text("Level 2", 60, 50);
  text(`Lives: ${lives}`, 60, 100);
  text(`Points: ${score}`, 65, 140);
  if(!gameBackgroundSound.isPlaying()){
    gameBackgroundSound.play();
  }
  stroke ("black");
  fill("White");
  for(let padel of padels){
    padel.draw();
    padel.move();  
    padel.checkOnPlatform();
    if(padel.x<-75){
      padel.reset();
    }
  }  
  currentMask.draw();
  currentMask.move();
  currentMask.checkCollision();
  currentSanitizer.draw();
  currentSanitizer.move()
  currentSanitizer.checkCollision()
  
    
  if(l2imgX< -800 ){
    l2imgX = 800;
  }
  else if(l2img2X< -800){
    l2img2X = 800;
  }
  l2imgX-=0.5;
  l2img2X-=0.5;
  
  if(lives<0){
    prevScreen = 8;
    screenNumber = 9;
  }
  
  if(score>50){
     prevScreen = 8;
     screenNumber = 10;
  }
  
}

function scene1(){
  background(gameScreen);
  noStroke();
  textSize(50);
  fill("white");
  text('Click to start', 430, 400);
  cursor(HAND);
  
  nextButton(350,650,400,700);
}

function scene2(){
  background('red');
  textSize(50);
  fill("white");
  text('How To Play', 350, 350);
  text('Use arrow keys to move and jump', 350, 450, 50,350);
  cursor(HAND);
  
  backButton(50,700,100,750);
  nextButton(650,700,700,750);
}

function scene3(){
  background(forest);
  fill(100,150,75);
  rect(0, 550, 900, 500)
  fill("white");
  textSize(20);
  fill("white");
  cursor(HAND);
  text('In 2020, Covid-19 hit the world and killed millions of people. The people who were infected but not killed turned into brain-eating zombies. ', 250, 600, 350,350);
  
  backButton(50,700,100,750);
  nextButton(650,700,700,750);
}

function scene4(){
  background(forest);
  fill(100,150,75);
  rect(0, 550, 900, 500)
  fill("white");
  textSize(20);
  fill("white");
  cursor(HAND);
  text('The people who were never infected escaped to a secluded place in the world and lived there for 20 years. However, they soon got tired of living in secret and wanted their world before covid back.', 250, 600, 350, 350); 
  
  backButton(50,700,100,750);
  nextButton(650,700,700,750);
}

function scene5(){
  background(forest);
  image(baby, 300,200,100,100)
  fill(100,150,75);
  rect(0, 550, 900, 500)
  fill("white");
  textSize(20);
  fill("white");
  cursor(HAND);
  text('They would soon get their wish in 2041 when Evan would be born. They knew that this kid would save the world.', 250, 600, 350,350);
  
  backButton(50,700,100,750);
  nextButton(650,700,700,750);
}

function levelSelector(){
  background('Gold');
  textSize(50);
  fill("white");
  text('Level Screen', 400, 50);
  noFill();
  rect(200,200,100,100);
  textSize(32);
  fill("White")
  text("Level 1", 250, 250);
  noFill();
  rect(500,200,100,100);
  fill("White")
  text("Level 2", 550, 250);
  backButton(50,700,100,750);
  
  if(mouse &&  collideRectCircle(200, 200, 100, 100, mouseX, mouseY, 10)){
    screenNumber = 7;
  }
  else if (mouse &&  collideRectCircle(500, 200, 100, 100, mouseX, mouseY, 10)){
    screenNumber = 8;
  }
}

class Padle{
  constructor(x, y, w, h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  draw(){
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
    this.x--;
  }
  reset(){
    //sets the X back to the right hand of the screen and randomizes the width
    this.x = 800;
    this.w = random(75,100);
  }
 checkOnPlatform()
  {
    isOnPlatform = collideRectRect(characterPosX,characterPosY, 50,80, this.x, this.y, this.w, this.h)
    //isOnPlatform = collideLineRect(this.x, this.y,this.length, this.y, characterPosX, characterPosY, 50, 80)
   
    if (isOnPlatform == true)
      {
        characterPosY = this.y - 80;
      }
  }
}
function gameSetup(){  
  //Background Image
  gameBackground =  loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2Fsunset_citybackground.jpg?v=1628095295005");  
  
  //Level 2 background
  level2Background = loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2Fbg.png?v=1628098216176");
  level2FarBuildings = loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2Ffar-buildings.png?v=1628098220286");
  level2Buildings = loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2Fbuildings.png?v=1628098218298");
  level2Foreground = loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2Fskill-foreground.png?v=1628098222638");
  

  //background img x's
  imgX = 0;
  img2X = 1600;
  
  l2imgX = 0;
  l2img2X = 800;
  
  //character information
  character = loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2FWalk%20(6).png?v=1627667594848");
  characterSpeed = 5;
  characterPosX = 50;
  characterPosY = 722;
  isOnPlatform = false;
  
  //zombie information
  zombie = loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2Fzombie-removebg-preview.png?v=1627666756059")

  //Padels 
  padel1 = new Padle(200, 600, random(75,100), 30);
  padel2 = new Padle(350, 650, random(75,100), 30);
  padel3 = new Padle(550, 600, random(75,100), 30);
  padel4 = new Padle(750, 550, random(75,100), 30);

  padels = [padel1, padel2, padel3,padel4];
  padelsY = [600,650,600,550];
  
  maskPowerUp = loadImage("https://cdn.glitch.com/8ceacbf3-71f3-44dc-97ce-af2d8d95cad9%2Fmask-removebg-preview.png?v=1627923757587");
  sanitizerPowerUp = loadImage("https://cdn.glitch.com/8ea3e93b-8ded-4235-90a8-6f1bc895f723%2Fhand-sanitizer-removebg-preview.png?v=1628180026276")
  currentMask = new PowerUpMasks();
  currentSanitizer = new PowerUpSanitizer();
  hasMaskPowerUp = false;
  hasSanitizerPowerUp = false;
  
  score = 0;
  lives = 4;
  
  zX = 50;
  zY = 700;
  zW = 80;
  zH = 100;
  z2x = 0;
  z2y = 715;
  pW = 50;
  pH = 80;

}

function mouseReleased(){
  mouse = true;
}

function nextButton(rx, ry, tx, ty){
  noFill();
  rect(rx,ry,150,150);
  textSize(24);
  fill("Black")
  text("NEXT ->", tx, ty); 
  
  if(mouse &&  collideRectCircle(rx, ry, 150, 150, mouseX, mouseY, 10)){
    screenNumber++;
    mouse = false;
  }
}

function backButton(rx, ry, tx, ty){
  noFill();
  rect(rx,ry,150,150);
  textSize(24);
  fill("Black")
  text("<- BACK", tx, ty); 
  
  if(mouse &&  collideRectCircle(50, 700, 150, 150, mouseX, mouseY, 10)){
    screenNumber--;
    mouse = false;
  }
}

function characterMove()
{
  
  if (keyIsDown(LEFT_ARROW))
    {
      if(characterPosX > 10){
        characterPosX -=characterSpeed;
      }
    }
  if (keyIsDown(RIGHT_ARROW))
    {
      if(characterPosX<750){
        characterPosX +=characterSpeed;
      }
    }
  //if statement for when character is off the ground and not on a platform he falls with gravity
  if (characterPosY < 722 && isOnPlatform == false)
    {
      characterPosY += 9.8
    }
  
}
function keyPressed()
{
  if (keyCode==UP_ARROW)
    { 
      if(characterPosY>80){
        characterPosY -=100;
      }
    }
}
  
class PowerUpMasks
  {
    constructor()
    {
      this.choice = round(random(1,2));
      this.maskOnPlatform = false;
      this.x = random(50, width)
      this.y = 770;
      this.h = 30;
      this.w = 30;
      this.placeMasks();
      
    }
    
    placeMasks()
    {
      console.log("choice: "+ this.choice);
      
      if (this.choice == 1)
        {
          this.x = random(50, width)
          this.y = 770;
          console.log(this.x + " " + this.y);
          
        }
      else if (this.choice ==2)
        {
          this.padel = round (random(3));
          this.x = random (padels[this.padel].x, padels[this.padel].length);
          this.y = padelsY[this.padel] - this.h;
          //      this. x = random(padels[i].x, padels[i].length)
          //      this.y = padels[i].y - 30;
          //      this.holder = i;
          //    console.log(this.x + " " + this.y)
          this.maskOnPlatform = true;
          console.log(this.x + " " + this.y);
          // }
        }
      else
        {
          console.log("Not a valid number")
        }
    }
    
    draw()
    {
      image(maskPowerUp, this.x, this.y, this.w,this.h);
      
    }
    
    move()
    {
      if (this.maskOnPlatform == true)
        {
          this.x = padels[this.padel].x;
          
        }
      if (this.x < -50)
        {
          this.reset();
        }
      
    }
    reset()
    {
     
      
          currentMask = new PowerUpMasks();
       
      
    }
    
    checkCollision()
    {
     hasMaskPowerUp = collideRectRect(characterPosX,characterPosY, 50,80, this.x, this.y, this.w, this.h)
    //isOnPlatform = collideLineRect(this.x, this.y,this.length, this.y, characterPosX, characterPosY, 50, 80)
   
    if (hasMaskPowerUp== true)
      {
        characterSpeed ++;
        this.x = -900;
        this.reset();
      }
    }
  }

function zombieMove()
{
  console.log(zX);
  if (characterPosX >= zX - zW / 2 && characterPosX <= zX + zW / 2 && characterPosY >= zY - zH / 2 && characterPosY <= zY + zH / 2) {
    lives -= 1;
    characterPosX = 400;
    characterPosY = 375;
  }
   if (zX > 720)
    {
      zDirection =-1;
    }
   else if(zX<0){
    zDirection = 1;
  }
   zX = zX + (zSpeed * zDirection)
  if(level2Start){
    if (characterPosX >= z2x - zW / 2 && characterPosX <= z2x + zW / 2 && characterPosY >= z2y - zH / 2 && characterPosY <= z2y + zH / 2) {
      lives -= 1;
      characterPosX = 400;
      characterPosY = 375;
    }
    if (z2x > 720)
    {
      z2Direction = -1;
    }
    else if(z2x < 0){
      z2Direction = 1;
    }
    z2x = z2x + (z2Speed * z2Direction)
  }
  
}
class PowerUpSanitizer
  {
    constructor()
    {
      this.choice = round(random(1,2));
      this.SanitizerOnPlatform = false;
      this.x = random(50, width)
      this.y = 770;
      this.h = 70;
      this.w = 70;
      this.placeSanitizer();
    }
    
    placeSanitizer()
    {
      console.log("choice: "+ this.choice);
      
      if (this.choice == 1)
        {
          this.x = random(50, width)
          this.y = height - this.h;
          console.log(this.x + " " + this.y);
          
        }
      else if (this.choice ==2)
        {
          this.padel = round (random(3));
          this.x = random (padels[this.padel].x, padels[this.padel].length);
          this.y = padelsY[this.padel] - this.h;
          //      this. x = random(padels[i].x, padels[i].length)
          //      this.y = padels[i].y - 30;
          //      this.holder = i;
          //    console.log(this.x + " " + this.y)
          this.sanitizerOnPlatform = true;
          console.log(this.x + " " + this.y);
          // }
        }
      else
        {
          console.log("Not a valid number")
        }
    }
    
    draw()
    {
      image(sanitizerPowerUp, this.x, this.y, this.w,this.h);
      
    }
    
    move()
    {
      if (this.sanitizerOnPlatform == true)
        {
          this.x = padels[this.padel].x;
          
        }
      if (this.x < -50)
        {
          this.reset();
        }
      
    }
    reset()
    {
     
      
          currentSanitizer = new PowerUpSanitizer();
       
      
    }
    
    checkCollision()
    {
     hasSanitizerPowerUp = collideRectRect(characterPosX,characterPosY, 50,80, this.x, this.y, this.w, this.h)
    //isOnPlatform = collideLineRect(this.x, this.y,this.length, this.y, characterPosX, characterPosY, 50, 80)
   
    if (hasSanitizerPowerUp== true)
      {
        score+=2
        this.reset();
      }
    }
  }

function gameOver(){
  level1Start = false;
  level2Start = false;
  background("White");
  noFill();
  noStroke();
  rect(350,650,150,150);
  textSize(32);
  fill("Black")
  text("Retry!", 400,700); 
  textSize(50);
  text('GAME OVER', 400,400);
  
  if(mouse &&  collideRectCircle(350,650, 150, 150, mouseX, mouseY, 10)){
    screenNumber = prevScreen;
    mouse = false;
  }
}
function win(){
  level1Start = false;
  level2Start = false;
  background("White");
  noFill();
  noStroke();
  
  rect(50,700,150,150);
  textSize(30);
  fill("Black")
  text("Play Level Again", 150,750); 
  textSize(50);
  text('You Won!', 400,400);
  
  if(mouse &&  collideRectCircle(50, 700, 150, 150, mouseX, mouseY, 10)){
    screenNumber = prevScreen;
    mouse = false;
  }
  
  if(prevScreen == 7){
    noFill();
    rect(650,700,150,150);
    textSize(30);
    fill("Black")
    text("Level 2", 700, 750); 

    if(mouse &&  collideRectCircle(650, 700, 150, 150, mouseX, mouseY, 10)){
      screenNumber = 8;
      mouse = false;
    }
  }
  
}