import p5 from "p5";

new p5((p) => {
  let circle = [];
  let square = [];
  let morph = [];
  let state = false;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);

    for (let angle = 0; angle < 360; angle += 9) {
      let v = p5.Vector.fromAngle(p.radians(angle - 135));
      v.mult(150); // Increase size by 50%
      circle.push(v);
      morph.push(p.createVector());
    }

    for (let x = -75; x < 75; x += 15) {
      // Increase size by 50%
      square.push(p.createVector(x, -75)); // Increase size by 50%
    }
    for (let y = -75; y < 75; y += 15) {
      // Increase size by 50%
      square.push(p.createVector(75, y)); // Increase size by 50%
    }
    for (let x = 75; x > -75; x -= 15) {
      // Increase size by 50%
      square.push(p.createVector(x, 75)); // Increase size by 50%
    }
    for (let y = 75; y > -75; y -= 15) {
      // Increase size by 50%
      square.push(p.createVector(-75, y)); // Increase size by 50%
    }
  };

  p.draw = function () {
    p.background(0);

    let totalDistance = 0;

    for (let i = 0; i < circle.length; i++) {
      let v1;
      if (state) {
        v1 = circle[i];
      } else {
        v1 = square[i];
      }
      let v2 = morph[i];
      v2.lerp(v1, 0.1);
      totalDistance += p5.Vector.dist(v1, v2);
    }

    if (totalDistance < 0.1) {
      state = !state;
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
