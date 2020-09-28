import React, { createContext, useContext, useMemo } from "react";
import { Children, useUniqueId } from "src/util";
import M, { PropTypes as MPropTypes } from "../M";
import styles from "./plots.module.scss";
import {
  Anchor,
  idealAnchor,
  offsetShift,
  relativeTranslate,
  shift,
} from "./positioning";

interface PlotContext {
  width: number;
  height: number;
  center: boolean;
  scale(v: number): number;
  x(x: number): number;
  y(y: number): number;
}

const PlotContext = createContext<PlotContext>({} as PlotContext);

function usePlot() {
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
  width = 266,
  height = 266,
  scale = 90,
  center = true,
  children,
}: {
  /**
   * Width of the plot in pixels.  (Really max-width.)
   */
  width?: number;
  /**
   * Height of the plot in pixels.  (Really max-width.)
   */
  height?: number;
  /**
   * Number of pixels per unit.
   */
  scale?: number;
  /**
   * Whether the origin should be centered.
   */
  center?: boolean;
} & Children) {
  const context: PlotContext = useMemo(
    () => ({
      width,
      height,
      center,
      scale: (v: number) => v * scale,
      x: (x: number) => x * scale,
      y: (y: number) => -y * scale,
    }),
    [width, height, scale, center]
  );

  const viewBox = center
    ? `-${width / 2} -${height / 2} ${width} ${height}`
    : `0 0 ${width} ${height}`;

  return (
    <svg
      className={styles.plot}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <PlotContext.Provider value={context}>{children}</PlotContext.Provider>
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

  const rightEdge = plot.width / 2;
  const leftEdge = -rightEdge;
  const bottomEdge = plot.height / 2;
  const topEdge = -bottomEdge;

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
        x1={leftEdge}
        y1={0}
        x2={rightEdge}
        y2={0}
        stroke={color}
        opacity={axisOpacity}
        strokeWidth={axisWidth}
        markerStart={`url(#${marker})`}
        markerEnd={`url(#${marker})`}
      ></line>

      <line
        x1={0}
        y1={topEdge}
        x2={0}
        y2={bottomEdge}
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
          x={rightEdge}
          y={0}
          anchor="bottomRight"
        />
      )}

      {yLabel && (
        <PlotM t={yLabel} color={color} x={0} y={topEdge} anchor="topLeft" />
      )}
    </>
  );
}

export function Tick({
  x,
  y,
  label,
  color = axisColor,
  labelPosition,
}: (
  | { x: number; y?: never; labelPosition?: "above" | "below" }
  | { x?: never; y: number; labelPosition?: "left" | "right" }
) & {
  color?: string;
  label?: string | number;
}) {
  const plot = usePlot();

  const isX = x !== undefined;

  const position = isX
    ? {
        x1: plot.x(x!),
        x2: plot.x(x!),
        y1: -tickLength,
        y2: tickLength,
      }
    : {
        x1: -tickLength,
        x2: tickLength,
        y1: plot.y(y!),
        y2: plot.y(y!),
      };

  labelPosition =
    labelPosition === undefined ? (isX ? "below" : "left") : labelPosition;

  return (
    <>
      <line {...position} stroke={color} strokeWidth={axisWidth}></line>

      {(label !== undefined || label !== "") && (
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
  stroke = "#a4a4a4",
  fill = "#ddd",
}: {
  x: number;
  height: number;
  stroke?: string;
  fill?: string;
}) {
  const plot = usePlot();

  x = plot.x(x);
  height = plot.scale(height);

  const xLeft = x - barWidth / 2;

  return (
    <rect
      x={xLeft}
      y={height > 0 ? -height : 0}
      width={barWidth}
      height={Math.abs(height)}
      stroke={stroke}
      strokeWidth={axisWidth}
      fill={fill}
    />
  );
}

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
    const left = (plot.center ? plot.width / 2 + x : x) + offsetX;
    const top = (plot.center ? plot.height / 2 + y : y) + correctedOffsetY;

    return {
      // Fixed positioning is relative to the SVG not the window...
      // https://stackoverflow.com/questions/8185845/svg-foreignobject-behaves-as-though-absolutely-positioned-in-webkit-browsers
      position: "fixed",
      left: `${(left / plot.width) * 100}%`,
      top: `${(top / plot.height) * 100}%`,
      // Use this transform trick to enable positioning relative to different
      // anchors _without_ computing the width/height of the node.
      transform: relativeTranslate(anchor),
    };
  }, [x, y, anchor, offset, plot]);

  const leftmostX = plot.center ? -plot.width / 2 : 0;
  const topmostY = plot.center ? -plot.height / 2 : 0;

  return (
    <foreignObject
      x={leftmostX}
      y={topmostY}
      width={plot.width}
      height={plot.height}
    >
      <div style={style} {...{ xmlns: "http://www.w3.org/1999/xhtml" }}>
        <M {...props} display prespace={false} postspace={false} />
      </div>
    </foreignObject>
  );
}
