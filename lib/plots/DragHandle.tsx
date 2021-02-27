import { roundToNearest } from "@/helpers/frontend";
import { Model, useModel } from "@/reactivity";
import { NumberField } from "@/schema/fields";
import { cx } from "linaria";
import { useState } from "react";
import { usePlot } from ".";
import styles from "./plots.module.scss";

export default function DragHandle({
  direction = "both",
  snap,
  snapPoints,
  xDefault = 0,
  yDefault = 0,
  xModel,
  yModel,
  disabled = false,
}: {
  direction?: "x" | "y" | "both";
  snap?: number | readonly [x: number, y: number];
  snapPoints?: readonly number[] | readonly [x: number[], y: number[]];
  xDefault?: number;
  yDefault?: number;
  xModel?: Model<NumberField>;
  yModel?: Model<NumberField>;
  disabled?: boolean;
}) {
  const plot = usePlot();

  // This should be fine, the models shouldn't be changing with each render.
  const [xValue, setXValue] = xModel
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useModel(xModel, (xNew) => {
        setCoordinates((old) => ({
          x: plot.x(xNew || xDefault),
          y: old.y,
        }));
      })
    : [undefined, () => {}];
  const [yValue, setYValue] = yModel
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useModel(yModel, (yNew) => {
        setCoordinates((old) => ({
          x: old.x,
          y: plot.y(yNew || yDefault),
        }));
      })
    : [undefined, () => {}];

  const [coordinates, setCoordinates] = useState({
    x: plot.x(xValue || xDefault),
    y: plot.y(yValue || yDefault),
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

      if (xModel) {
        setXValue(plot.xInverse(x));
      }
      if (yModel) {
        setYValue(plot.yInverse(y));
      }
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
    ? plot.x(xValue !== undefined ? xValue : xDefault)
    : changeX
    ? coordinates.x
    : plot.x(xDefault);
  const y = disabled
    ? plot.y(yValue !== undefined ? yValue : yDefault)
    : changeY
    ? coordinates.y
    : plot.y(yDefault);

  return (
    <g
      onMouseDown={!disabled ? mouseDown : undefined}
      className={cx(styles.dragHandle, disabled && styles.dragHandleDisabled)}
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
