import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import { Part, sectionComponents } from "../shared";

export default function AnEnergyEigenstate() {
  return (
    <Part label="Time Evolution for an energy eigenstate">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(TimeDependence, [
  (f) => (
    <Section first>
      <Prose>
        <p> Play with the simulation found at http://tinyurl.com/timedev for a couple of minutes.  Someone share your screen, and discuss with your partners what each graph represents and the relationships between each pair of graphs. Then continue with the rest of the questions. Feel free to revisit the simulation while answering these questions.
        Don’t worry if you don’t get too far in this Tutorial - it’s long, and the important part is to make sense of what the sim is showing!
          </p>
        <p>
Set up the sim to consider (1st) the ground state. Use the bottom left stop and step controls as needed.
</p>

      </Prose>

      <Continue commit={f.part2IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part2IntroCommit}>
      <TextArea
        field={f.PrevGraphCompareExp}
        label={<Prose>

       Explain how the top right graph in the simulation relates to your graph from question 4a. Improve your answer to question 4a if needed, in particular consider the sense of rotation.
        </Prose>}

      />
      <Continue
        commit={f.PrevGraphCompareExpCommit}
        />

    </Section>
  ),
  (f) => (
    <Section commits={f.PrevGraphCompareExpCommit}>
      <TextArea
        field={f.SimGraphCompExp}
        label={<Prose>

       Using the tickbox in the Main Controls on the bottom right, ensure that the top left ψ(x,t) graph is visible.  The time dependence of the ground state is ψ_1 (x,t)=ψ_1 (x)〖 e〗^(-i E_1  t / ħ).
Explain how the top left wave function graph relates to the top right graph.

        </Prose>}

      />
      <Continue
        commit={f.SimGraphCompExpCommit}
        />

    </Section>
  ),
  (f) => (
    <Section commits={f.SimGraphCompExpCommit}>
      <Prose>
      A period is the time for a periodic system to complete one cycle. Using the time display and the top graphs, determine the rotation periods  T_1and T_2 (in terms of  h/E_1) of ψ_1 and ψ_2 respectively.
(Please note we said h/E_1:  Why is that “h” correct and “ħ” is not?

      </Prose>
      <TextArea
        field={f.RotationPeriod1}
        label={<Prose>
       NUMERICAL ENTRY

        </Prose>}

      />
      <TextArea
        field={f.RotationPeriod2}
        label={<Prose>

        NUMERICAL ENTRY
        </Prose>}
      />
      <Continue
        commit={f.RotationPeriodCommit}
        />

    </Section>
  ),
  (f) => (
    <Section commits={f.RotationPeriodCommit}>
      <TextArea
        field={f.T2CompareExp}
        label={<Prose>

       How do the graphs of ψ_2 at times t = 0 and t=T_2compare?
        </Prose>}

      />
      {/*Can you add a same/different choice option*/}
      <Continue
        commit={f.T2CompareCommit}
        />

    </Section>
  ),
  (f) => (
    <Section commits={f.T2CompareCommit}>
      <TextArea
        field={f.VerifyT2}
        label={<Prose>
      Mathematically, the period is the time T for which ψ_ (x,0)=ψ(x,T). Use the value you found in part i) to verify this equation for ψ_2 . Recall that En = n2E1 and ħ=h/2π .

        </Prose>}

      />
      <Continue
        commit={f.VerifyT2Commit}
        />

    </Section>
  ),
  (f) => (
    <Section commits={f.VerifyT2Commit}>
      <Prose>
        <p>
        Do you agree or disagree with each of the following students’ statements? For each incorrect statement, explain how the statement is inconsistent with the graphs shown in the simulation and with the mathematical expression for MISSING FUNCTION.
        </p>
      </Prose>
      <TextArea
        field={f.StudA}
        label={<Prose>
       Student A: “ψ_1evolves in time, the wave function rotates in the complex plane.”

        </Prose>}

      />
      <TextArea
        field={f.StudB}
        label={<Prose>
       Student B: “ψ_1oscillates up and down like a standing wave.”

        </Prose>}

      />
      <TextArea
        field={f.StudC}
        label={<Prose>
       Student C: “ψ_1does not evolve in time, as this is a stationary state.”

        </Prose>}

      />
      <TextArea
        field={f.StudD}
        label={<Prose>
       Student D: “ψ_1dies away with time and tends to zero.”

        </Prose>}

      />
      <Continue
        commit={f.StudRepCommit}
        />
  {/*Each one should get an agree/disagree box*/}
    </Section>
  ),


]);
