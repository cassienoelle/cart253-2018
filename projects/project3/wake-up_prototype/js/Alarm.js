// Alarm
//
// A class to define how an alarm behaves
// Including moving around screen randomly,
// playing sound, mapping sound volume,
// displaying as animation

// Alarm constructor
//
// Sets the properties with the provided arguments
function Alarm(x,y,size,speed,sound,minVolume,maxVolume,img,imgTwo) {
  // Properties to track size and speed
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;
  this.w = size;
  this.h = size;
  // Images to represent alarm
  this.imgs = [img,imgTwo];
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
  this.maxDistance = dist(0 + this.w/2,0 + this.h/2,gameWidth - player.w/2,height-player.h/2);
  // Set minimum distance
  this.minDistance = 0;
  // Return the distance
  return this.distance;
}

// collision(player)
//
// Check if alarm and player overlap and
// turn off alarm if so
Alarm.prototype.collision = function(player) {
  // Check if the alarm overlaps player on x axis
  if (this.x + this.w/2 > player.x && this.x < player.x + player.w/2) {
    // Check if they overlap on the y axis
    if (this.y + this.h/2 > player.y && this.y < player.y + player.h/2) {
      // Return true
      return true;
    }
  }
}


// updateSound()
//
// Increase or decrease the volume of the alarm sound
// mapped to values passed as arguments
Alarm.prototype.updateSound = function(value,minValue,maxValue) {
  // map current volume according to the values passed
  var n = map(value,minValue,maxValue,this.minVolume,this.maxVolume,true);
  // invert scale
  this.currentVolume = this.maxVolume - n;
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
// Constrain position to remain within game area
Alarm.prototype.update = function() {
  // Every five seconds, change velocity
  if (frameCount % (60 * 5) === 0 || frameCount === 1) {
    this.vx = random(-this.speed,this.speed);
    this.vy = random(-this.speed,this.speed);
  }

  // Update position according to velocity
  this.y += this.vy;
  this.x += this.vx;

  // Constrain to stay on screen
  this.y = constrain(this.y,0 + this.h/2,height-this.h/2);
  this.x = constrain(this.x,0 + this.w/2,gameArea.w-this.w/2);

  // Bounce off edge of canvas
  // Along x-axis
  if (this.x - this.w/2 === 0 || this.x + this.w/2 === gameWidth) {
    this.vx = -this.vx;
  }
  // Along y-axis
  if (this.y - this.h/2 === 0 || this.y + this.h/2 === height) {
    this.vy = -this.vy;
  }

}

// displace()
//
// Randomly change position of the alarm within game area
Alarm.prototype.displace = function() {
  this.x = random(0 + this.w/2, gameWidth - this.w/2);
  this.y = random(0 + this.h/2, height - this.h/2);
}


// display()
//
// Draw the alarm as an image on the screen
Alarm.prototype.display = function() {
  // Set reference point to center
  imageMode(CENTER);
  // Switch between images to create basic animation
  if (frameCount % 5 === 0) {
    reverse(this.imgs);
  }
  // Draw images on canvas
  image(this.imgs[0],this.x,this.y,this.w,this.h);

}
