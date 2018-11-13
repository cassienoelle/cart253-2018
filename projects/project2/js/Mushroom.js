// Mushroom
//
// A class to define how a mushroom behaves
//

// Mushroom constructor
//
// Sets the properties with the provided arguments
function Mushroom(img,x,y,vx,vy,size) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Mushroom.prototype.update = function () {
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


// handleCollision(paddle)
//
// Check if the mushroom overlaps the paddle passed as an argument
// and if so return true
Mushroom.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so
      return true;
    }
  }
}


// display()
//
// Display mushroom image
Mushroom.prototype.display = function() {
  imageMode(CENTER);
  image(this.img,this.x,this.y,this.size,this.size);
}
