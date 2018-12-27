import GameObject from './GameObject.js'
import Render from './Render.js'

export default class ParkedCar extends GameObject {
  constructor(params) {
    super(params)
  }
  update(params) {
    this.x = params.x;
    this.y = params.y
  }
  draw() {
    Render.drawImg(this.x,this.y,Math.round(this.id)*2*Math.PI/2+Math.PI/2,Render.images.car,true)
  }
}