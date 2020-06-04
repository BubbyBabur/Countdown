class Name {
  
  constructor(pos,vel,name,life){
    this.name = name;
    this.pos = pos;
    this.vel = vel;
    this.life = life;
    
    this.ended = false;
    
  }
  
  
  update(){
    
    this.life --;
    
    this.pos.add(this.vel);
    
    if(this.life <= 0){
      this.ended = true;
    }
  }
  
  display(g){
    
    fill(g,g,g,5*this.life);
    
    textSize(10);
    text("Thank you to",this.pos.x,this.pos.y - 30);
    textSize(40);
    text(this.name,this.pos.x,this.pos.y);
  }
  
}

class NameSystem {
  
  constructor(timer){
    
    this.names = loadJSON("names.json");
    
    this.objs = [];
    
    this.curr = 0;
    this.rate = 128;
    
    this.timer = timer;
    
  }
  
  update(){
    
    if(this.curr % this.rate === 0 && (this.timer.getDiffTime() > 15 || this.timer.done) ){
      
      this.curr = 0;
      let pos;
      let vel;
      if(random() < 0.5){
        pos = createVector(-50,random(0,height)); 
        vel = createVector(2,0);
      } else {
        pos = createVector(width+50,random(0,height)); 
        vel = createVector(-2,0);
      }
      
      let n = floor(random(0,this.names.names.length));
      
      this.objs.push(new Name(pos,vel,this.names.names[n], 256 ));
      
    }
    
    for(var i = 0; i < this.objs.length; i++){
      
      
      this.objs[i].update();
      
      if(this.objs[i].ended){
        this.objs.splice(i,1);
        i--;
      }
      
    }
    
    this.curr++;
    
  }
  
  display(g){
    for(let obj of this.objs){
      obj.display(g);
    }
  }
  
}
