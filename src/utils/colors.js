export function getRandomColor(alpha = 255) {
  return color(random(100, 255), random(100, 255), random(100, 255), alpha);
}

export function extractRGB(p5color) {
  return {
    r: red(p5color),
    g: green(p5color),
    b: blue(p5color),
  };
}
export function getRGBA(colorObj, alpha) {
  return [red(colorObj), green(colorObj), blue(colorObj), alpha];
}
