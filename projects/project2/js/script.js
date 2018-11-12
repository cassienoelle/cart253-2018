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

// Variable to contain the canvas
var canvas;
var canvasX;
var canvasY;
// Variables to contain images
var spiralImage;
var bottle;
var bottleImage;
var cake;
var cakeImage;
var door;
var doorImage;

var musicalsFont;

// Array to contain title text for intro
var titleText;
var titleTextBottom;

// Variable to track the state of the game
// Used to manage switch statement in draw()
var state = "INTRO";
var spacePressed;

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// preload()
//
// Preloads images
function preload() {
  spiralImage = loadImage("assets/images/spiral.png"); // spiral gif
  bottleImage = loadImage("assets/images/bottle.png"); // image of a bottle
  cakeImage = loadImage("assets/images/cake.png"); // image of a fruitcake
  doorImage = loadImage("assets/images/door.png"); // image of a door with keyhole

  musicalsFont = loadFont("assets/fonts/musicals.ttf");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  canvas = createCanvas(800, 600);
  centerCanvas();
  noStroke();
  imageMode(CENTER);

  setupIntro();
  setupGame()
}

// setupIntro ()
//
// Sets up introductory titles and instructions
function setupIntro() {
  // Position title objects in center of the spiral
  bottle = new Title(bottleImage,width/2,height/2,250);
  cake = new Title(cakeImage,width/2,height/2,250);
  door = new Title(doorImage,width/2,height/2,250);

  fill(231,21,0);
  textAlign(CENTER);
  textSize(40);
  textFont(musicalsFont);

  spacePressed = 0;
}

// setupGame()
//
// Sets up main game interface
// Creates ball and paddles
function setupGame() {
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {

  switch(state) {
    case "INTRO":
      gameTitles();
      break;
    case "ACTIVE":
      gameActive();
      break;
    case "OVER":
      gameOver();
      break;
  }
}

// gameTitles()
//
// Intro screen
// Display game titles and instructions
function gameTitles() {
  background(0);
  image(spiralImage,width/2,height/2,800,600);
  push();
  stroke(255);
  strokeWeight(5);
  text(titleText,width/2, 100);
  text(titleTextBottom,width/2,height-75);
  pop();
  console.log(spacePressed);

  if (!bottle.shrunk && !cake.shrunk) {
    bottle.display();
    titleText = "WELCOME TO PONG IN WONDERLAND";
    titleTextBottom = "HIT SPACE TO CONTINUE";
  }
  else if (bottle.shrunk && !cake.shrunk) {
    cake.display();
    titleText = "MORE INSTRUCTIONS";
    titleTextBottom = "HIT SPACE TO CONTINUE";
  }
  else {
    door.display();
    titleText = "PLAY NOW";
    titleTextBottom = "HIT SPACE TO GO DOWN THE RABBIT HOLE";
  }

  switch(spacePressed) {
    case 1:
      bottle.shrink();
      break;
    case 2:
      cake.shrink();
      break;
    case 3:
      door.grow();
      break;
    default:
      break;
  }
}

function keyTyped() {
  if (key === " ") {
    spacePressed ++;
  }
}
// gameActive()
//
// Main gameplay
function gameActive() {
  background(0);
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}

// gameOver()
//
// End game and display final score
function gameOver() {

}

// centerCanvas()
//
// Centers the canvas on the screen
function centerCanvas() {
  canvasX = (windowWidth - width)/2;
  canvasY = (windowHeight - height)/2;
  canvas.position(canvasX,canvasY);
}

// windowResized()
//
// Resize the canvas when the window is resized
function windowResized() {
  centerCanvas();
}
