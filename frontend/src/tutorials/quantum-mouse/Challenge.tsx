import React from "react";
import { Prose, Reminder, Section } from "src/components";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Part } from "src/tutorials/shared";

export default function Challenge() {
  return (
    <Part label="Challenge">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              <p>
                Small-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\cdot} = 1 \ket{\cdot}" /> <br />
                Wide-eyed mice: &nbsp; <M t="\hat{S}\ket{*} = 2 \ket{*}" />{" "}
                <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{😸}=\ket{😸}" /> <br />
                Sad mice: &nbsp; <M t="\hat{M}\ket{😿}= -\ket{😿}" />
                //ADD MATRIX REP
              </p>
            </Prose>
          </Reminder>
          <Prose>
            <p>
              If you're done early or interested in some extra practice, check
              this out!
            </p>
            <p>
              Express the <M t="\hat{S}" /> operator in matrix notation. (This
              is not trivial, because we are using the basis of{" "}
              <M t="\hat{M}" />
              !)
            </p>
            <p>Start by writing [MATRIX ABCD FOR S]</p>
            <p>
              <em>
                Hint: What does <M t="\hat{S}" /> do to <M t="\ket{*}" />? What
                does <M t="\hat{S}" /> do to <M t="\ket{\cdot}" />? Write these
                out as matrix equations.
              </em>
            </p>
          </Prose>
        </Section>
      </Content>
    </Part>
  );
}
