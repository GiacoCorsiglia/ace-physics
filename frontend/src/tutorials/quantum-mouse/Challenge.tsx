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
                <M t="\hat{S}\ket{\smalleye} = 1 \ket{\smalleye}" /> <br />
                Wide-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\wideye} = 2 \ket{\wideye}" /> <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{\smiley}=\ket{\smiley}" />{" "}
                <br />
                Sad mice: &nbsp;{" "}
                <M t="\hat{M}\ket{\frownie}= -\ket{\frownie}" />
                //ADD MATRIX REP
              </p>
            </Prose>
            <M
              display
              t="\ket{\smalleye} = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}"
            />

            <M
              display
              t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
            />
          </Reminder>
          <Prose>
            <p>If you're interested in some extra practice, check this out!</p>

            <p>
              Express the <M t="\hat{S}" /> operator in matrix notation. (This
              is not trivial, because we are using the basis of{" "}
              <M t="\hat{M}" />
              !)
            </p>
            <p>Start by writing [MATRIX ABCD FOR S]</p>
            <p>
              <em>
                Hint: What does <M t="\hat{S}" /> do to <M t="\ket{\wideye}" />?
                What does <M t="\hat{S}" /> do to <M t="\ket{\smalleye}" />?
                Write these out as matrix equations.
              </em>
            </p>
          </Prose>
        </Section>
      </Content>
    </Part>
  );
}
