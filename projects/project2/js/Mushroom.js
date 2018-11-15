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
// checks for bouncing on upper or lower edgse
Mushroom.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  var leftMargin = this.size * 2 + leftPaddle.w * 3;
  var rightMargin = this.size * 2 + rightPaddle.w * 3;
  if (this.x === 0 + leftMargin || this.x === this.size - rightMargin) {
    this.vx = -this.vx;
  }
}

// handleCollision(object)
//
// Check if the mushroom overlaps the object passed as an argument
// and if so return true
Mushroom.prototype.handleCollision = function(object) {
  // Check if the object passed is a paddle
  if (object instanceof Paddle) {
    // Check if the mushroom overlaps the paddle on x axis
    if (this.x + this.size > object.x && this.x < object.x + object.h) {
      // Check if the mushroom overlaps the paddle on y axis
      if (this.y + this.size > object.y && this.y < object.y + object.h) {
        // If so
        if (!object.grown) {
          object.grow();
          object.grown = true;
        }
      }
    }
  }
  else if (object instanceof Paddle === false) {
    if (dist(this.x,this.y,object.x,object.y) < this.size/2 + (object.w/2 || object.size/2)){
      if (!object.grown) {
        object.grow();
        object.grown = true;
      }
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
