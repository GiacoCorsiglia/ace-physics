import React from "react";
import Select from "react-select";
import M from "../../M";
import { Part, Prose, Question } from "../../structure";
import BooleanChoice from "../../structure/BooleanChoice";
import { ReactComponent as MouseBigEye } from "./svgs/mouse-big-eye.svg";
import { ReactComponent as MouseSmallEye } from "./svgs/mouse-small-eye.svg";

const selectOptions2 = [
  {
    value: "kets",
    label: (
      <span>
        <M t="\ket{😸}"></M> and <M t="\ket{😿}"></M>
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
        <M t="\hat{M}"></M>
      </span>
    ),
  },
];

const selectOptions = [
  {
    value: "kets",
    label: (
      <span>
        <M t="\ket{*}"></M> and <M t="\ket{O}"></M>
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
        <M t="\hat{S}"></M>
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
          properties we can measure. For example, suppose "eye size,"{" "}
          <M t="\hat{S}" />, is a Hermitian (observable) operator. The
          corresponding physical measurement is "measure the opening size of the
          pupil."
        </p>

        <p>
          Interestingly, the scale reads either 1 mm (tiny eyes) or 2 mm
          (wide-eyed), but nothing else!
        </p>

        <p style={{ textAlign: "center" }}>
          <M t="\hat{S}\large|" />
          <MouseSmallEye />
          <M t="\large\rangle =" />
          <M t="\ 1 \large|" />
          <MouseSmallEye />
          <M t="\large\rangle" />
          &nbsp;&nbsp;but&nbsp;&nbsp;
          <M t="\hat{S}\large|" />
          <MouseBigEye />
          <M t="\large\rangle =" />
          <M t="\ -1 \large|" />
          <MouseBigEye />
          <M t="\large\rangle" />
        </p>

        <p>
          That notation is a bit wacky, but it's allowed! That said, let's
          simplify the kets for smalled-eyed mice and big-eyed mice to{" "}
          <M t="\ket{*}" /> and <M t="\ket{O}" />, respectively.
        </p>

        <p>
          Note: Being either small-eyed or wide-eyed is totally <em>normal</em>.
          In fact, let us assume it is <em>ortho</em>normal (and complete).
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
        What can you say about the numerical value of <M t="\braket{*}{O}" />?
      </Question>

      <div className="full-width">
        <M t="\braket{*}{O} = " />
        &nbsp;
        <input type="number" />
      </div>

      <Prose>Explain:</Prose>

      <textarea className="full-text" />

      <Prose>
        "Quantum mood", <M t="\hat{M}" />, is also Hermitian. The corresponding
        physical measurement is “look at the mouse's expression”, yielding
        either a smile, <M t="\text{mood} = +1" />, or frown,{" "}
        <M t="\text{mood} = -1" />.
      </Prose>

      <M
        display
        t="\hat{M} \ket{😸} = \ket{😸} \text{, but } \hat{M} \ket{😿} = -\ket{😿}"
      />

      <Prose>
        (Yes, we're using cat emojis here—there are no happy/sad mouse emojis!)
      </Prose>

      <Prose>
        Note: being happy or sad is again, orthonormal, and complete.
      </Prose>

      <Question label="c">
        What are the possible values of a measurement of <M t="\hat{M}" />?
      </Question>

      <textarea className="full-text" />

      <Prose>
        Which symbols are the eigenvectors here, what are the eigenvalues, what
        are the operators?
      </Prose>

      <div className="full-width">
        <p style={{ display: "flex" }}>
          <label>Eigenvalues:</label>
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <Select
              placeholder="Select eigenvalues..."
              options={selectOptions2}
            />
          </div>
        </p>

        <p style={{ display: "flex", justifyContent: "" }}>
          <label>Eigenvectors:</label>
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <Select
              placeholder="Select eigenvectors..."
              options={selectOptions2}
            />
          </div>
        </p>

        <p style={{ display: "flex", justifyContent: "" }}>
          <label>Operators:</label>
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <Select
              placeholder="Select operators..."
              options={selectOptions2}
            />
          </div>
        </p>
      </div>

      <Question label="d">
        What is <M t="\braket{😸}{😿}" />?
      </Question>

      <div className="full-width">
        <M t="\braket{😸}{😿} = " />
        &nbsp;
        <input type="number" />
      </div>

      <Prose>Why?</Prose>

      <textarea className="full-text" />
    </div>
  );
}
