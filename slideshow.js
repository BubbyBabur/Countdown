
class Slideshow {
  
  constructor(){
    
    this.imgNames = loadJSON("images.json");
    
    this.curr = 0;
    this.currImg = 0;
    this.rate = 256;
    
    this.ended = false;
    
    this.frac = 6;
    
  }
  
  update(){
    
    if(this.curr % this.rate === 0){
      
      if(this.currImg >= this.imgNames.images.length){
        this.ended = true;
        return;
      }
      
      let currImg = this.imgNames.images[this.currImg]
      
      if(isNaN(int(currImg.width[0]))){
        currImg.width = currImg.width.slice(1,currImg.width.length);
      }
      
      if(isNaN(int(currImg.height[0]))){
        currImg.height = currImg.height.slice(1,currImg.height.length);
      }
      
      let currW = int(currImg.width);
      let currH = int(currImg.height);
      
      let scaleX = width / currW;
      let scaleY = height / currH;
      
      let scale = min(scaleX,scaleY);
      
      let w = currW * scale;
      let h = currH * scale;
      
      $("#slideshow").attr("width",w+"px");
      $("#slideshow").attr("height",h+"px");
      
      $("#slideshow").attr("src",currImg.name);
      
      this.currImg ++;
      this.curr = 0;
      
      $("#caption").html(currImg.caption);
      
    }
    
    this.curr++;
    
    if(this.curr <= this.rate/this.frac){
      $("#slideshow").css("opacity",this.curr/this.rate * this.frac);
    }
    if(this.curr >= (this.frac-1) * this.rate/this.frac){
      $("#slideshow").css("opacity",(this.rate - this.curr)/this.rate * (this.frac));
    }
    
  }
  
}
