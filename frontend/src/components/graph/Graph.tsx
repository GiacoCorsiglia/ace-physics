import React, { useReducer } from "react";

import styles from "./Graph.module.css";
import M from "../M";
import { classes } from "../../shared/util";
import SVG from "../SVG";
import { Question, Prose } from "../structure";
import { Link } from "react-router-dom";

let markerCount = 0;

export function Vector({
  x,
  y,
  color = "black",
}: {
  x: number;
  y: number;
  color?: string;
}) {
  markerCount++;
  const marker = "arrow-" + markerCount;

  return (
    <>
      <marker
        id={marker}
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
      </marker>

      <line
        x1={0}
        y1={0}
        x2={x}
        y2={y}
        stroke={color}
        strokeWidth={2}
        markerEnd={`url(#${marker})`}
      ></line>
    </>
  );
}

interface State {
  phase: Phase;
  u: null | uOptions;
  v1v2: null | v1v2Options;
  k: null | kOptions;
  complete: null;
}

type Phase = "u" | "v1v2" | "k" | "complete";
type uOptions = "correct";
type v1v2Options = "correct" | "ij" | "vectors";
type kOptions = "correct" | "ij";

type Action =
  | ["nextPhase"]
  | ["choose", uOptions | v1v2Options | kOptions]
  | ["reset"];
// | ["choose", uOptions | v1v2Options | kOptions]

function reducer(state: State, action: Action): State {
  switch (action[0]) {
    case "nextPhase":
      switch (state.phase) {
        case "u":
          return { ...state, phase: "v1v2" };
        case "v1v2":
          return { ...state, phase: "k" };
        case "k":
          return { ...state, phase: "complete" };
      }
      return state;
    case "choose":
      return { ...state, [state.phase]: action[1] };
    case "reset":
      return { ...state, [state.phase]: null };
  }
}

export default function Graph() {
  const height = 300;
  const width = 400;

  const [state, dispatch] = useReducer(reducer, {
    phase: "u",
    u: null,
    v1v2: null,
    k: null,
    complete: null,
  });

  const k: [number, number] = [
    (2 + Math.sqrt(3)) / (2 * Math.sqrt(5)),
    Math.sqrt(3 / 5) - 1 / (2 * Math.sqrt(5)),
  ];

  return (
    <div>
      <Prose>
        We have represented our vector in a new basis, that is in the form{" "}
        <M t="a\ket{v1} + b \ket{v2}." /> An interesting question is, should we
        rename the vector in this basis to <M t="\ket{k}" />? Let's go ahead and
        do that and investigate whether we needed to.
      </Prose>

      <Question label="a">
        Now let's draw a single 2D graph showing both <M t="\ket{u}" /> and{" "}
        <M t="\ket{k}" />. You'll have to add <M t="\ket{u}" />, represent{" "}
        <M t="\ket{v1}" /> and <M t="\ket{v2}" /> on the graph, and then add the
        vector <M t="\ket{k}" />.
        <br />
        Use the buttons on the right to complete these steps.
      </Question>

      <div className={styles.root}>
        <SVG width={width} height={height} center className={styles.graph}>
          {(svg) => (
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
                  t={
                    state.v1v2 === "ij"
                      ? "{\\color{purple} \\mathbf{v1}}, \\mathbf{i}"
                      : "\\mathbf{i}"
                  }
                  inSvg
                  x={width / 2}
                  y={0}
                  relativeTo="bottomRight"
                />

                <M
                  t={
                    state.v1v2 === "ij"
                      ? "\\mathbf{j}, {\\color{purple} \\mathbf{v2}}"
                      : "\\mathbf{j}"
                  }
                  inSvg
                  x={0}
                  y={-height / 2}
                  relativeTo="topLeft"
                />
              </g>

              {state.v1v2 === "correct" && (
                <g id="v1v2-axes" transform="rotate(-30 0 0)">
                  <line
                    x1={-width}
                    y1={0}
                    x2={width}
                    y2={0}
                    stroke="purple"
                    strokeWidth={2}
                  ></line>

                  <line
                    x1={0}
                    y1={-height}
                    x2={0}
                    y2={height}
                    stroke="purple"
                    strokeWidth={2}
                  ></line>

                  <M
                    t="\color{purple} \mathbf{v1}"
                    inSvg
                    x={width / 2 + 30}
                    y={-5}
                    relativeTo="bottomRight"
                  />

                  <M
                    t="\color{purple} \mathbf{v2}"
                    inSvg
                    x={0}
                    y={-(height / 2) - 20}
                    relativeTo="topRight"
                  />

                  {state.k === "correct" && (
                    <line
                      x1={svg.scale(k[0])}
                      x2={svg.scale(k[0])}
                      y1={-5}
                      y2={5}
                      stroke="red"
                      strokeWidth={2}
                    ></line>
                  )}
                  {state.k === "correct" && (
                    <line
                      x1={-5}
                      x2={5}
                      y1={-svg.scale(k[1])}
                      y2={-svg.scale(k[1])}
                      stroke="red"
                      strokeWidth={2}
                    ></line>
                  )}
                </g>
              )}

              {state.u === "correct" && (
                <Vector
                  {...svg.position(1 / Math.sqrt(5), 2 / Math.sqrt(5))}
                  color="blue"
                />
              )}
              {state.u === "correct" && (
                <M
                  t={
                    state.k === "correct"
                      ? "{\\color{blue} \\ket{u}}, {\\color{red} \\ket{k}}"
                      : "{\\color{blue} \\ket{u}}"
                  }
                  inSvg
                  {...svg.position(1 / Math.sqrt(5), 2 / Math.sqrt(5))}
                  relativeTo="bottomLeft"
                />
              )}

              {state.v1v2 === "vectors" && (
                <Vector
                  {...svg.position(Math.sqrt(3) / 2, 1 / 2)}
                  color="purple"
                />
              )}
              {state.v1v2 === "vectors" && (
                <M
                  t="{\color{purple} \ket{v1}}"
                  inSvg
                  {...svg.position(Math.sqrt(3) / 2, 1 / 2)}
                  relativeTo="bottomLeft"
                />
              )}
              {state.v1v2 === "vectors" && (
                <Vector
                  {...svg.position(-1 / 2, Math.sqrt(3) / 2)}
                  color="purple"
                />
              )}
              {state.v1v2 === "vectors" && (
                <M
                  t="{\color{purple} \ket{v2}}"
                  inSvg
                  {...svg.position(-1 / 2, Math.sqrt(3) / 2)}
                  relativeTo="bottomRight"
                />
              )}

              {state.k === "ij" && (
                <Vector {...svg.position(...k)} color="red" />
              )}
              {state.k === "ij" && (
                <M
                  t="{\color{red} \ket{k}}"
                  inSvg
                  {...svg.position(...k)}
                  relativeTo="bottomLeft"
                />
              )}
              {state.k === "ij" && (
                <line
                  x1={svg.scale(k[0])}
                  x2={svg.scale(k[0])}
                  y1={-5}
                  y2={5}
                  stroke="red"
                  strokeWidth={2}
                ></line>
              )}
              {state.k === "ij" && (
                <line
                  x1={-5}
                  x2={5}
                  y1={-svg.scale(k[1])}
                  y2={-svg.scale(k[1])}
                  stroke="red"
                  strokeWidth={2}
                ></line>
              )}
            </>
          )}
        </SVG>

        <div className={styles.controls}>
          <Controls state={state} dispatch={dispatch} />

          {state[state.phase] === "correct" && (
            <p
              className={styles.buttonMoveOn}
              onClick={() => dispatch(["nextPhase"])}
            >
              Move on
            </p>
          )}
        </div>
      </div>

      <nav>
        <Link to="/tutorials/change-of-basis/3">Go back to Part 3</Link>
      </nav>
    </div>
  );
}

