class Ring {
  
  constructor(img,w,s,f,timeObj,x,y){
    let x1 = x || windowWidth/2;
    let y1 = y || windowHeight/2;
    
    this.pos = createVector(x1,y1);
    this.w = w;
    
    this.sides = s;
    this.floor = f;
    
    this.img = loadImage(img);
    
    this.timeObj = timeObj;
    
    this.angle = this.timeObj.getAngle(s,f);
  }
  
  disp(x,y){
    push();
    translate(windowWidth/2 + x,windowHeight/2 + y);
    rotate(this.angle);
    image(this.img,0,0,this.w,this.w);
    pop();
  }
  
  update(x,y){
    let toAngle = this.timeObj.getAngle(this.sides,this.floor) % 360;
    let change = toAngle - this.angle
    if (abs(change) > 180) {
      
      change = change % 360;
      if(change < -180){
        change += 360;
      }
      if( change > 180){
        change -= 360;
      }
    }
    this.angle += 0.01 * change;
    this.angle = this.angle % 360;
    
    this.disp(x,y);
  }
  
}
