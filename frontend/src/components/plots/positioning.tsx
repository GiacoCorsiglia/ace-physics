export type Anchor =
  | "center"
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "rightCenter"
  | "bottomRight"
  | "bottomCenter"
  | "bottomLeft"
  | "leftCenter";

export function idealAnchor(x: number, y: number): Anchor {
  if (x > 0 && y > 0) {
    // First quadrant.
    return "bottomLeft";
  } else if (x > 0 && y < 0) {
    // Second quadrant.
    return "topLeft";
  } else if (x < 0 && y < 0) {
    // Third quadrant.
    return "topRight";
  } else if (x < 0 && y > 0) {
    // Fourth quadrant.
    return "bottomRight";
  } else if (x > 0 && y === 0) {
    // Positive x-axis.
    return "bottomLeft";
  } else if (x < 0 && y === 0) {
    // Negative x-axis.
    return "bottomRight";
  } else if (x === 0 && y > 0) {
    // Positive y-axis.
    return "bottomLeft";
  } else if (x === 0 && y < 0) {
    // Negative y-axis.
    return "bottomRight";
  } else {
    // Origin.
    return "bottomRight";
  }
}

export function shift(
  anchor: Anchor,
  offset: number,
  width: number,
  height: number,
  centered: boolean = false
): [number, number] {
  if (centered) {
    width /= 2;
    height /= 2;
  }

  switch (anchor) {
    case "center":
      return [width / 2, height / 2];
    case "topLeft":
      return [offset, offset];
    case "topCenter":
      return [-(width / 2), offset];
    case "topRight":
      return [-(width + offset), offset];
    case "rightCenter":
      return [-(width + offset), -(height / 2)];
    case "bottomRight":
      return [-(width + offset), -(height + offset)];
    case "bottomCenter":
      return [-(width / 2), -(height + offset)];
    case "bottomLeft":
      return [offset, -(height + offset)];
    case "leftCenter":
      return [offset, -(height / 2)];
  }
}
