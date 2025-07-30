import { drawingStyles } from "../utils/drawingStyles.js";
import { getRGBA } from "../utils/colors.js"; // helper to create p5 color with alpha

export function drawCircles(circles, style) {
  for (let circle of circles) {
    const { x, y } = circle.position;
    const radius = circle.circleRadius;

    if (style === "default") {
      // Pull style settings
      const s = drawingStyles.default;
      fill(circle.color);
      stroke(...s.strokeColor);
      strokeWeight(s.strokeWeight);
      ellipse(x, y, radius * 2);
    } else if (style === "trails") {
      const s = drawingStyles.trail;

      // Trail behind
      if (circle.trail && circle.trail.length > 1) {
        noStroke();
        for (let i = 0; i < circle.trail.length; i++) {
          const pos = circle.trail[i];
          const alpha = map(
            i,
            0,
            circle.trail.length,
            s.trailAlphaStart,
            s.trailAlphaEnd
          );
          fill(getRGBA(circle.color, alpha));
          ellipse(pos.x, pos.y, radius * 2);
        }
      }

      // Main circle
      fill(circle.color);
      stroke(...s.strokeColor);
      strokeWeight(s.strokeWeight);
      ellipse(x, y, radius * 2);
    } else if (style === "neon glow") {
      const s = drawingStyles.neonGlow;

      drawingContext.shadowBlur = s.shadowBlur;
      drawingContext.shadowColor = circle.color;

      fill(circle.color);
      stroke(...s.strokeColor);
      strokeWeight(s.strokeWeight);

      ellipse(
        x + sin(frameCount * s.jitterSpeed + x * 0.01) * s.jitterAmplitude,
        y,
        radius * s.scaleX,
        radius * s.scaleY
      );

      drawingContext.shadowBlur = 0;
      drawingContext.shadowColor = null;
    }
  }
}
