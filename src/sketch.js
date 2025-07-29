import Matter from "matter-js";
import { drawHand } from "./graphics/hands.js";
import { getRandomColor } from "./utils/colors.js";
import { applyHandForcesToCircles } from "./physics/engine.js";
import { createBoundaries } from "./physics/boundaries.js";
import { createCircles } from "./physics/circles.js";
import { setupMatter } from "./physics/matterSetup.js";
import { settings } from "./store/settings.js";
import "./components/uiControls.js"; // ✅ Import UI menu

const { Engine, World, Bodies, Body } = Matter;

let engine;
let world;
let circles = [];
let lastHandPositions = new Map();
let video;
let hands;
let predictions = [];
let mediapipeCanvas;

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  console.log("Canvas created");
  background(230);
  ({ engine, world, circles } = setupMatter(width, height));

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
    predictions = (results.multiHandLandmarks || []).map((landmarks, i) => ({
      landmarks,
      handedness: results.multiHandedness?.[i]?.label || `hand_${i}`,
    }));
    mediapipeCanvas.clear();
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
  Engine.update(engine);

  // Background rendering
  if (settings.backgroundMode === "video") {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
  } else if (settings.backgroundMode === "dark") {
    background(0);
  } else if (settings.backgroundMode === "light") {
    background(255);
  }

  if (predictions && predictions.length > 0) {
    push();
    translate(width, 0);
    scale(-1, 1);
    drawHand(predictions, width, height, "cyberpunkNeon");
    pop();
  }

  if (predictions.length > 0) {
    applyHandForcesToCircles(
      predictions,
      circles,
      lastHandPositions,
      width,
      height,
      settings.interactionMode // ✅ Pass selected interaction
    );
  }

  noStroke();
  for (let circle of circles) {
    fill(circle.color);
    stroke(0, 0, 0, 30);
    strokeWeight(1);
    ellipse(circle.position.x, circle.position.y, circle.circleRadius * 2);
  }
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
};
