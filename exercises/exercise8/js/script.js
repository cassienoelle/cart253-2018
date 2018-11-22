/*****************

Exercise 8
Cassie Smith CART 253a
Fall 2018

Introduction to Spoon Theory game.
Explains spoon theory to player with some
visual interactivity.

******************/

// Variable to hold image of spoon
var spoonImage;

// Variables to hold fonts
var titleFont;
var cubicFont;

// preload()
//
// Preloads images and fonts

function preload() {
  spoonImage = loadImage("assets/images/spoon.png"); // Image of a spoon
  cubicFont = loadFont("assets/fonts/cubic.ttf"); // Cubic font
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(1000,1000);
}


// draw()
//
// Description of draw()

function draw() {
  background(255);
}
