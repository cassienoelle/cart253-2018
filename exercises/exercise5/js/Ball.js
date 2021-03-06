// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(img,x,y,vx,vy,size,speed) {
  ////////// NEW ////////////
  this.img = img;
  /////// END NEW //////////
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function() {
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
Ball.prototype.isOffScreen = function() {
  // Check for going off screen and reset if so
  ///////////// NEW ///////////////
  if (this.x + this.size < 0){
    return 1;
  }
  else if (this.x > width) {
    return 2;
  }
  else {
    return 0;
  }
  /////////// END NEW //////////////
}

// display()
//
// Draw the ball as an image on the screen
Ball.prototype.display = function() {
  image(this.img,this.x,this.y,this.size,this.size);
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
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
// Set random velocity towards the paddle that just scored
Ball.prototype.reset = function() {
  ///////// NEW /////////////
  this.vx = -this.vx;
  this.vy = random(-5,5);
  ////////// END NEW ///////////
  this.x = width/2;
  this.y = height/2;
}

/////////////////// NEW //////////////////////

// freeze()
//
// Set position back to the middle of the screen
// and freeze movement (velocity set to 0)
Ball.prototype.freeze = function() {
  this.vx = 0;
  this.vy = 0;
  this.x = width/2;
  this.y = height/2;
  this.size = 150;
}
///////////////////// END NEW //////////////////////
