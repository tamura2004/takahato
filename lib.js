class Creature {
  constructor(type) {
    this.p = createVector(random(windowWidth), random(windowHeight));
    this.v = p5.Vector.random2D().mult(2);
    this.type = type;
    this.color = type === "HATO" ? "#0074bf" : "#c93a40";
    this.size = R;
    this.id = random(100000000);
  }
  move() {
    // １％の確率で右に曲がる
    if (random() < 0.01) this.v.rotate(HALF_PI);

    // HATOならランダムに大きくなる
    if (random() < 0.01 && this.type === "HATO") this.size *= 1.05;

    // 一つ進む
    this.p.add(this.v);

    // 壁に当たったら跳ね返る
    if (this.p.x < R && this.v.x < 0) this.v.x *= -1;
    if (this.p.x > windowWidth - R * 3 && this.v.x > 0) this.v.x *= -1;
    if (this.p.y < R && this.v.y < 0) this.v.y *= -1;
    if (this.p.y > windowHeight - R * 3 && this.v.y > 0) this.v.y *= -1;
  }
  collid(other) {
    // 衝突したら向きをランダムに変える
    this.v.rotate(random(PI));
    other.v.rotate(random(PI));

    // 自分も相手もタカ（双方にダメージ）
    if (this.type === "TAKA") {
      if (other.type === "TAKA") {
        this.size *= 0.95;
        other.size *= 0.95;

        // 自分がタカ、相手がハト（自分だけ成長）
      } else {
        if (this.size < R * 3) this.size *= 1.05;
        other.size *= 0.95;
      }
    } else {

      // 自分も相手もハト（双方が成長）
      if (other.type === "HATO") {
        if (this.size < R * 2) this.size *= 1.05;
        if (other.size < R * 2) other.size *= 1.05;

        // 自分がハト、相手がタカ（自分だけダメージ）
      } else {
        if (other.size < R * 3) other.size *= 1.05;
        this.size *= 0.95;
      }
    }
  }
  draw() {
    fill(this.color);
    circle(this.p.x, this.p.y, this.size);
  }
}

class Creatures extends Map {
  add(creature) {
    this.set(creature.id, creature);
  }
  create() {
    // 3割でタカ、7割でハト
    const type = random() < 0.3 ? "TAKA" : "HATO";
    const creature = new Creature(type);
    this.add(creature);
  }

  // 自分の近くに子供を作成
  clone(parent) {
    if (this.values().length > 100) return;
    parent.size *= 0.8;
    const child = new Creature(parent.type);
    child.p = p5.Vector.random2D().mult(R*2).add(parent.p);
    this.add(child);
  }
  remove(creature) {
    this.delete(creature.id);
  }
  move() {
    for (const creature of this.values()) {

      // 小さくなったら消す
      if (creature.size < 16) this.remove(creature);

      // 大きくなったら一定確率で子供を生成
      if (creature.size > R * 2.5 && random() < 0.01) this.clone(creature);
      creature.move();
    }
    this.collid();
  }
  collid() {
    for (let c1 of this.values()) {
      for (let c2 of this.values()) {
        if (c1.id === c2.id) continue;
        // 衝突判定
        if (c1.p.dist(c2.p) < R) c1.collid(c2);
      }
    }
  }
  draw() {
    for (const creature of this.values()) creature.draw();
  }
  taka() {
    return this.values.filter(c => c.type === "TAKA");
  }
  hato() {
    return this.values.filter(c => c.type === "HATO");
  }
}
