// Timer
//
// A class to define how a timer behaves
// Including countdown

// Timer constructor
//
// Sets the properties with the provided arguments
function Timer(x,y,font,size,duration) {
  // Properties to define positon, size and font (for display)
  this.x = x;
  this.y = y;
  this.font = font;
  this.size = size;
  // Properties to set duration, track start time and time remaining
  this.duration = duration;
  this.startTime = 0;
  this.timeRemaining = 0;
  // Booleans to track if timer is running
  // or finished counting down
  this.running = false;
  this.finished = false;
}

// countDown()
//
// Set timer from start time and reverse direction to count down
// from duration instead of up from zero
Timer.prototype.countDown = function() {
  // If timer is running
  if (this.running) {
    // Calculate time remaining in seconds
    this.timeRemaining = Math.ceil(this.duration - (millis()-this.startTime) / 1000);
    // Constrain so it doesn't count below zero
    this.timeRemaining = constrain(this.timeRemaining,0,this.duration);
    // If timer hits zero set it to finished
    if (this.timeRemaining <= 0) {
      this.finished = true;
      this.running = false;
    }
  }
}

// display()
//
// Draw the timer as text on screen
Timer.prototype.display = function() {
  textSize(this.size);
  textFont(this.font);
  fill(255,0,0);
  text(this.timeRemaining,this.x,this.y);
}
