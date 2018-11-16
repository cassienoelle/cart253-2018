// Instruction
//
// A class to define how an instruction object behaves
// including shrinking, growing and rotating

// Instruction constructor
//
// Sets the properties with the provided arguments
function Instruction(img,x,y,size,title,subtitle) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.size = size;
  this.title = title;
  this.subtitle = subtitle;
  this.shrunk = false;
  this.angle = 0;
  this.sizeChange = 1;

  this.initX = x;
  this.initY = y;
  this.initSize = size;
}

// shrink()
//
// Shrink title image until it disappears

Instruction.prototype.shrink = function() {
  console.log("shrunk run");
  if (!this.shrunk) {
    translate(width/2,height/2);
    this.x = 0;
    this.y = 0;
    rotate(this.angle);
    scale(this.sizeChange);
    this.angle += 0.05;
    this.sizeChange -= 0.008;
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
Instruction.prototype.grow = function() {
  if (this.size < windowWidth*45) {
    this.size += this.size/35;
  }
}

// display()
//
// Display title image
Instruction.prototype.display = function() {
  imageMode(CENTER);
  image(this.img,this.x,this.y,this.size,this.size);
}

// reset()
//
// Reset position and size to key initial values
Instruction.prototype.reset = function() {
  // Reset position and size to intial values passed through parameters
  this.x = this.initX;
  this.y = this.initY;
  this.size = this.initSize;
  // Reset angle and sizeChange so shrink() can be called again
  this.angle = 0;
  this.sizeChange = 1;
}
