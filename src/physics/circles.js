import Matter from "matter-js";
import { getRandomColor } from "../utils/colors.js";
const { Bodies, World } = Matter;

export function createCircles(world, count, width, height) {
  const circles = [];
  for (let i = 0; i < count; i++) {
    const circle = Bodies.circle(
      Math.random() * width,
      Math.random() * height,
      Math.random() * 40 + 20, // 20–60
      {
        restitution: 0.05,
        friction: 0.2,
        frictionAir: 0.01,
      }
    );
    circle.color = getRandomColor();
    World.add(world, circle);
    circles.push(circle);
  }
  return circles;
}
