import React from "react";
import * as plots from "src/components/plots";
import { useUniqueId } from "src/util";

const p = {
  width: 320,
  height: 250,
  scale: [300 / 4, 250 / 2],
  origin: ["center", 1.75],
  padding: 0,
} as const;

export function SymmetricWellPotential() {
  const marker = `well-marker-${useUniqueId()}`;

  return (
    <plots.Plot
      width={p.width}
      height={p.height}
      padding={p.padding}
      origin={p.origin}
      scale={p.scale}
    >
      <plots.Axes xLabel="x" yAxis={false} />

      <plots.WithPlot>
        {(plot) => (
          <>
            <line
              x1={plot.x(-2.5)}
              x2={plot.x(2.5)}
              y1={plot.y(1.5)}
              y2={plot.y(1.5)}
              stroke="#000"
              strokeDasharray="8 3"
            />

            <marker
              id={marker}
              viewBox="0 0 10 10"
              refX="8" // Put the tip of the arrow just at the edge of the axes.
              refY="5" // Center the arrow on the line.
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
            </marker>

            <line
              x1={plot.x(0.8)}
              x2={plot.x(0.8)}
              y1={plot.y(1.45)}
              y2={plot.y(1.05)}
              stroke="#000"
              strokeWidth={2}
              markerStart={`url(#${marker})`}
              markerEnd={`url(#${marker})`}
            />

            <plots.Label
              t="E"
              x={0.8}
              y={(1.45 + 1.05) / 2}
              anchor="leftCenter"
            />

            <polyline
              points={plot.points([
                [-2.5, 1],
                [-1, 1],
                [-1, 0.2],
                [1, 0.2],
                [1, 1],
                [2.5, 1],
              ])}
              fill="none"
              stroke="#000"
              strokeWidth={2}
            />
          </>
        )}
      </plots.WithPlot>

      <plots.Label t="V = 0" x={-1} y={0.95} anchor="bottomRight" />
      <plots.Label t="V = -V_0" x={-1} y={0.1} anchor="bottomRight" />

      <plots.Label t="\text{I}" x={-1.5} y={0.5} anchor="bottomCenter" />
      <plots.Label t="\text{II}" x={0} y={0.5} anchor="bottomCenter" />
      <plots.Label t="\text{III}" x={1.5} y={0.5} anchor="bottomCenter" />

      <plots.Tick x={-1} label="-a" labelPosition="below" />
      <plots.Tick x={0} label="0" labelPosition="below" />
      <plots.Tick x={1} label="a" labelPosition="below" />

      <plots.Tick y={-1} label="-V_0" />
    </plots.Plot>
  );
}

export function StepPotential() {
  const marker = `step-marker-${useUniqueId()}`;
  const marker2 = `step-marker-2-${useUniqueId()}`;

  return (
    <plots.Plot
      width={p.width}
      height={p.height}
      padding={p.padding}
      origin={p.origin}
      scale={p.scale}
    >
      <plots.Axes xLabel="x" yAxis={false} />

      <plots.WithPlot>
        {(plot) => (
          <>
            <line
              x1={plot.x(-2.5)}
              x2={plot.x(2.5)}
              y1={plot.y(1.4)}
              y2={plot.y(1.4)}
              stroke="#000"
              strokeDasharray="8 3"
            />

            <marker
              id={marker2}
              viewBox="0 0 10 10"
              refX="8" // Put the tip of the arrow just at the edge of the axes.
              refY="5" // Center the arrow on the line.
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="blue" />
            </marker>

            <line
              x1={plot.x(0)}
              x2={plot.x(3)}
              y1={plot.y(1.55)}
              y2={plot.y(1.55)}
              stroke="blue"
              strokeWidth={2}
              markerStart={`url(#${marker2})`}
            />

            <g style={{ fontSize: "1.185rem" }}>
              <plots.Label
                t="\text{Incoming from right}"
                y={1.55}
                x={0}
                anchor="rightCenter"
              />
            </g>

            <marker
              id={marker}
              viewBox="0 0 10 10"
              refX="8" // Put the tip of the arrow just at the edge of the axes.
              refY="5" // Center the arrow on the line.
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
            </marker>

            <line
              x1={plot.x(0.8)}
              x2={plot.x(0.8)}
              y1={plot.y(1.35)}
              y2={plot.y(1.05)}
              stroke="#000"
              strokeWidth={2}
              markerStart={`url(#${marker})`}
              markerEnd={`url(#${marker})`}
            />

            <plots.Label
              t="E"
              x={0.8}
              y={(1.35 + 1.05) / 2}
              anchor="leftCenter"
            />

            <polyline
              points={plot.points([
                [-2.5, 1],
                [0, 1],
                [0, 0.2],
                [2.5, 0.2],
              ])}
              fill="none"
              stroke="#000"
              strokeWidth={2}
            />
          </>
        )}
      </plots.WithPlot>

      <plots.Label t="V = 0" x={0} y={0.95} anchor="bottomRight" />
      <plots.Label t="V = -V_0" x={0} y={0.1} anchor="bottomRight" />

      <plots.Tick x={0} label="0" labelPosition="below" />

      <plots.Tick y={-1} label="-V_0" />
    </plots.Plot>
  );
}

////////////////////////////////////////////////////////////////////////////////
// Well Potential
////////////////////////////////////////////////////////////////////////////////

const potential = {
  width: 250,
  height: 200,
  origin: ["center", 0.5],
  scale: [80, 110],
  padding: 0,
} as const;

