// ScoreBoard
//
// A class to define how a score board behaves.
// Tracks points from paddle class and displays on screen
// ScoreBoard constructor
//
// Sets the properties with the provided arguments
function ScoreBoard(paddleOne,paddleTwo,x,y,w,size,font,red,green,blue) {
  this.paddleOne = paddleOne;
  this.paddleTwo = paddleTwo;

  this.x = x;
  this.y = y;
  this.w = w;
  this.size = size;
  this.font = font;
  // color values
  this.red = red;
  this.green = green;
  this.blue = blue;

  this.score = [0,0];
}

// display()
//
// Draw the score of parameter paddle on the screen
ScoreBoard.prototype.display = function() {
  textAlign(CENTER);
  fill(this.red,this.green,this.blue);
  textSize(this.size);
  textFont(this.font);
  // Get score from each paddle
  this.score[0] = this.paddleOne.points;
  this.score[1] = this.paddleTwo.points;
  // Display points of first paddle at left of score board
  text(this.score[0],this.x,this.y);
  // Display points of second paddle at right of scoreboard
  text(this.score[1],this.w - this.size, this.y);
}
