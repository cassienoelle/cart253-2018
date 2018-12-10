/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
/* ------------------- BASE GAME VARIABLES -------------------*/

// Variables to hold the canvas and set canvas width and height
var canvas;
var canvasW;
var canvasH;
// Background color
var c;
// Variables to define separate areas of the canvas
var gameArea;
var gameWidth;
var gameHeight;
var gameX;
var gameY;
var infoArea;
var infoWidth;
var infoHeight;
var infoX;
var infoY;

// Variables to track game state
var level = "INTRO";
// Variable to pause and play game
var playGame = false;
var gameOver = false;
// Variables to define DOM elements(div and span) for laying out instructions
var instructionsDiv;
var instructionsText;

// Variable to hold timer
var clock;

// Variables to hold fonts
var titleFont;
var instructionsFont;

// Variable to hold object representing the user
var player;
var playerLeftControl;
// Related images
var leftHand;
var rightHand;

/* -------------------- VARIABLES FOR INTRO ----------------------*/

// Introductory text
var introTitle;
var intro;
var introX;
var introY;
// Variables to hold door objects
var doorOne;
var doorTwo;
// Tracks which door has been chosen
var chosenDoor;

/* -------------------- VARIABLES FOR ALARM LEVEL -------------------*/

// Variable to hold the object representing the alarm
var alarm;
// Array to hold images for alarm animation
var alarmImages = [];
// Boolean to track whether alarm is on or off
var playAlarm = true;
// Variables to hold alarm and bird sounds
var alarmSound;
var birdsSound;
// Variable to hold cover object
var cover;
// Variable to hold instructional text for alarm level
var alarmInstructions = "Wake up! " +
  "Follow the sound of your alarm in the dark to turn it off. " +
  "Louder = closer. Hit space to begin and don't be late for work!";
var tooLateText = "Womp womp...you didn't get up in time. Now you're" +
  " late for work. Hit space to rush out the door.";
var wakeUpText = "You successfully dragged your ass out of bed. " +
  " Have a glorious day! Hit space to frolic down the street.";

/* -------------------- VARIABLES FOR SHOWER LEVEL -------------------*/

// Array to hold bubbles
var bubbles = [];
// Frame interval at which to create new bubbles
var bubbleRate = 15;
// Sound bubbles make when popped
var bubbleSound;
// Duck image for bubble with rubber ducks inside
var duckImage;
// Score (number of ducks)
var currentDucks = 0;

// Variables to hold soap object and associated
// images and sounds
var soap;
var soapImage;
var soapSounds = []; // Array of different "oops" noises
var splashSound;

// Array to hold individual shower objects
var showerStreams = [];
// Variable to hold shower sound
var showerSound;

// Variables to hold instructional text for shower level
var showerInstructions = "Rub-a-dub-dub! Collect as many ducks as you can " +
  "and don't drop the soap! Hit SPACE to play. (CONTROLS: ASWD, ARROW KEYS)";
var showerOverText = " ducks. You're late for work" +
  "and your hair's still wet. Leave the ducks alone and hit SPACE to get outta here!";

/* -------------------- PRELOAD & SETUP -------------------*/

// preload()
//
// Preload fonts, sounds  and images
function preload() {
  // Load alarm sound
  alarmSound = loadSound("assets/sounds/alarm.wav");
  // Load bird sounds
  birdsSound = loadSound("assets/sounds/birds.wav");
  // Load shower sound
  showerSound = loadSound("assets/sounds/shower.wav");
  // Load quack sound
  bubbleSound = loadSound("assets/sounds/quack.wav");
  // Load splash sound
  splashSound = loadSound("assets/sounds/splash.wav");
  // Load soap sounds
  soapSounds[0] = loadSound("assets/sounds/oops.wav");
  soapSounds[1] = loadSound("assets/sounds/aah.wav");
  // Load font for meter titles
  titleFont = loadFont("assets/fonts/LemonMilk.otf");
  // Load font for game instructions
  instructionsFont = loadFont("assets/fonts/abeatbyKaiRegular.otf");
  // Load image of a duck
  duckImage = loadImage("assets/images/duck.png");
  // Load image of bathroom tile
  showerBackground = loadImage("assets/images/tile.jpg");
  // Load images of an alarm clock
  alarmImages[0] = loadImage("assets/images/alarm1.png");
  alarmImages[1] = loadImage("assets/images/alarm2.png");
  // Load image of soap
  soapImage = loadImage("assets/images/soap.png");
  // Load images of hands
  leftHand = loadImage("assets/images/leftHand.png");
  rightHand = loadImage("assets/images/rightHand.png");

}


