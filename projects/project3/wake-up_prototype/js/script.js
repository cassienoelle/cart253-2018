/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Variable to hold alarm sound
var alarmSound;

// Variable to hold object representing the user
var player;
// Variable to hold the object representing the alarm
var alarm;
var x;


// preload()
//
// Description of preload

function preload() {
  // Define sound file formats
  //soundFormats("mp3", "wav");
  // Load alarm sound
  alarmSound = loadSound("assets/sounds/alarm.wav");
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(500,500);
  // Create new player and position at center of canvas
  // Set controls to arrow keys
  player = new Player(width/2,height/2,50,1,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);

  // Create new alarm and position in top left corner
  alarm = new Alarm(50,50,50,1,alarmSound,0.1,1.0);


}


// draw()
//
// Description of draw()

function draw() {
  background(0);

  player.handleInput();
  player.update();
  player.display();

  alarm.updateVolume(alarm.distanceFrom(player), alarm.maxDistance);

  alarm.update();
  alarm.display();

  alarm.sound.playMode("untilDone");
  alarm.sound.loop = true;
  alarm.sound.play();

}
