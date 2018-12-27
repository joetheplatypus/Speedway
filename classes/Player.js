const Entity = require('./Entity')
const GameObject = require('./GameObject')
const WorldMap = require('./WorldMap')

class Player extends Entity {
  constructor(params) {
    super(params)
    this.x = 100;
    this.y = 100;
    this.maxSpeed = 5;
    this.speelLimit = 5;
    this.acceleration = 0;
    this.maxAcceleration = 0.03;
    this.brakingForce = 0.12
    this.rotation = 0;
    this.rotationSpeed = 0;
    this.maxRotationSpeed = 0.07;
    this.socketId = params.socketId;
    this.name = `${this.id}`;
    this.input = {
      up: false,
      down: false,
      left: false,
      right: false,
    }

    this.checkPointProgress = 0;

    this.className = 'Player'
    this.sendInitPack();
  }
  update() {
    //speed limit from map
    const currentTile = WorldMap.active.getTileAtPosition(this.x,this.y)
    if(currentTile === 34) {
      this.speelLimit = 2
    } else if(currentTile === 37) {
      this.speelLimit = 0.5
    } else {
      this.speelLimit = this.maxSpeed
    }

    //checkpoints
    const onCheckPoint = WorldMap.active.getCheckPoint(this.x, this.y)
    if(onCheckPoint && onCheckPoint.progressNum === this.checkPointProgress+1) {
      this.checkPointProgress = onCheckPoint.progressNum
    }
    
    //movement
    if(this.input.up && this.input.down) {
      if(this.speed > 0) {
        if(this.speed > this.brakingForce) {
          this.acceleration = -this.brakingForce
        } else {
          this.acceleration = -this.speed
        }
      } else if(this.speed < 0) {
        if(this.speed < -this.brakingForce) {
          this.acceleration = this.brakingForce
        } else {
          this.acceleration = -this.speed
        }
      } else {
        this.acceleration = 0
        this.speed = 0;
      }
    } else if(this.input.up) {
      if(this.speed < this.speelLimit) {
        this.acceleration = this.maxAcceleration;
        if(this.speed < 0) {
          this.acceleration += this.brakingForce
        }
      } else if(this.speed > this.speelLimit) {
        this.acceleration = -2*this.brakingForce
      } else { 
        this.acceleration = 0;
      }
    } else if(this.input.down) {
      if(this.speed > -this.speelLimit) {
        this.acceleration = -this.maxAcceleration;
        if(this.speed > 0) {
          this.acceleration -= this.brakingForce
        }
      } else if(this.speed < -this.speelLimit) {
        this.acceleration = 2*this.brakingForce
      } else {
        this.acceleration = 0;
      }
    } else {
      if(this.speed > 0) {
        if(this.speed > this.brakingForce) {
          this.acceleration = -this.brakingForce
        } else {
          this.acceleration = -this.speed
        }
      } else if(this.speed < 0) {
        if(this.speed < -this.brakingForce) {
          this.acceleration = this.brakingForce
        } else {
          this.acceleration = -this.speed
        }
      } else {
        this.acceleration = 0
        this.speed = 0;
      }
    }

    if(this.speed > 0) {
      if(this.input.left && this.input.right) {
        this.rotationSpeed = 0
      } else if(this.input.right) {
        this.rotationSpeed = this.maxRotationSpeed
      } else if(this.input.left) {
        this.rotationSpeed = -this.maxRotationSpeed
      } else {
        this.rotationSpeed = 0
      }
    } else if(this.speed < 0) {
      if(this.input.left && this.input.right) {
        this.rotationSpeed = 0
      } else if(this.input.right) {
        this.rotationSpeed = -this.maxRotationSpeed
      } else if(this.input.left) {
        this.rotationSpeed = this.maxRotationSpeed
      } else {
        this.rotationSpeed = 0
      }
    } else {
      this.rotationSpeed = 0
    }
    this.speed += this.acceleration
    this.rotation += this.rotationSpeed;

    super.update();
  }
  handleInput({ inputId, state }) {
    if(inputId == 'up') {
      this.input.up = state
    }
    if(inputId == 'down') {
      this.input.down = state
    }
    if(inputId == 'right') {
      this.input.right = state
    }
    if(inputId == 'left') {
      this.input.left = state
    }
  }
  getInitPack() {
    return {
      x:this.x,
      y:this.y,
      name:this.name,
      id:this.id,
      className:this.className,
      rotation: this.rotation,
      checkPointProgress: this.checkPointProgress
    }
  }
  getUpdatePack() {
    return {
      id:this.id,
      x:this.x,
      y:this.y,
      rotation: this.rotation,
      checkPointProgress: this.checkPointProgress
    }
  }
  static onConnect(socket) {
    const p = new Player({socketId:socket.id})

    console.log(`Player ${p.name} has joined the game`)

    //data packs

    socket.on('keyPress',(data) => {
      p.handleInput(data)
    })

    socket.emit('selfId', p.id)
    socket.emit('init', GameObject.getAllInitPacks());
    socket.emit('map', WorldMap.getPack());
  }
  static onDisconnect({ id }) {
    const p = GameObject.fromSocketID(id)
    GameObject.remove(GameObject.fromSocketID(id))
    console.log(`Player ${p.name} has left the game`)
  }
}
module.exports = Player