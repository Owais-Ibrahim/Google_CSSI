// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,key,translate,scale,push, pop
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width,delayTime,second,millis,createWriter,
 *    frameRate, stroke, noFill, keyCode, UP_ARROW, DOWN_ARROW,image,ml5, strokeWeight,abs,
 *    RIGHT_ARROW, LEFT_ARROW, fill, collideRectRect, noLoop, loop, isLooping, textSize, redraw, createCapture, VIDEO, textAlign,CENTER,line,
 */



let video;
let poseNet;
let pose;
let skeleton;
let brain;
let poseLabel = '';
let poses = ["RIGHTJAB", "LEFTJAB", "BLOCK", "NORMAL"];
let count = [0,0,0,0];
let start = false;
let over = false;
let index = 0;
let score = 0;


function setup() {
  createCanvas(700, 500);
  
  // Capture video and load model into neural network to load the ml model into the pipeline
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'https://cdn.glitch.com/fb3aed81-ae59-4732-9626-788a692053aa%2Fmodel.weights.bin?v=1627575540958',
  };
  brain.load(modelInfo, brainLoaded);

}


function draw() {
  background(255);
  
  // Drawing image and dots on the image
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
  pop();
  
   //We load text instructions
  text("Press S to start and Q to quit!",0,20);
  text("You will be given random poses to make and if done correctly you will gain points!",0,40);
  //if the game is started 
  text("You will be given random poses to make and if done correctly you will gain points!",0,40);
  text(`You have to do a: ${poses[index]}`,0,60 );
  
  if(start && !over){
    if (poseLabel == poses[index]){
      score++;
      count[index]++;
      index = round(random(0,3));
    }
  }
  else if (over){
    stroke(0);
    textSize(30);
    background(255);
    text("GAME OVER",250, 250);
    noStroke();
    textSize(0);
    poseLabel = '';
    quitGame();
  }
  

  text(poseLabel, 150, 100);
}


function keyPressed() {
 if (key == 's') {
    start = true;
  }
  else if (key == 'q'){
    over = true;
  }
}


function quitGame(){
  noLoop();
  let writer = createWriter ('progress.txt')
  writer.write("Must've had a fun workout! Congrats! \nYou scored: " + score+"\n");
  for(let i  = 0; i<poses.length; i++){
    writer.write(poses[i]+": "+count[i]+"\n");
  }
  writer.close();
}



/*Loading model and classifying*/
function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  // console.log(results[0].confidence);
  classifyPose();
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}
