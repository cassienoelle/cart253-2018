/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(1000,1000);
}


// draw()
//
// Description of draw()

function draw() {
  background(255);
  drawBackground();
}

function drawBackground() {
  rectMode(CORNER);
  var color = 255;
  var size = 50;
  var x = 0;
  var y = 0;
  var numSquares = width / size;
  var numLines = height / size;

  for (i = 0; i <= numSquares; i++) {
    fill(color);
    rect(x,y,size,size);
    i++;
    x += size;

    if (i % 2 === 1) {
      color = 0;
    }
    else {
      color = 255;
    }
  }
}
