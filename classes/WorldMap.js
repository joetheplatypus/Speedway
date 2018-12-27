const ParkedCar = require('./ParkedCar')
const CheckPoint = require('./CheckPoint')

class WorldMap {
  constructor(params) {
    this.id = Math.random()
    this.flatTiles = params.flatTiles
    this.width = params.width
    this.tiles = WorldMap.convert2D(this.flatTiles, this.width)
    this.flatParkedCars = params.flatParkedCars;
    this.parkedCars = WorldMap.convert2D(this.flatParkedCars, this.width)
    this.flatCheckPoints = params.flatCheckPoints;
    this.checkPoints = WorldMap.convert2D(this.flatCheckPoints, this.width)
    this.name = params.name;
    this.totalCheckPoints = 0;
    this.tileSize = 64;
    WorldMap.list.push(this)
  }
  getTileAtPosition(x,y) {
    const tileX = Math.floor(x/this.tileSize);
    const tileY = Math.floor(y/this.tileSize);
    if(this.tiles[tileY]) {
      return this.tiles[tileY][tileX]
    } else {
      return undefined
    }
  }
  getCheckPoint(x,y) {
    const tileX = Math.floor(x/this.tileSize);
    const tileY = Math.floor(y/this.tileSize);
    if(this.checkPoints[tileY]) {
      return this.checkPoints[tileY][tileX]
    } else {
      return false
    }
  }
  static convert2D(array, width) {
    const arr = [];
    for(var i = 1; i < array.length; i+=width) {
      arr.push([...array.slice(i-1,i+width-1)])
    }
    return arr
  }
  static load(name) {
    const map = WorldMap.list.find((map) => map.name === name)
    if(map) {
      WorldMap.active = map
      WorldMap.spawnParkedCars(WorldMap.active)
      WorldMap.spawnCheckPoints(WorldMap.active)
      console.log(`Map ${name} loaded`)
    } else {
      console.log(`Map ${name} not found`)
    }
  }
  static spawnParkedCars(map) {
    for(var i = 0; i < map.parkedCars.length; i++) {
      for(var j = 0; j < map.parkedCars[i].length; j++) {
        if(map.parkedCars[i][j]) {
          new ParkedCar({
            x:j*map.tileSize,
            y:i*map.tileSize
          })
        }
      }
    }
  }
  static spawnCheckPoints(map) {
    for(var i = 0; i < map.checkPoints.length; i++) {
      for(var j = 0; j < map.checkPoints[i].length; j++) {
        if(map.checkPoints[i][j]) {
          const cp = new CheckPoint({
            x:j*map.tileSize,
            y:i*map.tileSize,
            tile:{x:j,y:i},
            progressNum: map.checkPoints[i][j],
          })
          map.checkPoints[i][j] = cp
          map.totalCheckPoints++;
        }
      }
    }
  }
  static getPack() {
    return WorldMap.active
  }

}
WorldMap.list = []
WorldMap.active = null;

module.exports = WorldMap