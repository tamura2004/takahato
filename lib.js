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
    this.collid();
  }
  collid() {
    for (const c1 of this.values()) {
      for (const c2 of this.values()) {
        if (c1.id !== c2.id && c1.p.dist(c2.p) <= R) {
          if (c1.type === "TAKA" && c2.type === "TAKA") {
            this.remove(c2);
          // } else if (c1.type == "HATO" && c2.type == "HATO") {
          //   const child = new Creature("HATO");
          //   child.p.x = c1.p.x;
          //   child.p.y = c1.p.y;
          //   this.add(child);
          // } else if (c1.type === "TAKA" && c2.type === "HATO") {
          //   c2.path = [];
          //   const child = new Creature("HATO");
          //   child.p.x = c1.p.x;
          //   child.p.y = c1.p.y;
          //   this.add(child);
          // } else {
          //   c1.path = [];
          //   const child = new Creature("HATO");
          //   child.p.x = c1.p.x;
          //   child.p.y = c1.p.y;
          //   this.add(child);
          }
        }
      }
    }
  }
  draw() {
    for (const creature of this.values()) {
      creature.draw();
    }
  }
}

class Creature {
  constructor(type) {
    this.p = createVector(random(windowWidth), random(windowHeight));
    this.path = [];
    this.wait = random(100);
    this.id = random(100000000);
    this.type = type;
  }
  goto(q) {
    for (let i = 1; i <= STEP; i++) {
      const x = i / STEP;
      this.path.push(p5.Vector.lerp(this.p, q, easing(x)));
    }
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
      this.goto(q);

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
