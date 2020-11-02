import React, { useState } from "react";
import { NumberSchema } from "src/common/schema";
import { Field } from "src/state";
import { classes, roundToNearest } from "src/util";
import { usePlot } from ".";
import styles from "./plots.module.scss";

export default function DragHandle({
  direction = "both",
  snap,
  snapPoints,
  xDefault = 0,
  yDefault = 0,
  xField,
  yField,
  disabled = false,
}: {
  direction?: "x" | "y" | "both";
  snap?: number | readonly [number, number];
  snapPoints?: readonly number[] | readonly [number[], number[]];
  xDefault?: number;
  yDefault?: number;
  xField?: Field<NumberSchema>;
  yField?: Field<NumberSchema>;
  disabled?: boolean;
}) {
  const plot = usePlot();

  const [coordinates, setCoordinates] = useState({
    x: plot.x(xField?.value || xDefault),
    y: plot.y(yField?.value || yDefault),
  });

  const mouseDown = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    const svgEl = (e.target as SVGGElement).closest("svg");
    if (!svgEl) {
      // Huh?
      return;
    }
    const { left, top, width } = svgEl.getBoundingClientRect();
    const svgRect = {
      x: left + window.scrollX,
      y: top + window.scrollY,
      width,
    };

    const xSnap = Math.max(
      !snap
        ? 1
        : typeof snap === "number"
        ? plot.xScale(snap)
        : plot.xScale(snap[0]),
      1
    );
    const ySnap = Math.max(
      !snap
        ? 1
        : typeof snap === "number"
        ? plot.yScale(snap)
        : plot.yScale(snap[1]),
      1
    );

    const xSnapPoints =
      !snapPoints || !snapPoints.length
        ? null
        : typeof snapPoints[0] === "number"
        ? (snapPoints as number[]).map(plot.xScale)
        : (snapPoints as [number[], number[]])[0].map(plot.xScale);

    const ySnapPoints =
      !snapPoints || !snapPoints.length
        ? null
        : typeof snapPoints[0] === "number"
        ? (snapPoints as number[]).map(plot.yScale)
        : (snapPoints as [number[], number[]])[1].map(plot.yScale);

    // This will not be a synthetic event.
    const documentMouseMove = (e: MouseEvent) => {
      // Actual width / outerWidth.
      const scale = plot.outerWidth / svgRect.width;

      const xRelativeToSVG = (e.pageX - svgRect.x) * scale;
      const xRelativeToOrigin = xRelativeToSVG + plot.outerLeftEdge;
      const xClamped = Math.max(
        Math.min(xRelativeToOrigin, plot.rightEdge),
        plot.leftEdge
      );

      const yRelativeToSVG = (e.pageY - svgRect.y) * scale;
      const yRelativeToOrigin = yRelativeToSVG + plot.outerTopEdge;
      const yClamped = Math.max(
        Math.min(yRelativeToOrigin, plot.bottomEdge),
        plot.topEdge
      );

      const x = snapTo(xClamped, xSnap, xSnapPoints);
      const y = snapTo(yClamped, ySnap, ySnapPoints);
      setCoordinates({ x, y });
      xField?.set(plot.xInverse(x));
      yField?.set(plot.yInverse(y));
    };

    document.addEventListener("mousemove", documentMouseMove);
    const mouseUp = () => {
      document.removeEventListener("mousemove", documentMouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
    document.addEventListener("mouseup", mouseUp);
  };

  const area = 42;
  const radius = 5;

  const changeX = direction === "both" || direction === "x";
  const changeY = direction === "both" || direction === "y";

  const x = disabled
    ? plot.x(xField?.value !== undefined ? xField?.value : xDefault)
    : changeX
    ? coordinates.x
    : plot.x(xDefault);
  const y = disabled
    ? plot.y(yField?.value !== undefined ? yField?.value : yDefault)
    : changeY
    ? coordinates.y
    : plot.y(yDefault);

  return (
    <g
      onMouseDown={!disabled ? mouseDown : undefined}
      className={classes(
        [styles.dragHandleDisabled, disabled],
        styles.dragHandle
      )}
    >
      <rect
        x={x - area / 2}
        y={y - area / 2}
        width={area}
        height={area}
        fill="transparent" // Need fill so it accepts pointer events
      />

      <circle
        cx={x}
        cy={y}
        r={radius}
        fill="black"
        stroke="transparent"
        strokeWidth={1}
      />
    </g>
  );
}

const snapTo = (
  value: number,
  snap: number,
  snapPoints: readonly number[] | null
): number => {
  if (!snapPoints || !snapPoints.length) {
    return roundToNearest(value, snap);
  }

  let minI = 0;
  for (let i = 0; i < snapPoints.length; i++) {
    if (Math.abs(snapPoints[i] - value) < Math.abs(snapPoints[minI] - value)) {
      minI = i;
    }
  }

  return snapPoints[minI];
};
