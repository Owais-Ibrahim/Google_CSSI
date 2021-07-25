// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, storeItem, getItem, removeItem*/

let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit,pause,fillColor,streak, hitTime, elapsedTime,circleDiameter,highestScore, highestStreak, topStreak ;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  fillColor = color(random(360), random(360), random(360));
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width-20);
  coinY = random(height-20);
  score = 0;
  time = 1000;
  if(getItem('highestScore') == null){
    storeItem('highestScore', 0)
  }
  highestScore = getItem('highestScore');
  highestStreak = getItem('highestStreak');
  if(highestStreak == null){
    storeItem('highestStreak', 0)
  }
  hitTime = 0;
  streak = 0;
  topStreak = 0; //current game highest streak
  elapsedTime = 0;
  
  circleDiameter = 20;
  gameIsOver = false;
  pause = false;
  hit=false;
  
}

function draw() {
  background(backgroundColor);
  fill(fillColor);
  ellipse(coinX, coinY, 20);
  fill("white");
  ellipse(mouseX, mouseY, circleDiameter);
  fill('black');
  text(`Score: ${score}`,20,20);
  text(`Time remaining: ${time}`, 20, 40);
  text(`Streak:  ${streak}`, 290, 20);
  text(`Highest Score:  ${highestScore}`, 290, 40);
  text(`Highest Streak:  ${highestStreak}`, 290, 60);

  text(`Press P to pause and resume`, 20, 60);
  text(`Press R to reset`, 20, 80);
  
  handleTime();
  handleCollision();
  if(gameIsOver){
    text("GameOver", 20, 100);
  }
}

//Streak Functionality

function keyPressed(){
  //P key for pause and resume
  if(keyCode==80){
    //if playing then pause and set to pause
    if(pause==false){
      noLoop();
      pause = true;
    }
    else{
      pause = false;
      loop();
    }
  }
  //R key 
  if(keyCode == 82){
    setup();
    loop(); //If paused and restarted we need to loop again
  }
}
  

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  hit = collideCircleCircle(mouseX,mouseY,20,coinX,coinY, 20);
  if(hit && time>0){
    //if we are scoring
    if(score>=1){
      
      elapsedTime = hitTime - time;
      handleStreaks();
    }
    score++;
    fillColor = color(random(360), random(360), random(360));
    coinX = random(width-20);
    coinY = random(height-20);
    hitTime = time;
    
  }
  
}

function handleTime() {
  // We'll write code to handle the time.
  if(time>0){
    time--;
  }
  else{
    gameIsOver = true;
    if(score>highestScore){
      storeItem('highestScore', score);
    }
    if (topStreak > highestStreak){
      storeItem('highestStreak', topStreak);
    }
  }
}

function handleStreaks(){
  if(elapsedTime<40){//30
    streak++;
    time +=6 ; //incrementing by 5 because of one decrement
    circleDiameter += 2; 
  }
  if(elapsedTime>40 && streak >0){
    streak = 0;
    circleDiameter = 20;
  }
  if (streak > topStreak){
    topStreak = streak;
  }
}

