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

// Variables to track and handle game state and conditions
//
var state = "INTRO"; // Main game state: INTRO, ACTIVE or OVER
var activeCondition = "DEFAULT"; // Track conditions during active game play
var gameTitle = "DEFAULT"; // Text to display depending on game conditions

var displayTitle; // Boolean to display or remove text
var spacePressed; // Track user input to move through intro sequence

var leftScore; // score of left paddle
var rightScore; // score of right paddle;

// Variables to contain title objects and their associated images
//
var introduction;
var bottleIntro;
var bottleImage;
var cake;
var cakeImage;
var mushroomIntro;
var rabbit;
var queenOfHeartsIntro;
var doorIntro;
var doorImage;
var spiralImage; // Intro background
var roseImage;
var redRoseImage;


// Variable to contain game font
var musicalsFont;

// Variables to contain title text and text position
//
// Array to contain introductory instructions
var introText = [];
var currentTitle;
var currentSubtitle;
var introImages = [];
var currentImage;
// Variables to handle array index in gameTitles()
var title;
var sub;
// Main title text
var titleText;
var titleTextX;
var titleTextY;
// Variable to contain game font
var musicalsFont;

// Variables to contain the objects representing our balls, paddles
// and other objects, plus their images or main parameters
//
var ball; // main ball object

var enemyBall; // enemy ball object to avoid
var enemyBallImage; // variable to contain current image of enemy ball
var heartImage; // one image option for enemy ball

var leftPaddle; // left paddle (player)
var rightPaddle; // right paddle (player)
var paddleWidth = 10;
var paddleHeight = 90;

var whiteRabbit; // contains chaser object
var whiteRabbitImage;

var mushrooms = []; // array to contain mushroom objects
var numMushrooms = 10; // number of mushrooms in the array
var mushroomImage;

// preload()
//
// Preloads images and fonts
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

/***** ------------------------- SETUP GAME -----------------------------*****/

// setup()
//
// Sets up inital game environment
function setup() {
  canvas = createCanvas(1024,768);
  centerCanvas();
  noStroke();
  imageMode(CENTER);

  setupIntro(); // Set up intro sequence
  setupGame(); // Set up active game
}

// setupIntro ()
//
// Sets up introductory titles and instructions
function setupIntro() {
  // Set up title text
  fill(231,21,0);
  textAlign(CENTER);
  textSize(40);
  textFont(musicalsFont);
  titleTextX = width/2;
  titleTextY = 85;
  titleTextBottomX = width/2;
  titleTextBottomY = height-75;

  // Instructions for game
  introText[0] = " ";
  introText[1] = "WELCOME TO PONG IN WONDERLAND";
  introText[2] = "THE MUSHROOMS MAKE EVERYONE BIG AND TALL...";
  introText[3] = "AND PREPARE TO RUSH IF \n THE RABBIT FINDS THE BALL...";
  introText[4] = "AVOID THE QUEEN OF HEARTS \n OR YOU COULD LOSE YOUR HEAD...";
  introText[5] = "GET 100 POINTS TO WIN \n AND WAKE UP IN YOUR OWN BED...";
  introText[6] = "HIT SPACE TO CONTINUE";
  introText[7] = "HIT SPACE AND GO DOWN THE RABBIT HOLE";
  // Related images
  introImages[0] = undefined;
  introImages[1] = bottleImage;
  introImages[2] = mushroomImage;
  introImages[3] = whiteRabbitImage;
  introImages[4] = heartImage;
  introImages[5] = doorImage;

  // Set handlers for image and text arrays
  currentImage = 1;
  currentTitle = 1;
  currentSubtitle = 6;

  // Create title objects and position in center of the spiral (center of canvas)
  introduction = new Instruction(introImages[1],width/2,height/2,250,introText[1],introText[6]);

  spacePressed = 0; // Start at beginning of intro sequence
}

