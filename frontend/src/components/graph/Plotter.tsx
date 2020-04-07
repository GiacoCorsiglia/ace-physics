import React, { useState } from "react";
import SVG from "../SVG";
import M, { idealRelativeTo } from "../M2";

import styles from "./Plotter.module.css";
import { Vector } from "./Graph";

export default function Plotter() {
  const height = 300;
  const width = 400;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function numberAccepter(setter: typeof setX) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setter(parseFloat(e.target.value));
    };
  }

  const canPlot = !Number.isNaN(x) && !Number.isNaN(y) && (x !== 0 || y !== 0);

  const approxEquals = (n1: number, n2: number) => {
    if (Number.isNaN(n1) || Number.isNaN(n2)) {
      return false;
    }
    return Math.abs(n1 - n2) <= 0.02;
  };

  const correct =
    approxEquals(x, 1 / Math.sqrt(5)) && approxEquals(y, 2 / Math.sqrt(5));

  return (
    <div className={styles.root}>
      <p className="description">
        Plot the vector
        <M
          t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}"
          display
        />
        on the graph below by typing in the coordinates as decimals.
      </p>

      <p className={styles.form}>
        (
        <input
          type="number"
          min={-1}
          max={1}
          value={Number.isNaN(x) ? "" : x}
          onChange={numberAccepter(setX)}
          style={{ border: "1px solid orange", color: "orange" }}
        />
        ,
        <input
          type="number"
          min={-1}
          max={1}
          value={Number.isNaN(y) ? "" : y}
          onChange={numberAccepter(setY)}
          style={{ border: "1px solid green", color: "green" }}
        />
        )
      </p>

      <p style={{ textAlign: "center", marginBottom: 10 }}>
        {correct ? "Nicely done!" : "Keep trying! (.44, .88)"}
      </p>

      <SVG width={width} height={height} center className={styles.graph}>
        {svg => (
          <>
            <g id="axes">
              <line
                x1={-width / 2}
                y1={0}
                x2={width / 2}
                y2={0}
                stroke="#979797"
                strokeWidth={2}
              ></line>

              <line
                x1={0}
                y1={-height / 2}
                x2={0}
                y2={height}
                stroke="#979797"
                strokeWidth={2}
              ></line>

              <M
                t="\mathbf{i}"
                inSvg
                x={width / 2}
                y={0}
                relativeTo="bottomRight"
              />

              <M
                t="\mathbf{j}"
                inSvg
                x={0}
                y={-height / 2}
                relativeTo="topLeft"
              />
            </g>

            {canPlot && <Vector {...svg.position(x, y)} color="blue" />}
            {canPlot && (
              <M
                t="{\color{blue} \ket{u}}"
                inSvg
                {...svg.position(x, y)}
                relativeTo={idealRelativeTo(x, y)}
              />
            )}

            {canPlot && x !== 0 && (
              <line
                x1={svg.scale(x)}
                x2={svg.scale(x)}
                y1={-5}
                y2={5}
                stroke="green"
                strokeWidth={2}
              ></line>
            )}

            {canPlot && y !== 0 && (
              <line
                x1={-5}
                x2={5}
                y1={-svg.scale(y)}
                y2={-svg.scale(y)}
                stroke="orange"
                strokeWidth={2}
              ></line>
            )}
          </>
        )}
      </SVG>
    </div>
  );
}
