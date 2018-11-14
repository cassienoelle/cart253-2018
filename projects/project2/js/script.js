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

var leftScore; // score of left paddle
var rightScore; // score of right paddle;

// Variables to contain title objects and their associated images
//
var bottle;
var bottleImage;
var cake;
var cakeImage;
var door;
var doorImage;
var spiralImage; // Intro background
var roseImage;
var redRoseImage;

// Variable to contain game font
var musicalsFont;

// Variables to contain title text and text position
//
// Title text at the top
var titleText;
var titleTextX;
var titleTextY;
// Title text at the bottom
var titleTextBottom;
var titleTextBottomX;
var titleTextBottomY;
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
  canvas = createCanvas(800, 600);
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
  // Create title objects and position in center of the spiral (center of canvas)
  bottle = new Title(bottleImage,width/2,height/2,250);
  cake = new Title(cakeImage,width/2,height/2,250);
  door = new Title(doorImage,width/2,height/2,250);

  // Set up title text
  fill(231,21,0);
  textAlign(CENTER);
  textSize(40);
  textFont(musicalsFont);
  titleTextX = width/2;
  titleTextY = 100;
  titleTextBottomX = width/2;
  titleTextBottomY = height-75;

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
  rightPaddle = new Paddle(width-paddleWidth,height/2,paddleWidth,paddleHeight,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,paddleWidth,paddleHeight,10,83,87);

  // Populate the array with mushrooms, initialize at position of ball, set random velocities
  for (var i = 0; i <= numMushrooms; i++) {
    mushrooms.push(new Mushroom(mushroomImage,ball.x,ball.y,random(-5,5),random(-5,5),30));
  }

  // Create a chaser to move randomly around screen and interact with the ball
  // in this case a white rabbit
  whiteRabbit = new Chaser(whiteRabbitImage,width/4,height/4,80,100,random(0,1000),random(0,1000),10);

  // Create the score boards to track and display points of each paddle
  leftScore = new ScoreBoard(25, height - 20,musicalsFont,40,255,161,13);
  rightScore = new ScoreBoard(width - 25, height - 20,musicalsFont,40,255,161,13);
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

/*** ---------------- INTRO SEQUENCE ----------------- ***/

// gameTitles()
//
// Intro sequence
// Display game titles and instructions, run while game state is "INTRO"
function gameTitles() {
  // Black background with a spiral image displayed
  background(0);
  image(spiralImage,width/2,height/2,800,600);

  // Set text styling and position
  push();
  stroke(255);
  strokeWeight(5);
  text(titleText,titleTextX,titleTextY);
  text(titleTextBottom,titleTextBottomX,titleTextBottomY);
  pop();

  // Display step one of intro sequence
  if (spacePressed === 0) {
    bottle.display(); // Image of a bottle
    titleText = "WELCOME TO PONG IN WONDERLAND";
    titleTextBottom = "HIT SPACE TO CONTINUE";
  }
  // When user hits the space bar
  else if (spacePressed === 1) {
    bottle.shrink(); // Shrink the bottle
    if (!bottle.shrunk) {
      bottle.display();
      titleText = "WELCOME TO PONG IN WONDERLAND";
      titleTextBottom = "HIT SPACE TO CONTINUE";
    }
    // When bottle is done shrinking, display step two of intro sequence
    else {
      cake.display(); // Image of cake
      titleText = "MORE INSTRUCTIONS";
      titleTextBottom = "HIT SPACE TO CONTINUE";
    }

  }
  // When user hits the space bar
  else if (spacePressed === 2) {
    cake.shrink(); // Shrink the cake

    if (!cake.shrunk) {
      cake.display();
      titleText = "MORE INSTRUCTIONS";
      titleTextBottom = "HIT SPACE TO CONTINUE";
    }
    // When cake is done shirnking, display step three of intro sequence
    else {
      door.display(); // Image of a door
      titleText = "PLAY NOW";
      titleTextBottom = "HIT SPACE TO GO DOWN THE RABBIT HOLE";
    }

  }
  // When user hits the space bar
  else if (spacePressed === 3) {
    door.shrink(); // Shrink the door

    if (!door.shrunk) {
      door.display();
      titleText = "PLAY NOW";
      titleTextBottom = "HIT SPACE TO GO DOWN THE RABBIT HOLE";
    }
    // When door is done shrinking, begin game
    else {
      state = "ACTIVE";
    }
  }
}

// keyTyped()
//
// Track user input from keyboard
// If a key is typed
function keyTyped() {
  // if key is the space bar
  if (key === " ") {
    spacePressed ++; // increase spacePressed to move through intro sequence
    console.log(spacePressed);
  }
}

/*** --------------- ACTIVE GAME PLAY ---------------- ***/

// gameActive()
//
// Main gameplay, run while game state is "ACTIVE"
function gameActive() {
  // The background is black
  background(0);

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


  // If the enemy ball collides with a paddle while the game is in regular play
  // behead that paddle temporarily (decrease it's height)
  if (activeCondition === "DEFAULT") {
    if (enemyBall.handleCollision(leftPaddle)) {
      behead(leftPaddle);
    }
    if (enemyBall.handleCollision(rightPaddle)) {
      behead(rightPaddle);
    }

    // If the white rabbit collides with ball while the game is in regular play
    // increase the speed of the ball temporarily
    if (whiteRabbit.collision(ball)){
      rush();
    }
  }

  // Track the conditions of the game and display appropriate descriptive text
  narration();

  ball.display("SHAPE"); // display ball as shape
  enemyBall.display("IMAGE"); // display enemy ball as image
  leftPaddle.display(); // display left paddle
  rightPaddle.display(); // display right paddle
  whiteRabbit.display(); // display white rabbit chaser
  leftScore.display(leftPaddle); // display score of left paddle
  rightScore.display(rightPaddle); // display score of right paddle

  // mushroomAttack();

}

/* ----------------------- SCORING ------------------------ */


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
// If a mushroom collides with a paddle, the paddle grows
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
      fill(255);
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
