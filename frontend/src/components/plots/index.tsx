import React, { createContext, useContext, useMemo } from "react";
import { Children, range, useUniqueId } from "src/util";
import M, { PropTypes as MPropTypes } from "../M";
import styles from "./plots.module.scss";
import {
  Anchor,
  idealAnchor,
  offsetShift,
  relativeTranslate,
  shift,
} from "./positioning";

export { default as DragHandle } from "./DragHandle";

interface PlotContext {
  width: number;
  height: number;

  xPadding: number;
  yPadding: number;

  outerWidth: number;
  outerHeight: number;

  originX: number;
  originY: number;

  leftEdge: number;
  rightEdge: number;
  topEdge: number;
  bottomEdge: number;

  outerLeftEdge: number;
  outerRightEdge: number;
  outerTopEdge: number;
  outerBottomEdge: number;

  xScale(v: number): number;
  yScale(v: number): number;

  x(x: number): number;
  y(y: number): number;

  xInverse(x: number): number;
  yInverse(y: number): number;
}

const PlotContext = createContext<PlotContext>({} as PlotContext);
PlotContext.displayName = "PlotContext";

export function usePlot() {
  return useContext(PlotContext);
}

export function WithPlot({
  children,
}: {
  children: (plot: PlotContext) => React.ReactNode;
}) {
  return <>{children(usePlot())}</>;
}

export function Plot({
  width = 266, // This just happens to be the width of a column...
  height = 266,
  scale = 90,
  origin: _origin = "center",
  padding = 0,
  children,
}: {
  /** Width of the plot in pixels.  (Really max-width.) */
  width?: number;
  /**  Height of the plot in pixels.  (Really max-width.) */
  height?: number;
  /** Number of pixels per unit globally or per axis. */
  scale?: number | readonly [x: number, y: number];
  /**
   * Position of the origin *relative to the top left*, in graph units (i.e.,
   * not in pixels).
   */
  origin?:
    | readonly [
        number | "left" | "center" | "right",
        number | "top" | "center" | "bottom"
      ]
    | "center";
  /** */
  padding?: number | readonly [x: number, y: number];
} & Children) {
  const [xScale, yScale] = typeof scale === "number" ? [scale, scale] : scale;
  const [xPadding, yPadding] =
    typeof padding === "number" ? [padding, padding] : padding;

  const originX =
    _origin === "center"
      ? width / 2
      : _origin[0] === "left"
      ? 0
      : _origin[0] === "center"
      ? width / 2
      : _origin[0] === "right"
      ? width
      : _origin[0] * xScale;

  const originY =
    _origin === "center"
      ? height / 2
      : _origin[1] === "top"
      ? 0
      : _origin[1] === "center"
      ? height / 2
      : _origin[1] === "bottom"
      ? height
      : _origin[1] * yScale;

  const plot: PlotContext = useMemo(
    () => ({
      width,
      height,

      xPadding,
      yPadding,

      outerWidth: width + xPadding * 2,
      outerHeight: height + yPadding * 2,

      originX,
      originY,

      leftEdge: -originX,
      rightEdge: width - originX,
      topEdge: -originY,
      bottomEdge: height - originY,

      outerLeftEdge: -originX - xPadding,
      outerRightEdge: width - originX + xPadding,
      outerTopEdge: -originY - yPadding,
      outerBottomEdge: height - originY + yPadding,

      xScale: (v: number) => v * xScale,
      yScale: (v: number) => v * yScale,
      // The below functions exist because the y coordinate is reversed:
      x: (x: number) => x * xScale,
      y: (y: number) => -(y * yScale),

      xInverse: (x: number) => x / xScale,
      yInverse: (y: number) => -(y / yScale),
    }),
    [width, height, xScale, yScale, originX, originY, xPadding, yPadding]
  );

  const minX = originX === 0 ? "0" : `-${originX + xPadding}`;
  const minY = originY === 0 ? "0" : `-${originY + yPadding}`;
  const viewBox = `${minX} ${minY} ${plot.outerWidth} ${plot.outerHeight}`;

  return (
    <svg
      className={styles.plot}
      width={plot.outerWidth}
      height={plot.outerHeight}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <PlotContext.Provider value={plot}>{children}</PlotContext.Provider>
    </svg>
  );
}

