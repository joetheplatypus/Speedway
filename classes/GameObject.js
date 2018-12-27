class GameObject {
  constructor(params) {
    this.id = Math.random();
    this.x = params.x;
    this.y = params.y;
    this.vx = params.vx || 0;
    this.vy = params.vy || 0;
    GameObject.list.push(this)
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
  sendInitPack() {
    GameObject.initPack.push(this.getInitPack())
  }
  static remove(object) {
    const id = object.id
    GameObject.removePack.push(id);
    GameObject.list.splice(GameObject.list.indexOf(object), 1)
  }
  static updateAll() {
    GameObject.list.map((go)=>{
      go.update();
    })
  }
  static getFrameUpdateData() {
    const updatePack = GameObject.list.map(go => go.getUpdatePack());
    const packs =  {
      init: GameObject.initPack,
      update: updatePack,
      remove: GameObject.removePack,
    }

    GameObject.initPack = [];
    GameObject.removePack = [];

    return packs

  }
  static getAllInitPacks() {
    return GameObject.list.map(obj => obj.getInitPack())
  }
  static fromSocketID(id) {
    return GameObject.list.find(obj => obj.socketId == id)
  }
}
GameObject.initPack = [];
GameObject.removePack = [];
GameObject.list = [];
module.exports = GameObject;