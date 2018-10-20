// Pong
// Cassie Smith
// CART 253a - October 2018
//
// Starter code by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.

////////////////// NEW /////////////////

// Background colors
var bgBlue = 127;
var bgGreen = 0;
var bgRed = 0;
var over = true;
/////////////// END NEW /////////////////

// BALL

// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 40,
  vx: 0,
  vy: 0,
  speed: 5,
  ////////////////// NEW ///////////////////
  color: 255,
  image: ""
  //////////////// END NEW /////////////////
}

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 50,
  h: 50,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S

  /////////////////// NEW /////////////////////
  score: 0, // Track points
  image: ""
  ///////////////// END NEW ///////////////////

}

// RIGHT PADDLE

// Basic definition of a right paddle object with its key properties of
// position, size, velocity, and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 50,
  h: 50,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW

  //////////////////// NEW ///////////////////
  score: 0, // Track points
  image: ""
  ///////////////// END NEW //////////////////
}

// A variable to hold the beep sound we will play on bouncing
var beepSFX;

// preload()
//
// Loads the beep audio for the sound of bouncing
// And images for ball and paddles (sun, moon, earth)
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  ball.image = loadImage("assets/images/earth.png"); // the earth
  leftPaddle.image = loadImage("assets/images/sun.png"); // the sun
  rightPaddle.image = loadImage("assets/images/moon.png"); // the moon
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640,480);
  rectMode(CENTER);
  noStroke();

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;
}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  //////////////// NEW /////////////////
  background(bgRed,bgGreen,bgBlue);
  ///////////// END NEW /////////////////
  if (over === false){
  // Handle input
  // Notice how we're using the SAME FUNCTION to handle the input
  // for the two paddles!
  handleInput(leftPaddle);
  handleInput(rightPaddle);

  // Update positions of all objects
  // Notice how we're using the SAME FUNCTION to handle the input
  // for all three objects!
  updatePosition(leftPaddle);
  updatePosition(rightPaddle);
  updatePosition(ball);

  // Handle collisions
  handleBallWallCollision();
  handleBallPaddleCollision(leftPaddle);
  handleBallPaddleCollision(rightPaddle);

  // Handle the ball going off screen
  handleBallOffScreen();
}
else {
  gameOver();
}
  // Display the paddles and ball
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}


// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    //beepSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      //beepSFX.play();
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball going off the sides
  if (ballRight < 0 || ballLeft > width) {

    /////////////////// NEW //////////////////////

    // If ball goes off side of screen, increase score of appropriate paddle
    // Reset ball

    // If ball goes off left side of screen
    if (ballRight < 0) {
      // Increase score of right paddle
      rightPaddle.score ++;
      rightPaddle.justScored = true;
      leftPaddle.justScored = false;
      console.log("Right paddle score: " + rightPaddle.score);
    }
    // If ball goes off right side of screen
    else if (ballLeft > width) {
      // Increase score of left paddle
      leftPaddle.score ++;
      leftPaddle.justScored = true;
      rightPaddle.justScored = false;
      console.log("Left paddle score: " + leftPaddle.score);
    }

    // Update paddle display as score changes
    displayScore(leftPaddle);
    displayScore(rightPaddle);
    // Reset ball position and velocity
    ballReset();

    //////////////// END NEW //////////////////
  }
}

///////////////// NEW ///////////////////

// ballReset()
//
// Reset ball to center when a point is scored
// Send ball towards paddle that just scored at a random y velocity
function ballReset() {
  // Reset ball to center of canvas
  ball.x = width/2;
  ball.y = height/2;
  // If right paddle scores
  if (rightPaddle.justScored) {
    // Launch ball towards right paddle with random y velocity
    ball.vx = ball.speed;
    ball.vy = random(-5,5);
  }
  // If left paddle scores
  else if (leftPaddle.justScored) {
    // Launch ball towards left paddle with random y velocity
    ball.vx = -ball.speed;
    ball.vy = random(-5,5);
  }
}

// displayScore()
//
// Changes color of background as score increases
 function displayScore(paddle) {
   // if the moon scores, darken background towards night
   if (rightPaddle.justScored){
     bgBlue = constrain(bgBlue-=10,0,255);
   }
   // if the sun scores, brighten background towards day
   else if (leftPaddle.justScored) {
     bgBlue = constrain(bgBlue+=10,0,255);
   }
   console.log ("Moon score: " + rightPaddle.score);
   console.log("Sun score: " + leftPaddle.score);
   console.log("Blue: " + bgBlue);
}


///////////////// END NEW ///////////////////

// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {

  ////////////////// NEW /////////////////////
  image(ball.image,ball.x,ball.y,ball.size,ball.size);
  //////////////// END NEW //////////////////
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
  ////////////////// NEW ////////////////////
  imageMode(CENTER);
  image(paddle.image,paddle.x,paddle.y,paddle.w,paddle.h);
  //////////////// END NEW //////////////////
}

// gameOver()
//
// Display if player wins the game by attaining enough points
// to turn background into night or day
function gameOver() {
  if (bgBlue === 0) {
    leftPaddle.speed = 0;
    leftPaddle.y = height + 100;
    rightPaddle.speed = 0;
    rightPaddle.y = height/2;
    ball.speed = 0;
    ball.x = width/2;
    ball.y = width/2;
    stars();
  }
  else if (bgBlue === 255) {
    leftPaddle.speed = 0;
    leftPaddle.y = height/2;
    rightPaddle.speed = 0;
    rightPaddle.y = height + 100;
    ball.speed = 0;
    ball.x = width/2;
    ball.y = width/2;
    stars();
  }
}

function stars() {
  background(0);
  fill(255);
  frameRate(10);
  var i;
  for (i = 0; i < 70; i++) {
    var x = random(0,width);
    var y = random(0,height);
    var w = 2;
    var h = 2;
    ellipse(x,y,w,h);
    console.log("yes");
  }
}

function bird() {

}
