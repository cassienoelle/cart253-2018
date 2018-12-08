// Alarm
//
// A class to define how a bubble behaves


// Bubble constructor
//
// Sets the properties with the provided arguments
function Bubble(x,y,tx,ty,size,speed,img,duck) {
  this.x = x;
  this.y = y;
  this.w = size;
  this.h = size;
  this.vx = 0;
  this.vy = 0;
  this.tx = tx;
  this.ty = ty;
  this.speed = speed;
  this.img = img;
  this.a = random(25,125);
  this.duck = duck;

}

// update();
//
// Move bubble down screen according to velocity
Bubble.prototype.update = function() {
  // Move bubble according to Perlin noise for x-velocity
  this.vx = map(noise(this.tx),0,1,-1,1);;
  this.vy = random(0.5,this.speed);

  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
  // Constrain to game area
  this.x = constrain(this.x,0,gameWidth - this.w/2);

  this.tx += 0.01;
  this.ty += 0.01;

}

// duck()
//
// Display image inside the bubble and set duck to true
Bubble.prototype.duck = function() {

}



// display();
//
// Draw the bubble as an ellipse on canvas
Bubble.prototype.display = function () {
  stroke(29,165,255);
  fill(37,217,255,this.a);
  if (this.duck) {
    imageMode(CENTER);
    image(this.img,this.x,this.y,this.w,this.h);
  }
  ellipse(this.x,this.y,this.w,this.h);

}
