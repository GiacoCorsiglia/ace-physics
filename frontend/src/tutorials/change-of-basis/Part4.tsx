import React from "react";
import { Link } from "react-router-dom";
import { Hint, Part, Prose, Question } from "src/components";
import M from "src/components/M";
import { url } from "src/util";
import Graph from "./Graph";

export default function Part4() {
  return (
    <div>
      <Part number={4}>Relating Different Bases</Part>

      <Prose>
        We have represented our vector in a new basis, that is in the form{" "}
        <M t="a\ket{v_1} + b \ket{v_2}." /> An interesting question is, should
        we rename the vector in this basis to <M t="\ket{k}" />? Let's go ahead
        and do that and investigate whether we needed to.
      </Prose>

      <Question label="a">
        Now let's draw a single 2D graph showing both <M t="\ket{u}" /> and{" "}
        <M t="\ket{k}" />. You'll have to add <M t="\ket{u}" />, represent{" "}
        <M t="\ket{v_1}" /> and <M t="\ket{v_2}" /> on the graph, and then add
        the vector <M t="\ket{k}" />.
        <br />
        Use the buttons on the right to complete these steps.
      </Question>

      <Graph />

      <Question label="b">
        What is the relationship between <M t="\ket{u}" /> and <M t="\ket{k}" />
        ? What is the inner product of the two? <Hint>Don't calculate.</Hint>
      </Question>

      <textarea className="full-text" />

      <Question label="c">
        Using the analogy we’ve created to 2-D spatial vectors, explain what
        changing the basis means for a given quantum state (in this case{" "}
        <M t="\ket{u}" />
        ).
      </Question>

      <textarea className="full-text" />

      <Question label="d">
        Earlier we had a state <M t="\ket{u}" /> initially written in the basis
        of <M t="\ket{i}" /> and <M t="\ket{j}" />. We then converted this to a
        new basis. Was it (in retrospect) appropriate or necessary to give it a
        new name, <M t="\ket{k}" />?
      </Question>

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

      <Question label="e">
        Can we write{" "}
        <M t="\ket{\psi} = a \ket{+} + b \ket{-} = c \ket{+}_x + d \ket{-}_x" />
        ?
      </Question>

      <div className="full-width">
        <p>
          <input name="yesno2" id="yes2" value="yes" type="radio" />
          &nbsp;
          <label htmlFor="yes2">Yes</label>
        </p>

        <p>
          <input name="yesno2" id="no2" value="no" type="radio" />
          &nbsp;
          <label htmlFor="no2">No</label>
        </p>
      </div>

      <Prose>
        Why do we not need an <M t="x" /> subscript on <M t="\ket{\psi}" />?
      </Prose>

      <textarea className="full-text" />

      <nav>
        <Link to={url("/tutorials/change-of-basis/3")}>Go back to Part 3</Link>
      </nav>
    </div>
  );
}
