import Matter from "matter-js";
const { Engine, World, Bodies, Body } = Matter;

let engine;
let world;
let circles = [];

let lastHandPositions = new Map();

let video;
let hands;
let predictions = [];
let mediapipeCanvas;
let attractMode = true;
let grabbedCircles = new Map(); // key: circle, value: hand position

function getRandomColor() {
  return color(random(100, 255), random(100, 255), random(100, 255), 60);
}

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  background(230);

  // Matter.js setup
  engine = Engine.create();
  engine.gravity.y = 0;
  world = engine.world;

  const thickness = 50;
  const ground = Bodies.rectangle(
    width / 2,
    height + thickness / 2,
    width,
    thickness,
    { isStatic: true }
  );
  const ceiling = Bodies.rectangle(
    width / 2,
    -thickness / 2,
    width,
    thickness,
    { isStatic: true }
  );
  const leftWall = Bodies.rectangle(
    -thickness / 2,
    height / 2,
    thickness,
    height,
    { isStatic: true }
  );
  const rightWall = Bodies.rectangle(
    width + thickness / 2,
    height / 2,
    thickness,
    height,
    { isStatic: true }
  );
  World.add(world, [ground, ceiling, leftWall, rightWall]);

  for (let i = 0; i < 40; i++) {
    const circle = Bodies.circle(
      random(width),
      random(height),
      random(20, 60), // Increased size range
      {
        restitution: 0.9,
        friction: 0.005,
        frictionAir: 0.1,
      }
    );
    circle.color = getRandomColor();
    World.add(world, circle);
    circles.push(circle);
  }

  video = createCapture(VIDEO);
  video.elt.onloadedmetadata = () => {
    console.log("✅ Webcam stream started");
  };
  video.size(640, 480);
  video.hide();

  mediapipeCanvas = createGraphics(640, 480);

  hands = new Hands({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
  });

  hands.onResults((results) => {
    predictions = results.multiHandLandmarks || [];

    mediapipeCanvas.clear();
    // if (results.multiHandLandmarks) {
    //   for (let hand of results.multiHandLandmarks) {
    //     drawConnectors(mediapipeCanvas.drawingContext, hand, HAND_CONNECTIONS, {
    //       color: "#00FF00",
    //       lineWidth: 2,
    //     });
    //     drawLandmarks(mediapipeCanvas.drawingContext, hand, {
    //       color: "#FF0000",
    //       lineWidth: 1,
    //     });
    //   }
    // }
  });

  const camera = new Camera(video.elt, {
    onFrame: async () => {
      await hands.send({ image: video.elt });
    },
    width: 640,
    height: 480,
  });
  camera.start();
};

window.draw = function () {
  background(230);
  Engine.update(engine);

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  image(mediapipeCanvas, 0, 0, width, height);
  drawHand(predictions);
  pop();

  if (predictions.length > 0) {
    let usedCircles = new Set();

    for (let hand of predictions) {
      if (!Array.isArray(hand) || hand.length !== 21) continue;

      // --- Velocity tracking ---
      const handIndex = predictions.indexOf(hand);
      const lastPositions = lastHandPositions.get(handIndex) || [];
      lastHandPositions.set(
        handIndex,
        hand.map((p) => ({ x: p.x, y: p.y }))
      );
      // ------------------------

      for (let i = 0; i < hand.length; i++) {
        const { x, y } = hand[i];
        // fingertip velocity
        const last = lastPositions[i] || { x, y };
        const vx = (x - last.x) * width * 0.5;
        const vy = (y - last.y) * height * 0.5;
        const scaledX = (1 - x) * width;
        const scaledY = y * height;

        for (let circle of circles) {
          if (usedCircles.has(circle)) continue;

          const dx = scaledX - circle.position.x;
          const dy = scaledY - circle.position.y;
          const distanceSq = dx * dx + dy * dy;
          const grabDistance = 60;

          if (distanceSq < grabDistance * grabDistance) {
            // Stick to hand by setting velocity toward it
            const strength = 0.2;
            Body.setVelocity(circle, {
              x: dx * strength + vx,
              y: dy * strength + vy,
            });

            usedCircles.add(circle);
          }
        }
      }
    }
  }

  noStroke();
  for (let circle of circles) {
    fill(circle.color);
    stroke(0, 0, 0, 30); // Slight stroke for visibility
    strokeWeight(1);
    ellipse(circle.position.x, circle.position.y, circle.circleRadius * 2);
  }
};

function drawHand(predictions) {
  for (let hand of predictions) {
    if (!Array.isArray(hand) || hand.length !== 21) continue;

    for (let i = 0; i < hand.length; i++) {
      const { x, y } = hand[i];

      // ✅ Convert normalized values (0–1) to canvas pixels
      const scaledX = x * width;
      const scaledY = y * height;

      fill(0, 100, 255);
      noStroke();
      ellipse(scaledX, scaledY, 6, 6); // Made smaller for clarity
    }
  }
}

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
};

window.keyPressed = function () {
  if (key === " ") {
    attractMode = !attractMode;
    console.log(`Mode: ${attractMode ? "Attract" : "Repel"}`);
  }
};
