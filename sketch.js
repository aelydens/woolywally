let img;

function preload() {
  img = loadImage("face.png");
}
let particles = [];
let isAttracting = false;

function setup() {
  let imgWidth = min(500, windowWidth * 0.8);
  let imgHeight = (imgWidth / 500) * 569;
  createCanvas(imgWidth, imgHeight);
  imageMode(CENTER);

  for (let i = 0; i < 20000; i++) {
    particles.push({
      x: random(width),
      y: height + random(100),
      stuck: false,
      speed: random(0.5, 2),
    });
  }
}

function draw() {
  background(255, 255, 255, 0);
  image(img, width / 2, height / 2, width, height);

  isAttracting = mouseIsPressed;

  particles.forEach((p) => {
    if (!p.stuck) {
      if (isAttracting) {
        let d = dist(p.x, p.y, mouseX, mouseY);
        if (d < 300) {
          let angle = atan2(mouseY - p.y, mouseX - p.x);
          let force = map(d, 0, 300, 3, 0.1);
          p.x += cos(angle) * p.speed * force;
          p.y += sin(angle) * p.speed * force;

          if (d < 30 && random() < 0.2) {
            p.stuck = true;
          }
        }
      }
    }

    fill(0);
    noStroke();
    circle(p.x, p.y, 2);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
