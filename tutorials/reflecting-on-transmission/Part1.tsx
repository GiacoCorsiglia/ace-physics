import { isSet } from "@/state";
import { ReflectingOnTransmission } from "common/tutorials";
import { Continue, Prose, Section } from "components";
import { FieldGroup, Text, TextArea } from "components/inputs";
import { Content } from "components/layout";
import M from "components/M";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";
import { SymmetricWellPotential } from "./figures";

export default function Part1() {
  return (
    <Part label="Symmetric Potential Well">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(ReflectingOnTransmission, [
  (f) => (
    <Section first>
      <Prose>
        The figure shows a graph of the potential energy (PE) for a 1-D system:
        <M
          display
          t="
          V(x) =
          \begin{cases}
            0 & |x| > a \\
            -V_0 & |x| < a
          \end{cases}
          "
        />
      </Prose>

      <SymmetricWellPotential />

      <Prose>
        Take a moment to confirm that the formula matches with the graph
      </Prose>

      <Continue commit={f.part1IntroCommit} label="Looks good" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part1IntroCommit}>
      <Text
        field={f.unitsOfV0}
        label={
          <Prose>
            What are the units of <M t="V_0" />?
          </Prose>
        }
      />

      <Continue commit={f.unitsOfV0Commit} allowed={isSet(f.unitsOfV0)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.unitsOfV0Commit}>
      <Prose>
        Write down a general solution to the time-independent Schrödinger
        equation for each region for a particle with total energy <M t="E>0" />{" "}
        as shown.
      </Prose>

      <FieldGroup grid className="margin-top-1">
        <Text field={f.generalSolution.properties.regionI} label="Region I:" />
        <Text
          field={f.generalSolution.properties.regionII}
          label="Region II:"
        />
        <Text
          field={f.generalSolution.properties.regionIII}
          label="Region III:"
        />
      </FieldGroup>

      <TextArea
        field={f.generalSolutionNewSymbols}
        label={<Prose>Define any new symbols you used:</Prose>}
      />

      <Continue
        commit={f.generalSolutionCommit}
        allowed={isSet(f.generalSolution)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.generalSolutionCommit}>
      <TextArea
        field={f.generalSolutionConstraints}
        label={
          <Prose>
            <p>
              Describe (in words) the constraints on the equations you wrote
              down if the physical situation involves particles approaching the
              well from the RIGHT.
            </p>
          </Prose>
        }
        minRows={4}
      />

      <TextArea
        field={f.generalSolutionPhysicalInterpretation}
        label={
          <Prose>Interpret the physical meaning of all nonzero terms:</Prose>
        }
      />

      <Continue
        commit={f.generalSolutionConstraintsCommit}
        allowed={
          isSet(f.generalSolutionConstraints) &&
          isSet(f.generalSolutionPhysicalInterpretation)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.generalSolutionConstraintsCommit}>
      <ContinueToNextPart commit={f.part1FinalCommit} />
    </Section>
  ),
]);
