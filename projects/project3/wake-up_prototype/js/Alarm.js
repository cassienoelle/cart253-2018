// Alarm
//
// A class to define how an alarm behaves
// Including moving around screen randomly,
// playing sound, altering sound volume

// Alarm constructor
//
// Sets the properties with the provided arguments
function Alarm(x,y,size,speed,sound,minVolume,maxVolume) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;
  this.w = size;
  this.h = size;
  this.sound = sound;
  this.minVolume = minVolume;
  this.maxVolume = maxVolume;
  this.currentVolume;
  this.distance;
  this.maxDistance;
  this.minDistance;
}

// distanceFrom(player)
//
// Calculate the distance between the alarm and
// the object passed as an argument and increase or
// decrease the volume of the sound accordingly
Alarm.prototype.distanceFrom = function(player) {
  this.distance = dist(this.x,this.y,player.x,player.y);
  // Calculate maximum possible distance between the two
  // objects on the canvas and set as variable
  this.maxDistance = dist(0,0,width,height);
  // Set minimum distance
  this.minDistance = 1;
  // Return the distance
  return this.distance;
}

// updateVolume()
//
// Increase or decrease the volume of the alarm sound
// According to another scaled value (assume that scale begins at zero)
Alarm.prototype.updateVolume = function(value,maxValue) {
  // Calculate current volume according to the value passed
  // (translate to same point along scale)
  currentVolume = (value/maxValue) * this.maxVolume;
  // Constrain volume to minimum and maximum volumes
  currentVolume = constrain(currentVolume,this.minVolume,this.maxVolume);
  console.log("current volume: " + currentVolume);
  // Set sound volume to current volume
  this.sound.setVolume(this.currentVolume);
}



// update()
//
// Update the x and y position based on velocity
// Constrain position to remain on canvas
Alarm.prototype.update = function() {
  this.y += this.vy;
  this.x += this.vx;

  this.y = constrain(this.y,0 + this.h/2,height-this.h/2);
  this.x = constrain(this.x,0 + this.w/2,width-this.w/2);
}

// display()
//
// Draw the alarm as a rectangle on the screen
Alarm.prototype.display = function() {
  // Set reference point of rectangle to center
  rectMode(CENTER);
  // Set color to red
  fill(255,0,0);
  // Draw the rectangle
  rect(this.x,this.y,this.w,this.h);
}
