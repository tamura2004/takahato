// タカハトゲームのシミュレータ
const STEP = 300;
const R = 32;
const MAX_WAIT = 30;
const NUM = 10;

let creatures = new Creatures();
let creature;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < NUM; i++) {
    creature = new Creature();
    creature.type = "HATO"
    creatures.add(creature);
  }
  for (let i = 0; i < NUM; i++) {
    creature = new Creature();
    creature.type = "TAKA"
    creatures.add(creature);
  }
}

function draw() {
  background(255);
  creatures.move();
  creatures.draw();
}