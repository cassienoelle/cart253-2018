/*****************

Exercise 8
Cassie Smith CART 253a
Fall 2018

Prototype for an interactive story /
Choose your own adventure game 

******************/

/////// Code taken from Pippin's lecture ///////

// Track the canvas element
var canvas;
// Track the width to height ratio of the canvas
var canvasRatio;

//////////////////// End ////////////////////////

// preload()
//
// Preloads images and fonts
function preload() {

}

// setup()
//
// Sets up canvas

function setup() {
  /////// Code taken from Pippin's lecture ///////

  // Create canvas the size of window
  canvas = createCanvas(windowWidth,windowHeight);
  // Style it to sit behind main HTML with no scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");

  //////////////////// End ////////////////////////

}


// draw()
//
// Draws shapes and text on canvas

function draw() {
  background(255); // The background is white

}

/////// Code taken from Pippin's lecture ///////

// windowResized()
//
// Called whenever window is resized
function windowResized() {
  // Resize the canvas whenever the window is resized
  resizeCanvas(windowWidth,windowHeight);
}

//////////////////// End ////////////////////////
