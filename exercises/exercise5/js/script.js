// Basic OO Pong
// Cassie Smith
// CART 253a - October 2018
//
// Starter code by Pippin Barr
//
// A simple version of Pong as a battle between day and night
// Paddles are the sun and moon, ball is the earth
// As each player scores the background brightens or darkens
// until day or night is achieved.
//
// Written with JavaScript OOP.

///////////////// NEW ///////////////////

// Array to manage background color
// Ranges from pale blue to dark blue (day to night)
// Index increases or decreases depending on which paddle scores
var backgroundColor = [
  "#abdefc", // day
  "#97cdff",
  "#6fbaff",
  "#51abff",
  "#3da1ff",
  "#2395ff",
  "#0587ff",
  "#057ae8",
  "#046ac9", // default activeColor
  "#035db0",
  "#03539d",
  "#034a8c",
  "#024079",
  "#02325f",
  "#012649",
  "#011a32",
  "#01101e" // night
];
var activeColor = 8; // corresponds to backgroundColor[] index

/////////////////// END NEW ////////////////

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

///////////////// NEW ///////////////////

// Variable to contain Cloud objects
var clouds = [];

// Variables to hold images of ball and paddles
var ballImage;
var leftPaddleImage;
var rightPaddleImage;
var cloudImage;

// Variable to track whether game is over
var gameIsOver = false;


// preload()
//
// Loads images for ball and paddles
function preload() {
  ballImage = loadImage("assets/images/earth.png"); // the earth
  leftPaddleImage = loadImage("assets/images/sun.png"); // the sun
  rightPaddleImage = loadImage("assets/images/moon.png"); // the moon
  cloudImage = loadImage("assets/images/cloud.png"); //a cloud
}
////////////////// END NEW /////////////////

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

  ///////////////// NEW ///////////////////

  background(backgroundColor[activeColor]);

  if (!gameIsOver) {
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
  else {
    gameOver();
  }

  ////////////////// END NEW /////////////////

}

/////////////////// NEW ///////////////////////

// points()
//
// Tracks points when ball goes off screen
// Updates interface accordingly
function points() {
  if (ball.isOffScreen() === 1) {
    // Ball goes off left of screen
    // Darken background towards night by increasing array index
    // Increase right paddle points
    activeColor ++;
    rightPaddle.points ++;
      }
  else if (ball.isOffScreen() === 2) {
    // Ball goes off right of screen
    // Lighten background towards day by decreasing array index
    // Increase left paddle points
    activeColor --;
    leftPaddle.points ++;
    }

  // Game over if either paddle gains maximum points
  // by moving through backgroundColor array (achieving day or night)
  if (activeColor === 0 || activeColor === backgroundColor.length - 1) {
    gameIsOver = true;
  }
}

// gameOver()
//
// Calculates which player won and sets display accordingly
function gameOver() {
  ball.freeze();
  console.log('left: ' + leftPaddle.points);
  console.log('right: ' + rightPaddle.points);

  if (rightPaddle.points > leftPaddle.points) {
    // Right paddle wins, nighttime achieved
    night();
    rightPaddle.win();
    rightPaddle.display();
  }
  else if (leftPaddle.points > rightPaddle.points) {
    // Left paddle wins, daytime achieved
    daytime();
    leftPaddle.win();
    leftPaddle.display();
  }
  ball.display();
}

// night()
//
// Displays twinkling stars if right paddle wins game
function night() {
  fill(255);
  frameRate(10);
  var i;
  for (i = 0; i < 70; i++) {
    var x = random(0,width);
    var y = random(0,height);
    var d = 2;
    ellipse(x,y,d,d);
  }
}

// daytime()
//
// Displays drifting clouds if left paddle wins
function daytime() {
  var w,h,x,y,vx;
  for (var i = 0; i < 4; i++) {
    w = random(70,120);
    h = w * 0.6;
    x = 0;
    y = random(0 + h, height - h);
    vx = random(0.5,2);
    clouds.push(new Cloud(cloudImage,x,y,w,h,vx));
    clouds[i].drift();
    clouds[i].display();
  }
}

//////////////////// END NEW //////////////////
