import Matter from "matter-js";
import { createBoundaries } from "./boundaries.js";
import { createCircles } from "./circles.js";

const { Engine, Bodies, World } = Matter;

export function setupMatter(width, height, circleCount = 40) {
  // Create a new physics engine
  const engine = Engine.create();
  engine.gravity.y = 0;
  engine.gravity.x = 0;

  const world = engine.world;

  // Add invisible static boundaries around the screen to prevent objects from exiting
  const wallThickness = 400;
  const walls = [
    // Top wall
    Bodies.rectangle(width / 2, -wallThickness / 2, width + wallThickness, wallThickness, {
      isStatic: true,
    }),
    // Bottom wall
    Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width + wallThickness,
      wallThickness,
      { isStatic: true }
    ),
    // Left wall
    Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + wallThickness, {
      isStatic: true,
    }),
    // Right wall
    Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height + wallThickness,
      { isStatic: true }
    ),
  ];
  World.add(world, walls);

  // Add soft circles randomly within the canvas
  const circles = createCircles(world, circleCount, width, height);

  circles.forEach((circle) => {
    circle.restitution = 0.05;
    circle.frictionAir = 0.1;
  });

  return { engine, world, circles };
}
