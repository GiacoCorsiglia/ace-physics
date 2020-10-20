import React from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Part, sectionComponents } from "../shared";

export default function ComparingRepresentations() {
  return (
    <Part label="Comparing Representations">
      <Content>{sections}</Content>
    </Part>
  );
}
const sections = sectionComponents(EnergyAndPosition, [
  (f) => (
    <Section first>
      <Prose>Going back to the original state <M t="\ket{\psi_A}"/> - we reproduce the two pictorial representations we have been using so far.  </Prose>

      <Continue commit={f.intro4Commit} label="Sounds good" /> */}

      </Section>
  ),
  (f)=>(
    <Section>
      <TextArea
        field={f.sameStateDifRep}
        label={<Prose>We are claiming these two very different representations show the SAME state <M t="\psi_A(x)"/>.
How can this be, the pictures look so different! </Prose>
}
      />
      <Continue commit={f.sameStateDifRepCommit}/>
    </Section>
  ),

  (f) => (
    <Section commits={f.sameStateDifRepCommit}>
      <TextArea
        field={f.inferFromHistRep}
        label={<Prose>What probabilities or information can you easily infer about this state from the E-basis histogram (on the left)? </Prose>}
      />

      <TextArea
       field={f.inferFromFuncRep}
        label={<Prose>What about the wave function graph (on the right)?</Prose>}
      />
      <Continue commit={f.inferFromRepCommit}/>

    </Section>
  ),

  (f) => (
    <Section commits={f.inferFromRepCommit}>
      <TextArea
        field={f.repWhichBetter}
        label={<Prose>Is one representation better (or more complete?) than the other?</Prose>}
      />
    </Section>
  )
]);
