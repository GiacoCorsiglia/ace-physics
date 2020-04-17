import React from "react";
import Select from "react-select";
import M from "../../M";
import { Hint, Part, Prose, Question } from "../../structure";
import ColumnVector from "../../structure/ColumnVector";

export default function Part3() {
  return (
    <div>
      <Part number={3}>Changing the Basis</Part>

      <Prose>
        <p>We can represent vectors in any basis we want!</p>

        <p>
          Let’s shift to a new basis of <M t="\ket{v_1}" /> and{" "}
          <M t="\ket{v_2}" />, where
          <M
            display
            t="
            \ket{v_1} \doteq \mqty( \sqrt{3}/2 \\ 1/2 )
            \text{ and }
            \ket{v_2} \doteq \mqty( -1/2 \\ \sqrt{3}/2 )
          "
          />
          (You can check that these vectors are orthonormal if you'd like.)
        </p>
      </Prose>

      <Question label="a">
        Represent our vector{" "}
        <M t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}" />{" "}
        in this new basis.
        <br />
        This means we wish to write our vector in the form{" "}
        <M t="a\ket{v_1} + b\ket{v_2}" />
        . Your task is to find <M t="a" /> and <M t="b" />.
        <br />
        <Hint>
          <M t="a" /> and <M t="b" /> are coefficients. How do you represent
          those in Dirac notation?
        </Hint>
      </Question>

      <Question label="c">
        Let's represent our vector as a column vector in this new basis. That
        is, in the form <M t="\mqty(a \\ b)_{\large{v}}" />
      </Question>

      <Question label="i" level="sub">
        First express each element in the column vector as a decimal.
      </Question>

      <div className="full-width">
        <ColumnVector
          vector={[<input type="number" />, <input type="number" />]}
          subscriptTex="v"
        />
      </div>

      <Question label="ii" level="sub">
        Now express each element in the column vector symbolically as an inner
        product.
      </Question>

      <div className="full-width">
        <ColumnVector vector={[<Selector />, <Selector />]} subscriptTex="v" />
      </div>

      <Question label="d">
        Why is there a subscript on the column vector?
      </Question>

      <textarea className="full-text" />
    </div>
  );
}

const options = [
  { value: "\\ket{v_1}", label: "\\ket{v_1}" },
  { value: "\\ket{v_2}", label: "\\ket{v_2}" },
  { value: "\\braket{i}{u}", label: "\\braket{i}{u}" },
  { value: "\\braket{j}{u}", label: "\\braket{j}{u}" },
  { value: "\\braket{v_1}{u}", label: "\\braket{v_1}{u}" },
  { value: "\\braket{v_2}{u}", label: "\\braket{v_2}{u}" },
];

function Selector() {
  return (
    <Select<{ value: string; label: string }>
      options={options}
      formatOptionLabel={(opt) => <M t={opt.label} />}
    />
  );
}
