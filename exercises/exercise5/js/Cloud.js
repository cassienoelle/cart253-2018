//////////////////////// NEW /////////////////////////////

// Cloud
//
// A class that defines how a cloud behaves
// Used during dayttime display when game over

// Cloud constructor
//
// Sets the properties with the provided arguments or defaults
function Cloud(img,x,y,w,h,vx) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = vx;
}

// drift()
//
// Moves cloud from left to right across screen
Cloud.prototype.drift = function() {
  this.x += this.vx;
  // Reset at random y position if goes off right side of screen
  if (this.x > width) {
    this.y = random(this.h,height-this.h); // keep on canvas
    this.x = 0;
  }
}

// display()
//
// Draw a cloud
Cloud.prototype.display = function() {
  fill(255);
  image(this.img,this.x,this.y,this.w,this.h);
}

//////////////////////// END NEW //////////////////////////////
