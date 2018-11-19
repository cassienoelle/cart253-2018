/******************************************************
Cassie Smith
CART 253a - Fall 2018

Game - Chaser
Starter code by Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var state = "OVER";

// Background images and game fonts
var playerLostImage;
var playerWonImage;
var mainFont;
var gameOverImage;
var gameOverText;

// Player position, size, velocity
var playerX;
var playerY;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 10;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player image
var playerImage;
var playerWidth = 50;
var playerHeight = playerWidth;

//////////// NEW //////////

// Rate at which player loses health
var loseHealth = 0.5;

////////// END NEW //////////

// Prey position, size, velocity
var preyX;
var preyY;
var preyVX;
var preyVY;
var preyMaxSpeed = 2;
// Perlin noise time parameters for prey movement
var preyTX;
var preyTY;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey image
var preyImage;
var preyWidth = 50;
var preyHeight = preyWidth;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var numPreyEaten = 0;

//
var scored = false;
var scoredImage;
var scoredX;
var scoredY;
var scoredVX;
var scoredVY;
var scoredAlpha;

// preload()
//
// Preload images and fonts
function preload() {
  // load image of a mouthless face emoji
  playerImage = loadImage("assets/images/faceemoji.png");
  // load prey image of a like
  preyImage = loadImage("assets/images/like.png");
  // load image of a heart to display when a the player gains a point
  scoredImage = loadImage("assets/images/heart.png");
  // load image of a poop emoji background to display when player loses game
  playerLostImage = loadImage("assets/images/poopemoji.png")
  // load image of a heart eyes emoji background to display when player wins
  playerWonImage = loadImage("assets/images/hearteyes.png");
  // load font for game over text and instructions
  mainFont = loadFont("assets/fonts/segoe-ui.ttf");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(800,540);

  noStroke();

  setupInterface();
  setupPrey();
  setupPlayer();
}

// setupInterface()
//
// Sets up interface elements
function setupInterface() {
  imageMode(CENTER);
  textFont = mainFont;
  textAlign(CENTER,CENTER);
  textSize(36);
  scoredAlpha = 255;
  scoredX = width/2;
  scoredY = height * 0.75;
  scoredVX = 0;
  scoredVY = 5;
}


// setupPrey()
//
// Initialises prey's position, velocity, health,
// and Perlin values for movement
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
//////////// NEW ////////////
  preyTX = random(0,1000);
  preyTY = random(0,1000);
////////// END NEW //////////
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// When the game is over, shows the game over screen.
function draw() {

  switch (state) {
    case "INTRO":
      break;
    case "ACTIVE":
      playGame();
      break;
    case "OVER":
      showGameOver();
      break;
    default:
      break;
  }

}

// playGame()
//
// When the game state is active,
// checks input updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
function playGame() {
  drawInterface();

  handleInput();

  movePlayer();
  movePrey();

  updateHealth();
  checkEating();

  scoreChange();

  drawPrey();
  drawPlayer();
}

// drawInterface()
//
// Displays and updates interface elements
function drawInterface() {
  background(0);
}

// handleInput()
//
// Checks arrow and shift keys and adjusts player velocity accordingly
function handleInput() {

  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  /////////////// NEW ////////////
  // Check if player is sprinting
  // When shift key is down, player sprints
  // Increase player speed and health decay rate
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = 6;
    loseHealth = 1;
  }
  // Otherwise reset to original speed and decay rate
  else {
    playerMaxSpeed = 2;
    loseHealth = 0.5;
  }

  ///////////// END NEW ////////////
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {

  //////////// NEW ////////////

  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - loseHealth,0,playerMaxHealth);

  ////////// END NEW //////////

  // Check if the player is dead
  if (playerHealth === 0) {
    // Game over if so
    state = "OVER";
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerWidth/2 + preyWidth/2) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Display scoreChange() visual
      scoredX = playerX;
      scored = true;
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      numPreyEaten++;
    }
  }
}

// scoreChange()
//
// Display heart moving upwards when prey is eaten
function scoreChange() {
  if (scored) {
    console.log("Scored!");
    scoredY -= scoredVY;
    scoredAlpha -= scoredVY;
    push();
    tint(255,scoredAlpha);
    image(scoredImage,scoredX,scoredY,50,50);
    pop();
  }

  if (scoredAlpha <= 0) {
    scored = false;
    scoredY = height * 0.75;
    scoredAlpha = 255;
  }
}

// playerDies()
//
// Display angry face moving upwards if player dies


// movePrey()
//
// Moves the prey based on semi-random velocity changes
function movePrey() {

  //////////// NEW ////////////

  // Set velocity based on Perlin noise values to get a new direction
  // and speed of movement
  // Use map() to convert from values of noise() function
  // to the appropriate range of velocities for the prey
  preyVX = map(noise(preyTX),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(preyTY),0,1,-preyMaxSpeed,preyMaxSpeed);

  ////////// END NEW //////////

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }

  //////////// NEW ////////////

  // Update Perlin noise() values
  preyTX += 0.01;
  preyTY += 0.01;

  ////////// END NEW //////////
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  image(preyImage,preyX,preyY,preyWidth,preyHeight);
}

// drawPlayer()
//
// Draw the player as an image with alpha based on health
function drawPlayer() {
  tint(255,playerHealth);
  image(playerImage,playerX,playerY,playerWidth,playerHeight);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  if (numPreyEaten < 4) {
    gameOverImage = playerLostImage;
    fill(255);
    gameOverText = "GAME OVER.\n";
    gameOverText += "YOU DIED WITH " + numPreyEaten + " LIKES.\n";
    gameOverText += "YOU ARE IRRELEVANT."
  }
  else {
    gameOverImage = playerWonImage;
    fill(255);
    gameOverText = "GAME OVER.\n";
    gameOverText += "YOU GOT " + numPreyEaten + " LIKES!\n";
    gameOverText += "DM ME FOR DETAILS."
    console.log()
  }
  image(gameOverImage,width/2,height/2);
  text(gameOverText,width/2,height/2);
}
