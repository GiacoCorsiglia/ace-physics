import React from "react";
import Select from "react-select";
import M from "../../M";
import { Part, Prose, Question } from "../../structure";
import BooleanChoice from "../../structure/BooleanChoice";
import { ReactComponent as MouseBigEye } from "./svgs/mouse-big-eye.svg";
import { ReactComponent as MouseSmallEye } from "./svgs/mouse-small-eye.svg";

const selectOptions = [
  {
    value: "kets",
    label: (
      <span>
        <M t="\ket{\text{shut}}"></M> and <M t="\ket{\text{open}}"></M>
      </span>
    ),
  },
  {
    value: "value",
    label: (
      <span>
        <M t="1"></M> and <M t="-1"></M>
      </span>
    ),
  },
  {
    value: "operator",
    label: (
      <span>
        <M t="\hat{E}"></M>
      </span>
    ),
  },
];

export default function Part1() {
  return (
    <div>
      <Part number={1}>
        What the Heck is a <em>Quantum Mouse</em>?
      </Part>
      <Prose>
        <p>
          Consider a quantum object (a <em>quantum mouse</em>) and some new
          properties we can measure. For example, suppose "eye openness,"{" "}
          <M t="\mathbf{E}" />, is a Hermitian (observable) operator. The
          corresponding physical measurement is "how wide open are the mouse's
          eyes?"
        </p>

        <p>
          Interestingly, the scale only ever reads either "suspiciously shut" or
          "excitedly open", but nothing else! (There are no "sleeping mice" or
          "blinking mice," for example.)
        </p>

        <p style={{ textAlign: "center" }}>
          <M t="\hat{E}\large|" />
          <MouseSmallEye />
          <M t="\large\rangle =" />
          <M t="\ 1 \large|" />
          <MouseSmallEye />
          <M t="\large\rangle" />
          &nbsp;&nbsp;but&nbsp;&nbsp;
          <M t="\hat{E}\large|" />
          <MouseBigEye />
          <M t="\large\rangle =" />
          <M t="\ -1 \large|" />
          <MouseBigEye />
          <M t="\large\rangle" />
        </p>

        <p>
          That notation is a bit wacky, but it's allowed! That said, let's
          simplify the kets for supsicious-eyed mice and excited-eyed mice to{" "}
          <M t="\ket{\text{shut}}" /> and <M t="\ket{\text{open}}" />,
          respectively.
        </p>

        <p>
          Note: Turns out that, for mice, being either suspicious or excited is
          totally normal. In fact, let us assume it is orthonormal (and
          complete).
        </p>
      </Prose>

      <Question label="a">
        <p>
          <b>Look at the eigen-equations above</b>, and make sure you group
          understands the notation. Which symbols are the eigenvalue(s), and
          which are the eigenvector(s).
        </p>
      </Question>

      <div className="full-width">
        <p style={{ display: "flex" }}>
          <label>Eigenvalues:</label>
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <Select
              placeholder="Select eigenvalues..."
              options={selectOptions}
            />
          </div>
        </p>

        <p style={{ display: "flex", justifyContent: "" }}>
          <label>Eigenvectors:</label>
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <Select
              placeholder="Select eigenvectors..."
              options={selectOptions}
            />
          </div>
        </p>
      </div>

      <Prose>Do any numbers have “hidden” units?</Prose>
      <BooleanChoice center />

      <Prose>Is that ok? Have we ever seen that before?</Prose>
      <BooleanChoice center />

      <Question label="b">
        What can you say about the numerical value of{" "}
        <M t="\braket{\text{shut}}{\text{open}}" />?
      </Question>

      <div className="full-width">
        <M t="\braket{\text{shut}}{\text{open}} = " />
        &nbsp;
        <input type="number" />
      </div>

      <Prose>Explain:</Prose>

      <textarea className="full-text" />
    </div>
  );
}