function Controls({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  switch (state.phase) {
    case "u":
      return (
        <div>
          <ul>
            <Button
              active={state.u === "correct"}
              option="correct"
              dispatch={dispatch}
            >
              Add <M t="\ket{u}" /> from above.
            </Button>
          </ul>
        </div>
      );
    case "v1v2":
      return (
        <div>
          <ul>
            <Button
              active={state.v1v2 === "ij"}
              option="ij"
              dispatch={dispatch}
            >
              Add <M t="\mathbf{v1}" /> and <M t="\mathbf{v2}" /> labels to the
              horizontal and vertical axes.
            </Button>

            <Button
              active={state.v1v2 === "vectors"}
              option="vectors"
              dispatch={dispatch}
            >
              Add the <M t="\ket{v1}" /> and <M t="\ket{v2}" /> vectors.
            </Button>

            <Button
              active={state.v1v2 === "correct"}
              option="correct"
              dispatch={dispatch}
            >
              Add rotated <M t="\ket{v1}" /> and <M t="\ket{v2}" /> axes.
            </Button>
          </ul>
        </div>
      );
    case "k":
      return (
        <div>
          <ul>
            <Button active={state.k === "ij"} option="ij" dispatch={dispatch}>
              Plot <M t="\ket{k}" /> against the <M t="\mathbf{i}" /> and{" "}
              <M t="\mathbf{j}" /> axes.
            </Button>

            <Button
              active={state.k === "correct"}
              option="correct"
              dispatch={dispatch}
            >
              Plot <M t="\ket{k}" /> against the <M t="\mathbf{v1}" /> and{" "}
              <M t="\mathbf{v2}" /> axes.
            </Button>
          </ul>
        </div>
      );
    case "complete":
      return <p>Nice job! {":)"}</p>;
  }
}

function Button({
  active,
  option,
  dispatch,
  children,
}: {
  active: boolean;
  option: uOptions | v1v2Options | kOptions;
  dispatch: React.Dispatch<Action>;
  children: React.ReactNode;
}) {
  return (
    <li
      className={classes(styles.button, [styles.buttonActive, active])}
      onClick={() => dispatch(["choose", option])}
    >
      {children}
    </li>
  );
}
