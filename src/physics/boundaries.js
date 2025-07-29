import Matter from "matter-js";
const { Bodies, World } = Matter;

export function createBoundaries(world, width, height, thickness = 50) {
  const ground = Bodies.rectangle(
    width / 2,
    height + thickness / 2,
    width,
    thickness,
    { isStatic: true }
  );
  const ceiling = Bodies.rectangle(
    width / 2,
    -thickness / 2,
    width,
    thickness,
    { isStatic: true }
  );
  const leftWall = Bodies.rectangle(
    -thickness / 2,
    height / 2,
    thickness,
    height,
    { isStatic: true }
  );
  const rightWall = Bodies.rectangle(
    width + thickness / 2,
    height / 2,
    thickness,
    height,
    { isStatic: true }
  );

  World.add(world, [ground, ceiling, leftWall, rightWall]);
}
