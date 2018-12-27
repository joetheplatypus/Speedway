const GameObject = require('./GameObject');

class Entity extends GameObject {
  constructor(params) {
    super(params);
    this.rotation = params.rotation || 0;
    this.maxHealth = params.maxHealth || 100;
    this.health = this.maxHealth;
    this.maxSpeed = 10;
    this.speed = 0;
  }
  update() {
    this.vx = this.speed * Math.cos(this.rotation)
    this.vy = this.speed * Math.sin(this.rotation)
    super.update();
  }
  takeDamage(damage) {
    this.health -= damage;
    if(this.health <= 0) {
      this.health = 0;
      this.onDeath();
    }
  }
  onDeath() {

  }

}

module.exports = Entity;