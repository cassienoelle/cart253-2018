/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var s = function(p) {
  // Variables to hold canvas and define canvas width and height
  var canvas;
  var canvasW = p.windowWidth * 0.75;
  var canvasH = p.windowHeight;

  // Variables to hold alarm and bird sounds
  var alarmSound;
  var birdsSound;

  // Variable to hold object representing the player
  var player;
  // Variable to hold the object representing the alarm
  var alarm;
  // Boolean to track whether alarm is on or off
  var playAlarm = true;
  // Variable to hold cover object
  var cover;

  // preload()
  //
  //
  p.preload = function() {
    // Load alarm sound
    alarmSound = p.loadSound("assets/sounds/alarm.wav");
    // Load bird sounds
    birdsSound = p.loadSound("assets/sounds/birds.wav");
  }

  // setup()
  //
  //
  p.setup = function() {
    // Create canvas
    canvas = p.createCanvas(canvasW,canvasH);

    // Create new player and position at center of canvas
    // Set controls to arrow keys
    player = new Player(p.width/2,p.height/2,50,1,p.DOWN_ARROW,p.UP_ARROW,p.LEFT_ARROW,p.RIGHT_ARROW);

    // Create new alarm and position in top left corner
    alarm = new Alarm(50,50,50,1,alarmSound,0.01,1.0);

    // Create new cover directly on top of canvas (same size and position)
    cover = new Block(p.width/2,p.height/2,p.width,p.height,0,0,0,255);

  };

  // draw()
  //
  //
  p.draw = function() {
    p.background(0);

    player.handleInput();
    player.update();
    player.display();

    alarm.updateSound(p.alarm.distanceFrom(player), p.alarm.maxDistance);
    alarm.update();
    alarm.display();

    // If player collides with alarm, turn off alarm and wake up!
    if (alarm.collision(player)) {
      //p.wakeUp();
    }

    // Play alarm sound while alarm is on
    if (playAlarm) {
      //alarm.sound.play();
    }

  };
 };

// Declare instance within div #game
var myp5 = new p5(s, 'game');


////////////////////////////////
////////////////////////////////
// Sketch Two
var t = function(p) {
  var canvas;
  var w = p.windowWidth * 0.25;
  var h = p.windowHeight;

 p.setup = function() {
   canvas = p.createCanvas(w,h);
 };

 p.draw = function() {
   p.background(255);
 };
};

// Declare instance within div #info
var myp5 = new p5(t, 'info');
