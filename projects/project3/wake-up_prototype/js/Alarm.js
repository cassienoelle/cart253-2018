// Alarm
//
// A class to define how an alarm behaves
// Including moving around screen randomly,
// playing sound, altering sound volume

// Alarm constructor
//
// Sets the properties with the provided arguments
function Alarm(x,y,size,speed,sound,minVolume,maxVolume) {
  // Properties to track size and speed
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;
  this.w = size;
  this.h = size;
  // Properties to set and calculate distance
  // from another object
  this.distance;
  this.maxDistance;
  this.minDistance;
  // Properties to handle sound
  this.sound = sound;
  this.minVolume = minVolume;
  this.maxVolume = maxVolume;
  this.currentVolume;

}

// distanceFrom(player)
//
// Calculate the distance between the alarm
// and the object passed as an argument and return distance
// Set maximum possible distance based on canvas side
Alarm.prototype.distanceFrom = function(player) {
  // Calculate the distance between the two objects
  this.distance = dist(this.x,this.y,player.x,player.y);
  // Calculate maximum possible distance between the two
  // objects on the canvas and set as variable
  this.maxDistance = dist(0,0,width,height);
  // Set minimum distance
  this.minDistance = 1;
  // Return the distance
  return this.distance;
}

// collision(player)
//
// Check if alarm and player overlap and
// turn off alarm if so
Alarm.prototype.collision = function(player) {
  // Check if the alarm overlaps player on x axis
  if (this.x + this.w > player.x && this.x < player.x + player.w) {
    // Check if they overlap on the y axis
    if (this.y + this.h > player.y && this.y < player.y + player.h) {
      // Return true
      return true;
    }
  }
}


// updateSound()
//
// Increase or decrease the volume of the alarm sound
// According to another scaled value (assume that scale begins at zero)
Alarm.prototype.updateSound = function(value,maxValue) {
  // Calculate current volume according to the value passed
  // (translate to point along scale)
  this.currentVolume = (value/maxValue) * this.maxVolume;
  // Constrain volume to minimum and maximum volumes
  this.currentVolume = constrain(this.currentVolume,this.minVolume,this.maxVolume);
  // Set sound volume to current volume
  this.sound.setVolume(this.currentVolume);

  // Set play mode and loop sound
  this.sound.playMode("untilDone");
  this.sound.loop = true;
}

// update()
//
// Update the x and y position based on velocity
// Move alarm randomly around canvas
// Constrain position to remain on canvas
Alarm.prototype.update = function() {
  // Every three seconds, change velocity
  if (frameCount % 180 === 1) {
    this.vx = random(-this.speed,this.speed);
    this.vy = random(-this.speed,this.speed);
  }

  // Update position according to velocity
  this.y += this.vy;
  this.x += this.vx;

  // Constrain to stay on screen
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
