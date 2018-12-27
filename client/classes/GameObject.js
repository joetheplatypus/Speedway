export default class GameObject {
  constructor(params) {
    this.id = params.id;
    this.x = params.x;
    this.y = params.y;
    GameObject.list.push(this);
  }
  draw() {
    
  }
  static updateObject(object) {
    GameObject.fromID(object.id).update(object)
  }
  static drawAll() {
    GameObject.list.map(go => go.draw())
  }
  static fromID(id) {
    return GameObject.list.find(go => go.id == id)
  }
  static remove(id) {
    const obj = GameObject.fromID(id);
    const index = GameObject.list.indexOf(obj);
    GameObject.list.splice(index, 1)
  }
}
GameObject.list = []