// setup()
//
// Setup the game
function setup() {
  // Create canvas and snap to window
  canvas = createCanvas(windowWidth,windowHeight);
  // Set up the distinct areas of the canvas
  setupGameArea();
  setupInfoArea();
  // Set up the introduction sequence and main game play
  setupIntro();
  setupGame();
}

// setupIntro()
//
// Set up the intro sequence
function setupIntro() {
  // White background
  c = 255;
  // Divide the canvas into intervals of 16
  var i = width/16;
  // Create two doors, centered horizontally
  // on each half of the canvas
  doorOne = new Door(i * 2,height/16,width/4,2);
  doorTwo = new Door(i * 10,height/16,width/4,2);

  // Set narrative text
  narrationTitle = "choose a door";
  narration = "See what exciting  \n adventure awaits you! \n" +
    "Today is the first day of \n the rest of your life...";
  narrationX = width/2;
  narrationY = height - ((doorOne.y + doorOne.h)/2);
}

// setupGameArea()
//
// Sets up distinct area on canvas for active game play
function setupGameArea() {
  // Set relative width and position of game field
  gameWidth = width * 0.75;
  gameHeight = height;
  gameX = gameWidth/2;
  gameY = gameHeight/2;
  // Create game area as a new block object
  gameArea = new Block(gameX,gameY,gameWidth,gameHeight,255,255,255,255);

  // Create another block object to cover everything in the game area
  // Used in alarm level
  cover = new Block(gameX,gameY,gameWidth,gameHeight,0,0,0,255);
}

// setupInfoArea()
//
// Sets up distinct are on canvas to display
// descriptions, instructions and health meters
function setupInfoArea() {
  // Set relative width and position of info area
  infoWidth = width - gameWidth;
  infoHeight = height;
  infoX = infoWidth/2 + gameWidth;
  infoY = infoHeight/2;
  // Create info area as new block on right hand side of canvas
  infoArea = new Block(infoX,infoY,infoWidth,infoHeight,255,255,255,255);

  // Set up div holding instructions within info area
  setupInstructions();
  // Create timer and position within info area
  //(x,y,font,size,duration)
  clock = new Timer(infoArea.left + 25,height-80,titleFont,100,30);
  console.log("timerX: " + clock.x);
}

// setupInstructions()
//
// Sets up text instructions / game descriptions within info area
function setupInstructions() {
  // Create and style a div to contain instructions
  instructionsDiv = createDiv();
  instructionsDiv.id("infotext");
  instructionsDiv.style("width", infoArea.w * 0.75 + "px");
  instructionsDiv.style("padding", 25 + "px");
  instructionsDiv.position(infoArea.left, 25);
  // Create a span as a child element to hold text itself
  instructionsText = createSpan(alarmInstructions);
  instructionsText.parent(instructionsDiv);
  instructionsText.style("font-family", "LemonMilk");
  instructionsText.style("font-size", 1.5 + "em");
  instructionsText.style("line-height", "175%");
}

// setupGame()
//
// Sets up main interactive objects
function setupGame() {
  // Create new player and position at center of game area
  // Set controls to arrow keys
  player = new Player(gameX,gameHeight - 100,105,150,rightHand,0.5,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);
  // Create another player object so player controls two during shower mini-game
  playerLeftControl = new Player(200,height-200,105,150,leftHand,3,83,87,65,68);

  // Create new alarm and position in top left corner
  alarm = new Alarm(30,30,60,2,alarmSound,0.01,1.0,alarmImages[0],alarmImages[1]);
  // Create new soap for shower level
  soap = new Soap(gameWidth/2,height/4,100,soapImage,soapSounds[0],soapSounds[1],splashSound);
}

