// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed,enemy,img) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.speedChanged = false;
  this.enemy = enemy;
  this.img = img;

  this.grown = false;
  this.initSize = size;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// display(form)
//
// Draw the ball on the screen
Ball.prototype.display = function(form) {
  if (form === "IMAGE") {
    image(this.img,this.x,this.y,this.size,this.size);
  }
  else if (form === "SHAPE") {
    fill(255);
    rect(this.x,this.y,this.size,this.size);
  }
}


// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      // Return true
      return true;
    }
  }

}

// faster()
//
// Increase the speed of the ball
Ball.prototype.faster = function() {
  if (!this.speedChanged) {
    this.vx = -this.vx;
    this.vy = -this.vy;
    this.vx = this.vx * 2;
    this.vy = this.vy * 2;

    this.speedChanged = true;
  }
}

// slower()
//
// Decrease the speed of the ball
Ball.prototype.slower = function () {
  if (this.speedChanged) {
    this.vx = this.speed;
    this.vy = this.speed;
    this.speedChanged = false;
  }
}

// grow()
//
// Increase the size of the ball
Ball.prototype.grow = function() {
  this.size = this.size * 2;
}


// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
  this.vx = -this.vx;
}

// resetSize()
//
// Reset width and height to initial values
Ball.prototype.resetSize = function() {
  this.size = this.initSize;
  this.grown = false;
}
