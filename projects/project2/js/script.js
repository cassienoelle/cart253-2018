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

// Variables to contain and position the canvas
var canvas;
var canvasX;
var canvasY;

// Variables to track and handle game state and conditions
//
var state = "INTRO"; // Main game state: INTRO, ACTIVE or OVER
var activeCondition = "DEFAULT"; // Track conditions during active game play
var gameTitle = "DEFAULT"; // Text to display depending on game conditions
var attacked = false; // Track if a mushroom attack has been initialized

var displayTitle; // Boolean to display or remove text
var spacePressed; // Track user input to move through intro sequence or replay game

var score; // Score board
var winner; // Holds winning player
var winningScore = 100; // Set score needed to win

// Variables to contain the objects representing our balls, paddles
// and other objects
//
var ball; // main ball object

var enemyBall; // enemy ball object to avoid

var leftPaddle; // left paddle (player)
var rightPaddle; // right paddle (player)
var paddleWidth = 10;
var paddleHeight = 90;

var whiteRabbit; // contains white rabbit chaser object

var mushrooms = []; // array to contain mushroom objects
var numMushrooms; // number of mushrooms in the array

// Variables to contain intro text and images
//
var introduction; // Instruction object to display intro text and images
var introText = []; // Array of different intro text
var currentTitle; // Array index of main text currently displayed
var currentSubtitle; // Array index of secondary text currently displayed
var introImages = []; // Array to of different intro images
var currentImage; // Index of image currently displayed
var finalInstruction; // Index of final text to display before game starts

// Variables to hold images
//
var spiralImage; // intro background
var bottleImage; // intro image
var doorImage; // intro image
var mushroomImage; // intro image and mushroom object image
var whiteRabbitImage; // intro image and white rabbit chaser object image
var heartImage; // intro image and enemy ball image
var gameOverImage; // image to display when game is over

// Game over text
var gameOverText;
var winnerText;
// Main title text position
var titleTextX;
var titleTextY;
// Main game font
var musicalsFont;



// preload()
//
// Preloads images and fonts
function preload() {
  spiralImage = loadImage("assets/images/spiral.png"); // image of a black and white spiral
  heartImage = loadImage("assets/images/heart.png"); // image of a red heart with gold crown
  bottleImage = loadImage("assets/images/bottle.png"); // image of a bottle
  doorImage = loadImage("assets/images/door.png"); // image of a door with keyhole
  whiteRabbitImage = loadImage("assets/images/whiterabbit.png"); // image of the white rabbit
  mushroomImage = loadImage("assets/images/mushroom.png"); // image of a mushroom
  gameOverImage = loadImage("assets/images/bedroom.jpg"); // image of a bedroom

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
  setupGameOver(); // Set up game over screen
}

// setupIntro ()
//
// Sets up introductory titles and instructions
function setupIntro() {
  // Style and position text
  fill(231,21,0);
  textAlign(CENTER);
  textSize(40);
  textFont(musicalsFont);
  titleTextX = width/2;
  titleTextY = 85;

  // Populate text array with instructions for game
  introText[0] = " ";
  introText[1] = "WELCOME TO PONG IN WONDERLAND";
  introText[2] = "THE MUSHROOMS MAKE EVERYONE \n BIG AND TALL...";
  introText[3] = "BUT PREPARE TO RUSH IF \n THE RABBIT TOUCHES THE BALL...";
  introText[4] = "AVOID THE RED QUEEN \n OR YOU COULD LOSE YOUR HEAD...";
  introText[5] = "WIN " + winningScore + " POINTS \n TO WAKE UP SAFE IN YOUR BED..."; // final instruction before game starts
  introText[6] = "CONTROLS (PLAYER 1: W + S, PLAYER 2: ARROW KEYS) \n HIT SPACE TO CONTINUE";
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
  introduction = new Instruction(introImages[currentImage],width/2,height/2,250,250,introText[currentTitle],introText[currentSubtitle]);
}

