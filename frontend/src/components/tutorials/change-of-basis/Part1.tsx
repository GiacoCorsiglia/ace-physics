import React, { useState } from "react";
import Select from "react-select";

import M from "../../M";
import SVG from "../../SVG";
import {
  Prose,
  Vocabulary,
  Question,
  Columns,
  Column,
  MoveOnButton,
} from "../../structure";
import { classes } from "../../../shared/util";

import styles from "./Part1.module.css";
import { Link } from "react-router-dom";

export default function Part1() {
  const [step, setStep] = useState(0);

  const probability = usePlusMinusState();
  const probabilityAmplitude = usePlusMinusState();

  const [text, setText] = useState("");

  const canMoveOn = (function (): boolean {
    if (step === 0) {
      return text.trim() !== "";
    } else if (step === 1) {
      return (
        probability.minusHeight === (100 * 16) / 25 &&
        probability.plusHeight === (100 * 9) / 25 &&
        probabilityAmplitude.minusHeight === (100 * -4) / 5 &&
        probabilityAmplitude.plusHeight === (100 * 3) / 5
      );
    } else if (step === 2) {
      return (
        probability.minusLabel === "\\Braket{-|\\psi_A}" &&
        probability.plusLabel === "\\Braket{+|\\psi_A}" &&
        probabilityAmplitude.minusLabel === "|\\Braket{-|\\psi_A}|^2" &&
        probabilityAmplitude.plusLabel === "|\\Braket{+|\\psi_A}|^2"
      );
    }
    return false;
  })();

  return (
    <div>
      <Prose>
        Consider the state:{" "}
        <M
          display
          t="\ket{\psi_A} = \frac{3}{5}\ket{+} - \frac{4}{5}\ket{-} \doteq \frac{1}{5} \begin{pmatrix} 3 \\ -4 \end{pmatrix}"
        />
      </Prose>

      <Question label="a">
        The coefficients <M t="\frac{3}{5}" /> and <M t="-\frac{4}{5}" /> are
        examples of what we call <Vocabulary>probability amplitudes</Vocabulary>
        . What do they tell you?
      </Question>

      <div className="full-width">
        <textarea
          style={{ width: "100%", height: "6rem", marginTop: "1rem" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>

      {step >= 1 && (
        <>
          <Question label="b">
            Let's create two histograms to represent this state.
          </Question>

          <Columns>
            <Column>
              <Question label="i" level="sub">
                First, complete the histogram below to show{" "}
                <Vocabulary>probability amplitudes</Vocabulary> for each
                possible outcome, <M t="\pm \hbar/2" />, in the <em>z</em>
                -direction.
              </Question>

              <Histogram pm={probabilityAmplitude} />
              <HistogramHeightControl pm={probabilityAmplitude} />
            </Column>

            <Column>
              <Question label="ii" level="sub">
                Now, complete the histogram below to show{" "}
                <Vocabulary>probabilities</Vocabulary> for each possible
                outcome, <M t="\pm \hbar/2" />, in the <em>z</em>-direction.
              </Question>

              <Histogram pm={probability} />
              <HistogramHeightControl pm={probability} />
            </Column>
          </Columns>
        </>
      )}

      {step >= 2 && (
        <>
          <Question label="c">
            On the same histograms, which are repeated below, label each bar in
            with Dirac notation for either probability or probability amplitude.
          </Question>

          <Columns>
            <Column>
              <Vocabulary>Probability amplitudes</Vocabulary>

              <Histogram pm={probabilityAmplitude} />
              <HistogramLabelControl pm={probabilityAmplitude} />
            </Column>

            <Column>
              <Vocabulary>Probabilities</Vocabulary>

              <Histogram pm={probability} />
              <HistogramLabelControl pm={probability} />
            </Column>
          </Columns>
        </>
      )}

      {step <= 1 && (
        <MoveOnButton disabled={!canMoveOn} onClick={() => setStep(step + 1)} />
      )}

      {step === 2 && canMoveOn && (
        <Prose>
          Now that you've completed these questions, you're ready to move on to
          the next part.
        </Prose>
      )}

      <nav>
        <Link to="/tutorials/change-of-basis/2">Go to Part 2</Link>
      </nav>
    </div>
  );
}
const plusMinusSelectOptions = [
  { value: (100 * 3) / 5, label: "3/5" },
  { value: (100 * -3) / 5, label: "-3/5" },
  { value: (100 * 4) / 5, label: "4/5" },
  { value: (100 * -4) / 5, label: "-4/5" },
  { value: (100 * 9) / 25, label: "9/25" },
  { value: (100 * -9) / 25, label: "-9/25" },
  { value: (100 * 16) / 25, label: "16/25" },
  { value: (100 * -16) / 25, label: "-16/25" },
];

const plusMinusLabelOptions = [
  { value: "\\ket{-}", label: "\\ket{-}" },
  { value: "\\ket{+}", label: "\\ket{+}" },
  { value: "\\Braket{-|\\psi_A}", label: "\\Braket{-|\\psi_A}" },
  { value: "\\Braket{+|\\psi_A}", label: "\\Braket{+|\\psi_A}" },
  { value: "|\\Braket{-|\\psi_A}|^2", label: "|\\Braket{-|\\psi_A}|^2" },
  { value: "|\\Braket{+|\\psi_A}|^2", label: "|\\Braket{+|\\psi_A}|^2" },
];

function usePlusMinusState() {
  const [minusHeight, setMinusHeight] = useState(0);
  const [plusHeight, setPlusHeight] = useState(0);
  const [minusLabel, setMinusLabel] = useState("");
  const [plusLabel, setPlusLabel] = useState("");

  return {
    minusHeight,
    setMinusHeight,
    plusHeight,
    setPlusHeight,
    minusLabel,
    setMinusLabel,
    plusLabel,
    setPlusLabel,
  };
}

function Histogram({ pm }: { pm: ReturnType<typeof usePlusMinusState> }) {
  const height = 300;
  const width = 400;

  const barWidth = 70;

  const minusColor = "#e2f9db";
  const plusColor = "#ecdbf9";

  return (
    <div style={{ marginTop: "1rem" }}>
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
            </g>

            <g>
              <line
                x1={-width / 4}
                y1={29}
                x2={-width / 4}
                y2={height / 2}
                stroke="#9be585"
                strokeWidth={2}
                strokeDasharray="4"
              />

              <rect
                x={-(width / 4 + barWidth / 2)}
                y={pm.minusHeight > 0 ? -pm.minusHeight : 0}
                width={barWidth}
                height={Math.abs(pm.minusHeight)}
                stroke="#979797"
                strokeWidth={2}
                fill={minusColor}
              />

              <M
                t="-\hbar / 2"
                inSvg
                x={-width / 4}
                y={0}
                relativeTo={pm.minusHeight >= 0 ? "topCenter" : "bottomCenter"}
              />
            </g>

            <g>
              <line
                x1={width / 4}
                y1={29}
                x2={width / 4}
                y2={height / 2}
                stroke="#cc90f9"
                strokeWidth={2}
                strokeDasharray="4"
              />

              <rect
                x={width / 4 - barWidth / 2}
                y={pm.plusHeight > 0 ? -pm.plusHeight : 0}
                width={barWidth}
                height={Math.abs(pm.plusHeight)}
                stroke="#979797"
                strokeWidth={2}
                fill={plusColor}
              />

              <M
                t="+\hbar / 2"
                inSvg
                x={width / 4}
                y={0}
                relativeTo={pm.plusHeight >= 0 ? "topCenter" : "bottomCenter"}
              />
            </g>
          </>
        )}
      </SVG>
    </div>
  );
}

