// Bubble
//
// A class to define how a bubble behaves


// Bubble constructor
//
// Sets the properties with the provided arguments
function Bubble(x,y,tx,ty,size,speed,img,duck) {
  this.x = x;
  this.y = y;
  this.w = size;
  this.h = size;
  this.initW = size;
  this.initH = size;
  this.vx = 0;
  this.vy = 0;
  this.tx = tx;
  this.ty = ty;
  this.speed = speed;
  this.img = img;
  this.a = random(25,125);
  this.duck = duck;
  this.popped = false;

}

// update();
//
// Move bubble down screen according to velocity
Bubble.prototype.update = function() {
  // Regular movement if bubble is not popped
  if (!this.popped) {
    // Move bubble according to Perlin noise for x-velocity
    this.vx = map(noise(this.tx),0,1,-1,1);;
    this.vy = random(0.5,this.speed);

    // Update position with velocity
    this.x += this.vx;
    this.y += this.vy;
    // Constrain to game area
    this.x = constrain(this.x,0,gameWidth - this.w/2);

    this.tx += 0.01;
    this.ty += 0.01;
  }
  // If bubble is popped make it ... look like it popped
  else if (this.popped) {
      this.w += 10;
      this.h += 10;
      this.a -= 10;
    // When transparency hits zero, move it quickly downwards
    // so it looks like the duck fell out of the bubble
    if (this.a <= 0) {
      this.vx = 0;
      this.vy = 20;
      this.y += this.vy;
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
// Check if alarm and player overlap and
// turn off alarm if so
Bubble.prototype.handleCollision = function(player) {
  // Check if the alarm overlaps player on x axis
  if (this.x + this.w > player.x && this.x < player.x + player.w) {
    // Check if they overlap on the y axis
    if (this.y + this.h > player.y && this.y < player.y + player.h) {
      // Pop the bubble if it has a duck in it
      if (this.duck) {
        this.popped = true;
      }
    }
  }
}

// display();
//
// Draw the bubble as an ellipse on canvas
Bubble.prototype.display = function () {
  if (!this.popped) {
    stroke(104,241,255);
  }
  else {
    noStroke()
  }
  fill(37,217,255,this.a);
  if (this.duck) {
    imageMode(CENTER);
    image(this.img,this.x,this.y,this.initW,this.initH);
  }
  ellipse(this.x,this.y,this.w,this.h);

}
