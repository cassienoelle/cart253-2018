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


// preload()
//
// Description of preload

function preload() {
  // Define sound file formats
  //soundFormats("mp3", "wav");
  // Load alarm sound
  alarmSound = loadSound("assets/sounds/alarm.mp3");
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(500,500);
  // Set volume of alarm sound to 1/10th of maximum
  alarmSound.setVolume(0.1);
  alarmSound.playMode("restart");
  //alarmSound.play();

  // Create new player and position at center of canvas
  player = new Player(width/2,height/2,5,5,50,5);

}


// draw()
//
// Description of draw()

function draw() {
  background(0);

  player.handleInput();
  player.update();
  player.display();
}
