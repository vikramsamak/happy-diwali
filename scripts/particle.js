function Particle(x, y, hue, firework) {
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.hue = hue;

  if (firework) {
    this.vel = createVector(0, random(-17, -8));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 6));
  }

  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.95);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function() {
    colorMode(HSB);
    if (!this.firework) {
      stroke(this.hue, 255, 255, this.lifespan);
      strokeWeight(2);
    } else {
      stroke(this.hue, 255, 255);
      strokeWeight(4);
    }
    point(this.pos.x, this.pos.y);
  }

}
