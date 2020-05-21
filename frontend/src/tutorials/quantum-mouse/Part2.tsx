import React from "react";
import { Part, Prose, Question } from "../../components";
import M from "../../components/M";

export default function Part2() {
  return (
    <div>
      <Part number={2}>
        Superpositions. <em>Wait what, super-positive mice?</em>
      </Part>

      <Prose>
        Suppose now that I tell you that
        <M
          display
          t="\ket{0\_0} = \frac{1}{\sqrt{5}}\ket{😸} + \frac{2}{\sqrt{5}} \ket{😿}"
        />
      </Prose>

      <Question label="a">
        This suggests that wide-eyed quantum-mice are rather <em>stressed</em>.
        Briefly, why might I say that?
      </Question>

      <textarea className="full-text" />
    </div>
  );
}
