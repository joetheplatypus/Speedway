import Render from './Render.js'

export default {
  load(map) {
    this.width = map.width;
    this.tiles = map.tiles
    this.tileSize = 64;
    this.totalCheckPoints = map.totalCheckPoints
    Render.setTotalCheckPoints(this.totalCheckPoints)
  },
  draw() {
    if(!this.tiles) {
      return
    }
    Render.drawSpritesheetImage(0,0,0,1,false)
    for(var i = 0; i < this.tiles.length; i++) {
      for(var j = 0; j < this.tiles[i].length; j++) {
        Render.drawSpritesheetImage(j*this.tileSize,i*this.tileSize,0,this.tiles[i][j],false)
      }
    }
  }
}
