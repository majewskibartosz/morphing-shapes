import p5 from "p5";

new p5((p) => {
  let shapes = [];
  let morph = [];
  let state = 0;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);

    // Define the shapes
    let circle = [];
    for (let angle = 0; angle < 360; angle += 9) {
      let v = p5.Vector.fromAngle(p.radians(angle - 135));
      v.mult(150);
      circle.push(v);
    }
    shapes.push(circle);

    let square = [];
    for (let x = -75; x < 75; x += 15) {
      square.push(p.createVector(x, -75));
      square.push(p.createVector(75, x));
      square.push(p.createVector(x, 75));
      square.push(p.createVector(-75, x));
    }
    shapes.push(circle, square);

    // Triangle
    let triangle = [];
    for (let angle = 0; angle <= 240; angle += 120) {
      let v = p5.Vector.fromAngle(p.radians(angle));
      v.mult(150);
      triangle.push(v);
    }
    shapes.push(circle, triangle);

    // Star
    let star = [];
    let angle = p.TWO_PI / 5;
    for (let a = 0; a < p.TWO_PI; a += angle) {
      let sx = 0 + p.cos(a) * 150;
      let sy = 0 + p.sin(a) * 150;
      star.push(p.createVector(sx, sy));
    }
    shapes.push(circle, star);

    // Polygon
    let polygon = [];
    let sides = 6;
    for (let i = 0; i < sides; i++) {
      let angle = p.map(i, 0, sides, 0, p.TWO_PI);
      let x = 150 * p.cos(angle);
      let y = 150 * p.sin(angle);
      polygon.push(p.createVector(x, y));
    }
    shapes.push(circle, polygon);

    // Initialize morph array
    for (let i = 0; i < shapes[0].length; i++) {
      morph.push(p.createVector());
    }
  };

  p.draw = function () {
    p.background(0);

    let totalDistance = 0;

    for (let i = 0; i < shapes[state % shapes.length].length; i++) {
      let v1 = shapes[state % shapes.length][i];
      let v2 = morph[i];
      v2.lerp(v1, 0.1);
      totalDistance += p5.Vector.dist(v1, v2);
    }

    if (totalDistance < 0.1) {
      state = (state + 1) % shapes.length;
      let scaleFactor = p.random(0.5, 1.5); // Randomly scale between 0.5 and 1.5
      shapes.forEach((shape) => {
        shape.forEach((v) => {
          v.mult(scaleFactor);
        });
      });
    }

    p.translate(p.width / 2, p.height / 2);
    p.strokeWeight(4);
    p.beginShape();
    p.noFill();
    p.stroke(255);

    morph.forEach((v) => {
      p.vertex(v.x, v.y);
    });
    p.endShape(p.CLOSE);
  };
});
