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
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  switch (ball.isOffScreen()) {
    case 1:
      leftPaddle.points ++;
      ball.vx = -ball.vx;
      ball.reset();
      break;

    case 2:
      rightPaddle.points ++;
      ball.vx = -ball.vx;
      ball.reset();
      break;

    default:
      break;
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