function useMarkerId() {
  return `plot-marker-${useUniqueId()}`;
}

export function Vector({
  x,
  y,
  color = "black",
  label,
}: {
  x: number;
  y: number;
  color?: string;
  label?: string;
}) {
  const plot = usePlot();
  const marker = useMarkerId();

  if (x === 0 && y === 0) {
    return null;
  }

  return (
    <>
      <marker
        id={marker}
        viewBox="0 0 10 10"
        refX="9" // Put the tip of the arrow just at the tip of the vector.
        refY="5" // Center the arrow on the line.
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
      </marker>

      <line
        x1={0}
        y1={0}
        x2={plot.x(x)}
        y2={plot.y(y)}
        stroke={color}
        strokeWidth={2}
        markerEnd={`url(#${marker})`}
      ></line>

      {label && (
        <PlotM
          t={label}
          x={plot.x(x)}
          y={plot.y(y)}
          color={color}
          anchor={idealAnchor(x, y)}
        />
      )}
    </>
  );
}

const axisColor = "#2d2d2d";
const gridColor = "#ddd";
const axisOpacity = 0.4;
const axisWidth = 1;
const tickLength = 5;

export function Axes({
  color = axisColor,
  xLabel,
  yLabel,
}: {
  color?: string;
  xLabel?: string;
  yLabel?: string;
}) {
  const plot = usePlot();
  const marker = useMarkerId();

  return (
    <>
      <marker
        id={marker}
        viewBox="0 0 10 10"
        refX="8" // Put the tip of the arrow just at the edge of the axes.
        refY="5" // Center the arrow on the line.
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
      </marker>

      <line
        x1={plot.leftEdge}
        y1={0}
        x2={plot.rightEdge}
        y2={0}
        stroke={color}
        opacity={axisOpacity}
        strokeWidth={axisWidth}
        markerStart={`url(#${marker})`}
        markerEnd={`url(#${marker})`}
      ></line>

      <line
        x1={0}
        y1={plot.topEdge}
        x2={0}
        y2={plot.bottomEdge}
        stroke={color}
        opacity={axisOpacity}
        strokeWidth={axisWidth}
        markerStart={`url(#${marker})`}
        markerEnd={`url(#${marker})`}
      ></line>

      {xLabel && (
        <PlotM
          t={xLabel}
          color={color}
          x={plot.outerRightEdge}
          y={0}
          anchor={plot.xPadding !== 0 ? "rightCenter" : "bottomRight"}
        />
      )}

      {yLabel && (
        <PlotM
          t={yLabel}
          color={color}
          x={0}
          y={plot.outerTopEdge}
          anchor={plot.yPadding !== 0 ? "topCenter" : "topLeft"}
        />
      )}
    </>
  );
}

function coordinatesForEvery(
  plot: PlotContext,
  axis: "x" | "y",
  every: number
) {
  const origin = plot[`origin${axis.toUpperCase()}` as "originX" | "originY"];
  const axisLength = axis === "x" ? plot.width : plot.height;

  const beforeCount = Math.floor(origin / every);
  const afterCount = Math.floor((axisLength - origin) / every);

  return range(beforeCount)
    .map((i) => -(i + 1) * every)
    .concat(range(afterCount).map((i) => (i + 1) * every));
}

function Lines({
  axis,
  every,
  start,
  end,
  ...lineProps
}: {
  axis: "x" | "y";
  every: number;
  start: number;
  end: number;
} & JSX.IntrinsicElements["line"]) {
  const plot = usePlot();
  const otherAxis = axis === "x" ? "y" : "x";

  return (
    <>
      {coordinatesForEvery(plot, axis, every).map((c, i) => (
        <line
          key={i}
          {...lineProps}
          {...{
            [`${axis}1`]: c,
            [`${axis}2`]: c,
            [`${otherAxis}1`]: start,
            [`${otherAxis}2`]: end,
          }}
        />
      ))}
    </>
  );
}

type GridProps =
  | { every?: number | readonly [x: number, y: number]; axis?: never }
  | { every?: number; axis: "x" | "y" };

