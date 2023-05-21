import p5 from "p5";

class Shape {
  constructor(vertices) {
    this.vertices = vertices;
    this.targetVertices = [...vertices];
  }

  draw(p) {
    p.stroke(255);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    this.vertices.forEach((v) => p.vertex(v.x, v.y));
    p.endShape();
  }

  morph(targetVertices) {
    this.targetVertices = targetVertices;
  }

  addLine(p, offsetX) {
    if (this.vertices.length < 100) {
      let angle = p.random(p.TWO_PI);
      let x = p.width / 2 + 50 * p.cos(angle) + offsetX;
      let y = p.height / 2 + 50 * p.sin(angle);
      this.vertices.push(p.createVector(x, y));
      this.targetVertices.push(p.createVector(x, y));
    }
  }

  update(p) {
    for (let i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      let targetV = this.targetVertices[i % this.targetVertices.length];
      this.vertices[i] = p5.Vector.lerp(v, targetV, 0.01);
    }
  }
}

new p5((p) => {
  let shapes = [];
  let offsetX = 0;
  let lineCounter = 0;

  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    p.frameRate(30);

    let lineVertices = [
      p.createVector(p.width / 2, p.height * 0.5),
      p.createVector(p.width / 2, p.height),
    ];
    let line = new Shape(lineVertices);
    shapes.push(line);
  };

  p.draw = function () {
    p.background(0);

    if (p.frameCount % 90 === 0 && lineCounter < 60) {
      offsetX += 20;
      lineCounter++;
      shapes.forEach((shape) => shape.addLine(p, offsetX));
    }

    shapes.forEach((shape, i) => {
      let targetShape = shapes[(i + 1) % shapes.length];
      shape.morph(targetShape.vertices);
      shape.update(p);
      shape.draw(p);
    });
  };
});