function HistogramHeightControl({
  pm,
}: {
  pm: ReturnType<typeof usePlusMinusState>;
}) {
  return (
    <div className={styles.histogramForm}>
      <div>
        <Select<{ value: number; label: string }>
          options={plusMinusSelectOptions}
          menuPlacement="top"
          onChange={(opt) =>
            pm.setMinusHeight(
              opt !== null && opt !== undefined && "value" in opt
                ? opt.value
                : 0
            )
          }
          formatOptionLabel={(opt) => <M t={opt.label} />}
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: "green",
              "&:hover": {
                borderColor: "darkgreen",
              },
            }),
          }}
        />
      </div>

      <div>
        <Select<{ value: number; label: string }>
          options={plusMinusSelectOptions}
          menuPlacement="top"
          onChange={(opt) =>
            pm.setPlusHeight(
              opt !== null && opt !== undefined && "value" in opt
                ? opt.value
                : 0
            )
          }
          formatOptionLabel={(opt) => <M t={opt.label} />}
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: "violet",
              "&:hover": {
                borderColor: "darkviolet",
              },
            }),
          }}
        />
      </div>
    </div>
  );
}

function HistogramLabelControl({
  pm,
}: {
  pm: ReturnType<typeof usePlusMinusState>;
}) {
  return (
    <div className={styles.histogramForm}>
      <div>
        <Select<{ value: string; label: string }>
          options={plusMinusLabelOptions}
          menuPlacement="top"
          onChange={(opt) =>
            pm.setMinusLabel(
              opt !== null && opt !== undefined && "value" in opt
                ? opt.value
                : ""
            )
          }
          formatOptionLabel={(opt) => <M t={opt.label} />}
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: "green",
              "&:hover": {
                borderColor: "darkgreen",
              },
            }),
          }}
        />
      </div>

      <div>
        <Select<{ value: string; label: string }>
          options={plusMinusLabelOptions}
          menuPlacement="top"
          onChange={(opt) =>
            pm.setPlusLabel(
              opt !== null && opt !== undefined && "value" in opt
                ? opt.value
                : ""
            )
          }
          formatOptionLabel={(opt) => <M t={opt.label} />}
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: "violet",
              "&:hover": {
                borderColor: "darkviolet",
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
