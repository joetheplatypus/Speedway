const Entity = require('./Entity')

class ParkedCar extends Entity {
  constructor(params) {
    super(params)
    this.x = params.x;
    this.y = params.y;
    this.className = 'ParkedCar'
    this.sendInitPack();
  }
  getInitPack() {
    return {
      x:this.x,
      y:this.y,
      id:this.id,
      className:this.className,
    }
  }
  getUpdatePack() {
    return {
      id:this.id,
      x:this.x,
      y:this.y,
      rotation: this.rotation
    }
  }
}

module.exports = ParkedCar;