class CTime {
  
  constructor(d,h,m,s){
    
    if (h){
      this.dy = d;
      this.hr = h;
      this.min = m;
      this.sec = s;

      this.secsFromStart = this.sec + 
        60 * (this.min + 
              60 * (this.hr + 
                    24 * this.dy));

      this.done = false;
    } else {
      this.secsFromStart = d;
      this.done = false;
    }
  }
  
  getSecsFromTime(){
    return second() +
      60 * (minute() +
            60 * (hour() +
                  24 * day()));
  }
  
  getDiffTime(){
    if (this.secsFromStart - this.getSecsFromTime() >= 0){
      return this.secsFromStart - this.getSecsFromTime();
    }
    this.done = true;
    return 0;
  }
  
  second(){
    return this.getDiffTime() % 60;
  }
  
  minute(){
    return floor (this.getDiffTime() / 60) % 60;
  }
  
  hour(){
    return floor (this.getDiffTime() / 60 / 60) % 24;
  }
  
  day(){
    return floor (this.getDiffTime() / 60 / 60 / 24);
  }
  
  getAngle(s,f){
    return (floor ( this.getDiffTime() / f )  % (s*2) ) * 360 / (s*2); 
  }
  
  static toString(num){
    if( num < 10 ) {
      return "0" + num;
    }
    return "" + num;
  }
  
  hourJustPassed(secs){
    let a = new CTime(this.secsFromStart + secs);
    if(a.second() + a.minute() * 60 <= secs && this.getDiffTime() > 15){
      return true;
    }
    return false;
  }
  
}