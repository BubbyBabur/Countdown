
class Countdown{
  
  constructor(timer){
    
    this.center = new Center(timer);
    this.system = new System(timer);
    
    this.timer = timer;
    
    this.pomp = loadSound("pomp.mp3");
    this.pomp.setVolume(0.2);
    
    this.button = createButton('Click me to unmute!');
    this.button.mousePressed( () => {this.pomp.loop(); this.button.hide()} );
    
    this.tiger = loadImage("Tiger.png");
    this.endedTimer = 0;
    this.name = new NameSystem(timer);
    
    this.slideshow = new Slideshow();
    
  }
  
  update(){
    
    if(this.slideshow.ended){
      background(0);
    } else if(this.endedTimer > 2*64 && !this.slideshow.ended){
      clear();
    } else {
      background(255);
    }
    
    if(this.timer.getDiffTime() >= 11){
      this.name.update();
      this.name.display(0);
      this.center.update();
      this.center.display();
      this.system.update();
    } else if(this.endedTimer <= 2*64){
      this.center.countdownDisplay();
      this.center.update();
    } else if(!this.slideshow.ended) {
      this.slideshow.update();
      this.system.update();
    } else {
      this.endDisplay();
      this.system.update();
      this.name.update();
      this.name.display(255);
    }
    
    if(this.timer.done){
      
      if(this.endedTimer === 2 * 64){
        this.pomp.stop();
        this.pomp.setVolume(1);
        this.pomp.play();
      }
      
      this.endedTimer++;
      if(this.endedTimer <= 2 * 64){
        fill(255,255,255,this.endedTimer * 255 / (2 * 64));
      } else {
        fill(255,255,255,( 4 * 64 - this.endedTimer ) * 255 / (2 * 64));
      }
      rect(0,0,width,height);
    }
    
  }
  
  endDisplay(){
    
    fill("white");
    image(this.tiger,windowWidth/2 , windowHeight*3/4, width, width/4 );
    
    textSize(width/30);
    text("Congrats to the Gunn Class of 2024's",windowWidth/2 , windowHeight*1/8);
    text("Graduation from Ellen Fletcher Middle Squal",windowWidth/2 , windowHeight /4);
    text("We're all now high squallers!",windowWidth/2 , windowHeight*3/8);
    
  }
}

