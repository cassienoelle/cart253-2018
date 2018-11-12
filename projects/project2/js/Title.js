// Title
//
// A class to define how a title object behaves
// including shrinking when clicked

// Title constructor
//
// Sets the properties with the provided arguments
function Title(img,x,y,size) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.size = size;
  this.shrunk = false;
}

// shrink()
//
// Shrink title image until it disappears

Title.prototype.shrink = function() {
  if (this.size > 2) {
    this.size -= 2;
  }
  else {
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
// Display bottle as image on screen
Title.prototype.display = function() {
  imageMode(CENTER);
  image(this.img,this.x,this.y,this.size,this.size);
}
