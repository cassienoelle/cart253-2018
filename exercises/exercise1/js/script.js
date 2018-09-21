// Exercise 1 - Moving pictures
// Cassie Smith
// 18 September 2018 - CART 253b
//
// Starter code for exercise 1 by Pippin Barr.
// It moves six pictures around on the canvas.
// One moves linearly down the screen.
// Two move in tandem across the screen from left to right.
// Two move toward the mouse cursor, at different rates.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The yellow circle
var yellowCircle;
var yellowCircleW;
var yellowCircleH;
// The current position of the yellow circle;
var yellowCircleX;
var yellowCircleY;

// The image of an elephant
var elephantImage;
// The current position of the elephant
var elephantImageX;
var elephantImageY;

// The image of the pigeon
var pigeonImage;
// The current position of the pigeon
var pigeonImageX;
var pigeonImageY;

// The image of the nudibranch
var nudibranchImage;
// The current position of the nudibranch
var nudibranchImageX;
var nudibranchImageY;


// preload()
//
// Load the five images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  elephantImage = loadImage("assets/images/elephant.png");
  pigeonImage = loadImage("assets/images/pigeon.png");
  nudibranchImage = loadImage("assets/images/nudibranch.png");
}


// setup()
//
// Set up the canvas, the yellow circle shape, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the elephant image at the bottom left of the canvas
  elephantImageX = elephantImage.width/2;
  elephantImageY = height - elephantImage.height/2;

  // Set yellow circle proportional to width of elephant image
  yellowCircleW = elephantImage.width;
  yellowCircleH = yellowCircleW;
  // Start yellow circle behind elephant at bottom left of the canvas
  yellowCircleX = elephantImageX;
  yellowCircleY = height - elephantImageX;

  // Start the nudibranch image at the bottom right of the canvas
  nudibranchImageX = width - nudibranchImage.width/2;
  nudibranchImageY = height - nudibranchImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 0.7;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistanceClown = mouseX - clownImageX;
  var yDistanceClown = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistanceClown/10;
  clownImageY = clownImageY + yDistanceClown/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  // Move the yellow circle left to right by increasing its x position
  yellowCircleX += 1;
  // Set circle fill to yellow with no stroke
  noStroke();
  fill(253,231,85);

  // Display the yellow circle
  yellowCircle = ellipse(yellowCircleX,yellowCircleY,yellowCircleW,yellowCircleH);

  // Move the elephant image left to right by increasing its x position
  elephantImageX += 1;

  // Display the elephant image
  image(elephantImage,elephantImageX,elephantImageY);

  // Display the pigeon at current mouse position and move with mouse
  pigeonImageX = mouseX;
  pigeonImageY = mouseY;
  image(pigeonImage,pigeonImageX,pigeonImageY);

  // Move the nudibranch by moving it 1/80th of its current distance from the mouse

  // Calculate the distance in X and Y
  var xDistanceNudibranch = mouseX - nudibranchImageX;
  var yDistanceNudibranch = mouseY - nudibranchImageY;
  // Add 1/80th of the x and y distance to the clown's current (x,y) location
  nudibranchImageX = nudibranchImageX + xDistanceNudibranch/80;
  nudibranchImageY = nudibranchImageY + yDistanceNudibranch/80;

  // Display the nudibranch image
  image(nudibranchImage,nudibranchImageX,nudibranchImageY);


}
