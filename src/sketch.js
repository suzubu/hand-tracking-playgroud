// New sketch.js structure with cleaner logic
import Matter from "matter-js";
import { drawHand } from "./graphics/hands.js";
import { applyHandForcesToCircles } from "./physics/engine.js";
import { setupMatter } from "./physics/matterSetup.js";
import { settings } from "./store/settings.js";
import { drawCircles } from "./render/drawCircles.js";
import "./components/uiControls.js";

const { Engine } = Matter;

let engine,
  world,
  circles,
  lastHandPositions = new Map();
let video,
  hands,
  predictions = [],
  mediapipeCanvas;

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  ({ engine, world, circles } = setupMatter(width, height));
  setupVideo();
  setupHands();
};

window.draw = function () {
  Engine.update(engine);
  renderBackground();
  renderHands();
  applyHandForces();
  drawCircles(circles, settings.circleStyle);
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
};

function setupVideo() {
  video = createCapture(VIDEO);
  video.elt.onloadedmetadata = () => console.log("✅ Webcam stream started");
  video.size(640, 480);
  video.hide();
  mediapipeCanvas = createGraphics(640, 480);
}

function setupHands() {
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
    onFrame: async () => await hands.send({ image: video.elt }),
    width: 640,
    height: 480,
  });
  camera.start();
}

function renderBackground() {
  if (settings.backgroundMode === "video") {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
  } else {
    background(settings.backgroundMode === "dark" ? 0 : 255);
  }
}

function renderHands() {
  if (predictions.length > 0) {
    push();
    translate(width, 0);
    scale(-1, 1);
    drawHand(predictions, width, height, "cyberpunkNeon");
    pop();
  }
}

function applyHandForces() {
  if (predictions.length > 0) {
    applyHandForcesToCircles(
      predictions,
      circles,
      lastHandPositions,
      width,
      height,
      settings.interactionMode,
      settings.circleStyle
    );
  }
}
