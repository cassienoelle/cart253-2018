// Note
//
// A class that defines how a music note behaves

// Note constructor
// Ratios:
// Note 1: 360/600
// Note 2: 565/600
// Note 3: 220/600
// Note 4: 180/600
// Note 5: 225/600
// Note 6: 560/600
//
// Sets the properties with the provided arguments or defaults
function Note(img,x,y,w,h,vx,vy) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.w = w;
  this.h = h;
  this.a = 255;
}

// update()
//
// Updates position based on velocity
// Increases transparency as note moves until it disappears
Note.prototype.update = function() {
  // update position with velocity
  this.x += this.vx;
  this.y += this.vy;
  // increase transparency according to velocity
  this.a -= this.vx;
}

// display()
//
// Draws music note on screen
Note.prototype.display = function() {
  // handle transparency
  tint(255,this.a);
  // display note image
  image(this.img,this.x,this.y,this.w,this.h);
}

// freeze()
//
// Freezes movement of note
Note.prototype.freeze = function () {
  this.vx = 0;
  this.vy = 0;
}

// slow()
//
// Slows down movement of note
Note.prototype.slow = function () {
  this.vx = 1;
  this.vy = 1;
}