export function WellPotential() {
  return (
    <plots.Plot
      width={potential.width}
      height={potential.height}
      padding={potential.padding}
      origin={potential.origin}
      scale={potential.scale}
    >
      <plots.Axes xLabel="x" yLabel="V(x)" />

      <plots.WithPlot>
        {(plot) => (
          <polyline
            points={plot.points([
              [-1.5, 0],
              [-1, 0],
              [-1, -1],
              [1, -1],
              [1, 0],
              [1.5, 0],
            ])}
            fill="none"
            stroke="#000"
            strokeWidth={2}
          />
        )}
      </plots.WithPlot>

      <plots.Tick x={0} label="0" labelPosition="above" />
      <plots.Tick x={-1} label="-a" labelPosition="above" />
      <plots.Tick x={1} label="a" labelPosition="above" />

      <plots.Tick y={-1} label="-V_0" />
    </plots.Plot>
  );
}

////////////////////////////////////////////////////////////////////////////////
// Barrier Potential
////////////////////////////////////////////////////////////////////////////////

export function BarrierPotential() {
  return (
    <plots.Plot
      width={potential.width}
      height={potential.height}
      padding={potential.padding}
      origin={["center", 1.5]}
      scale={potential.scale}
    >
      <plots.Axes xLabel="x" yLabel="V(x)" />

      <plots.WithPlot>
        {(plot) => (
          <polyline
            points={plot.points([
              [-1.5, 0],
              [-1, 0],
              [-1, 1],
              [1, 1],
              [1, 0],
              [1.5, 0],
            ])}
            fill="none"
            stroke="#000"
            strokeWidth={2}
          />
        )}
      </plots.WithPlot>

      <plots.Tick x={0} label="0" labelPosition="below" />
      <plots.Tick x={-1} label="-a" labelPosition="below" />
      <plots.Tick x={1} label="a" labelPosition="below" />

      <plots.Tick y={1} label="+V_0" />
    </plots.Plot>
  );
}

////////////////////////////////////////////////////////////////////////////////
// Barrier T & R
////////////////////////////////////////////////////////////////////////////////

const tR = {
  width: 450,
  height: 260,
  origin: [0.45, 1.15],
} as const;

const kBarrier = 3;
// Have to do this because JavaScript doesn't handle imaginary numbers.
const sinh2 = (x: number) =>
  x < 1
    ? Math.sinh(2 * kBarrier * Math.sqrt(2 * (1 - x))) ** 2
    : -1 * Math.sin(2 * kBarrier * Math.sqrt(2 * (x - 1))) ** 2;
const tBarrier = (x: number) => 1 / (1 + (1 / (4 * x * (1 - x))) * sinh2(x));
const rBarrier = (x: number) => 1 - tBarrier(x);
export function TransmissionReflectionBarrier() {
  return (
    <plots.Plot
      width={tR.width}
      height={tR.height}
      scale={[tR.width / 4, tR.height / 1.35]}
      origin={tR.origin}
    >
      <plots.Grid />

      <plots.Axes xLabel="E/V_0" yLabel="{\color{red}T },{\color{blue} R}" />

      <plots.Tick x={1} label="1" />
      <plots.Tick x={2} label="2" />
      <plots.Tick x={3} label="3" />

      <plots.Tick y={1} label="1" />
      <plots.Tick y={0.8} label="0.8" />
      <plots.Tick y={0.6} label="0.6" />
      <plots.Tick y={0.4} label="0.4" />
      <plots.Tick y={0.2} label="0.2" />

      <plots.Curve f={tBarrier} from={0} to={4} numPoints={500} stroke="red" />
      <plots.Curve f={rBarrier} from={0} to={4} numPoints={500} stroke="blue" />
    </plots.Plot>
  );
}

////////////////////////////////////////////////////////////////////////////////
// Well T & R
////////////////////////////////////////////////////////////////////////////////

const kWell = 4.2;
// Have to do this because JavaScript doesn't handle imaginary numbers.
// const sinh2 = (x: number) =>
//   x < 1
//     ? Math.sinh(2 * kBarrier * Math.sqrt(2 * (1 - x))) ** 2
//     : -1 * Math.sin(2 * kBarrier * Math.sqrt(2 * (x - 1))) ** 2;
const tWell = (x: number) =>
  1 /
  (1 +
    (1 / (4 * x * (x + 1))) *
      Math.sin(2 * kWell * Math.sqrt(2 * (x + 1))) ** 2);
const rWell = (x: number) => 1 - tWell(x);

export function TransmissionReflectionWell() {
  return (
    <plots.Plot
      width={tR.width}
      height={tR.height}
      scale={[tR.width / 5, tR.height / 1.35]}
      origin={tR.origin}
    >
      <plots.Grid />
      <plots.Axes xLabel="E/V_0" yLabel="{\color{red}T },{\color{blue} R}" />

      <plots.Tick x={1} label="1" />
      <plots.Tick x={2} label="2" />
      <plots.Tick x={3} label="3" />
      <plots.Tick x={4} label="4" />

      <plots.Tick y={1} label="1" />
      <plots.Tick y={0.8} label="0.8" />
      <plots.Tick y={0.6} label="0.6" />
      <plots.Tick y={0.4} label="0.4" />
      <plots.Tick y={0.2} label="0.2" />

      <plots.Curve f={tWell} from={0} to={5} numPoints={500} stroke="red" />
      <plots.Curve f={rWell} from={0} to={5} numPoints={500} stroke="blue" />
    </plots.Plot>
  );
}
