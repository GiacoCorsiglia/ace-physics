import React from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Part, sectionComponents } from "../shared";

export default function WrapUpConnectingBases() {
  return (
    <Part label="Wrap Up: Connecting Bases">
      <Content>{sections}</Content>
    </Part>
  );
}
const sections = sectionComponents(EnergyAndPosition, [
  (f) => (
    <Section first>
      <Prose>In the position basis, our energy eigenstates are represented as <M t="\ket{E_1}\dot{=} \phi_1(x)"/>, <M t="\ket{E_2}\dot{=} \phi_2(x)"/>   etc.  We call <M t="\phi_1 (x)"/> the “ground state wave function”, and <M t="\phi_2 (x)"/> the “first excited energy state wave function”, etc.  Recall, our original state was

        <M display t="\ket{\psi_A}=\sqrt{\frac{3}{6}}\ket{E_1}+\sqrt{\frac{2}{6}}\ket{E_2}+\sqrt{\frac{1}{6}}\ket{E_4}" />

         You worked out that this state was written in the energy basis as:

        <M display t=
          "\ket{\psi_A} \dot{=}\ \begin{pmatrix} \sqrt{1/2} \\ \sqrt{1/3} \\ 0 \\ \sqrt{1/6} \\ ... \end{pmatrix}_E"
            />

        Later, we also said that same state was given in the position basis as  <M t="\ket{\psi_A}\dot{=}\psi_A(x)" />
</Prose>

      <Continue commit={f.reviewCommit} label="Much Learned" />
    </Section>
  ),

  (f) => (
    <Section commits={f.reviewCommit}>
      <TextArea
        field={f.ket2Func}
        label = {<Prose> Combine the information on this page to express <M t="\psi_A(x)" /> directly in terms of the energy basis wave functions <M t="\phi_n (x)" /></Prose>
        }
      />


      <Continue commit={f.ket2FuncCommit} label ="Did it"/>
    </Section>
  ),
  /*[This is going to be really hard to have them write, but I think we could maybe come up with a couple options? Or give them the expression and ask them to describe it/unpack it. We could ask “how is this similar to what you’ve learned previously in spins” We have to be careful about anything specific because we’re trying not to assume infinite square well …even though that is where the functions come from.*/
  (f) => (
    <Section commits={f.ket2FuncCommit}>
      <TextArea
        field = {f.repWhichBetter}
        label ={<Prose>
          Given all the results above, could you easily answer any “position related” questions (e.g. probabilities of position measurements, or expectation values of position) if you were only given the energy representation for this state?
          </Prose>
          }
        />
      <Continue commit={f.repWhichBetterCommit}/>
    </Section>
  ),

  (f) => (
    <Section commits={f.repWhichBetterCommit}>
      <Prose>
      To think about: how about vice-versa, do you think you could answer any “energy related” questions (e.g. probabilities of energy measurements, or expectation values) if you were only given the position wave function <M t="\psi_A(x)"/>?
      </Prose>
  </Section>
),
]);
