//classes
import Render from './classes/Render.js'
import Player from './classes/Player.js'
import GameObject from './classes/GameObject.js'
import Camera from './classes/Camera.js'
import WorldMap from './classes/WorldMap.js'
import ParkedCar from './classes/ParkedCar.js'
import CheckPoint from './classes/CheckPoint.js'

const classMap = new Map([['Player', Player],['ParkedCar', ParkedCar],['CheckPoint', CheckPoint]])

//Socket Setup
const socket = io();

//canvas
const canvas = document.getElementById('gameCanvas');
window.addEventListener('resize',resize,false);
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  Camera.setScreenSize(canvas.width,canvas.height)
}
resize()
Render.setCTX(canvas.getContext('2d'))

//Data Packs

socket.on('selfId',(id) => {
  Player.selfID = id;
  socket.id = Player.selfID;
});

socket.on('init',(data) => {
  data.map((obj) => {
    if(!GameObject.fromID(obj.id)) {
      let classToInstantiate = classMap.get(obj.className);
      new classToInstantiate(obj)
    }
  })
})

socket.on('update',(data) => {
  data.map((obj) => {
    GameObject.updateObject(obj)
  })
})

socket.on('remove',(data) => {
  data.map((id) => {
    GameObject.remove(id)
  })
})

socket.on('map',(map) => {
  WorldMap.load(map)
})

//User Input
document.onkeydown = function(event) {
  if(event.keyCode === 68) { // D
    socket.emit('keyPress', {inputId:'right',state:true});
  } else if(event.keyCode === 83) { //S
    socket.emit('keyPress', {inputId:'down',state:true});
  } else if(event.keyCode === 65) { //A
    socket.emit('keyPress', {inputId:'left',state:true});
  } else if(event.keyCode === 87) { //W
    socket.emit('keyPress', {inputId:'up',state:true});
  } else if(event.keyCode === 32) { //SPACEBAR
    socket.emit('keyPress', {inputId:'space',state:true});
  } else if(event.keyCode === 69) { //E
    socket.emit('keyPress', {inputId:'use',state:true});
  }
}

document.onkeyup = function(event) {
  if(event.keyCode === 68) { // D
    socket.emit('keyPress', {inputId:'right',state:false});
  } else if(event.keyCode === 83) { //S
    socket.emit('keyPress', {inputId:'down',state:false});
  } else if(event.keyCode === 65) { //A
    socket.emit('keyPress', {inputId:'left',state:false});
  } else if(event.keyCode === 87) { //W
    socket.emit('keyPress', {inputId:'up',state:false});
  } else if(event.keyCode === 32) { //SPACEBAR
    socket.emit('keyPress', {inputId:'space',state:false});
  } else if(event.keyCode === 69) { //E
    socket.emit('keyPress', {inputId:'use',state:false});
  }
}


//Game Loop
function loop(ts) {
  Render.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  WorldMap.draw();
  GameObject.drawAll();


  requestAnimationFrame(loop)
}

loop();