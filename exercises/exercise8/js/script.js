/*****************

Exercise 8
Cassie Smith CART 253a
Fall 2018

Introduction to Spoon Theory game.
Explains spoon theory to player with some
visual interactivity.

******************/

// Track the canvas element
var canvas;
// Track the width to height ratio of the canvas
var canvasRatio;

// Variable to hold image of spoon
var spoonImage;

// Variables to hold fonts
var titleFont;
var cubicFont;

// preload()
//
// Preloads images and fonts

function preload() {
  spoonImage = loadImage("assets/images/spoon.png"); // Image of a spoon
  cubicFont = loadFont("assets/fonts/cubic.ttf"); // "Cubic" font
}


// setup()
//
// Description of setup

function setup() {
  // Create canvas the size of window
  canvas = createCanvas(windowWidth,windowHeight);
  // Style it to sit behind main HTML with no scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");

  // Set the main title font to "Cubic"
  titleFont = cubicFont;
}


// draw()
//
// Description of draw()

function draw() {
  background(255);
  drawBackground();
}

// drawBackground()
//
// Draw a background of alternating black and grey squares
function drawBackground() {
  rectMode(CORNER);

  // Variables to handle color alternation
  var a = 0;
  var b = 50;
  var c = 0;

  var size = 50;
  var x = 0;
  var y = 0;
  var numSquares = width / size; // total squares per row
  var numRows = height / size; // total rows of squares
  var s; // counter for number of squares
  var r; // counter for number of rows

  // Draw rows of squares until canvas is covered
  for (r = 0; r <= numRows; r++) {
    // Fill each row with alternating colored squares
    for (s = 0; s <= numSquares; s++) {
      if (s % 2 === 1) {
        color = a;
      }
      else {
        color = b;
      }

      fill(color);
      rect(x,y,size,size);
      x += size;
    }
    // Switch color order to create checkered pattern
    a = b;
    b = c;
    c = a;
    // Reset x position and move down to y position of next row
    y += size;
    x = 0;
  }
}

// windowResized()
//
// Called whenever window is resized
function windowResized() {
  // Resize the canvas whenever the window is resized
  resizeCanvas(windowWidth,windowHeight);
}
