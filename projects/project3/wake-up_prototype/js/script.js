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
var level = "SHOWER";

// Variable to hold alarm and bird sounds
var alarmSound;
var birdsSound;

// Variable to hold object representing the user
var player;
// Variable to hold the object representing the alarm
var alarm;
// Variables to hold images for alarm animation
var alarmImage;
var alarmImage2;
// Boolean to track whether alarm is on or off
var playAlarm = true;
// Variable to hold cover object
var cover;

// Variables to hold fonts
var meterFont;

// Variables to track energy,money,stress (health meters)
var energyMeter;
var moneyMeter;
var stressMeter;
var metersX;
var metersWidth;

// Array to hold instructional and descriptive text
var instructions = [];
var instructionsDiv;
var instructionsText;

// Array to hold bubbles
var bubbles = [];
var duckImage;
var soap;
var soapImage;

var showerBackground;
var showerStreams = [];

var clock;

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
  // Load font for game instructions
  instructionsFont = loadFont("assets/fonts/abeatbyKaiRegular.otf");
  // Load image of a duck
  duckImage = loadImage("assets/images/duck.png");
  // Load image of bathroom tile
  showerBackground = loadImage("assets/images/tile.jpg");
  // Load images of an alarm clock
  alarmImage = loadImage("assets/images/alarm1.png");
  alarmImage2 = loadImage("assets/images/alarm2.png");
  // Load image of soap
  soapImage = loadImage("assets/images/soap.png");
}


// setup()
//
// Description of setup

function setup() {
  // Create canvas and snap to window
  canvas = createCanvas(windowWidth,windowHeight);

  setupGameArea();
  setupInfoArea();

  soap = new Soap(gameWidth/2,height/4,100,soapImage);
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
  player = new Player(gameX,gameY,20,0.5,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);
  // Create new alarm and position in top left corner
  alarm = new Alarm(30,30,60,2,alarmSound,0.01,1.0,alarmImage,alarmImage2);

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

  // Create health meters within info area to track energy, money, stress
  setupHealthMeters();
  setupInstructions();

  clock = new Timer(metersX,height-80,meterFont,60,30);
}

// setupHealthMeters()
//
// Sets up health meters to track energy, money and stress
// Defines properties to maintain responsive layout
function setupHealthMeters() {
  // Set all meters to an x-position within the info area
  metersX = gameWidth + 25;
  // Set width (and therefore height) relative
  // to info area for responsive display
  metersWidth = infoArea.w * 0.75;
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
  // Set energy meter to three quarters to start
  energyMeter.w = energyMeter.w * 0.75;
  // Money meter starts at 100% as in original declaration
}

// setupInstructions()
//
// Sets up text instructions / game descriptions within info area
function setupInstructions() {
  instructions[0] = "Time to wake up! TURN OFF YOUR ALARM. " +
    "Follow the sound to find it in the dark." +
    "When the sound gets louder, you're getting closer.";

  instructionsDiv = createDiv();
  instructionsDiv.id("infotext");
  instructionsDiv.style("width", metersWidth + "px");
  instructionsDiv.style("padding", metersX - infoArea.left + "px");
  instructionsDiv.position(infoArea.left, moneyMeter.y + moneyMeter.h * 2);

  instructionsText = createSpan(instructions[0]);
  instructionsText.parent(instructionsDiv);
  instructionsText.style("font-family", "Arial");
  instructionsText.style("font-size", 1.5 + "em");
}

// draw()
//
// Description of draw()

function draw() {
  background(255);

  switch (level) {
    case "ALARM":
      gameArea.display();
      infoArea.display();
      findAlarm();
      break;
    case "SHOWER":
      gameArea.display();
      infoArea.display();
      showerOn();
      releaseBubbles();
      soap.bounce(player);
      soap.display();
      break;
    default:
      break;
  }

  energyMeter.display();
  stressMeter.display();
  moneyMeter.display();

  clock.countDown();
  clock.display();
}



//------------ TEST METERS ----------//
/*
function keyPressed() {
  energyMeter.update(5);
  return false;
}
*/

// releaseBubbles()
//
//
function releaseBubbles() {
  gameArea.r = 255;
  gameArea.g = 255;
  gameArea.b = 255;

  if (frameCount % 60 === 0 || frameCount % 210 === 0) {
    bubbles.push(new Bubble(random(0,gameWidth),-80,random(0,1000),random(0,1000),random(30,80),random(0.5,1.5),duckImage,false));
  }
  else if (frameCount % 390 === 0) {
    bubbles.push(new Bubble(random(0,gameWidth),-80,random(0,1000),random(0,1000),random(30,80),random(0.5,1.5),duckImage,true));
  }

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].handleCollision(player);
  }

  player.handleInput();
  player.update();
  player.display()

}

// showerOn()
//
//
function showerOn() {
  showerStreams.push(new Shower(random(0,gameWidth),0,random(1,2),50,103,241,255,random(25,60)));
  for (var i = 0; i < showerStreams.length; i++) {
    showerStreams[i].update();
    showerStreams[i].display();
  }
}

function mousePressed() {
  clock.running = true;
  clock.startTime = millis();
}



// findAlarm()
//
//
function findAlarm() {
  alarm.updateSound(alarm.distanceFrom(player),alarm.minDistance,alarm.maxDistance);
  alarm.update();
  alarm.display();
  // Every five seconds, randomly change the location of the alarm
  // to increase difficulty
  if (frameCount % (60 * 5) === 0) {
    alarm.displace();
  }
  // If player collides with the alarm, turn it off and wake up!
  if (alarm.collision(player)) {
    wakeUp();
  }
  // Play alarm sound while alarm is on
  if (playAlarm) {
    alarm.sound.play();
  }

  player.handleInput();
  player.update();
  player.display();

  // Cover the game area with black so the player
  // can't see the alarm or their avatar
  // Periodically reduce cover opacity like blinking sleepily
  cover.fade();
  cover.display();
}

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
