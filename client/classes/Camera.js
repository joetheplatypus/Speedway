class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.focusX = 0;
    this.focusY = 0;
    this.clampX = 3200;
    this.clampY = 3200;
    this.screenWidth = 0;
    this.screenHeight = 0;
  }
  setFocus(x,y) {
    const pos = this.clamp(x,y)
    this.focusX = pos.x
    this.focusY = pos.y
    
    const cameraPos = this.clamp(this.focusX - this.screenWidth/2,this.focusY - this.screenHeight/2)
    this.x = cameraPos.x
    this.y = cameraPos.y
  }
  setScreenSize(width,height) {
    this.screenHeight = height;
    this.screenWidth = width;

    this.clampX -= this.screenWidth/2
    this.clampY -= this.screenHeight/2
  }
  getPos() {
    return {x:this.x,y:this.y}
  }
  setClamp(x,y) {
    this.clampX = x;
    this.clampY = y;
  }
  clamp(_x,_y) {
    var x,y
    if(_x <= 0) {
      x = 0
    } else if(_x >= this.clampX) {
      x = this.clampX
    } else {
      x = _x
    }
    if(_y <= 0) {
      y = 0
    } else if(_y >= this.clampY) {
      y = this.clampY
    } else {
      y = _y
    }
    return {x:x,y:y}
    
  }
}
export default new Camera();