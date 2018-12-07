/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Variables to hold the canvas and set canvas width and height
var canvas;
var canvasW;
var canvasH;
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

// Variable to hold alarm and bird sounds
var alarmSound;
var birdsSound;

// Variable to hold object representing the user
var player;
// Variable to hold the object representing the alarm
var alarm;
// Boolean to track whether alarm is on or off
var playAlarm = true;
// Variable to hold cover object
var cover;

// Variables to hold fonts
var meterFont;

// Variables to track energy,money,stress
var energyMeter;
var moneyMeter;
var stressMeter;

// preload()
//
// Description of preload

function preload() {
  // Load alarm sound
  alarmSound = loadSound("assets/sounds/alarm.wav");
  // Load bird sounds
  birdsSound = loadSound("assets/sounds/birds.wav");
  // Load font for meter titles
  meterFont = loadFont("assets/fonts/LemonMilk.otf");
}


// setup()
//
// Description of setup

function setup() {
  // Create canvas and snap to window
  canvas = createCanvas(windowWidth,windowHeight);

  setupGameArea();
  setupInfoArea();
  setupHealthMeters();

}

// setupGameArea()
//
// Sets up distinct area on canvas for active game play
function setupGameArea() {
  // Set relative width and position of game field
  gameWidth = width * 0.80;
  gameHeight = height;
  gameX = gameWidth/2;
  gameY = gameHeight/2;
  // Create game area as a new block object
  gameArea = new Block(gameX,gameY,gameWidth,gameHeight,0,0,0,255);

  // Create new player and position at center of game area
  // Set controls to arrow keys
  player = new Player(gameX,gameY,50,1,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);
  // Create new alarm and position in top left corner
  alarm = new Alarm(50,50,50,1,alarmSound,0.01,1.0);

  // Create another block object to cover and
  // visually obscure everything in the game area
  cover = new Block(gameX,gameY,gameWidth,gameHeight,0,0,0,255);

}

// setupInfoField()
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

}

// setupHealthMeters()
//
// Sets up health meters to track energy, money and stress
// Defines properties to maintain responsive layout
function setupHealthMeters() {
  // Set all meters to an x-position within the info area
  var metersX = gameWidth + 25;
  // Set width (and therefore height) relative
  // to info area for responsive display
  var metersWidth = infoWidth * 0.75;
  // Create new meter objects
  energyMeter = new Meter(metersX,undefined,metersWidth,255,61,50,"Energy",meterFont);
  stressMeter = new Meter(metersX,undefined,metersWidth,20,162,204,"Stress",meterFont);
  moneyMeter = new Meter(metersX,undefined,metersWidth,201,242,75,"Money",meterFont);
  // Define y-positions relative to height properties for responsive display
  // (maintains relative distance from each other if window is resized)
  energyMeter.y = energyMeter.h * 2;
  stressMeter.y = stressMeter.h * 3 + energyMeter.y;
  moneyMeter.y = moneyMeter.h * 3 + stressMeter.y;
  // Set stress meter to one quarter to start
  stressMeter.w = stressMeter.w * 0.25;
}

// setupInstructions()
//
// Sets up text instructions / game descriptions in info area
function setupInstructions() {

}

// draw()
//
// Description of draw()

function draw() {
  background(255);
  gameArea.display();
  infoArea.display();

  player.handleInput();
  player.update();
  player.display();

  alarm.updateSound(alarm.distanceFrom(player),alarm.maxDistance);
  alarm.update();
  alarm.display();

  // If player collides with alarm, turn off alarm and wake up!
  if (alarm.collision(player)) {
    wakeUp();
  }

  // Play alarm sound while alarm is on
  if (playAlarm) {
    //alarm.sound.play();
  }

  energyMeter.display();
  stressMeter.display();
  moneyMeter.display();



  //cover.display();
  //cover.fade();

}

//------------ TEST METERS ----------//
/*
function mouseClicked() {
  energyMeter.update(-10);
  return false;
}

function keyPressed() {
  energyMeter.update(5);
  return false;
}
*/

// wakeUp()
//
// Turn off alarm sound and turn on lights so objects are visible
function wakeUp() {
  playAlarm = false;
  birdsSound.playMode("untilDone");
  //birdsSound.play();
}

// windowResized()
//
// Resize canvas whenever window is resized
function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}
