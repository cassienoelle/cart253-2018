// Shower
//
// A class to define how a shower behaves
// Including moving downwards across canvas in a stream
// and changing opacity


// Shower constructor
//
// Sets the properties with the provided arguments
function Shower(x,y,w,speed,r,g,b,a) {
  // Properties to define position, width and height
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = 0;
  // Speed and velocity
  this.speed = speed;
  this.vx = 0;
  this.vy = 0;
  // Color and opacity
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

// update()
//
// increase height according to velocity so it appears as a
// stream of water moving downwards and then fade away
Shower.prototype.update = function() {
  this.vy += this.speed;
  this.h += this.vy;
  // Fade once it surpasses the height of the canvas
  if (this.h > height) {
    this.a -= 0.1;
  }
}

// display()
//
// Draw shower stream as a thing rectangle/line on screen
Shower.prototype.display = function() {
  // Set reference point to upper left corner
  rectMode(CORNER);
  // Draw as a semi-transparent thin rectangle
  fill(this.r,this.g,this.b,this.a);
  rect(this.x,this.y,this.w,this.h);
}
