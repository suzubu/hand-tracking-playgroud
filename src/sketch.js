// Main p5.js sketch that integrates Mediapipe Hands for hand tracking and Matter.js for interactive circle physics.

// Matter.js core
import Matter from "matter-js";

// Drawing and utility helpers
import { drawHand } from "./graphics/hands.js";
import { getRandomColor } from "./utils/colors.js";

// Physics-related modules
import { applyHandForcesToCircles } from "./physics/engine.js";
import { createBoundaries } from "./physics/boundaries.js";
import { createCircles } from "./physics/circles.js";
import { setupMatter } from "./physics/matterSetup.js";

const { Engine, World, Bodies, Body } = Matter;

// Global state variables
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

// p5.js setup: create canvas, initialize video and hand tracking, and set up Matter.js world and circles.
window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  background(230);

  // Initialize Matter.js engine and create interactive circles.
  ({ engine, world, circles } = setupMatter(width, height));

  // Set up webcam feed for Mediapipe Hands input.
  video = createCapture(VIDEO);
  video.elt.onloadedmetadata = () => {
    console.log("✅ Webcam stream started");
  };
  video.size(640, 480);
  video.hide();

  mediapipeCanvas = createGraphics(640, 480);

  // Initialize Mediapipe Hands model and its options.
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

  // Handle Mediapipe results: store hand landmarks and clear debug canvas.
  hands.onResults((results) => {
    predictions = (results.multiHandLandmarks || []).map((landmarks, i) => ({
      landmarks,
      handedness: results.multiHandedness?.[i]?.label || `hand_${i}`,
    }));

    mediapipeCanvas.clear();
  });

  // Start Mediapipe camera processing to detect hands each frame.
  const camera = new Camera(video.elt, {
    onFrame: async () => {
      await hands.send({ image: video.elt });
    },
    width: 640,
    height: 480,
  });
  camera.start();
};

// p5.js draw loop: updates physics engine, renders video feed, hand landmarks, and interactive circles.
window.draw = function () {
  background(230);
  Engine.update(engine);

  // Mirror the video horizontally to create a natural mirror view.
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  drawHand(predictions, width, height, "rainbowGlow");

  pop();

  // Apply hand interaction forces to the circles if hands are detected.
  if (predictions.length > 0) {
    applyHandForcesToCircles(
      predictions,
      circles,
      lastHandPositions,
      width,
      height
    );
  }

  // Render all circles with their assigned colors and positions.
  noStroke();
  for (let circle of circles) {
    fill(circle.color);
    stroke(0, 0, 0, 30); // Slight stroke for visibility
    strokeWeight(1);
    ellipse(circle.position.x, circle.position.y, circle.circleRadius * 2);
  }
};

// Adjust canvas and video size when the window is resized.
window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
};

// Toggle between "Attract" and "Repel" modes when the spacebar is pressed.
window.keyPressed = function () {
  if (key === " ") {
    attractMode = !attractMode;
    console.log(`Mode: ${attractMode ? "Attract" : "Repel"}`);
  }
};
