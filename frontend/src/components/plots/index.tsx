import React, { createContext, useContext, useMemo } from "react";
import { Children, useUniqueId } from "src/util";
import M, { idealRelativeTo } from "../M";
import styles from "./plots.module.scss";
import { Anchor, shift } from "./positioning";

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
  width = 300,
  height = 300,
  scale = 100,
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
        <M
          t={label}
          inSvg
          x={plot.x(x)}
          y={plot.y(y)}
          color={color}
          relativeTo={idealRelativeTo(x, y)}
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
        <M
          t={xLabel}
          color={color}
          inSvg
          x={rightEdge}
          y={0}
          relativeTo="bottomRight"
        />
      )}

      {yLabel && (
        <M
          t={yLabel}
          color={color}
          inSvg
          x={0}
          y={topEdge}
          relativeTo="topLeft"
        />
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
        <M
          t={label + ""}
          color={color}
          inSvg
          x={position.x1}
          y={position.y2}
          relativeTo={
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
