// Player
//
// A class to define how a player object behaves
// Including moving around screen according to user input

// Player constructor
//
// Sets the properties with the provided arguments
function Player(x,y,size,speed,downKey,upKey,leftKey,rightKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = size;
  this.h = size;
  this.speed = speed;

  // Keys controlling directional movement
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
}

// handleInput()
//
// Check if any of the movement keys are pressed
// and update velocity accordingly
Player.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy -= this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy += this.speed;
  }
  else if (keyIsDown(this.leftKey)) {
    this.vx -= this.speed;
  }
  else if (keyIsDown(this.rightKey)) {
    this.vx += this.speed;
  }
  else {
    this.vx = 0;
    this.vy = 0;
  }
}

// update()
//
// Update the x and y position based on velocity
// Constrain position to remain in game area
Player.prototype.update = function() {
  this.y += this.vy;
  this.x += this.vx;

  this.y = constrain(this.y,0 + this.h/2,height-this.h/2);
  this.x = constrain(this.x,0 + this.w/2,gameArea.w-this.w/2);
}

// display()
//
// Draw the player as a rectangle on the screen
Player.prototype.display = function() {
  // Set reference point to center of rectangle
  rectMode(CENTER);
  // The rectangle is white
  fill(0);
  // Draw the rectangle
  rect(this.x,this.y,this.w,this.h);
}
