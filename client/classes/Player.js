import GameObject from './GameObject.js'
import Render from './Render.js'
import Camera from './Camera.js'

export default class Player extends GameObject{
  constructor(params) {
    super(params)
    this.rotation = params.rotation;
    this.checkPointProgress = params.checkPointProgress
  }
  update(params) {
    this.x = params.x;
    this.y = params.y;
    this.rotation = params.rotation;
    this.checkPointProgress = params.checkPointProgress

    if(this.id === Player.selfID) {
      Camera.setFocus(this.x,this.y)
      Player.selfProgress = this.checkPointProgress
    }
  }
  draw() {
    if(this.id === Player.selfID) {
      Render.drawProgress(Player.selfProgress);
    }

    Render.drawImg(this.x,this.y,this.rotation,Render.images.car,true)
  }
}
Player.selfID = null;
Player.selfProgress = null;