// setupGame()
//
// Sets up main game interface
// Creates balls, paddles and other interactive objects
function setupGame() {
  // Create the main ball
  ball = new Ball(width/2,height/2,5,5,30,5,false);
  // Create the enemy ball
  enemyBallImage = heartImage; // Enemy ball starts as a heart
  enemyBall = new Ball(width/4,height/4,5,5,35,5,true,enemyBallImage);

  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - (paddleWidth + 10),height/2,paddleWidth,paddleHeight,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(10,height/2,paddleWidth,paddleHeight,10,83,87);

  // Populate the array with mushrooms, initialize at position of ball, set random velocities
  for (var i = 0; i <= numMushrooms; i++) {
    mushrooms.push(new Mushroom(mushroomImage,ball.x,ball.y,random(-5,5),random(-5,5),30));
  }

  // Create a chaser to move randomly around screen and interact with the ball
  // in this case a white rabbit
  whiteRabbit = new Chaser(whiteRabbitImage,width/4,height/4,80,100,random(0,1000),random(0,1000),10);

  // Create the score boards to track and display points of each paddle
  leftScore = new ScoreBoard(30, height - 15,musicalsFont,40,255,161,13);
  rightScore = new ScoreBoard(width - 30, height - 15,musicalsFont,40,255,161,13);
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

/***** -------------------------- RUN GAME ------------------------------*****/

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {

  switch(state) {
    case "INTRO":
      //gameTitles();
      gameIntro();
      break;
    case "ACTIVE":
      gameActive();
      break;
    case "OVER":
      gameOver();
      break;
  }
}

/*** ---------------- INTRO SEQUENCE ----------------- ***/

// gameTitles()
//
// Intro sequence
// Display game titles and instructions, run while game state is "INTRO"
function gameIntro() {
  // Black background with a spiral image displayed
  background(0);
  image(spiralImage,width/2,height/2,width,height);

  // Display text
  text(introduction.title,titleTextX,titleTextY);
  push()
  textSize(40);
  text(introduction.subtitle,width/2,height - 60);
  pop();

  switch (spacePressed) {
    case 0:
      introduction.display();
      break;
    case 1:
      introduction.shrink();
      if (!introduction.shrunk) {
       introduction.display();
      }
      break;
  }


/*
  // Display step one of intro sequence
  if (spacePressed === 0) {
    bottle.display(); // Image of a bottle
    title = 1;
    sub = 6;
    textSize(60);
  }
  // When user hits the space bar
  else if (spacePressed === 1) {
    bottle.shrink(); // Shrink the bottle
    if (!bottle.shrunk) {
      bottle.display();
      title = 0;
      sub = 0;
    }
    // When bottle is done shrinking, display step two of intro sequence
    else {
      cake.display(); // Image of cake
      title = 2;
      sub = 6;
      textSize(40);
    }

  }
  // When user hits the space bar
  else if (spacePressed === 2) {
    cake.shrink(); // Shrink the cake
    if (!cake.shrunk) {
      cake.display();
      title = 0;
      sub = 0;
    }
    // When cake is done shirnking, display step three of intro sequence
    else {
      door.display(); // Image of a door
      title = 3;
      sub = 6;
    }

  }
  // When user hits the space bar
  else if (spacePressed === 3) {
    door.shrink(); // Shrink the door

    if (!door.shrunk) {
      door.display();
      title = 0;
      sub = 0;
    }
    // When door is done shrinking, begin game
    else {
      state = "ACTIVE";
    }
  }
  */
}

// keyTyped()
//
// Track user input from keyboard
// If a key is typed
function keyTyped() {
  // if key is the space bar
  if (key === " " && state === "INTRO") {
    spacePressed++;
  }
}

/*** --------------- ACTIVE GAME PLAY ---------------- ***/

// gameActive()
//
// Main gameplay, run while game state is "ACTIVE"
function gameActive() {
  // The background is black
  background(0);
  drawBackground();


  // Handle user input to control paddles
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  // Handle movement of balls, paddles, chaser
  ball.update();
  enemyBall.update();
  leftPaddle.update();
  rightPaddle.update();
  whiteRabbit.update();

  // If the ball goes off the screen, reset it's position to center
  if (ball.isOffScreen()) {
    score();  // Check who scored and update points
    ball.reset();
  }

  // If the enemy ball goes off the screen while the game is in regular play (DEFAULT)
  // or while a paddle is without it's head after colliding with the enemy ball (SIZE),
  // reset the position of the enemy ball to center
  if (enemyBall.isOffScreen()) {
    if (activeCondition === "DEFAULT" || activeCondition === "SIZE") {
      enemyBall.reset();
    }
  }

  // Bounce ball off paddles
  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);


  // If the enemy ball collides with a paddle while the game is in regular play,
  // behead that paddle temporarily (decrease it's height).
  //
  // If the enemy ball was grown from colliding with a mushroom,
  // revert it to it's original size following paddle collision.
  if (activeCondition === "DEFAULT") {
    if (enemyBall.handleCollision(leftPaddle)) {
      behead(leftPaddle);
      if (enemyBall.grown) {
        enemyBall.resetSize();
      }
    }
    if (enemyBall.handleCollision(rightPaddle)) {
      behead(rightPaddle);
      if (enemyBall.grown) {
        enemyBall.resetSize();
      }
    }

    // If the white rabbit collides with ball while the game is in regular play
    // increase the speed of the ball temporarily
    if (whiteRabbit.collision(ball)){
      rush();
      // If the white rabbit was grown from colliding with a mushroom
      // revert to original size following ball collision
      if (whiteRabbit.grown) {
        whiteRabbit.resetSize();
      }
    }
  }

  mushroomAttack();

  // Track the conditions of the game and display appropriate descriptive text
  narration();

  ball.display("SHAPE"); // display ball as shape
  enemyBall.display("IMAGE"); // display enemy ball as image
  leftPaddle.display(); // display left paddle
  rightPaddle.display(); // display right paddle
  whiteRabbit.display(); // display white rabbit chaser
  leftScore.display(leftPaddle); // display score of left paddle
  rightScore.display(rightPaddle); // display score of right paddle


}

