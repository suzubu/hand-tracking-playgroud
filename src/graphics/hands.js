function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return [255 * f(0), 255 * f(8), 255 * f(4)];
}

const HAND_CONNECTIONS = [
  /* unchanged */
];

export function drawHand(
  predictions,
  canvasWidth,
  canvasHeight,
  style = "cyberpunkNeon"
) {
  colorMode(HSB, 360, 100, 100, 100);
  noFill();

  for (let hand of predictions) {
    if (!hand.landmarks || hand.landmarks.length !== 21) continue;

    const points = hand.landmarks.map((pt) => ({
      x: pt.x * canvasWidth,
      y: pt.y * canvasHeight,
    }));

    const baseHue = (millis() * 0.05) % 360;

    const fingerIndices = [
      [0, 1, 2, 3, 4], // Thumb
      [0, 5, 6, 7, 8], // Index
      [0, 9, 10, 11, 12], // Middle
      [0, 13, 14, 15, 16], // Ring
      [0, 17, 18, 19, 20], // Pinky
    ];

    drawingContext.shadowBlur = 35;

    fingerIndices.forEach((finger, i) => {
      const hue = (baseHue + i * 50) % 360;
      const innerHue = (hue + 180) % 360;

      const [r, g, b] = hslToRgb(hue, 100, 70);
      const [ri, gi, bi] = hslToRgb(innerHue, 100, 60);

      const borderColor = color(r, g, b, 100);
      const innerColor = color(ri, gi, bi, 40);

      drawingContext.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;

      // Outer glowing stroke
      stroke(borderColor);
      strokeWeight(12);
      noFill();
      beginShape();
      curveTightness(0.5);
      for (const index of finger) {
        const pt = points[index];
        curveVertex(pt.x, pt.y);
      }
      endShape();

      // Inner colored fill
      noStroke();
      fill(innerColor);
      beginShape();
      curveTightness(0.8);
      for (const index of finger) {
        const pt = points[index];
        curveVertex(pt.x, pt.y);
      }
      endShape(CLOSE);
    });
  }
}
