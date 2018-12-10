// Block
//
// A class to define how a block behaves
// Including changing transparency

// Block constructor
//
// Sets the properties with the provided arguments
function Block(x,y,w,h,r,g,b,a) {
  // Properties to define position, size and color
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  // Control to initiate transparency changes
  this.control = 0;
  // Property representing the position of left edge
  this.left = this.x - this.w/2;
}

// fade()
//
// Changes transparency to fade in and out
Block.prototype.fade = function() {
  switch(this.control) {
    case 0:
      // initiate fade every 10 seconds
      if (frameCount % 600 === 0) {
        this.control = 1;
      }
      break;
    case 1:
      // reduce alpha value to 200 to make partially transparent
      if (this.a > 200) {
        this.a --;
      }
      else {
        this.control = 2;
      }
      break;
    case 2:
      // Then increase back up to 255
      if (this.a < 255) {
        this.a ++;
      }
      // Reset until triggered again
      else {
        this.control = 0;
        break;
      }
    default:
      break;
  }

}
// display()
//
// Draw block as a rectangle on screen
Block.prototype.display = function() {
  // Reference point center
  rectMode(CENTER);
  noStroke();
  fill(this.r,this.g,this.b,this.a);
  rect(this.x,this.y,this.w,this.h);
}
