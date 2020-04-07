import React, { useState } from "react";
import SVG from "../SVG";
import M, { idealRelativeTo } from "../M";

import styles from "./Plotter2.module.css";
import { Vector } from "./Graph";
import { classes } from "../../shared/util";

export default function Plotter() {
  const height = 300;
  const width = 400;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [labelOption, setLabelOption] = useState<"yes" | "no" | "maybe" | null>(
    null
  );
  const [submittedNo, setSubmittedNo] = useState(false);
  const [unsurePhase, setUnsurePhase] = useState(0);

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

  const k: [number, number] = [
    (2 + Math.sqrt(3)) / (2 * Math.sqrt(5)),
    Math.sqrt(3 / 5) - 1 / (2 * Math.sqrt(5))
  ];

  const correct = approxEquals(x, k[0]) && approxEquals(y, k[1]);

  return (
    <div className={styles.root}>
      <p className="description">
        Plot the new vector in the new basis on the graph below.
      </p>

      <p className="description">
        First, is it OK to label the horizontal axis as <M t="\mathbf{v1}" />{" "}
        and the vertical axis as <M t="\mathbf{v2}" />?
      </p>

      <p className={styles.axisOK}>
        <span
          className={classes(styles.option, [
            styles.optionSelected,
            labelOption === "yes"
          ])}
          onClick={() => setLabelOption("yes")}
        >
          Yep!
        </span>
        <span
          className={classes(styles.option, [
            styles.optionSelected,
            labelOption === "no"
          ])}
          onClick={() => setLabelOption("no")}
        >
          No.
        </span>
        <span
          className={classes(styles.option, [
            styles.optionSelected,
            labelOption === "maybe"
          ])}
          onClick={() => setLabelOption("maybe")}
        >
          I'm not sure!
        </span>
      </p>

      {labelOption === "yes" && (
        <p className="description">
          Great! We've updated the graph with those labels for you.
        </p>
      )}

      {labelOption === "no" && !submittedNo && (
        <p className="description">Describe why not in the box below:</p>
      )}
      {labelOption === "no" && !submittedNo && (
        <textarea className={styles.noTextarea}></textarea>
      )}
      {labelOption === "no" && !submittedNo && (
        <p className={styles.moveOn} onClick={() => setSubmittedNo(true)}>
          Move on to the next step.
        </p>
      )}

      {((labelOption === "no" && submittedNo) || labelOption === "maybe") && (
        <p className="description">
          Remember, <M t="\ket{v1}" /> and <M t="\ket{v2}" /> form an{" "}
          <em>orthonormal basis</em> just like <M t="\ket{i}" /> and{" "}
          <M t="\ket{j}" />.
          <br />
          {unsurePhase >= 1 && (
            <span>
              This means that <M t="\ket{v1}" /> and <M t="\ket{v2}" /> can be
              represented by any pair of perpendicular axes.
            </span>
          )}
          {unsurePhase >= 1 && <br />}
          {unsurePhase >= 2 && (
            <span>
              Also remember that this plot does <em>not</em> include axes for{" "}
              <M t="\ket{i}" /> and <M t="\ket{j}" />, so we don't have to worry
              about how <M t="\ket{v1}" /> or <M t="\ket{v2}" /> relate to{" "}
              <M t="\ket{i}" /> and <M t="\ket{j}" />.
            </span>
          )}
          {unsurePhase >= 2 && <br />}
          {unsurePhase >= 3 && (
            <span>
              This all means that <strong>yes</strong>, we can label our axes
              this way in this diagram.
            </span>
          )}
          {unsurePhase >= 3 && <br />}
          If you feel OK about this, go ahead and change your answer above.
          {unsurePhase < 3 && <br />}
          {unsurePhase < 3 && (
            <span
              className={styles.unsure}
              onClick={() => setUnsurePhase(unsurePhase + 1)}
            >
              I'm still not sure.
            </span>
          )}
        </p>
      )}

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
        {correct ? "Nicely done!" : "Keep trying! (.83, .55)"}
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

              {labelOption === "yes" && (
                <M
                  t="\mathbf{v1}"
                  inSvg
                  x={width / 2}
                  y={0}
                  relativeTo="bottomRight"
                />
              )}

              {labelOption === "yes" && (
                <M
                  t="\mathbf{v2}"
                  inSvg
                  x={0}
                  y={-height / 2}
                  relativeTo="topLeft"
                />
              )}
            </g>

            {canPlot && <Vector {...svg.position(x, y)} color="red" />}

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
