// Title
//
// A class to define how a title object behaves
// including shrinking, growing and rotating

// Title constructor
//
// Sets the properties with the provided arguments
function Title(img,x,y,size) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.size = size;
  this.shrunk = false;
  this.angle = 0;
  this.sizeChange = 1;
}

// shrink()
//
// Shrink title image until it disappears

Title.prototype.shrink = function() {
  if (!this.shrunk) {
    translate(width/2,height/2);
    this.x = 0;
    this.y = 0;
    rotate(this.angle);
    scale(this.sizeChange);
    this.angle += 0.03;
    this.sizeChange -= 0.005;
    this.sizeChange = constrain(this.sizeChange,0,1);
    console.log(this.sizeChange);
  }

  if (this.sizeChange === 0) {
    this.shrunk = true;
  }
}

// grow()
//
// Grow title image until it engulfs canvas
Title.prototype.grow = function() {
  if (this.size < windowWidth*45) {
    this.size += this.size/35;
  }
}

// display()
//
// Display title image
Title.prototype.display = function() {
  imageMode(CENTER);
  image(this.img,this.x,this.y,this.size,this.size);
}
