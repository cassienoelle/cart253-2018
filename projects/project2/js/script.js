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
var whiteRabbit;
var whiteRabbitImage;
var mushrooms = [];
var numMushrooms = 10;
var mushroomImage;
var roseImage;
var redRoseImage;
var heartImage;

var musicalsFont;

// Array to contain title text for intro
var titleText;
var titleTextX;
var titleTextY;
var titleTextBottom;
var titleTextBottomX;
var titleTextBottomY;


// Variable to track the state of the game
// Used to manage switch statement in draw()
var state = "ACTIVE";
var spacePressed;
var gameTitle = "DEFAULT";
var displayTitle;
var activeCondition = "DEFAULT";

// Variable to contain the objects representing our ball and paddles
// and their parameters
var ball;
var ballImage;

var enemyBall;
var enemyBallImage;

var leftPaddle;
var rightPaddle;
var paddleWidth = 10;
var paddleHeight = 90;

// preload()
//
// Preloads images
function preload() {
  spiralImage = loadImage("assets/images/spiral.png"); // spiral gif
  roseImage = loadImage("assets/images/rose.png"); // image of a white rose
  redRoseImage = loadImage("assets/images/redrose.png"); // image of a red rose
  heartImage = loadImage("assets/images/heart.png"); // image of a red heart
  bottleImage = loadImage("assets/images/bottle.png"); // image of a bottle
  cakeImage = loadImage("assets/images/cake.png"); // image of a fruitcake
  doorImage = loadImage("assets/images/door.png"); // image of a door with keyhole
  whiteRabbitImage = loadImage("assets/images/whiterabbit.png"); // image of the White Rabbit
  mushroomImage = loadImage("assets/images/mushroom.png"); // image of a mushroom

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
  titleTextX = width/2;
  titleTextY = 100;
  titleTextBottomX = width/2;
  titleTextBottomY = height-75;

  spacePressed = 0;
}

