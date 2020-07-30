import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Reminder, Section } from "src/components";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { useField } from "src/state";
import { Part } from "src/tutorials/shared";

export default function MatrixRepresentation() {
  const moodVectorsCommit = useField(QuantumMouse, "moodVectorsCommit");
  const eyeSizeVectorsCommit = useField(QuantumMouse, "eyeSizeVectorCommit");
  const moodEigenequationCommit = useField(
    QuantumMouse,
    "moodEigenequationCommit"
  );
  const moodMatrixCommit = useField(QuantumMouse, "moodMatrixCommit");

  return (
    <Part label="Connecting to Matrix Representation">
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
              </p>
            </Prose>
            <M
              display
              t="\ket{\cdot} = \frac{2}{\sqrt{5}} \ket{😸} - \frac{1}{\sqrt{5}} \ket{😿}"
            />

            <M
              display
              t="\ket{*} = \frac{1}{\sqrt{5}} \ket{😸} + \frac{2}{\sqrt{5}} \ket{😿}"
            />
          </Reminder>
          <Prose>
            <p>
              Let’s choose mood eigenstates to be our “basis”. What will these
              eigenstates look like as column vectors? (We are working in the
              “mood basis” throughout this page and the rest of the Tutorial.)
            </p>
          </Prose>
          {/*--These are the labels in the field group: //a happy mouse,{" "}
          <M t="\ket{😸}" />
          //a sad mouse, <M t="\ket{😿}" />
          //textbox? that seems hard here. Definitely a hint to think about spin
              and what is the easiest set of vectors*/}
          <Continue commit={moodVectorsCommit} label="Move on" />
        </Section>

        <Section commits={[moodVectorsCommit]}>
          <Prose>
            <p>
              Now that we've defined the Mood basis states, how would the
              following be represented?
            </p>
          </Prose>
          {/*same style as above. Here are the labels for the field group //a
          small-eyed mouse, <M t="\ket{\cdot}" />
          //a big-eyed mouse, <M t="\ket{*}" />*/}
          <Continue commit={eyeSizeVectorsCommit} label="Move on" />
        </Section>

        <Section commits={[moodVectorsCommit, eyeSizeVectorsCommit]}>
          <Prose>
            <p>
              Now we want to find the representation for the <M t="\hat{M}" />{" "}
              operator. Take some time to work the following out on scrap paper
              using matrix notation.
            </p>
            <p>But first, let's remind ourselves of some things.</p>
          </Prose>
          {/*labels will be "What is <M t="\hat{M}\ket{😸}" />" and "What is{" "}
          <M t="\hat{M}\ket{😿}" />"*/}
          <Continue commit={moodEigenequationCommit} label="Move on" />
        </Section>

        <Section
          commits={[
            moodVectorsCommit,
            eyeSizeVectorsCommit,
            moodEigenequationCommit,
          ]}
        >
          <Prose>
            <p>
              Let <M t="\hat{M}" /> be a matrix with unknown elements [NEED TO
              PUT THIS IN]. Act <M t="\hat{M}" /> on the mood basis vectors to
              solve for a, b, c, d.
            </p>
          </Prose>
          {/*we can have this be drop down menus with a, b, c, and d as the
          labels. Unless you can rig up something fancier where they can type
          numbers in to box in a matrix format on screen. Don't do that if it
          would take a lot of time*/}
          <Continue commit={moodMatrixCommit} label="Move on" />
        </Section>
      </Content>
    </Part>
  );
}
