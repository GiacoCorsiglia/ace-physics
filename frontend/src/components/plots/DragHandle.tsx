import React, { useCallback, useRef, useState } from "react";
import { NumberSchema } from "src/common/schema";
import { Field } from "src/state";
import { roundToNearest } from "src/util";
import { usePlot } from ".";
import styles from "./plots.module.scss";

export default function DragHandle({
  direction = "both",
  snap,
  xDefault = 0,
  yDefault = 0,
  xField,
  yField,
}: {
  direction?: "x" | "y" | "both";
  snap?: number | [number, number];
  xDefault?: number;
  yDefault?: number;
  xField?: Field<NumberSchema>;
  yField?: Field<NumberSchema>;
}) {
  const plot = usePlot();
  const svgRect = useRef({ x: 0, y: 0, width: plot.outerWidth });

  const [coordinates, setCoordinates] = useState({
    x: plot.x(xField?.value || xDefault),
    y: plot.y(yField?.value || yDefault),
  });

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

  // This will not be a synthetic event.
  const documentMouseMove = useCallback(
    (e: MouseEvent) => {
      // Actual width / outerWidth.
      const scale = plot.outerWidth / svgRect.current.width;

      const xRelativeToSVG = (e.pageX - svgRect.current.x) * scale;
      const xRelativeToOrigin = xRelativeToSVG + plot.outerLeftEdge;
      const xClamped = Math.max(
        Math.min(xRelativeToOrigin, plot.rightEdge),
        plot.leftEdge
      );

      const yRelativeToSVG = (e.pageY - svgRect.current.y) * scale;
      const yRelativeToOrigin = yRelativeToSVG + plot.outerTopEdge;
      const yClamped = Math.max(
        Math.min(yRelativeToOrigin, plot.bottomEdge),
        plot.topEdge
      );

      const x = roundToNearest(xClamped, xSnap);
      const y = roundToNearest(yClamped, ySnap);
      setCoordinates({ x, y });
      xField?.set(plot.xInverse(x));
      yField?.set(plot.yInverse(y));
    },
    [plot, xSnap, ySnap, xField, yField]
  );

  const mouseDown = useCallback(
    (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
      const svgEl = (e.target as SVGGElement).closest("svg");
      if (!svgEl) {
        // Huh?
        return;
      }
      const { left, top, width } = svgEl.getBoundingClientRect();
      svgRect.current = {
        x: left + window.scrollX,
        y: top + window.scrollY,
        width,
      };

      document.addEventListener("mousemove", documentMouseMove);
      const mouseUp = () => {
        document.removeEventListener("mousemove", documentMouseMove);
        document.removeEventListener("mouseup", mouseUp);
      };
      document.addEventListener("mouseup", mouseUp);
    },
    [documentMouseMove]
  );

  const area = 42;
  const radius = 5;

  const changeX = direction === "both" || direction === "x";
  const changeY = direction === "both" || direction === "y";

  const x = changeX ? coordinates.x : plot.x(xDefault);
  const y = changeY ? coordinates.y : plot.y(yDefault);

  return (
    <g onMouseDown={mouseDown} className={styles.dragHandle}>
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
