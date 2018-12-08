// Cover
//
// A class to define how a cover behaves
// Including changing transparency

// Block constructor
//
// Sets the properties with the provided arguments
function Block(x,y,w,h,r,g,b,a) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.control = 0;

  this.left = this.x - this.w/2;
}

// fade()
//
// Changes transparency to fade in and out
Block.prototype.fade = function() {
  if (this.control === 0 && frameCount % (60 * 5) === 0) {
    this.control = 1;
  }

  if (this.a > 200 && this.control === 1) {
    this.a --;
    if (this.a === 200) {
      this.control = 2;
    }
  }
  else if (this.a < 255 && this.control === 2) {
    this.a ++;
    if (this.a === 255) {
      this.control = 0;
    }
  }
}

// display()
//
// Draws cover as a rectangle on screen
Block.prototype.display = function() {
  rectMode(CENTER);
  noStroke();
  fill(this.r,this.g,this.b,this.a);
  rect(this.x,this.y,this.w,this.h);
}
