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
var state = "ACTIVE"; // Main game state: INTRO, ACTIVE or OVER
var activeCondition = "DEFAULT"; // Track conditions during active game play
var gameTitle = "DEFAULT"; // Text to display depending on game conditions

var displayTitle; // Boolean to display or remove text
var spacePressed; // Track user input to move through intro sequence

var score; // Score board
var winner;
var winningScore = 100;

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
// Arrays to contain introductory instructions
var introText = [];
var currentTitle;
var currentSubtitle;
var introImages = [];
var currentImage;
var finalInstruction;

// Main title text position
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
var numMushrooms = 6; // number of mushrooms in the array
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
  // Style and position textb
  fill(231,21,0);
  textAlign(CENTER);
  textSize(50);
  textFont(musicalsFont);
  titleTextX = width/2;
  titleTextY = 85;

  // Populate text array with instructions for game
  introText[0] = " ";
  introText[1] = "WELCOME TO PONG IN WONDERLAND";
  introText[2] = "THE MUSHROOMS MAKE EVERYONE \n BIG AND TALL...";
  introText[3] = "BUT PREPARE TO RUSH IF \n THE RABBIT TOUCHES THE BALL...";
  introText[4] = "AVOID THE RED QUEEN \n OR YOU COULD LOSE YOUR HEAD...";
  introText[5] = "WIN 100 POINTS \n TO WAKE UP SAFE IN YOUR BED..."; // final instruction before game starts
  introText[6] = "HIT SPACE TO CONTINUE";
  introText[7] = "HIT SPACE AND GO DOWN THE RABBIT HOLE";
  // Populate image array with images related to text
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
  finalInstruction = 5;

  // Create instruction object and position in center of the canvas
  introduction = new Instruction(introImages[currentImage],width/2,height/2,250,introText[currentTitle],introText[currentSubtitle]);
}

// setupGame()
//
// Sets up main game interface
// Creates balls, paddles and other interactive objects
function setupGame() {
  // Create the main ball
  ball = new Ball(width/2,height/2,6,6,30,6,false);
  // Create the enemy ball
  enemyBallImage = heartImage; // Enemy ball starts as a heart
  enemyBall = new Ball(width/4,height/4,5,5,35,5,true,enemyBallImage);

  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - (paddleWidth + 10),height/2,paddleWidth,paddleHeight,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(10,height/2,paddleWidth,paddleHeight,10,83,87);

  // Create a chaser to move randomly around screen and interact with the ball
  // in this case a white rabbit
  whiteRabbit = new Chaser(whiteRabbitImage,width/4,height/4,80,100,random(0,1000),random(0,1000),10);

  // Create the score board to track and display points of each paddle
  score = new ScoreBoard(leftPaddle,rightPaddle,30,height - 15,width - 30,40,musicalsFont,255,161,13);
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
  textSize(30);
  text(introduction.subtitle,width/2,height - 60);
  pop();

  // Moves through intro sequence when triggered by keyboard input
  // Text and image properties of the introduction object are updated
  // by looping through elements of relevant arrays
  //
    // When SPACE is typed
    if (spacePressed) {
      // Shrink the current image by rotating it and reducing it's size
      // until it disappears into the center of the spiral image
      if (!introduction.shrunk) {
        console.log("shrink now");
        introduction.shrink();
        // Remove current text
        introduction.title = introText[0];
        introduction.subtitle = introText[0];
        introduction.display();
      }
      // Once the image is fully shrunk
      else if (introduction.shrunk) {
        // If that was the last instruction, start the game
        if (currentTitle === finalInstruction) {
          state = "ACTIVE";
        }
        // Otherwise move to next instruction
        else {
        // Access the next image and text in the arrays (update indices)
        currentImage++;
        currentTitle++;
        // Reset other object parameters and halt action triggered by key input
        introduction.reset();
        spacePressed = false;
        }
      }
    }
    // Default, no action currently triggered
    else {
      introduction.shrunk = false;
      // Set image and text properties of object to updated array elements
      introduction.img = introImages[currentImage];
      introduction.title = introText[currentTitle];
      introduction.subtitle = introText[currentSubtitle];
      // Display current image and text until SPACE typed again
      introduction.display();
    }

  }

// keyTyped()
//
// Track user input from keyboard
// If a key is typed
function keyTyped() {
  // if key is the space bar and the game is in the intro sequence
  if (key === " " && state === "INTRO") {
    spacePressed = true;
  }
}

/*** --------------- ACTIVE GAME PLAY ---------------- ***/

// gameActive()
//
// Main gameplay, run while game state is "ACTIVE"
function gameActive() {
  // The background is black and covered by a checkered pattern
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
    checkScore(); // Check to see which paddle scored and update points
    ball.reset();
  }

  // Bounce ball off paddles
  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  // If the enemy ball goes off the screen while the game is in regular play,
  // reset the position of the enemy ball to center
  if (enemyBall.isOffScreen()) {
    if (activeCondition === "DEFAULT") {
      enemyBall.reset();
    }
  }

  // If the enemy ball collides with a paddle while the game is in regular play,
  // behead that paddle temporarily (decrease it's height)
  //
  // If the enemy ball has increased in size after colliding with a mushroom,
  // reset it to it's original size following the paddle collision
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

  // If the white rabbit collides with the ball
  // increase the speed of the ball temporarily
  if (whiteRabbit.collision(ball)){
    rush();
    // If the white rabbit is larger after colliding with a mushroom
    // reset it to it's original size following the ball collision
    if (whiteRabbit.grown) {
      whiteRabbit.resetSize();
    }
  }
}

  // If a certain score has been reached by either paddle
  // release mushrooms from the location of the ball
  if (score.event()) {
    mushroomAttack();
  }
  else if (!score.event()) {
    while (mushrooms.length > 0) {
      mushrooms.pop();
    }
  }


  // Track the conditions of the game and display appropriate descriptive text
  narration();

  ball.display("SHAPE"); // display ball as shape
  enemyBall.display("IMAGE"); // display enemy ball as image
  leftPaddle.display(); // display left paddle
  rightPaddle.display(); // display right paddle
  whiteRabbit.display(); // display white rabbit chaser
  score.display(); // display score board
}

// drawBackground()
//
// Draw a background of alternating black and white squares
function drawBackground() {
  push();
  rectMode(CORNER);

  // Variables to handle color alternation
  var a = 0;
  var b = 50;
  var c = 0;

  var size = 50;
  var x = 0;
  var y = 0;
  var numSquares = width / size; // total squares per row
  var numRows = height / size; // total rows of squares
  var s; // counter for number of squares
  var r; // counter for number of rows

  // Draw rows of squares until canvas is covered
  for (r = 0; r <= numRows; r++) {
    // Fill each row with alternating colored squares
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
    // Switch color order to create checkered pattern
    a = b;
    b = c;
    c = a;
    // Reset x position and move down to y position of next row
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
function checkScore() {
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
  if (leftPaddle.points % 5 )
  // Populate the array with mushrooms, initialize at position of ball, set random velocities
  for (var i = 0; i <= numMushrooms; i++) {
    mushrooms.push(new Mushroom(mushroomImage,ball.x,ball.y,random(-5,5),random(-5,5),30));

    mushrooms[i].update();
    mushrooms[i].display();

    // Check for collisions with paddles, enemy ball and white rabbit
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
  if (leftPaddle.points === winningScore) {
    winner = "PLAYER ONE";
  }
  else if (rightPaddle.points === winningScore) {
    winner = "PLAYER TWO";
  }
}

function gameTest() {
}
