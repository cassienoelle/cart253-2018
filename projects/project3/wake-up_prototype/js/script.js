/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Variable representing the canvas and included sections
var canvas;
var infoSection;
var gameSection;

// Variables for positioning sections and setting w/h
var infoW;
var infoH;
var infoX;
var infoY;
var gameW;
var gameH;
var gameX;
var gameY;

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
}


// setup()
//
// Description of setup

function setup() {
  // Create canvas
  canvas = createCanvas(windowWidth,windowHeight);
  // Create info and game sections as separate blocks
  infoW = width * 0.30;
  infoH = height;
  infoX = infoW/2;
  infoY = infoH/2;
  gameW = width * 0.70;
  gameH = height;
  gameX = width - gameW/2;
  gameY = gameH/2;
  infoSection = new Block(infoX,infoY,infoW,infoH,255,0,0,255);
  gameSection = new Block(gameX,gameY,gameW,gameH,0,0,255,255);

  // Create new player and position at center of canvas
  // Set controls to arrow keys
  player = new Player(width/2,height/2,50,1,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);

  // Create new alarm and position in top left corner
  alarm = new Alarm(50,50,50,1,alarmSound,0.01,1.0);

  // Create new cover at the position, width and height of canvas
  cover = new Block(gameX,gameY,gameW,gameH,0,0,0,255);

  //Meter(x,y,size,r,g,b,title,font)
  // Create meters to track energy,money,stress
  energyMeter = new Meter(width/2,height/2,100,255,61,50,"Energy");

}


// draw()
//
// Description of draw()

function draw() {
  background(0);
  infoSection.display();
  gameSection.display();

  player.handleInput();
  player.update();
  player.display();

  alarm.updateSound(alarm.distanceFrom(player), alarm.maxDistance);
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


  //cover.display();
  //cover.fade();

}

//------------ TEST METERS ----------//
function mouseClicked() {
  energyMeter.update(-10);
  return false;
}

function keyPressed() {
  energyMeter.update(5);
  return false;
}
//------------------------------------//

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
