// Door
//
// A class to define how a door behaves
// Including opening and entering


// Door constructor
//
// Sets the properties with the provided arguments
function Door(x,y,w,speed) {
  this.x = x;
  this.y = y;
  this.w = w;

  this.h = this.w * 1.5;

  // Vertices of quadrilateral that represents a door
  //
  // top left
  this.x1 = this.x;
  this.y1 = this.y;
  // top right
  this.x2 = this.x + this.w;
  this.y2 = this.y;
  // bottom right
  this.x3 = this.x + this.w;
  this.y3 = this.y + this.h;
  // bottom left
  this.x4 = this.x;
  this.y4 = this.y + this.h;

  // Speed & velocities for opening and entering through door
  this.speed = speed;
  this.vx = speed;
  this.vy = this.vx/3;

  // Tracks if door has been opened
  this.opened = false;

}

// display()
//
// Draws the door on the canvas
Door.prototype.display = function() {
  // Draw what's behind the door
  fill(0);
  rect(this.x,this.y,this.w,this.h);
  // Draw the outer door as a quadrilateral until it is open
  if (this.x2 > this.x1) {
    push();
    fill(255);
    quad(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);
    pop();
  }
}

// open()
//
// Moves the right-hand vertices of the door
// according to relative velocities
// Simulates the appearance of opening inwards
Door.prototype.open = function() {
  if (this.x2 > this.x1 && this.x3 > this.x4) {
    // Move vertices leftwards along x axis
    this.x2 -= this.vx;
    this.x3 -= this.vx;

    // Move vertices towards center along y axis
    this.y2 += this.vy;
    this.y3 -= this.vy;
    // Constrain so they don't move too far towards center
    this.y2 = constrain(this.y2,this.y1,this.y1 + this.w/3);
    this.y3 = constrain(this.y3,this.y4 - this.w/3,this.y4);

  }
  else {
    this.opened = true;
  }
}


// enter()
//
// Increases size of door until it fills screen to simulate entering
Door.prototype.enter = function() {
  // Move upper left corner towards upper left corner of
  // canvas at half speed
  if (this.x > 0) {
    this.x -= this.speed/2;
    console.log("x: " + this.x);
    }

  if (this.y > 0) {
    this.y -= this.speed/2;
    console.log("y: " + this.y);
  }

  // Increase width at a faster speed
  if (this.w < width) {
    this.w += this.speed * 6;
    console.log("width: " + this.w);
  }
  // Maintain height in relation to width
  this.h = this.w * 1.5;
}
