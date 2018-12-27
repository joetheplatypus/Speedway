import GameObject from './GameObject.js'
import Player from './Player.js'
import Render from './Render.js'

export default class CheckPoint extends GameObject {
  constructor(params) {
    super(params)
    this.progressNum = params.progressNum
  }
  update(params) {
    
  }
  draw() {
    if(Player.selfProgress+1 === this.progressNum) {
      Render.drawImg(this.x + 10,this.y + 10,0,Render.images.flag,false)
    }
  }
}