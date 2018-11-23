// Door
//
// A class to define how a door behaves
// Including opening and entering


// Door constructor
//
// Sets the properties with the provided arguments
function Door(x,y,w,speed) {
  this.x = x;
  this.y = y;
  this.w = w;

  this.h = this.w * 1.5;

  // Vertices of quadrilateral that represents a door
  //
  // top left
  this.x1 = this.x;
  this.y1 = this.y;
  // top right
  this.x2 = this.x + this.w;
  this.y2 = this.y;
  // bottom right
  this.x3 = this.x + this.w;
  this.y3 = this.y + this.h;
  // bottom left
  this.x4 = this.x;
  this.y4 = this.y + this.h;

  // Speed & velocities for opening and entering through door
  this.speed = speed;
  this.vx = speed;
  this.vy = this.vx/3;

  // Tracks if door has been opened
  this.opened = false;

}

// display()
//
// Draws the door on the canvas
Door.prototype.display = function() {
  // Draw what's behind the door
  // For now a black space represented as a rectangle
  rectMode(CENTER);
  fill(0);
  rect(this.x + this.w/2,this.y + this.h/2,this.w,this.h);
  // Draw the outer door as a white quadrilateral
  // until it has been opened
  if (this.x2 > this.x1) {
    push();
    fill(255);
    quad(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);
    pop();
  }
}

// open()
//
// Moves the right-hand vertices of the outer door
// according to relative velocities
// Simulates the appearance of opening inwards
Door.prototype.open = function() {
  if (this.x2 > this.x1 && this.x3 > this.x4) {
    // Move vertices leftwards along x axis
    this.x2 -= this.vx;
    this.x3 -= this.vx;

    // Move vertices towards center along y axis
    this.y2 += this.vy;
    this.y3 -= this.vy;
    // Constrain so they don't move too far towards center
    this.y2 = constrain(this.y2,this.y1,this.y1 + this.w/3);
    this.y3 = constrain(this.y3,this.y4 - this.w/3,this.y4);

  }
  else {
    this.opened = true;
  }
}


// enter()
//
// Centers door on canvas and
// increases it's size until it fills screen
Door.prototype.enter = function() {
  // Only works if the door has been opened
  if (this.opened) {
    // Move the open door towards the center of the canvas
    if (this.x + this.w/2 > width/2) {
      this.x -= 0.5;
    }
    else if (this.x + this.w/2 < width/2) {
      this.x += 0.5;
    }

    if (this.y + this.h/2 > height/2) {
      this.y -= 0.5;
    }
    else if (this.y + this.h/2 < height/2) {
      this.y += 0.5;
    }

    console.log(this.y + "   " + this.x);

    // At the same time increase the width
    if (this.w < width) {
      this.w = this.w * 1.5;
      console.log("width: " + this.w);
    }
    // Maintain height in relation to width
    this.h = this.w * 1.5;
  }
  // if door is closed, log a message to the console
  else {
    console.log("Sorry, that door is closed");
  }
}

// isChosen
//
// Checks if mouse has clicked on door
// and if so returns true
Door.prototype.isChosen = function() {
  // Checks if mouse overlaps on x axis
  if (mouseX > this.x && mouseX < this.x + this.w) {
    // Checks if mouse overlaps on y axis
    if (mouseY > this.y && mouseY < this.y + this.h) {
      return true;
    }
  }
}