// setupGame()
//
// Sets up main game interface
// Creates balls, paddles and other interactive objects
function setupGame() {
  // Create the main ball
  ball = new Ball(width/2,height/2,6,6,30,6,false);
  // Create the enemy ball
  enemyBall = new Ball(width/4,height/4,5,5,35,5,true,heartImage);

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

// setupGameOver()
//
// Sets up game over visuals and text
function setupGameOver() {
  // Set text content for game over instruction object
  winnerText = " ESCAPED WONDERLAND";
  gameOverText = "HIT SPACE TO PLAY AGAIN";
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
  text(introduction.subtitle,width/2,height - 100);
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
          spacePressed = false;
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

  // Check if the conditions for a mushroom attack have been met
  // If enemy ball, paddle, or white rabbit collide with a mushroom,
  // temporarily increase its size
  mushroomAttack();

  // If the enemy ball collides with a paddle while the game is in regular play,
  // behead that paddle temporarily (decrease it's height)
  //
  // If the enemy ball is increased in size at time of collision,
  // reset it to it's original size
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
  }

  // If the white rabbit collides with the ball
  // increase the speed of the ball temporarily
  if (whiteRabbit.collision(ball)){
    rush();
    // If the white rabbit's size is increased at time of collision
    // reset it to it's original size
    if (whiteRabbit.grown) {
      whiteRabbit.resetSize();
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
// Draw a background of alternating black and grey squares
function drawBackground() {
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
// Check if the conditions for a mushroom attack have been met
function mushroomAttack() {
  // Release a mushroom attack every interval of 10 points
  if (leftPaddle.points % 10 === 0 && leftPaddle.points > 1 || rightPaddle.points % 10 === 0 && rightPaddle.points > 1) {
    // If an attack was not already released this interval
    if (!attacked) {
      // Set the number of mushrooms in the mushrooms array to 10
      numMushrooms = 10;
      // Set attacked to true so mushrooms aren't continuously released
      attacked = true;
    }
  }
  // When score increases, reset attacked to false so
  // more mushrooms can be released at the next interval of 10
  else {
    attacked = false;
  }

  // Release mushrooms according to number of mushrooms in the array
  releaseMushrooms();
}


// releaseMushrooms()
//
// Release mushrooms at random velocities from the location of the ball
// If a mushroom collides with an object, the object grows
function releaseMushrooms() {
  for (var i = 0; i <= numMushrooms; i++) {
    // Populate the array with mushrooms, initialize at position of ball, set random velocities
    mushrooms.push(new Mushroom(mushroomImage,ball.x,ball.y,random(-5,5),random(-5,5),30));

    // Display mushrooms and move outwards from ball until they go off screen
    mushrooms[i].update();
    if (!mushrooms[i].isOffScreen()){
      mushrooms[i].display();
    }
    // If a mushroom goes off screen, remove it from the array and
    // reduce the total number of mushrooms so it is not re-displayed
    else if (mushrooms[i].isOffScreen()){
      mushrooms.splice(i,1);
      numMushrooms --;
    }

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
  // Set background to white
  background(255);

  // Determine winner (paddle that reached winning score first)
  if (leftPaddle.points === winningScore) {
    winner = "PLAYER ONE";
  }
  else if (rightPaddle.points === winningScore) {
    winner = "PLAYER TWO";
  }

  // Display image of bedroom
  image(gameOverImage,width/2,height/2,width,height);

  // Display text announcing winner and giving instructions to play again
  text(winner + winnerText,titleTextX,titleTextY);
  text(gameOverText,width/2,height - 60);

  // When user presses space, reset score and restart game
  if (spacePressed) {
    score.reset(leftPaddle);
    score.reset(rightPaddle);
    state = "ACTIVE";
    spacePressed = false;
  }
}

/*** ------------------------------------------------ ***/

// keyTyped()
//
// Track user input from keyboard
// If a key is typed
function keyTyped() {
  // if key is the space bar and the game is in the intro sequence or game is over
  if (key === " " && state === "INTRO" || state === "OVER") {
    spacePressed = true;
  }
}
