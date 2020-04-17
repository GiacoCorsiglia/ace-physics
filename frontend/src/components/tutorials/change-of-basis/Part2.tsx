import React from "react";
import Select from "react-select";
import M from "../../M";
import { Part, Prose, Question } from "../../structure";
import ColumnVector from "../../structure/ColumnVector";

export default function Part2() {
  return (
    <div>
      <Part number={2}>Defining a Basis</Part>

      <Prose>
        Let’s work in 2-D "regular space" where Cartesian unit vectors{" "}
        <M t="\vu{i}" /> and <M t="\vu{j}" /> are written as <M t="\ket{i}" />{" "}
        and <M t="\ket{j}" />. We can write them as column vectors as follows:
        <M
          display
          t="\ket{i} \doteq \mqty(1 \\ 0) \text{ and } \ket{j} \doteq \mqty(0 \\ 1)"
        />
      </Prose>

      <Question label="a">What do you need to form a basis?</Question>

      <textarea className="full-text" />

      <Prose>
        Can we use <M t="\ket{i}" /> and <M t="\ket{j}" /> as a basis?
      </Prose>

      <div className="full-width">
        <p>
          <input name="yesno" id="yes" value="yes" type="radio" />
          &nbsp;
          <label htmlFor="yes">Yes</label>
        </p>

        <p>
          <input name="yesno" id="no" value="no" type="radio" />
          &nbsp;
          <label htmlFor="no">No</label>
        </p>
      </div>

      <Prose>Explain:</Prose>

      <textarea className="full-text" />

      <Question label="b">Plot the vector.</Question>

      <Question label="c">
        Let's represent <M t="\ket{u}" /> as a column vector. We'll do it two
        ways.
      </Question>

      <Question label="i" level="sub">
        First express each element in the column vector as a decimal.
      </Question>

      <div className="full-width">
        <ColumnVector
          labelTex="\ket{u}"
          vector={[<input type="number" />, <input type="number" />]}
        />
      </div>

      <Question label="ii" level="sub">
        Now express each element in the column vector symbolically using Dirac
        notation.
      </Question>

      <div className="full-width">
        <ColumnVector
          labelTex="\ket{u}"
          vector={[<Selector />, <Selector />]}
        />
      </div>

      <Question label="d">
        On the graph drawn above label these inner products. Discuss (and write)
        a conceptual meaning for these inner products based on the graph.
      </Question>

      <textarea className="full-text" />
    </div>
  );
}

const options = [
  { value: "\\ket{i}", label: "\\ket{i}" },
  { value: "\\ket{j}", label: "\\ket{j}" },
  { value: "\\braket{i}{u}", label: "\\braket{i}{u}" },
  { value: "\\braket{j}{u}", label: "\\braket{j}{u}" },
  { value: "\\braket{u}{i}", label: "\\braket{u}{i}" },
  { value: "\\braket{u}{j}", label: "\\braket{u}{j}" },
];

function Selector() {
  return (
    <Select<{ value: string; label: string }>
      options={options}
      formatOptionLabel={(opt) => <M t={opt.label} />}
    />
  );
}
