import { QuantumMouse } from "common/tutorials";
import { Continue, Prose, Section } from "components";
import { FieldGroup, TextArea, Toggle } from "components/inputs";
import { Content } from "components/layout";
import { useFields, useStore } from "services/state";
import { Part } from "tutorials/shared";

export default function Feedback() {
  // This is a hack; we expect to have the same "tutorialFeedback" field on every tutorial.
  const store = useStore();
  const {
    intention,
    confidence,
    confidenceExplain,
    easyOrChallenging,
    easyOrChallengingExplain,
    workedAlone,
    usedCourseMaterials,
    usedOtherMaterials,
    usedMaterialsOther,
    suggestedImprovements,
    technicalDifficulties,
    challengingParts,
    ratherInPerson,
  } = useFields(
    store.schema as typeof QuantumMouse
  ).tutorialFeedback.properties;

  return (
    <Part label="Please share your feedback">
      <Content>
        <Section first>
          <Prose>
            <em>
              This is our first time running these online activities, and we
              need your help to make them better!
            </em>
          </Prose>
        </Section>

        <Section noScroll>
          <Toggle
            field={confidence}
            choices={confidenceChoices}
            label={
              <Prose>
                Compared to before you started the tutorial, how confident do
                you feel about your understanding of the topics you think it
                covered?
              </Prose>
            }
          />

          <TextArea
            field={confidenceExplain}
            label={<Prose>Optional: What makes you feel that way?</Prose>}
          />
        </Section>

        <Section noScroll>
          {/* Needs None of the above */}
          <Toggle
            field={easyOrChallenging}
            choices={easyOrChallengingChoices}
            grid
            label={<Prose>I thought that this tutorial was mostly…</Prose>}
          />

          <TextArea
            field={easyOrChallengingExplain}
            label={<Prose>Optional: What makes you feel that way?</Prose>}
          />
        </Section>

        <Section noScroll>
          <Toggle
            field={workedAlone}
            choices={workedAloneChoices}
            label={<Prose>I worked on this tutorial…</Prose>}
          />
        </Section>

        <Section noScroll>
          <TextArea
            field={ratherInPerson}
            label={
              <Prose>
                Would you have rather done this activity on paper [in a group]
                and why?
              </Prose>
            }
          />
        </Section>

        <Section noScroll>
          <Prose>While filling out this tutorial, I…</Prose>
          <FieldGroup grid>
            <Toggle
              field={usedCourseMaterials}
              choices={materialsChoices}
              label="Referred to course materials:"
            />
            <Toggle
              field={usedOtherMaterials}
              choices={materialsChoices}
              label="Referred to other online resources:"
            />
            <TextArea field={usedMaterialsOther} label="Other:" />
          </FieldGroup>
        </Section>

        <Section noScroll>
          <TextArea
            field={suggestedImprovements}
            label={
              <Prose>
                Do you have any suggestions about how you would make this
                tutorial better?
              </Prose>
            }
          />
        </Section>

        <Section noScroll>
          <TextArea
            field={technicalDifficulties}
            label={
              <Prose>
                Did you have any difficulty with the interface or any other
                technical difficulties? Please help us improve!
              </Prose>
            }
          />
        </Section>

        <Section noScroll>
          <TextArea
            field={challengingParts}
            label={
              <Prose>
                What specific part(s) of the tutorial was most challenging or
                confusing for you?
              </Prose>
            }
          />
        </Section>

        <Section noScroll>
          <TextArea
            field={intention}
            label={
              <Prose>
                What do you think this tutorial was designed to explore,
                clarify, or do?
              </Prose>
            }
          />
        </Section>

        <Section noScroll>
          <Continue link="../finished" label="I’m done" />
        </Section>
      </Content>
    </Part>
  );
}

const confidenceChoices = [
  { value: "much less", label: "Much less confident" },
  { value: "less", label: "Less" },
  { value: "same", label: "The same" },
  { value: "more", label: "More" },
  { value: "much more", label: "Much more confident" },
] as const;

const easyOrChallengingChoices = [
  { value: "easy/useful", label: "Easy but useful" },
  { value: "easy/frustrating", label: "Easy but frustrating" },
  { value: "challenging/useful", label: "Challenging but useful" },
  { value: "challenging/frustrating", label: "Challenging and frustrating" },
] as const;

const workedAloneChoices = [
  { value: "alone", label: "Mostly alone" },
  { value: "partner", label: "Mostly with a partner" },
  { value: "group", label: "Mostly with a group" },
] as const;

const materialsChoices = [
  { value: "no", label: "Not at all" },
  { value: "a bit", label: "A bit" },
  { value: "repeatedly", label: "Repeatedly" },
] as const;
