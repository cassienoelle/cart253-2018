// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
// Paddle constructor // FIXED
// // FIXED
// Sets the properties with the provided arguments or defaults // FIXED

function Paddle(x,y,w,h,speed,downKey,upKey) { // FIXED
  this.x = x;
  this.y = y;
  this.vx = 0; // FIXED
  this.vy = 0; // FIXED
  this.w = w;
  this.h = h;
  this.speed = speed; // FIXED
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() { // FIXED
  if (keyIsDown(this.upKey)) { // FIXED
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) { // FIXED
    this.vy = this.speed; // FIXED
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h); // FIXED x2
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() { // FIXED x2
  rect(this.x,this.y,this.w,this.h); // FIXED
}
