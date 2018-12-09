// Soap
//
// A class to define how a soap behaves
// Including changing transparency

// Soap constructor
//
// Sets the properties with the provided arguments
function Soap(x,y,size,img,soundOne,soundTwo,splash) {
  this.x = x;
  this.y = y;
  this.w = size;
  this.h = this.w * 0.64;
  this.img = img;
  this.sounds = [soundOne,soundTwo];
  this.splash = splash;
  this.dropped = false;
  this.vx = 2;
  this.vy = -7;
  this.angle = 0;
  this.speed = 1;
}

// handleCollision()
//
//
Soap.prototype.handleCollision = function(player) {
  push();
  rectMode(CORNER);
  if (collideRectRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h,player.x-player.w/2,player.y-player.h/2,player.w,player.h)) {
    this.vx  = -this.vx + player.vx;
    this.vy = -this.vy + player.vy;
    this.sounds[0].playMode("untilDone");
    this.sounds[0].play();
    reverse(this.sounds);
  }
  // Variables to hold collision data
  var hitLeftWall = collideLineRect(0,-1000,0,height,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
  var hitRightWall = collideLineRect(gameWidth,-1000,gameWidth,height,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
  // If soap hit a wall, set the velocity to a value that will
  // send the soap back towards the middle (avoid repeated bouncing off either wall)
  // (positive velocity if it hit the left wall, negative if it hit the right)
  if (hitLeftWall) {
    this.vx = random(2,4);
  }
  else if (hitRightWall) {
    this.vx = random(-2,-4);
  }
  pop();

  this.angle = atan(this.vy/this.vx);
  this.x += this.vx;
  this.y += this.vy;
  this.vy += 0.2;
}

// checkIfDropped()
//
// Checks if soap has fallen off bottom of canvas and
// returns true if so
Soap.prototype.checkIfDropped = function() {
  // If y position is greater than height of canvas
  if (this.y - this.h/2 > height) {
    if (!this.dropped) {
      this.splash.playMode("untilDone");
      this.splash.play();
      this.dropped = true;
    }

  }
}

// display()
//
// Draw the soap as an image on the screen
Soap.prototype.display = function() {
  push();
  imageMode(CENTER);
  translate(this.x,this.y);
  rotate(this.angle);
  image(this.img,0,0,this.w,this.h);
  pop();
}
