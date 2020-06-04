class Center {
  
  constructor(timer,label){
    this.timer = timer;
    
    this.rings = [];
    this.rings.push(new Ring("6 (3).png",460,6,9,this.timer));
    this.rings.push(new Ring("8 (2).png",380,8,8,this.timer));
    this.rings.push(new Ring("10 (5).png",320,10,5,this.timer));
    this.rings.push(new Ring("14 (7).png",280,14,3,this.timer));
    
    this.bg = loadImage("Background.png");
    
    this.pos = createVector(0,0);
    
    this.label = label || "until squal ends!";
    
  }
  
  update(){
    
    this.pos = createVector(mouseX - windowWidth/2,mouseY - windowHeight/2);
    this.pos.mult(-0.1);
    
  }
  
  countdownDisplay(){
    image(this.bg,windowWidth/2 + this.pos.x,windowHeight/2 + this.pos.y,450,450);
    for (let ring of this.rings){
      ring.update(this.pos.x,this.pos.y);
    }
    fill("#3A3042");
    textSize(150);
    text(this.timer.second(),windowWidth/2 + this.pos.x,windowHeight/2 + this.pos.y + 12);
    
    noStroke();
    textSize(40);
    text(this.label,windowWidth/2+this.pos.x,windowHeight/2+this.pos.y + 250);
    
  }
  
  display(){
    image(this.bg,windowWidth/2 + this.pos.x,windowHeight/2 + this.pos.y,450,450);
    
    for (let ring of this.rings){
      ring.update(this.pos.x,this.pos.y);
    }
    
    fill("#3A3042");
    textSize(50);
    text(CTime.toString(this.timer.day()),windowWidth/2+this.pos.x - 40 , windowHeight/2 +this.pos.y-40);
    text(CTime.toString(this.timer.hour()),windowWidth/2+this.pos.x + 40 , windowHeight/2+this.pos.y-40);
    text(CTime.toString(this.timer.minute()),windowWidth/2+this.pos.x - 40 , windowHeight/2 +this.pos.y+30);
    text(CTime.toString(this.timer.second()),windowWidth/2+this.pos.x + 40 , windowHeight/2+this.pos.y+30);
    
    textSize(20);
    text("Days",windowWidth/2+this.pos.x - 40 , windowHeight/2 +this.pos.y - 10);
    text("Hrs",windowWidth/2+this.pos.x + 40 , windowHeight/2 +this.pos.y - 10);
    text("Mins",windowWidth/2+this.pos.x - 40 , windowHeight/2 +this.pos.y + 60);
    text("Secs",windowWidth/2+this.pos.x + 40 , windowHeight/2 +this.pos.y + 60);
    
    textSize(40);
    text(this.label,windowWidth/2+this.pos.x,windowHeight/2+this.pos.y + 250);
    
  }
  
}