export const Grid = React.memo(function Grid({
  axis,
  every = 1,
  color = gridColor,
}: GridProps & {
  color?: string;
}) {
  // Turn them both on if they're both off!
  const xAxis = !axis || axis === "x";
  const yAxis = !axis || axis === "y";

  const plot = usePlot();

  const everyX = plot.xScale(typeof every === "number" ? every : every[0]);
  const everyY = plot.yScale(typeof every === "number" ? every : every[1]);

  return (
    <g>
      {xAxis && (
        <Lines
          axis="x"
          every={everyX}
          start={plot.topEdge}
          end={plot.bottomEdge}
          stroke={color}
          strokeWidth={1}
          opacity={axisOpacity}
        />
      )}
      {yAxis && (
        <Lines
          axis="y"
          every={everyY}
          start={plot.leftEdge}
          end={plot.rightEdge}
          stroke={color}
          strokeWidth={1}
          opacity={axisOpacity}
        />
      )}
    </g>
  );
});

export const GridLine = ({
  x,
  y,
  color = gridColor,
}: ({ x: number; y?: never } | { x?: never; y: number }) & {
  color?: string;
}) => {
  const plot = usePlot();

  const isX = x !== undefined;

  const position = isX
    ? {
        x1: plot.x(x!),
        x2: plot.x(x!),
        y1: plot.topEdge,
        y2: plot.bottomEdge,
      }
    : {
        x1: plot.leftEdge,
        x2: plot.rightEdge,
        y1: plot.y(y!),
        y2: plot.y(y!),
      };

  return (
    <line {...position} stroke={color} strokeWidth={1} opacity={axisOpacity} />
  );
};

export function Tick({
  x,
  y,
  label,
  color = axisColor,
  labelPosition,
  length = tickLength * 2,
}: (
  | { x: number; y?: never; labelPosition?: "above" | "below" }
  | { x?: never; y: number; labelPosition?: "left" | "right" }
) & {
  color?: string;
  label?: string | number;
  length?: number;
}) {
  const plot = usePlot();

  const isX = x !== undefined;

  length /= 2;

  const position = isX
    ? {
        x1: plot.x(x!),
        x2: plot.x(x!),
        y1: -length,
        y2: length,
      }
    : {
        x1: -length,
        x2: length,
        y1: plot.y(y!),
        y2: plot.y(y!),
      };

  labelPosition =
    labelPosition === undefined ? (isX ? "below" : "left") : labelPosition;

  return (
    <>
      <line {...position} stroke={color} strokeWidth={axisWidth}></line>

      {label !== undefined && label !== "" && (
        <PlotM
          t={label + ""}
          color={color}
          x={position.x1}
          y={position.y2}
          anchor={
            labelPosition === "below"
              ? "topCenter"
              : labelPosition === "above"
              ? "bottomCenter"
              : labelPosition === "left"
              ? "rightCenter"
              : "leftCenter"
          }
        />
      )}
    </>
  );
}

export function Rotate({ degrees, children }: { degrees: number } & Children) {
  return <g transform={`rotate(-${degrees} 0 0)`}>{children}</g>;
}

const barWidth = 70;

export function Bar({
  x,
  height,
  width,
  stroke = "#a4a4a4",
  fill = "#ddd",
  opacity = 1,
  dashed = false,
}: {
  x: number;
  height: number;
  width?: number;
  stroke?: string;
  fill?: string;
  opacity?: number;
  dashed?: boolean;
}) {
  const plot = usePlot();

  x = plot.x(x);
  height = plot.yScale(height); // Don't want it reversed
  width = width ? plot.xScale(width) : barWidth;

  const xLeft = x - width / 2;

  return (
    <rect
      className={styles.bar}
      x={xLeft}
      y={height > 0 ? -height : 0}
      width={width}
      height={Math.abs(height)}
      stroke={stroke}
      strokeWidth={axisWidth}
      strokeDasharray={dashed ? 5 : undefined}
      fill={fill}
      opacity={opacity}
    />
  );
}

