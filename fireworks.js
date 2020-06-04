let G = 0.1;
let fric = 0.001;

class Firework{
  
  constructor(pos,vel,color,mass,num,strength,life){
    this.pos = pos;
    this.vel = vel;
    this.acc = createVector(0,0);
    
    this.mass = mass || 500;
    
    this.trail = [];
    this.exploded = false;
    this.ended = false;
    
    this.color = color;
    
    this.num = num || 50;
    this.strength = strength || 2;
    this.life = life || 64;
    
    this.trailMax = 50;
  }
  
  applyForce(force){
    this.acc.add(force);
  }
  
  isExploded(){
    return this.vel.y >= 0;
  }
  
  update(nodeList){
    
    this.applyForce(createVector(0,G * this.mass));
    
    this.acc.mult( 1 / this.mass );
    this.vel.add(this.acc);
    
    let currMag = this.vel.mag();
    this.vel.normalize();
    this.vel.mult(currMag - fric * currMag);
    
    this.acc.mult(0);
    
    this.pos.add(this.vel);
    
    if(!this.exploded){
      this.trail.push(this.pos.copy());
    }
    
    if(this.trail.length > this.trailMax || this.exploded){
      this.trail.splice(0,1);
    }
    
    if(this.trail.length == 0 && this.exploded){
      this.ended = true;
    }
    
    if(this.isExploded() && !this.exploded){
      
      this.exploded = true;
      
      for(var i = 0; i < this.num; i++){
        
        let vel = p5.Vector.add(this.vel,
                                   p5.Vector.mult(
                                    p5.Vector.random2D(),
                                   this.strength + random(-0.5,0.5)));
        
        nodeList.push(new Particle(this.pos.copy(), vel, this.color,
                                  this.mass / this.num, this.life));
        
      }
    }
    
    this.display();
    
  }
  
  display(){
    
    stroke(this.color);
    strokeWeight(3);
    noFill();
    beginShape();
    for( let node of this.trail ){
      vertex(node.x,node.y);
    }
    endShape();
    
    if(!this.exploded){
      
      fill(lerpColor(this.color,color(255,255,255),0.5) );
      noStroke();
      circle(this.pos.x,this.pos.y, 3 * this.mass / this.num);
      
      fill(255,255,255);
      noStroke();
      circle(this.pos.x,this.pos.y,2 * this.mass / this.num);
      
    }
    
  }
  
}

class FireworkFirework extends Firework {
  
  constructor(pos,vel,color,mass,num,strength,life){
    super(pos,vel,color,mass,num,strength,life);
  }
  
  update(nodeList){
    
    this.applyForce(createVector(0,G * this.mass));
    
    this.acc.mult( 1 / this.mass );
    this.vel.add(this.acc);
    
    let currMag = this.vel.mag();
    this.vel.normalize();
    this.vel.mult(currMag - fric * currMag);
    
    this.acc.mult(0);
    
    this.pos.add(this.vel);
    
    if(!this.exploded){
      this.trail.push(this.pos.copy());
    }
    
    if(this.trail.length > this.trailMax || this.exploded){
      this.trail.splice(0,1);
    }
    
    if(this.trail.length == 0 && this.exploded){
      this.ended = true;
    }
    
    if(this.vel.y >= 0 && !this.exploded){
      
      this.exploded = true;
      
      for(var i = 0; i < this.num; i++){
        
        let vel = p5.Vector.add(this.vel,
                                   p5.Vector.mult(
                                    p5.Vector.random2D(),
                                   this.strength + random(-0.5,0.5)));
        
        nodeList.push(new TimedFirework(this.pos.copy(), vel, this.color,
                                  this.mass / this.num, this.num, 2, 64, this.life));
        
      }
    }
    
    this.display();
    
  }
  
  display(){
    stroke(this.color);
    strokeWeight(3);
    noFill();
    beginShape();
    for( let node of this.trail ){
      vertex(node.x,node.y);
    }
    endShape();
    
    if(!this.exploded){
      
      fill(lerpColor(this.color,color(255,255,255),0.5) );
      noStroke();
      circle(this.pos.x,this.pos.y, 8*sqrt(this.mass) / this.num);
      
      fill(255,255,255);
      noStroke();
      circle(this.pos.x,this.pos.y,5*sqrt(this.mass) / this.num);
      
    }
  }
  
}

