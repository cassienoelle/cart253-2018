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

// Background color
var c = 255;

// Variables to hold door objects
var doorOne;
var doorTwo;
// Tracks which door has been chosen
var chosenDoor;

// Main font
var mainFont;
// Narrative text
var narration;
var narrationX;
var narrationY;

// preload()
//
// Preloads images and fonts
function preload() {
  mainFont = loadFont("assets/fonts/cubic.ttf");
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

  // Divide the canvas into intervals of 16
  var i = width/16;
  // Create two doors, centered horizontally
  // on each half of the canvas
  doorOne = new Door(i * 2,height/16,width/4,2);
  doorTwo = new Door(i * 10,height/16,width/4,2);

  // Set narrative text and style
  narration = "choose a door";
  narrationX = width/2;
  narrationY = height - ((doorOne.y + doorOne.h)/2);
  textSize(40);
  textFont(mainFont);
  textAlign(CENTER);
}


// draw()
//
// Draws shapes and text on canvas

function draw() {
  background(c); // The background is white

  switch (chosenDoor) {
    case 1:
      // If door one is chosen, open it and enter
      doorOne.open();
      doorOne.enter();
      doorOne.display();
      break;
    case 2:
      // If door two is chosen, open it and enter
      doorTwo.open();
      doorTwo.enter();
      doorTwo.display();
      break;
    default:
      // If neither door is chosen
      // display both closed doors
      doorOne.display();
      doorTwo.display();
      text(narration,narrationX,narrationY);
      break;
  }

}

// mouseClicked()
//
// Tracks whether mouse as been clicked
function mouseClicked() {
  // Check if door one has been clicked
  if (doorOne.isChosen()) {
    chosenDoor = 1;
  }
  else if (doorTwo.isChosen()) {
    chosenDoor = 2;
  }
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
