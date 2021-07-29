// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,key,translate,scale,
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width,
 *    frameRate, stroke, noFill, keyCode, UP_ARROW, DOWN_ARROW,image,ml5, strokeWeight,
 *    RIGHT_ARROW, LEFT_ARROW, fill, collideRectRect, noLoop, loop, isLooping, textSize, redraw, createCapture, VIDEO, textAlign,CENTER,line,
 */



let brain;

function setup() {
  createCanvas(640, 480);
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  brain.loadData('RLBNU.json', dataReady);
}

function dataReady() {
  brain.normalizeData();
  brain.train({epochs: 50}, finished); 
}

function finished() {
  console.log('model trained');
  brain.save();
}

