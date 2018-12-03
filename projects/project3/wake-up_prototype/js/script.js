/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Variable to hold alarm and bird sounds
var alarmSound;
var birdsSound;

// Variable to hold object representing the user
var player;
// Variable to hold the object representing the alarm
var alarm;
// Boolean to track whether alarm is on or off
var playAlarm = true;


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
  createCanvas(1000,1000);
  // Create new player and position at center of canvas
  // Set controls to arrow keys
  player = new Player(width/2,height/2,50,1,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);

  // Create new alarm and position in top left corner
  alarm = new Alarm(50,50,50,1,alarmSound,0.01,1.0);


}


// draw()
//
// Description of draw()

function draw() {
  background(0);

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
    alarm.sound.play();
  }

}

// wakeUp()
//
// Turn off alarm sound and turn on lights so objects are visible
function wakeUp() {
  playAlarm = false;
  birdsSound.playMode("untilDone");
  birdsSound.play();

}
