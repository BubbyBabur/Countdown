
let CD;
let all;

function preload() {
  
  CD = new CTime(31,12,20,0);
  //CD = new CTime(3,13,42,15);
  all = new Countdown(CD);
  
}
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER,CENTER);
  imageMode(CENTER);
  textFont("Open Sans");
  angleMode(DEGREES);
  
}

function draw() {
  all.update();
}
