// Timer
//
// A class to define how a timer behaves

// Timer constructor
//
// Sets the properties with the provided arguments
function Timer(x,y,font,size,duration) {
  this.x = x;
  this.y = y;
  this.font = font;
  this.size = size;
  this.duration = duration;
  this.startTime = 0;
  this.font = font;
  this.running = false;
  this.finished = false;
  this.timeRemaining = 0;
}

// countDown()
//
//
Timer.prototype.countDown = function() {
  if (this.running) {
    console.log("running");
    this.timeRemaining = Math.ceil(this.duration - (millis()-this.startTime) / 1000);
    this.timeRemaining = constrain(this.timeRemaining,0,this.duration);
    if (this.timeRemaining <= 0) {
      this.finished = true;
      this.running = false;
    }
  }
}

Timer.prototype.display = function() {
  textSize(this.size);
  textFont(this.font);
  fill(255,0,0);
  text(this.timeRemaining,this.x,this.y);
}