function drawBackground() {
  push();
  rectMode(CORNER);
  var a = 0;
  var b = 50;
  var c = 0;
  var size = 50;
  var x = 0;
  var y = 0;
  var numSquares = width / size;
  var numRows = height / size;
  var s;
  var r;

  for (r = 0; r <= numRows; r++) {

    for (s = 0; s <= numSquares; s++) {
      if (s % 2 === 1) {
        color = a;
      }
      else {
        color = b;
      }

      fill(color);
      rect(x,y,size,size);
      x += size;
    }

    a = b;
    b = c;
    c = a;
    y += size;
    x = 0;
  }
  pop();
}

/* ----------------------- SCORING ------------------------ */

// score()
//
// Checks if ball has gone off the screen
// Updates points of appropriate paddle
function score() {
    // If the ball goes off the right side
    if (ball.x > width)  {
      leftPaddle.points++; // left paddle scores
      console.log("left score");
    }
    // If the ball goes off the left side
    else if (ball.x + ball.size < 0){
      rightPaddle.points++; // right paddle scores
      console.log("right score");
    }
}

/* ------------- MAIN EVENTS & CONDITION CHANGES -----------*/

// rush()
//
// Change behaviour of white rabbit and ball for 10 seconds
// when the game enters SPEED condition after collision
function rush() {
  activeCondition = "SPEED";
  // Increase speed of ball
  ball.faster();
  // Trigger narration() to display descriptive text
  gameTitle = "WHITE RABBIT";
  displayTitle = true;
  // Stop Perlin noise and move white rabbit quickly across screen
  whiteRabbit.fast = true;
  if (whiteRabbit.isOffScreen()) {
    whiteRabbit.reset();
  }
  // Revert to original behaviour and DEFAULT condition after 10 sec
  setTimeout(textTimer,10000);
  setTimeout(speedTimer,10000);
}

// behead()
//
// Cut height of paddle in half for 20 seconds
// when the game enters SIZE condition after collision with enemy ball
function behead(paddle) {
  activeCondition = "SIZE";
  // If the paddle has not already been beheaded
  if (!paddle.shrunk) {
    // Reduce height of the paddle that collided with the enemy ball
    paddle.shrink();
    // Trigger narration() to display descriptive text
    gameTitle = "RED QUEEN";
    displayTitle = true;
    // Trigger chaser update() function to alter behaviour
    whiteRabbit.fast = true;
    // Revert to original behaviour and DEFAULT condition after approx 20 sec
    setTimeout(textTimer,20000);
    setTimeout(speedTimer,22000);
    setTimeout(sizeTimer,20000);
  }
}

// mushroomAttack()
//
// Release mushrooms at random velocities from the location of the ball
// If a mushroom collides with an object, the object grows
function mushroomAttack() {
  for (var i = 0; i < numMushrooms; i++) {
    mushrooms[i].update();
    mushrooms[i].display();

    // Check for collisions with objects other than ball
    mushrooms[i].handleCollision(leftPaddle);
    mushrooms[i].handleCollision(rightPaddle);
    mushrooms[i].handleCollision(enemyBall);
    mushrooms[i].handleCollision(whiteRabbit);
  }
}

// narration()
//
// Handles text to display during active game play
function narration() {
  // If game condition changes, display descriptive text
  if (displayTitle) {
    switch (gameTitle) {
      // If title set to RED QUEEN (SIZE condition active)
      case "RED QUEEN":
        titleText = "Off with your head!";
        break;
      // If title set to WHITE RABBIT (SPEED condition active)
      case "WHITE RABBIT":
        titleText = "You're late! You're late!";
        break;
      }
    // Display white text on screen
      push();
      fill(215,255,110);
      textSize(30);
      text(titleText,titleTextX,titleTextY);
      pop();
  }
}

// textTimer()
//
// Erases text when timer runs out
// Handles non-DEFAULT conditions
function textTimer() {
  displayTitle = false;
  gameTitle = "DEFAULT";
}

// speedTimer()
//
// Returns ball to original speed when timer runs out
// Handles SPEED condition
function speedTimer() {
  ball.slower();
  whiteRabbit.x = width/2;
  whiteRabbit.y = height/2;
  whiteRabbit.fast = false;
  activeCondition = "DEFAULT";
}

// sizeTimer()
//
// Returns paddle to original size when timer runs out
// Handles SIZE condition
function sizeTimer() {
  if (rightPaddle.shrunk) {
    rightPaddle.reset();
  }
  else if (leftPaddle.shrunk) {
    leftPaddle.reset();
  }
  activeCondition = "DEFAULT";
}

/*** ------------------- GAME OVER ------------------- ***/

// gameOver()
//
// End game and display final score
function gameOver() {

}

function gameTest() {
}
