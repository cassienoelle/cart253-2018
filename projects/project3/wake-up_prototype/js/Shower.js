// Shower
//
// A class to define how a bubble behaves


// Shower constructor
//
// Sets the properties with the provided arguments
function Shower(x,y,w,speed,r,g,b,a) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = 0;
  this.speed = speed;
  this.vx = 0;
  this.vy = 0;
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
  if (this.h > height) {
    this.a -= 0.1;
  }
}

// display()
//
// Draw shower stream as shape on screen
Shower.prototype.display = function() {
  fill(this.r,this.g,this.b,this.a);
  rectMode(CORNER);
  rect(this.x,this.y,this.w,this.h);
}
