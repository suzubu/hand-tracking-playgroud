import { Body } from "matter-js";

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
  windowHeight
) {
  const influenceRadius = 120;
  const maxForce = 0.001; // Softer interaction
  const damping = 0.5;

  for (const circle of circles) {
    const buffer = 10;
    const vx = circle.velocity.x;
    const vy = circle.velocity.y;
    const pos = circle.position;

    // If near edge and moving out of bounds, stop or dampen
    if (pos.x < buffer && vx < 0) Body.setVelocity(circle, { x: 0, y: vy });
    if (pos.x > windowWidth - buffer && vx > 0)
      Body.setVelocity(circle, { x: 0, y: vy });
    if (pos.y < buffer && vy < 0) Body.setVelocity(circle, { x: vx, y: 0 });
    if (pos.y > windowHeight - buffer && vy > 0)
      Body.setVelocity(circle, { x: vx, y: 0 });

    // Clamp position inside canvas to prevent loss
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
          const fx = dx * strength * maxForce;
          const fy = dy * strength * maxForce;
          Body.applyForce(circle, circle.position, { x: fx, y: fy });
        }
      }

      lastHandPositions.set(key, { x, y });
    }
  }
  // Log how many circles are currently visible on screen every 10 seconds
  const visibleCircles = circles.filter(c => {
    const { x, y } = c.position;
    return x >= 0 && x <= windowWidth && y >= 0 && y <= windowHeight;
  });

  const now = Date.now();
  if (now - lastLogTime > 10000) { // 10 seconds
    console.log("Visible circles:", visibleCircles.length, "of", circles.length);
    lastLogTime = now;
  }
}
