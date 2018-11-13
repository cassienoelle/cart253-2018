// Chaser
//
// A class to define how a chaser behaves
// including chasing after the ball

// Chaser constructor
//
// Sets the properties with the provided arguments
function Chaser(img,x,y,w,h,tx,ty,speed) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = map(noise(this.tx),2,8,-this.speed,this.speed);
  this.vy = map(noise(this.ty),2,8,-this.speed,this.speed);
  this.tx = tx;
  this.ty = ty;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edges, checks for going
// off left or right side.
Chaser.prototype.update = function () {
  // Update velocity with Perlin noise
  this.vx = map(noise(this.tx),0,1,-this.speed,this.speed);
  this.vy = map(noise(this.ty),0,1,-this.speed,this.speed);

  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
  // Constrain to area in center of canvas
  // Use margins to keep away from paddles
  var leftMargin = this.w/2 + leftPaddle.w;
  var rightMargin = this.w/2 + rightPaddle.w;
  this.x = constrain(this.x,0 + leftMargin,width - rightMargin);
  this.y = constrain(this.y,0 + this.h/2,height - this.h/2);

  this.tx += 0.01;
  this.ty += 0.01;

}


// handleCollision(paddle)
//
// Check if the mushroom overlaps the paddle passed as an argument
// and if so return true
Chaser.prototype.handleCollision = function(ball) {

  if (dist(this.x,this.y,ball.x,ball.y) < this.w/2 + ball.size/2){
      return true;
    }
}


// display()
//
// Display mushroom image
Chaser.prototype.display = function() {
  imageMode(CENTER);
  image(this.img,this.x,this.y,this.w,this.h);
}
