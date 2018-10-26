// Note
//
// A class that defines how a music note behaves

// Note constructor
//
// Sets the properties with the provided arguments or defaults
function Note(x,y,size,vx,vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.a = alpha(255);
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
// Draws music note as related shapes on screen
Note.prototype.display = function() {
  var r = {
    w: this.size/16,
    h: this.size,
    x: this.x,
    y: this.y
  }

  var e = {
    d: r.w * 6,
    x: this.x - (r.w * 6)/3,
    y: this.y + this.size
  }

  noStroke();
  fill(255,0,0,50);
  imageMode(CENTER);
  rect(r.x,r.y,r.w,r.h);
  ellipse(e.x,e.y,e.d,e.d);
  rect(r.x + r.h,r.y,r.w,r.h);
  ellipse(e.x + r.h,e.y,e.d,e.d);
  rect(r.x + r.w,r.y,r.h-r.w,r.w * 3);

}
