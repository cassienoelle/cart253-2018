// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Array to manage background color
// Pale to dark blue ranging from day to night
// Points tracking runs through array in either direction
// depending on which paddle scores
var backgroundColor = [
  "#abdefc", // day
  "#97cdff",
  "#6fbaff",
  "#51abff",
  "#3da1ff",
  "#2395ff",
  "#0587ff",
  "#057ae8",
  "#046ac9", // default
  "#035db0",
  "#03539d",
  "#034a8c",
  "#024079",
  "#02325f",
  "#012649",
  "#011a32",
  "#01101e" // night
];
var activeColor = 8; // default


// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// Variables to hold images of ball and paddles
var ballImage;
var leftPaddleImage;
var rightPaddleImage;

// preload()
//
// Loads images for ball and paddles
function preload() {
  ballImage = loadImage("assets/images/earth.png"); // the earth
  leftPaddleImage = loadImage("assets/images/sun.png"); // the sun
  rightPaddleImage = loadImage("assets/images/moon.png"); // the moon
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  imageMode(CENTER);
  // Create a ball
  ball = new Ball(ballImage,width/2,height/2,5,5,35,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(rightPaddleImage,width-50,height/2,50,50,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(leftPaddleImage,50,height/2,50,50,10,83,87);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(backgroundColor[activeColor]);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    points();
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}

// points()
//
// Tracks points when ball goes off screen
// Updates interface accordingly
function points() {
  if (ball.isOffScreen() === 1) {
    // Ball goes off left of screen, method returns a 1
    // Darken background towards night by increasing array index
    // Increase left paddle points
    activeColor ++;
    leftPaddle.points ++;
      }
    else if (ball.isOffScreen() === 2) {
    // Ball goes off right of screen, method returns a 2
    // Lighten background towards day by decreasing array index
    // Increase right paddle points
      activeColor --;
      rightPaddle.points ++;
    }

  // Game over if either paddle gains maximum points
  // by moving through backgroundColor array (achieving day or night)
  if (activeColor === 0 || activeColor === backgroundColor.length - 1) {
    gameOver();
  }
}
