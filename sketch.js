// 得点カウンター

const gap = 8;
const colors = ["#56a764", "#0074bf", "#c93a40", "#de9610"];
const darks = ["#33643c", "#003659", "#7b2226", "#7f5609"];
const diff = [0,0,0,0];
const points = [0,0,0,0];
const turns = [0,0,0,0];
let w,h;

function setup() {
  w = windowWidth / 4;
  h = windowHeight / 4;
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#000000");
  
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      
      let color = null;
      if (mouseIsPressed && Math.floor(mouseX / w) === x && Math.floor(mouseY / h) === y) {
        color = darks[y];
      } else {
        color = colors[y];
      }
      
      const left = x * w + (x % 2 ? 0 : gap);
      const top = y * h + gap;
      
      fill(color);
      stroke(color);
      rect(left, top, w - gap, h - gap * 2);
    }
  }

  fill("white");
  stroke("white");
    
  textSize(192);
  textAlign(CENTER, CENTER);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 2; x++) {
      const left = x * w * 2 + gap;
      const top = y * h + gap;
      let num = x === 0 ? "+" + diff[y] : points[y];
      num = (num+"").replace("+-", "-");
      text(num, left, top, 2 * w, h);
    }
  }

  textSize(48);
  textAlign(LEFT, TOP);
  for (let y = 0; y < 4; y++) {
    const top = y * h + 2 * gap;
    const left = 2 * w + 2 * gap;
    text(`第${turns[y]}ターン`, left, top);
  }
}

function mousePressed() {
  const x = Math.floor(mouseX / w);
  const y = Math.floor(mouseY / h);

  if (x === 0) diff[y]--;
  if (x === 1) diff[y]++;
  if (x === 2) points[y] -= diff[y], turns[y]--;
  if (x === 3) points[y] += diff[y], turns[y]++;
}
