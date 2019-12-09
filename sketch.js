// タカハトゲームのシミュレータ
const STEP = 300;
const R = 32;
const MAX_WAIT = 30;
const NUM = 40;

let creatures = new Creatures();

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < NUM; i++) creatures.create();
}

function draw() {
  if (random() < 0.005) creatures.create();
  background(255);
  creatures.move();
  creatures.draw();
}