/***** ------------------------ RUN GAME  ------------------------*****/

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(c);
  console.log(playGame);
  // Run code according to active game level
  switch (level) {
    case "INTRO":
      drawIntro();
      break;
    case "ALARM":
      drawMainInterface();
      findAlarm();
      break;
    case "SHOWER":
      drawMainInterface();
      takeShower();
      break;
    default:
      break;
  }

}

/* ---------------- INTRO SEQUENCE  ----------------*/

// drawIntro()
//
//
function drawIntro() {
  instructionsDiv.style("display", "none");

  switch (chosenDoor) {
    case 1:
      // If door one is chosen, open it and enter
      doorOne.open();
      doorOne.enter();
      doorOne.display();
      if (doorOne.opened && c === 0) {
        level = "ALARM";
        doorOne.reset();
        chosenDoor = 0;
        c = 255;
      }
      break;
    case 2:
      // If door two is chosen, open it and enter
      doorTwo.open();
      doorTwo.enter();
      doorTwo.display();
      if (doorTwo.opened && c === 0) {
        level = "SHOWER";
        doorTwo.reset()
        chosenDoor = 0;
        c = 255;
      }
      break;
    default:
      // If neither door is chosen
      // display both closed doors
      doorOne.display();
      doorTwo.display();
      drawIntroText();
      break;
  }
}

// drawIntroText()
//
//
function drawIntroText() {
  textAlign(CENTER);
  textSize(40);
  textFont(titleFont);
  text(narrationTitle,narrationX,narrationY);
  push();
  textSize(30);
  textFont(instructionsFont);
  text(narration,narrationX,narrationY + 40);
  pop();
}

/* ---------------- MAIN GAME   ----------------*/

// drawMainInterface()
//
//
function drawMainInterface() {
  // Display main game area
  gameArea.display();
  // Display info area to the right hand side
  instructionsDiv.style("display", "block");
  infoArea.display();

  switch (level) {
    case "ALARM":
      instructionsText.html(alarmInstructions);
      // Show countdown timer
      if (clock.running) {
        clock.countDown();
        clock.display();
      }
      player.w = 56;
      player.h = 80;
      break;

    case "SHOWER":
      instructionsText.html(showerInstructions);

      player.w = 105;
      player.h = 150;
      break;

    default:
      break;
  }
}

/* ------------ ALARM LEVEL   ---------------*/

// findAlarm()
//
// Handles alarm mini-game
function findAlarm() {
  if (playGame) {
    // Map the volume of the alarm sound inverse to distance of alarm from player
    alarm.updateSound(alarm.distanceFrom(player),alarm.minDistance,alarm.maxDistance);
    alarm.update();
    alarm.displace();
    alarm.display();
    if (playAlarm) {
      alarm.sound.play();
    }

    // If player collides with the alarm, turn it off and wake up!
    if (alarm.collision(player)) {
      wakeUp();
    }

    // Update player position according to keyboard controls and display player
    player.handleInput();
    player.update();
    player.display();

    // Cover the game area with black so the player can't see
    // Periodically reduce cover opacity like blinking sleepily
    cover.fade();
  }

  cover.display();
  // If timer runs out, game over
  if (clock.finished && playGame) {
    tooLate();
  }
}

// tooLate()
//
//
function tooLate() {
  instructionsText.html(tooLateText);
  playGame = false;
  gameOver = true;
}

// wakeUp()
//
// Turn off the alarm sound and play the sound of chirping birds
function wakeUp() {
  instructionsText.html(wakeUpText);
  playAlarm = false;
  birdsSound.playMode("untilDone");
  birdsSound.play();
  playGame = false;
  gameOver = true;
}

/* ------------ SHOWER LEVEL  ------------*/

