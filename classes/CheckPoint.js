const GameObject = require('./GameObject')

class CheckPoint extends GameObject {
  constructor(params) {
    super(params)
    this.id = Math.random()
    this.progressNum = params.progressNum
    this.tile = params.tile;
    this.className = 'CheckPoint'
    this.sendInitPack();
  }
  getInitPack() {
    return {
      x:this.x,
      y:this.y,
      id:this.id,
      progressNum: this.progressNum,
      className:this.className,
    }
  }
  getUpdatePack() {
    return {
      id:this.id,
    }
  }
}

module.exports = CheckPoint;