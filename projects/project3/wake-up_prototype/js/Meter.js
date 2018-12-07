// Meter
//
// A class to define how a meter behaves

// Meter constructor
//
// Sets the properties with the provided arguments
function Meter(x,y,size,r,g,b,title,font) {
  this.x = x;
  this.y = y;
  this.w = size;
  this.maxW = size;
  this.h = size / 6;
  this.r = r;
  this.g = g;
  this.b = b;
  this.font = font;
  this.title = title;
}

// display()
//
// Draw the meter as a rectange with title text on screen
Meter.prototype.display = function () {
  rectMode(CORNER);
  noStroke();

  // Draw frame, 2px on either side of meter
  push();
  fill(0);
  rect(this.x - 2,this.y - 2,this.maxW + 4,this.h + 4);
  pop();
  push();
  fill(255);
  rect(this.x,this.y,this.maxW,this.h);

  // Draw main rectangle (health-meter style)
  push();
  fill(this.r,this.g,this.b);
  rect(this.x,this.y,this.w,this.h);
  pop();

  // Draw title text above rectangles
  push();
  fill(0);
  textFont(this.font);
  textSize(this.h);
  text(this.title,this.x,this.y - this.h/2);
  pop();


}

// update()
//
// Change the width of the meter by amount passed as argument
Meter.prototype.update = function(amount) {
  this.w += amount;
  // Constrain to maximum width (meter can't go beyond 100%)
  this.w = constrain(this.w,0,this.maxW);
}
