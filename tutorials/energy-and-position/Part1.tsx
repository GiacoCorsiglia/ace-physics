import { Continue, Help, HelpButton, Prose, Reminder, Section } from "@/design";
import { Content } from "@/design/layout";
import { Text, TextArea, Toggle } from "@/inputs";
import { choices } from "@/inputs/Select";
import M from "@/math";
import VariableLengthColumn from "@/math/VariableLengthColumn";
import { isSet, needsHelp } from "@/state";
import { EnergyAndPosition } from "common/tutorials";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";

export default function Part1() {
  return (
    <Part label="The Energy Basis">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(EnergyAndPosition, [
  (f) => (
    <Section first>
      <Prose>
        Consider a quantum particle in a well.
        <br />
        The (distinct) allowed energies are <M t="E_1, E_2, E_3, \ldots," />{" "}
        etc.
        <br />
        The energy eigenstates are correspondingly named{" "}
        <M t="\ket{E_1}\!, \ket{E_2}\!, \ket{E_3}\!, \ldots," /> etc.
        <br /> Note that there can be an infinite number of energy eigenvalues
        and eigenstate for such real-world systems!
      </Prose>

      <Continue commit={f.part1IntroCommit} label="Got it" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part1IntroCommit}>
      <TextArea
        model={f.psiAMeasurements}
        label={
          <Prose>
            Suppose you have a particle initially in the normalized quantum
            state
            <M
              display
              t="
              \ket{\psi_A}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              + \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
            />
            If you make an energy measurement on this particle, what results
            could you get, with what probabilities? (Please look carefully at
            the subscripts in the expression above!)
          </Prose>
        }
      />

      <Continue
        commit={f.psiAMeasurementsCommit}
        allowed={isSet(f.psiAMeasurements)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.psiAMeasurementsCommit}>
      <Toggle
        model={f.isPsiAEnergyEigenstate}
        label={
          <Prose>
            Given the state above, are we in an eigenstate of energy?
          </Prose>
        }
        choices={choices(f.isPsiAEnergyEigenstate, {
          yes: (
            <>
              Yes, <M t="\ket{\psi_A}" /> is an energy eigenstate
            </>
          ),
          no: "No, it isn’t",
        })}
      />

      <TextArea
        model={f.isPsiAEnergyEigenstateExplain}
        label={<Prose>Why or why not?</Prose>}
      />

      {needsHelp(f.isPsiAEnergyEigenstateHelp) && (
        <Help>
          <Prose>
            Does <M t="\ket{\psi_A}" /> satisfy the{" "}
            <em>energy eigenequation</em>,{" "}
            <M t="\hat{H}\ket{\psi_A} \stackrel{?}{=} E \ket{\psi_A}" />?
          </Prose>
        </Help>
      )}

      <Continue
        commit={f.isPsiAEnergyEigenstateCommit}
        allowed={
          isSet(f.isPsiAEnergyEigenstate) &&
          isSet(f.isPsiAEnergyEigenstateExplain)
        }
      >
        <HelpButton help={f.isPsiAEnergyEigenstateHelp} />
      </Continue>
    </Section>
  ),

  (f) => (
    <Section commits={f.isPsiAEnergyEigenstateCommit}>
      <TextArea
        model={f.psiAEnergyExpectation}
        label={
          <Prose>
            In terms of <M t="E_1, E_2, E_3," /> etc., what is the expectation
            value of energy for our starting state?
          </Prose>
        }
      />

      <Continue
        commit={f.psiAEnergyExpectationCommit}
        allowed={isSet(f.psiAEnergyExpectation)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.psiAEnergyExpectationCommit}>
      <Prose>
        If I use our standard notation from earlier spin examples, in the energy
        basis I would represent my first energy basis state as:
        <M
          display
          t="
          \ket{E_1} \doteq \begin{pmatrix} 1 \\ 0 \\ 0 \\ \vdots \end{pmatrix}
          "
        />
        Please represent <M t="\ket{E_2}" /> in this way:
      </Prose>

      <VariableLengthColumn
        className="margin-top-1"
        model={f.columnE2}
        inputEl={
          <Text model={f.columnE2.elements[0]} placeholder="Type here" />
        }
        labelTex="\ket{E_2}"
      />

      <Prose className="opacity-faded text-center">
        If you need it, you can type <M t="\frac{1}{\sqrt{N}}" /> as “1/sqrt(N)”
        <br />
        and the vertical “dot-dot-dot” just as “...”
      </Prose>

      <Continue commit={f.columnE2Commit} allowed={isSet(f.columnE2)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.columnE2Commit}>
      <Prose>Represent our starting state in the same way:</Prose>

      <VariableLengthColumn
        className="margin-top-1"
        model={f.columnPsiA}
        inputEl={
          <Text model={f.columnPsiA.elements[0]} placeholder="Type here" />
        }
        labelTex="\ket{\psi_A}"
      />

      <Prose className="opacity-faded text-center">
        If you need it, you can type <M t="\frac{1}{\sqrt{N}}" /> as “1/sqrt(N)”{" "}
        <br />
        and the vertical “dot-dot-dot” just as “...”
      </Prose>

      <Reminder>
        <M
          display
          t="
              \ket{\psi_A}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              + \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
        />
      </Reminder>

      <Continue commit={f.columnPsiACommit} allowed={isSet(f.columnPsiA)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.columnPsiACommit}>
      <TextArea
        model={f.dotDotDotMeaning}
        label={
          <Prose>
            You should have a “dot-dot-dot” in your answers, what does it mean
            here?
          </Prose>
        }
      />

      <Continue
        commit={f.dotDotDotMeaningCommit}
        allowed={isSet(f.dotDotDotMeaning)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.dotDotDotMeaningCommit}>
      <ContinueToNextPart commit={f.part1FinalCommit} />
    </Section>
  ),
]);
