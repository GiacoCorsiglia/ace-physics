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
  centered: boolean = false,
): [x: number, y: number] {
  if (centered) {
    width /= 2;
    height /= 2;
  }

  // At the corners, the offset should be the hypotenuse of the triangle.
  // 2 * offsetCorner^2 = offset^2
  const offsetCorner = offset / Math.sqrt(2);

  switch (anchor) {
    case "center":
      return [width / 2, height / 2];
    case "topLeft":
      return [offsetCorner, offsetCorner];
    case "topCenter":
      return [-(width / 2), offset];
    case "topRight":
      return [-(width + offsetCorner), offsetCorner];
    case "rightCenter":
      return [-(width + offset), -(height / 2)];
    case "bottomRight":
      return [-(width + offsetCorner), -(height + offsetCorner)];
    case "bottomCenter":
      return [-(width / 2), -(height + offset)];
    case "bottomLeft":
      return [offsetCorner, -(height + offsetCorner)];
    case "leftCenter":
      return [offset, -(height / 2)];
  }
}

export function offsetShift(
  anchor: Anchor,
  offset: number,
): [x: number, y: number] {
  return shift(anchor, offset, 0, 0);
}

export function relativeTranslate(anchor: Anchor): string {
  switch (anchor) {
    case "center":
      return "translate(-50%, -50%)";
    case "topLeft":
      return "translate(0, 0)";
    case "topCenter":
      return "translate(-50%, 0)";
    case "topRight":
      return "translate(-100%, 0)";
    case "rightCenter":
      return "translate(-100%, -50%)";
    case "bottomRight":
      return "translate(-100%, -100%)";
    case "bottomCenter":
      return "translate(-50%, -100%)";
    case "bottomLeft":
      return "translate(0, -100%)";
    case "leftCenter":
      return "translate(0, -50%)";
  }
}
