
// save this file as sketch.js
// Sketch One
var s = function(p) { // p could be any variable name
  var canvas;
  var w = p.windowWidth * 0.30;
  var h = p.windowHeight;

 p.setup = function() {
   canvas = p.createCanvas(w,h);
 };

 p.draw = function() {
   p.background(0);

 };
};

var myp5 = new p5(s, 'info');


////////////////////////////////
////////////////////////////////
// Sketch Two
var t = function(p) {
  var canvas;
  var w = p.windowWidth * 0.70;
  var h = p.windowHeight;

 p.setup = function() {
   canvas = p.createCanvas(w,h);
 };

 p.draw = function() {
   p.background(100);
 };
};

var myp5 = new p5(t, 'game');