// takeShower()
//
// Handles shower mini-game
function takeShower() {
  if (playGame) {
    // Turn shower on (play sound and display water animation)
    showerOn();
  }

  // Release bubbles
  releaseBubbles();

  if (playGame) {
    soap.handleCollision(player);
    soap.handleCollision(playerLeftControl);
    soap.checkIfDropped();

    player.handleInput();
    player.speed = 3;
    player.update();
    playerLeftControl.handleInput();
    playerLeftControl.update();
  }


  if (soap.dropped) {
    showerOver();
  }
  else {
    soap.display();
    player.display();
    playerLeftControl.display();
  }
}

// releaseBubbles()
//
// Using an array, create and display multiple bubble objects
// floatin downt he canvas, including some that have ducks in them
function releaseBubbles() {
  // If soap hasn't been dropped, slowly move bubbles down from top of screen
  if (!soap.dropped) {
  // Every interval add new bubble object to the array
    if (frameCount % bubbleRate === 0) {
      bubbles.push(new Bubble(random(0,gameWidth),-30,random(0,1000),random(0,1000),random(30,80),random(1,2),duckImage,false));
    }
    // Every 1.4 seconds, create and add a new bubble object with a duck in it
    else if (frameCount % 100 === 0) {
      bubbles.push(new Bubble(random(0,gameWidth),-30,random(0,1000),random(0,1000),random(30,80),random(1,3),duckImage,true,bubbleSound));
    }
  }
  // If soap is dropped rapidly draw hundreds of bubbles
  // moving upwards bottom of canvas
  else if (soap.dropped) {
    for (var i = 0; i < 100; i++) {
      bubbles.push(new Bubble(random(0,gameWidth),height,random(0,1000),random(0,1000),random(30,80),random(-10,-30),duckImage,false));
    }
  }

  // Cycle through array to display all bubbles and handle movement and collisions
  for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].update();
      bubbles[i].handleCollision(player);
      bubbles[i].handleCollision(playerLeftControl);
      bubbles[i].display();
    }
}

// showerOn()
//
// Simulates the water of a shower by creating multiple shower objects
// as individual shower streams in an array
function showerOn() {
  // Continuously append new shower objects to the shower streams array
  showerStreams.push(new Shower(random(0,gameWidth),0,random(1,2),50,103,241,255,random(25,60)));
  // Cycle through the array to display and update all shower streams
  for (var i = 0; i < showerStreams.length; i++) {
    showerStreams[i].update();
    showerStreams[i].display();
  }
  // Play sound of running shower on a loop
  showerSound.playMode("untilDone");
  showerSound.loop = true;
  showerSound.play();
}

// showerOver()
//
// Shower level over
function showerOver() {
  instructionsText.html("You got " + currentDucks + showerOverText);
  playGame = false;
  gameOver = true;
  showerSound.stop();
}


/* ----------------------------------------*/

// resetLevels()
//
//
function resetLevels() {
  playGame = false;
  gameOver = false;
  currentDucks = 0;
  chosenDoor = 0;
  clock.finished = false;
  clock.duration = 30;
  cover.a = 255;
  soap.reset();
  player.reset();
  playerLeftControl.reset();
  bubbles.splice(0,bubbles.length);
}


// keyPressed()
//
// Tracks whether a key has been pressed
function keyPressed() {
  if (key === " ") {
    if (!playGame && !gameOver) {
      playGame = true;
      if (level === "ALARM") {
        console.log("yes");
        clock.startTime = millis();
        clock.running = true;
      }
    }
    if (gameOver) {
      resetLevels();
      console.log("intro!");
      level = "INTRO";
    }
  }
}

// mouseClicked()
//
// Tracks whether mouse as been clicked
function mouseClicked() {
  // Check if door one has been clicked
  if (doorOne.isChosen()) {
    chosenDoor = 1;
  }
  else if (doorTwo.isChosen()) {
    chosenDoor = 2;
  }
  else {
    chosenDoor = 0;
  }
  return false;
}


// windowResized()
//
// Resize canvas whenever window is resized
function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}
