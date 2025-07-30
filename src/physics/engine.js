import { Body } from "matter-js";

function dist(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

let lastLogTime = 0;

/**
 * Applies forces to Matter.js circles based on hand landmark predictions.
 * @param {Array} predictions - Array of hand landmarks from MediaPipe.
 * @param {Array} circles - Array of Matter.js circle bodies.
 * @param {Map} lastHandPositions - Map tracking previous hand landmark positions by landmark index.
 * @param {number} windowWidth - Width of the window for coordinate scaling.
 * @param {number} windowHeight - Height of the window for coordinate scaling.
 */
export function applyHandForcesToCircles(
  predictions,
  circles,
  lastHandPositions,
  windowWidth,
  windowHeight,
  interactionMode,
  circleStyle
) {
  const influenceRadius = 200;
  const damping = 0.5;

  for (const circle of circles) {
    const buffer = 10;
    const vx = circle.velocity.x;
    const vy = circle.velocity.y;
    const pos = circle.position;

    if (pos.x < buffer && vx < 0) Body.setVelocity(circle, { x: 0, y: vy });
    if (pos.x > windowWidth - buffer && vx > 0)
      Body.setVelocity(circle, { x: 0, y: vy });
    if (pos.y < buffer && vy < 0) Body.setVelocity(circle, { x: vx, y: 0 });
    if (pos.y > windowHeight - buffer && vy > 0)
      Body.setVelocity(circle, { x: vx, y: 0 });

    const clampedX = Math.min(Math.max(pos.x, buffer), windowWidth - buffer);
    const clampedY = Math.min(Math.max(pos.y, buffer), windowHeight - buffer);
    Body.setPosition(circle, { x: clampedX, y: clampedY });
  }

  for (const prediction of predictions) {
    if (!prediction.landmarks) continue;
    for (const [index, landmark] of prediction.landmarks.entries()) {
      const x = windowWidth - landmark.x * windowWidth;
      const y = landmark.y * windowHeight;
      const key = `${prediction.handedness}_${index}`;

      const last = lastHandPositions.get(key) || { x, y };
      const dx = x - last.x;
      const dy = y - last.y;

      for (const circle of circles) {
        const circlePos = circle.position;
        const distance = dist(x, y, circlePos.x, circlePos.y);

        if (distance < influenceRadius) {
          const strength = 1 - distance / influenceRadius;
          let fx = 0;
          let fy = 0;

          if (interactionMode === "gather") {
            const maxForce = 0.001;
            fx = dx * strength * maxForce;
            fy = dy * strength * maxForce;
          } else if (interactionMode === "repulse") {
            const repelForce = 2.5;
            const awayX = circlePos.x - x;
            const awayY = circlePos.y - y;
            const norm = Math.sqrt(awayX * awayX + awayY * awayY) || 1;

            // Inverse square style repulsion for stronger near-field force
            const scaledStrength = strength * strength;
            fx = (awayX / norm) * repelForce * scaledStrength;
            fy = (awayY / norm) * repelForce * scaledStrength;
          } else if (interactionMode === "attract") {
            const attractForce = 0.05;
            const towardX = x - circlePos.x;
            const towardY = y - circlePos.y;
            const norm = Math.sqrt(towardX * towardX + towardY * towardY) || 1;
            fx = (towardX / norm) * attractForce * strength;
            fy = (towardY / norm) * attractForce * strength;
          }

          Body.applyForce(circle, circle.position, { x: fx, y: fy });
        }

        if (circleStyle === "trails") {
          if (!circle.trail) circle.trail = [];
          circle.trail.push({ x: circle.position.x, y: circle.position.y });

          // Limit the trail length
          if (circle.trail.length > 140) circle.trail.shift();
        }
      }

      lastHandPositions.set(key, { x, y });
    }
  }

  const visibleCircles = circles.filter((c) => {
    const { x, y } = c.position;
    return x >= 0 && x <= windowWidth && y >= 0 && y <= windowHeight;
  });

  const now = Date.now();
  if (now - lastLogTime > 10000) {
    console.log(
      "Visible circles:",
      visibleCircles.length,
      "of",
      circles.length
    );
    lastLogTime = now;
  }
}
