// Soap
//
// A class to define how a soap behaves
// Including changing transparency

// Soap constructor
//
// Sets the properties with the provided arguments
function Soap(x,y,size,img) {
  this.x = x;
  this.y = y;
  this.w = size;
  this.h = this.w * 0.64;
  this.img = img;
  this.vx = 2;
  this.vy = -7;
  this.angle = 0;
  this.speed = 1;

  this.bottom = this.y + this.h/2;
  this.top = this.y - this.h/2;
  this.left = this.x - this.w/2;
  this.right = this.x + this.w/2;
}

// bounce()
//
//
Soap.prototype.bounce = function(player) {
  push();
  //collideRectRect(x, y, width, height, x2, y2, width2, height2 )
  if (collideRectRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h,player.x-player.w/2,player.y-player.h/2,player.w,player.h)) {
    this.vx  = -this.vx + player.vx;
    this.vy = -this.vy + player.vy;
  }
  pop();

  this.angle = atan(this.vy/this.vx);
  this.x += this.vx;
  this.y += this.vy;
  this.vy += 0.2;

}

// handleCollison(player)
//
//
Soap.prototype.handleCollision = function(player) {

}

// display()
//
// Draw the soap as an image on the screen
Soap.prototype.display = function() {
  push();
  imageMode(CENTER);
  translate(this.x,this.y);
  rotate(this.angle);
  image(this.img,0,0,this.w,this.h);
  pop();
}
