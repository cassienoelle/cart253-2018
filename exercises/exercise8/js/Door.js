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
