// Bubble
//
// A class to define how a bubble behaves
// Including floating downwards and popping,
// May contain ducks and play sound


// Bubble constructor
//
// Sets the properties with the provided arguments
function Bubble(x,y,tx,ty,size,speed,img,duck,sound) {
  // Properties to define position and size
  this.x = x;
  this.y = y;
  this.w = size;
  this.h = size;
  // Maintain reference to initial width and height
  this.initW = size;
  this.initH = size;
  // Properties to control movement, including Perlin noise
  this.vx = 0;
  this.vy = 0;
  this.tx = tx;
  this.ty = ty;
  this.speed = speed;
  // Set random transparency
  this.a = random(25,125);
  // Image of a duck for bubbles containing a duck
  this.img = img;
  // Sound for when a bubble is popped
  this.sound = sound;
  // Booleans to track if the bubble has a duck or has been popped
  this.duck = duck;
  this.popped = false;
  this.played = false;
}

// update();
//
// Move bubble down screen according to velocity
Bubble.prototype.update = function() {
  // Regular movement if bubble is not popped
  if (!this.popped) {
    // Move bubble according to Perlin noise along x-axis
    this.vx = map(noise(this.tx),0,1,-1,1);
    // random y velocity moving downwards
    this.vy = random(0.5,this.speed);

    // Update position with velocity
    this.x += this.vx;
    this.y += this.vy;
    // Constrain to game area
    this.x = constrain(this.x,0,gameWidth - this.w/2);

    this.tx += 0.01;
    this.ty += 0.01;
  }
  // If bubble is popped expand it quickly and decrease alpha
  // until it is no longer visible (make it look like it popped)
  else if (this.popped) {
      this.w += 10;
      this.h += 10;
      this.a -= 10;
    // When opacity hits zero, move it quickly downwards
    // so it looks like the duck fell out of the bubble
    if (this.a <= 0) {
      this.vx = 0;
      if (this.y < height - this.initH/2) {
        this.vy = 20;
        this.y += this.vy;
      }
      // Stop it at the bottom of the canvas
      else {
        this.vy = 0;
      }
    }
  }

}


// isOffScreen()
//
// Check if bubble has moved off of the bottom of the screen
// and return true if so
Bubble.prototype.isOffScreen = function() {
  if (this.y > height + this.h/2) {
    return true;
  }
}

// handleCollision(player)
//
// Check if the bubble and player overlap and
// if the bubble has a duck, pop it and play sound
Bubble.prototype.handleCollision = function(player) {
  push();
  rectMode(CORNER);
  if (collideRectRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h,player.x-player.w/2,player.y-player.h/2,player.w,player.h)) {
    // Pop the bubble if it has a duck in it
    if (this.duck) {
      this.popped = true;
      if (!this.played) {
        this.sound.playMode("untilDone");
        this.sound.play();
        currentDucks ++;
        this.played = true;
      }
    }
  }
  pop();
}


// display();
//
// Draw the bubble as an ellipse on canvas
Bubble.prototype.display = function () {
  // Reference point center
  imageMode(CENTER);
  // If the bubble has a duck inside draw the duck image
  if (this.duck) {
    image(this.img,this.x,this.y,this.initW,this.initH);
  }

  // Remove stroke if bubble is popped
  if (this.popped) {
    noStroke()
  }
  else
  {
  stroke(104,241,255);
  }

  // Draw the bubble as a semi-transparent
  // blue ellipse on the screen
  fill(37,217,255,this.a);
  ellipse(this.x,this.y,this.w,this.h);
}
