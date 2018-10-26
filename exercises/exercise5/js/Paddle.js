// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(img,x,y,w,h,speed,downKey,upKey) {
  ////////// NEW /////////
  this.img = img;
  /////// END NEW //////////
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  /////////// NEW /////////
  this.points = 0;
  /////// END NEW //////////
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


// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  image(this.img,this.x,this.y,this.w,this.h);
}

////////////////// NEW ///////////////////

// win()
//
// Set display for winning paddle when game over
Paddle.prototype.win = function() {
  this.vx = 0;
  this.vy = 0;
  this.x = width/2;
  this.y = this.h + 20;
  this.w = 150;
  this.h = 150;
}

////////////////// END NEW ///////////////
