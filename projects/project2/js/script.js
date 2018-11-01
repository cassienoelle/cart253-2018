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
var note;

// Variables to contain images
var ballImage;
var noteImages = [];
var note1;
var note2;
var note3;
var note4;
var note5;
var note6;

// preload()
//
// Loads images
function preload() {
  ballImage = loadImage('assets/images/record.png'); // the ball is a record
  note1 = loadImage('assets/images/note1.png'); // eighth note
  note2 = loadImage('assets/images/note2.png'); // quarter notes
  note3 = loadImage('assets/images/note3.png'); // half note
  note4 = loadImage('assets/images/note4.png'); // quarter rest
  note5 = loadImage('assets/images/note5.png'); // treble clef
  note6 = loadImage('assets/images/note6.png'); // bass clef
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(800,650);
  noStroke();

  // Create a ball
  ball = new Ball(ballImage,width/2,height/2,5,5,50,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);

  note = new Note(note1,0,0,18,30,3,3);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(255);

  //freeze();
  slow();

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  note.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  //ball.display();

  leftPaddle.display();
  rightPaddle.display();
  ball.display();
  note.display();
}

// freeze()
//
// freezes movement of objects on screen
function freeze() {
  ball.freeze();
  leftPaddle.freeze();
  rightPaddle.freeze();
  note.freeze();
}

// slow()
//
// freezes movement of objects on screen
function slow() {
  ball.slow();
  leftPaddle.slow();
  rightPaddle.slow();
  note.slow();
}
