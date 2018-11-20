// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;

  this.shrunk = false;
  this.grown = false;

  this.initW = w;
  this.initH = h;

  this.points = 0;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

//////////////////////// NEW //////////////////////////

// shrink()
//
// Reduce height of paddle by half
Paddle.prototype.shrink = function() {
  this.h = this.h/2;
  this.y = this.y + this.h/2;
  this.shrunk = true;
}

// grow()
//
// Double height of paddle
Paddle.prototype.grow = function() {
  this.h  = this.h * 2;
}

// scored()
//
// Increase points when paddle scores
Paddle.prototype.scored = function () {
  this.points ++;
}

// reset()
//
// Reset initial size of paddle
Paddle.prototype.reset = function() {
  this.h = this.initH;
  this.w = this.initW;
  this.shrunk = false;

}

////////////////////// END NEW ///////////////////////

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(56,255,253);
  rect(this.x,this.y,this.w,this.h);
}
