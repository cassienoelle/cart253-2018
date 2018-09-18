// Exercise 1 - Moving pictures
// Cassie Smith
// 18 September 2018 - CART 253b
//
// Starter code for exercise 1 by Pippin Barr.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


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

// The image of a pigeon
var pigeonImage;
// The current position of the pigeon
var pigeonImageX;
var pigeonImageY;


// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  elephantImage = loadImage("assets/images/elephant.png");
  pigeonImage = loadImage("assets/images/pigeon.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

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
  // Start yellow circle behind elephant at bottom left of canvas
  yellowCircleX = elephantImageX;
  yellowCircleY = height - elephantImageX;

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
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

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


}