// setupGame()
//
// Sets up main game interface
// Creates ball and paddles
function setupGame() {
  ballImage = roseImage;
  enemyBallImage = heartImage;
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,30,5,false);
  enemyBall = new Ball(width/4,height/4,5,5,35,5,true,enemyBallImage);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-20,height/2,paddleWidth,paddleHeight,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,paddleWidth,paddleHeight,10,83,87);

  for (var i = 0; i <= numMushrooms; i++) {
    mushrooms.push(new Mushroom(mushroomImage,ball.x,ball.y,random(-5,5),random(-5,5),30));
  }

  whiteRabbit = new Chaser(whiteRabbitImage,width/4,height/4,80,100,random(0,1000),random(0,1000),10);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {

  switch(state) {
    case "INTRO":
      //gameTitles();
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
  text(titleText,titleTextX,titleTextY);
  text(titleTextBottom,titleTextBottomX,titleTextBottomY);
  pop();

  if (spacePressed === 0) {
    bottle.display();
    titleText = "WELCOME TO PONG IN WONDERLAND";
    titleTextBottom = "HIT SPACE TO CONTINUE";
  }
  else if (spacePressed === 1) {
    bottle.shrink();

    if (!bottle.shrunk) {
      bottle.display();
      titleText = "WELCOME TO PONG IN WONDERLAND";
      titleTextBottom = "HIT SPACE TO CONTINUE";
    }
    else {
      cake.display();
      titleText = "MORE INSTRUCTIONS";
      titleTextBottom = "HIT SPACE TO CONTINUE";
    }

  }
  else if (spacePressed === 2) {
    cake.shrink();

    if (!cake.shrunk) {
      cake.display();
      titleText = "MORE INSTRUCTIONS";
      titleTextBottom = "HIT SPACE TO CONTINUE";
    }
    else {
      door.display();
      titleText = "PLAY NOW";
      titleTextBottom = "HIT SPACE TO GO DOWN THE RABBIT HOLE";
    }

  }
  else if (spacePressed === 3) {
    door.shrink();

    if (!door.shrunk) {
      door.display();
      titleText = "PLAY NOW";
      titleTextBottom = "HIT SPACE TO GO DOWN THE RABBIT HOLE";
    }
    else {
      state = "ACTIVE";
    }

  }

}

function keyTyped() {
  if (key === " ") {
    spacePressed ++;
    console.log(spacePressed);
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
  enemyBall.update();
  leftPaddle.update();
  rightPaddle.update();
  whiteRabbit.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  if (enemyBall.isOffScreen()) {
    if (activeCondition === "DEFAULT" || activeCondition === "SIZE") {
      enemyBall.reset();
    }
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);


  if (activeCondition === "DEFAULT") {
    if (enemyBall.handleCollision(leftPaddle)) {
      behead(leftPaddle);
    }
    if (enemyBall.handleCollision(rightPaddle)) {
      behead(rightPaddle);
    }

    // if white rabbit collides with ball
    if (whiteRabbit.collision(ball)){
      // change game conditions temporarily
      rush();
    }
  }

  narration();

  ball.display("SHAPE"); // display ball as shape
  enemyBall.display("IMAGE"); // display enemy ball as image
  leftPaddle.display();
  rightPaddle.display();
  whiteRabbit.display();

  // mushroomAttack();

}

// rush()
//
// Change behaviour of white rabbit and ball for 10 seconds
function rush() {
  activeCondition = "SPEED";
  // increase speed of ball
  ball.faster();
  // display descriptive text
  gameTitle = "WHITE RABBIT";
  displayTitle = true;
  // stop Perlin noise and move white rabbit quickly across screen
  whiteRabbit.fast = true;
  if (whiteRabbit.isOffScreen()) {
    whiteRabbit.reset();
  }
  // revert to original behaviour after 10 seconds
  setTimeout(textTimer,10000);
  setTimeout(speedTimer,10000);
}

// behead()
//
// Cut height of paddle in half for 20 seconds
function behead(paddle) {
  activeCondition = "SIZE";
  if (!paddle.shrunk) {
    paddle.shrink();

    gameTitle = "RED QUEEN";
    displayTitle = true;
    whiteRabbit.fast = true;     

    setTimeout(textTimer,20000);
    setTimeout(speedTimer,22000);
    setTimeout(sizeTimer,20000);
  }
}

// mushroomAttack()
//
// Release mushrooms at random velocities from the location of the ball
// If a mushroom collides with a paddle, the paddle shrinks
function mushroomAttack() {
  for (var i = 0; i < numMushrooms; i++) {
    mushrooms[i].update();
    mushrooms[i].display();

    if (mushrooms[i].handleCollision(rightPaddle)) {
      rightPaddle.grow();
    }
    else if (mushrooms[i].handleCollision(leftPaddle)) {
      leftPaddle.grow();
    }
  }
}

// narration()
//
// Handles title text display during active game play
function narration() {
  if (displayTitle) {
    switch (gameTitle) {
      case "RED QUEEN":
        titleText = "Off with your head!";
        break;
        case "WHITE RABBIT":
        titleText = "I'm late! I'm late!";
        break;
      }

      push();
      fill(255);
      textSize(30);
      text(titleText,titleTextX,titleTextY);
      pop();
  }
}

// textTimer()
//
// Erases text when timer runs out
function textTimer() {
  displayTitle = false;
  gameTitle = "DEFAULT";
}

// speedTimer()
//
// returns ball to original speed when timer runs out
function speedTimer() {
  ball.slower();
  whiteRabbit.x = width/2;
  whiteRabbit.y = height/2;
  whiteRabbit.fast = false;
  activeCondition = "DEFAULT";
}

// sizeTimer()
//
// Returns paddle to original size
function sizeTimer() {
  if (rightPaddle.shrunk) {
    rightPaddle.reset();
  }
  else if (leftPaddle.shrunk) {
    leftPaddle.reset();
  }
  activeCondition = "DEFAULT";
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

function gameTest() {

}
