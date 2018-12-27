import Camera from './Camera.js'

const render =  {
  ctx: null,
  totalCheckPoints: 0,
  setCTX(_ctx) {
    this.ctx = _ctx
  },
  images: {
    spritesheet: new Image(),
    car: new Image(),
    flag: new Image(),
    sprites: new Map([
      [1,[0,0]],
      [2,[64,0]],
      [3,[128,0]],
      [4,[192,0]],
      [5,[256,0]],
      [6,[320,0]],
      [7,[384,0]],
      [8,[448,0]],
      [9,[512,0]],
      [10,[0,64]],
      [11,[64,64]],
      [12,[128,64]],
      [13,[192,64]],
      [14,[256,64]],
      [15,[320,64]],
      [16,[384,64]],
      [17,[448,64]],
      [18,[512,64]],
      [19,[0,128]],
      [20,[64,128]],
      [21,[128,128]],
      [22,[192,128]],
      [23,[256,128]],
      [24,[320,128]],
      [25,[384,128]],
      [26,[448,128]],
      [27,[512,128]],
      [28,[0,192]],
      [29,[64,192]],
      [30,[128,192]],
      [31,[192,192]],
      [32,[256,192]],
      [33,[320,192]],
      [34,[384,192]],
      [35,[448,192]],
      [36,[512,192]],
      [37,[0,256]],
      [38,[64,256]],
      [39,[128,256]],
      [40,[192,256]],
      [41,[256,256]],
      [42,[320,256]],
      [43,[384,256]],
      [44,[448,256]],
      [45,[512,256]],
      [46,[0,320]],
      [47,[64,320]],
      [48,[128,320]],
      [49,[192,320]],
      [50,[256,320]],
      [51,[320,320]],
      [52,[384,320]],
      [53,[448,320]],
      [54,[512,320]],
      [55,[0,384]],
      [56,[64,384]],
      [57,[128,384]],
      [58,[192,384]],
      [59,[256,384]],
      [60,[320,384]],
      [61,[384,384]],
      [62,[448,384]],
      [63,[512,384]],
      [64,[0,448]],
      [65,[64,448]],
      [66,[128,448]],
      [67,[192,448]],
      [68,[256,448]],
      [69,[320,448]],
      [70,[384,448]],
      [71,[448,448]],
      [72,[512,448]],
      [73,[0,512]],
      [74,[64,512]],
      [75,[128,512]],
      [76,[192,512]],
      [77,[256,512]],
      [78,[320,512]],
      [79,[384,512]],
    ])

  },
  drawImg(x,y,rot,image,centre) {
    const cameraPos = Camera.getPos();
    this.ctx.save()
    this.ctx.translate(Math.floor(x-cameraPos.x), Math.floor(y-cameraPos.y))
    this.ctx.rotate(rot)
    if(centre) {
      this.ctx.translate(Math.floor(-image.width/2), Math.floor(-image.height/2))
    }
    this.ctx.drawImage(image, 0, 0)
    this.ctx.restore()
  },
  drawSpritesheetImage(x,y,rot,imageNum, centre) {
    const cameraPos = Camera.getPos();
    const image = this.images.sprites.get(imageNum)
    this.ctx.save()
    this.ctx.translate(Math.floor(x-cameraPos.x), Math.floor(y-cameraPos.y))
    this.ctx.rotate(rot)
    if(centre) {
      this.ctx.translate(-32, -32)
    }
    this.ctx.drawImage(this.images.spritesheet, image[0], image[1], 64, 64, 0, 0, 64, 64)
    this.ctx.restore()
  },
  drawProgress(progress) {
    this.ctx.font = "30px Courier";
    this.ctx.fillText(`${progress}/${this.totalCheckPoints} flags collected`, window.innerWidth-380,40)
  },
  setTotalCheckPoints(cps) {
    this.totalCheckPoints = cps
  }
}
render.images.car.src = '/client/img/car4.png'
render.images.flag.src = '/client/img/flag.png'
render.images.spritesheet.src = '/client/img/spritesheet.png'

export default render;