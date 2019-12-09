function easing(x) {
  return x;
  // return (x * 2 -1) ** 0.333;
}

class Creatures extends Map {
  add(creature) {
    this.set(creature.id, creature);
  }
  remove(creature) {
    this.delete(creature.id);
  }
  move() {
    for (const creature of this.values()) {
      creature.move();
    }
  }
  draw() {
    for (const creature of this.values()) {
      creature.draw();
    }
  }
}

class Creature {
  constructor() {
    this.p = createVector(random(windowWidth), random(windowHeight));
    this.path = [];
    this.wait = random(100);
    this.id = random(100000000);
    this.type = "HATO";
  }
  move() {
    if (this.path.length > 0) {
      // １フレーム移動
      this.p = this.path.shift();
    } else if (this.wait > 0) {
      // その場で待つ
      this.wait--;
    } else {
      // STEPフレームの移動を決める
      const x = random(R, windowWidth - R);
      const y = random(R, windowHeight - R);
      const q = createVector(x, y);
      for (let i = 1; i <= STEP; i++) {
        const x = i / STEP;
        this.path.push(p5.Vector.lerp(this.p, q, easing(x)));
      }
      // 待ち時間を決める
      this.wait = random(MAX_WAIT);
    }
  }
  draw() {
    // line(0, 0, this.p.x, this.p.y);
    if (this.type == "HATO") {
      fill('#0074bf');
    } else {
      fill('#c93a40');
    }
    circle(this.p.x, this.p.y, R);
  }
}
