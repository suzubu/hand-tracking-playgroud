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
  style = "dots"
) {
  colorMode(HSB, 360, 100, 100, 100);
  noFill();

  for (let hand of predictions) {
    if (!hand.landmarks || hand.landmarks.length !== 21) continue;

    const points = hand.landmarks.map((pt) => ({
      x: pt.x * canvasWidth,
      y: pt.y * canvasHeight,
    }));

    if (style === "rainbowGlow") {
      colorMode(RGB);
      for (const pt of points) {
        fill(0, 100, 100);
        noStroke();
        ellipse(pt.x, pt.y, 5);
      }

      const baseHue = (millis() * 0.02) % 360;

      const fingerIndices = [
        [1, 2, 3, 4], // Thumb
        [5, 6, 7, 8], // Index
        [9, 10, 11, 12], // Middle
        [13, 14, 15, 16], // Ring
        [17, 18, 19, 20], // Pinky
      ];

      fingerIndices.forEach((finger, i) => {
        const hue = (baseHue + i * 60) % 360;
        const [r, g, b] = hslToRgb(hue, 100, 70);
        const c = color(r, g, b);

        stroke(c);
        strokeWeight(8);
        noFill();
        beginShape();
        for (const index of finger) {
          const pt = points[index];
          vertex(pt.x, pt.y);
        }
        endShape();

        for (const index of finger) {
          const pt = points[index];
          fill(c);
          noStroke();
          ellipse(pt.x, pt.y, 12);
        }
      });
    }
  }
}
