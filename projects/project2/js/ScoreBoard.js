// ScoreBoard
//
// A class to define how a score board behaves.
// Tracks points from paddle class and displays on screen
// ScoreBoard constructor
//
// Sets the properties with the provided arguments
function ScoreBoard(x,y,font,size,red,green,blue) {
  this.x = x;
  this.y = y;
  this.font = font;
  this.size = size;
  this.red = red;
  this.green = green;
  this.blue = blue;
}

// display()
//
// Draw the score board on the screen
ScoreBoard.prototype.display = function(paddle) {
  textAlign(CENTER);
  fill(this.red,this.green,this.blue);
  textSize(this.size);
  textFont(this.font);
  text(paddle.points,this.x,this.y);
}
