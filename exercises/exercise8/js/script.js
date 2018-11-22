/*****************

Exercise 8
Cassie Smith CART 253a
Fall 2018

Introduction to Spoon Theory game.
Explains spoon theory to player with some
visual interactivity.

******************/

// Variable to hold image of spoon
var spoonImage;

// Variable to hold main font
var titleFont;

// preload()
//
// Preloads images and fonts

function preload() {
  spoonImage = loadImage("assets/images/spoon.png"); // image of a spoon

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