export function Indicator({
  x,
  y,
  to = "bottom",
  from,
  color = "#ddd",
}: (
  | {
      x: number;
      y?: never;
      from?: number | "top" | "bottom";
      to?: number | "top" | "bottom";
    }
  | {
      x?: never;
      y: number;
      from?: number | "left" | "right";
      to?: number | "left" | "right";
    }
) & {
  color?: string;
}) {
  const plot = usePlot();

  const isVerticalLine = x !== undefined;

  const toFrom = (n: "left" | "right" | "top" | "bottom" | number) =>
    n === "left"
      ? plot.outerLeftEdge
      : n === "right"
      ? plot.outerRightEdge
      : n === "top"
      ? plot.outerTopEdge
      : n === "bottom"
      ? plot.outerBottomEdge
      : isVerticalLine
      ? plot.y(n)
      : plot.x(n);

  to = toFrom(to);
  // Default to enough room for tick labels.
  from = from !== undefined ? toFrom(from) : 30;

  x = x !== undefined ? plot.x(x) : x;
  y = y !== undefined ? plot.y(y) : y;

  const position = isVerticalLine
    ? {
        x1: x,
        x2: x,
        y1: from,
        y2: to,
      }
    : {
        x1: from,
        x2: to,
        y1: y,
        y2: y,
      };

  return (
    <line {...position} stroke={color} strokeWidth={2} strokeDasharray="4" />
  );
}

export const Curve = React.memo(
  ({
    f,
    from,
    to,
    numPoints = 100,
    stroke = "#000",
    dotted = false,
  }: {
    f: (x: number) => number;
    from: number;
    to: number;
    numPoints?: number;
    stroke?: string;
    dotted?: boolean;
  }) => {
    const plot = usePlot();

    const curve: string[] = [];
    const step = (to - from) / numPoints;
    curve.push(`${plot.x(from)},${plot.y(f(from))}`);
    for (let x = from; x <= to; x += step) {
      curve.push(`${plot.x(x)},${plot.y(f(x))}`);
    }
    curve.push(`${plot.x(to)},${plot.y(f(to))}`);

    return (
      <polyline
        points={curve.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeDasharray={dotted ? 2 : undefined}
      />
    );
  }
);

export function CircleLabel({
  x,
  y,
  label,
  color = "#333",
  anchor,
  offset = 5,
}: {
  x: number;
  y: number;
  label: string;
  color?: string;
  anchor: Anchor;
  offset?: number;
}) {
  const plot = usePlot();

  const [sx, sy] = shift(anchor, offset, 30, 30, true);

  x = plot.x(x) + sx;
  y = plot.y(y) + sy;

  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={15}
        fill="white"
        opacity={0.75}
        stroke={color}
        strokeWidth={2}
      />

      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        {label}
      </text>
    </>
  );
}

function PlotM({
  x,
  y,
  anchor,
  offset = 5,
  ...props
}: MPropTypes & {
  x: number;
  y: number;
  anchor: Anchor;
  offset?: number;
}) {
  const plot = usePlot();

  const style: React.CSSProperties = useMemo(() => {
    const [offsetX, offsetY] = offsetShift(anchor, offset);

    // The y offset needs to be adjusted since the math seems to be shifted down
    // in its container somewhat.
    const correctedOffsetY = offsetY ? offsetY - 4 : 0;

    // Instead of positioning the foreignObject, we just make the foreign object
    // as big as the enclosing plot, and position the div inside of it.  This
    // avoids weird bugs where the offsetWidth and offsetHeight of the div
    // produced different incorrect values in different browsers.
    //
    // Add to the origin here because the positioning is not relative to the
    // viewBox but is always relative to the top left.
    const left = plot.originX + plot.xPadding + x + offsetX;
    const top = plot.originY + plot.yPadding + y + correctedOffsetY;

    return {
      // Fixed positioning is relative to the SVG not the window...
      // https://stackoverflow.com/questions/8185845/svg-foreignobject-behaves-as-though-absolutely-positioned-in-webkit-browsers
      position: "fixed",
      left: `${(left / plot.outerWidth) * 100}%`,
      top: `${(top / plot.outerHeight) * 100}%`,
      // Use this transform trick to enable positioning relative to different
      // anchors _without_ computing the width/height of the node.
      transform: relativeTranslate(anchor),
    };
  }, [x, y, anchor, offset, plot]);

  return (
    <foreignObject
      x={plot.outerLeftEdge}
      y={plot.outerTopEdge}
      width={plot.outerWidth}
      height={plot.outerHeight}
      className={styles.mathForeignObject}
    >
      <div
        style={style}
        className={styles.mathElement}
        {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
      >
        <M {...props} display prespace={false} postspace={false} />
      </div>
    </foreignObject>
  );
}