class TimedFirework extends Firework{
  
  constructor(pos,vel,color,mass,num,strength,life1,life2){
    super(pos,vel,color,mass,num,strength,life1);
    this.selfLife = life2;
  }
  
  isExploded(){
    return this.selfLife <= 0;
  }
  
  update(nodeList){
    super.update(nodeList);
    this.selfLife--;
  }
  
}

class Particle {
  
  constructor(pos,vel,color,mass,life){
    this.pos = pos;
    this.vel = vel;
    this.acc = createVector(0,0);
    
    this.color = color;
    this.mass = mass || 1;
    this.life = life || 64;
    this.totalLife = this.life;
    
    this.ended = false;
    
    this.trail = [];
    this.maxTrail = 15;
  }
  
  applyForce(force){
    this.acc.add(force);
  }
  
  update(nodeList){
    
    this.applyForce(createVector(0,G * this.mass));
    
    this.acc.mult( 1 / this.mass );
    
    this.vel.add(this.acc);
    
    let currMag = this.vel.mag();
    this.vel.normalize();
    this.vel.mult(currMag - fric * currMag * currMag);
    
    this.acc.mult(0);
    
    this.pos.add(this.vel);
    
    if(frameCount % 3 == 0){
      this.trail.push(this.pos.copy());
    }
    
    if(this.trail.length > this.maxTrail){
      this.trail.splice(0,1);
    }
    
    this.life --;
    
    if(this.life <= 0){
      this.ended = true;
    }
    
    
    this.display();
  }
  
  display(){
    
    stroke(red(this.color),green(this.color),blue(this.color),this.life/this.totalLife * 100);
    noFill();
    strokeWeight(3);
    beginShape();
    for(let node of this.trail){
      vertex(node.x,node.y);
    }
    endShape();
    
    fill(red(this.color),green(this.color),blue(this.color),this.life/this.totalLife * 255);
    noStroke();
    ellipse(this.pos.x,this.pos.y,this.mass,this.mass);
  }
}

class System {
  
  constructor(timer){
    this.nodes = [];
    
    this.rate = 10;
    
    this.curr = 0;
    
    this.timer = timer;
  }
  
  update(){
    
    if(this.timer.hourJustPassed(30)){ 
      this.rate = 3;
    } else {
      this.rate = 10;
    }
    
    this.curr ++;
    
    for(var i = 0; i < this.nodes.length; i++){
      
      if(this.timer.hourJustPassed(30)){
        this.nodes[i].applyForce(createVector(-1,-1));
      }
      
      
      this.nodes[i].update(this.nodes);
      
      if(this.nodes[i].ended){
        this.nodes.splice(i,1);
        i--;
      }
    }
    
    if(this.curr % this.rate === 0 && (this.timer.getDiffTime() >= 15 || this.timer.done)){
      this.curr = 0;
      
      let maxVy = sqrt(2*G*height);
      
      let pos = createVector(random(0,width),height);
      
      let velx;
      if(pos > 3/4*width){
        velx = random(-3,0.2);
      } else if(pos < 1/4 * width){
        velx = random(-0.2,3);
      } else {
        velx = random(-2,2);
      }
      
      let vel = createVector(velx,-random(maxVy/4,maxVy));
      
      let r = random(0,2);
      let g = random(0,1);
      let b = random(0,1.5);
      
      let sum = r + g + b;
      
      let total = 400;
      
      r *= total/sum;
      g *= total/sum;
      b *= total/sum;
      
      let threshold = 0.05;
      
      if(this.timer.getDiffTime() <= 60){
        threshold = 0.5;
      }
      
      if(random() > threshold){
      
        let randConst = random();
        let str = randConst * 7 + 1;
        let num = 20 + randConst * 30;
        let mass = num * random(5,10);
        let life = 40 + 20 * randConst;

        this.nodes.push(new Firework(pos,vel,color(r,g,b), mass, num, str, life) );
        
      } else {
        
        let randConst = random();
        let str = randConst * 7 + 1;
        let num = 3 + randConst * 7;
        let mass = num * num * random(5,10);
        let life = 15 + 10 * (1-randConst);

        this.nodes.push(new FireworkFirework(pos,vel,color(r,g,b), mass, num, str, life) );
      }
    }
  }
  
}


