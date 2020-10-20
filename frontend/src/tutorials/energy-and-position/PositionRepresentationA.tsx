import React from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Part, sectionComponents } from "../shared";

export default function PositionRepresentationA() {
  return (
    <Part label="Position Representation of A">
      <Content>{sections}</Content>
    </Part>
  );
}
const sections = sectionComponents(EnergyAndPosition, [

  (f) => (
    <Section first>
      <Prose>
A different representation of our original starting state <M t="\ket{\psi_A}"/> from page 1 is given here. This is called the “position representation” or the “wave function representation”.
 </Prose>

      <Continue commit={f.intro3Commit} label="Sounds good" />

      </Section>
  ),
  (f)=>(
<Section commits={f.intro3Commit}>

      <TextArea
        field={f.infoFromFunc}
        label={<Prose>
          What information can you infer about this state from the graph?
           </Prose>}
        />

      <Continue commit={f.infoFromFuncCommit}/>
    </Section>
  ),


/*Graph is just a picture. Explain box. Hint asks them to think about the the axes and what they can possible measure */

    (f)=>(
      <Section commits={f.infoFromFuncCommit}>

        <TextArea
          field={f.probDensA}
          label={<Prose>
            Given any wave function <M t="\psi(x)"/>, we define the probability density to be <M t="|\psi(x)|^2"/>.  Very roughly sketch the probability density associated with <M t="\psi_A(x)"/> in the graph to the right.
             </Prose>}
        />

          <Continue commit={f.probDensACommit}/>
        </Section>
        ),
  (f) => (
    <Section commits={f.probDensACommit}>
      <TextArea
        field={f.MostProbLoc}
        label={<Prose>
            Given your probability density sketch, indicate where a particle described by <M t="\psi_A(x)"/> would be MOST likely to be found if you measured its position,
            </Prose>}
        />
        <TextArea
        field={f.LeastProbLoc}
        label={<Prose>and where it is LEAST likely to be found.</Prose>}/>

      <Continue commit={f.AProbLocCommit}/>

      </Section>
    ),

/*We might just have to do something where we give them the probability density (click a button to probability density) and then just isolate regions and ask them where it is most likely and least likely. I don’t think there is any way to get them to graph or that it would be worth it to do that. Two drop down menus with each */

(f)=>(
<Section commits={f.AProbLocCommit}>
    <TextArea
      field={f.StudResp}
      label={<Prose>
Some students are discussing their thoughts about the question “what is the probability that a measurement of position on a particle in state <M t="\ket{\psi_A}"/>⟩ will result in a value within dx of x0?”:
A: Isn’t that exactly what <M t="\psi(x_0)"/> tells you?
B: No, I think the probability is <M t="|\psi_A(x_0)|^2"/>
C: I feel like we need to include <M t="dx"/> somehow. Isn’t the answer the area under the wave function?

What do you think about these responses? </Prose>}
    />
    <TextArea
      field={f.StudCorrect}
      label={<Prose> Can you help firm up a fully correct answer?
</Prose>}
      />
    <Continue commit={f.StudRespCommit}/>

  </Section>
  ),

/*Just a big explain here since there isn’t one that is right.  */

(f)=>(
  <Section commits={f.StudRespCommit}>
    <TextArea
      field={f.EV4ALoc}
      label={<Prose>
        Do you think the expectation value of position for state <M t="\psi_A(x)"/> will be at the center, or left of center, or right of center?         </Prose>}
    />
    <TextArea
      field={f.EV4ALocExplain}
      label={<Prose>Why?</Prose>}
    />
    <Continue commit={f.EV4PosCommit}/>

</Section>
  ),
  /*Choices. Hint The expectation value in discrete cases is EQUATION. How can we apply that in wave function notation */

(f)=>(
  <Section commits={f.EV4PosCommit}>
    <TextArea
      field={f.posEigenstate}
      label={
        <Prose>
          Is a particle described by <M t="\psi_A(x)"/> in an eigenstate of position? (Why/why not?)
        </Prose>}
    />
    <Continue commit={f.posEigenstateCommit}/>

/</Section>
),
/*Yes/No with explain. If they answer it wrong we can have a follow up question about  what an eigenstate of position would look like: function, spike*/

]);
