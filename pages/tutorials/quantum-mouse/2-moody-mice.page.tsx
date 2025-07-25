import {
  ChooseAll,
  Dropdown,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  Reminder,
  TextBox,
} from "@/components";
import { arraysSetEqual } from "@/helpers/client";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "moody-mice",
  label: "Moody Mice",
  answers: "checked-some",
  sections: [
    section({
      name: "moodIntro",
      body: (
        <Prose>
          <p>
            Turns out mice have feelings too. The operator we will use for
            “quantum mood” is <M t="\hat{M}" />. This operator is also
            Hermitian. The corresponding physical measurement is “look at the
            mouse's expression,” yielding either a smile
            <M t="(\text{mood} = +1)" /> or frown
            <M t="(\text{mood} = -1)" />.
          </p>

          <p className="text-center">
            <M t="\hat{M}\ket{\smiley} = \ket{\smiley}" />{" "}
            &nbsp;&nbsp;and&nbsp;&nbsp;{" "}
            <M t="\hat{M}\ket{\frownie} = -\ket{\frownie}" />.
          </p>

          <p>Note: Being happy or sad is again, orthonormal and complete.</p>
        </Prose>
      ),
    }),

    section({
      name: "possibleMoodEigenvalues",
      body: (m) => (
        <ChooseAll
          model={m.possibleMoodEigenvalues}
          label={
            <Prose>
              What are the possible values of a measurement of <M t="\hat{M}" />
              ? (Please check all that apply.)
            </Prose>
          }
          choices={[
            ["1", <M t="1" />],
            ["-1", <M t="-1" />],
            ["0", <M t="0" />],
            ["happyket", <M t="\ket{\smiley}" />],
            ["sadket", <M t="\ket{\frownie}" />],
          ]}
        />
      ),
      hints: [
        hint({
          name: "possibleMoodEigenvalues",
          body: (
            <Prose>
              <p>Of these options, which are values and which are states?</p>

              <p>
                The next question might clear this up for you! Consider giving
                that a try and then returning to this question.
              </p>
            </Prose>
          ),
        }),
      ],
      continue: {
        allowed: ({ hints }, allowed) =>
          allowed || hints?.possibleMoodEigenvalues?.status === "revealed",
      },
    }),

    section({
      name: "moodEigen",
      body: (m) => {
        const moodChoices = [
          [
            "kets",
            <>
              <M t="\ket{\smiley}" /> and <M t="\ket{\frownie}" />
            </>,
          ],
          [
            "value",
            <>
              <M t="1" /> and <M t="-1" />
            </>,
          ],
          ["operator", <M t="\hat{M}" />],
        ] as const;

        return (
          <>
            <Prose>
              <p>Let's take some time to check in on these representations.</p>

              <p>
                Which symbols are the eigenvectors here, what are the
                eigenvalues, what are the operators?
              </p>
            </Prose>

            <LabelsLeft>
              <Dropdown
                model={m.moodEigenvalues}
                choices={moodChoices}
                label="Eigenvalues:"
                placeholder="Select eigenvalues…"
              />

              <Dropdown
                model={m.moodEigenvectors}
                choices={moodChoices}
                label="Eigenvectors:"
                placeholder="Select eigenvectors…"
              />

              <Dropdown
                model={m.moodOperators}
                choices={moodChoices}
                label="Operators:"
                placeholder="Select operators..."
              />
            </LabelsLeft>

            <Reminder>
              <p className="text-center">
                <M t="\hat{M}\ket{\smiley} = \ket{\smiley}" />{" "}
                &nbsp;&nbsp;and&nbsp;&nbsp;{" "}
                <M t="\hat{M}\ket{\frownie} = -\ket{\frownie}" />.
              </p>
            </Reminder>
          </>
        );
      },
      hints: [
        hint({
          name: "moodEigenUnits",
          label: "What about units?",
          body: (
            <Prose>
              Unlike eye size, we consider “mood” to be a dimensionless
              quantity, meaning it has no units. You can’t quantify happiness :)
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "happySadInnerProduct",
      body: (m) => (
        <LabelsLeft>
          <Dropdown
            model={m.happySadInnerProduct}
            choices={[
              ["0", "0"],
              ["1", "1"],
              ["complex", "Some complex number, but not enough info"],
            ]}
            label={<M t="\braket{\smiley|\frownie} = " />}
          />

          <TextBox model={m.happySadInnerProductExplain} label="Explain:" />
        </LabelsLeft>
      ),
      hints: [
        hint({
          name: "happySadInnerProduct",
          body: (
            <Prose>
              You answered a similar question on the previous page. Like in that
              case, we defined these two states to be “<em>ortho</em>
              normal.”
            </Prose>
          ),
        }),
      ],
      continue: {
        label: "Let’s check in",
      },
    }),

    section({
      name: "moodDisagree",
      when: (r) => {
        const posCorrect = arraysSetEqual(r.possibleMoodEigenvalues?.selected, [
          "-1",
          "1",
        ]);
        const valuesCorrect = r.moodEigenvalues?.selected === "value";
        return posCorrect !== valuesCorrect;
      },
      body: (
        <Guidance.Disagree>
          <p>
            Your answers to the first two questions on this page seem to
            disagree.
          </p>

          <p>
            What’s the relationship between the possible values of a measurement
            of <M t="\hat{M}" /> and the eigenvalues in the eigen-equations at
            the top of this page?
          </p>
        </Guidance.Disagree>
      ),
    }),

    sequence({
      when: (r) => r.happySadInnerProduct?.selected !== "0",
      sections: [
        section({
          name: "happySadVsSmallBig",
          when: (r) => r.smallBigInnerProduct?.selected === "0",
          body: (
            <Guidance.Disagree>
              On the previous page, you said
              <M t="\braket{\smalleye|\wideye} = 0" />. <M t="\ket{\smiley}" />{" "}
              and <M t="\ket{\frownie}" /> are also orthogonal, so consider
              checking your answer for <M t="\braket{\smiley|\frownie}" />.
            </Guidance.Disagree>
          ),
        }),

        section({
          name: "happySadCorrection",
          when: (r) => r.smallBigInnerProduct?.selected !== "0",
          body: (
            <Guidance.Disagree>
              <p>
                <M t="\ket{\smiley}" /> and <M t="\ket{\frownie}" /> are
                orthogonal, so their inner product (
                <M t="\braket{\smiley|\frownie}" prespace={false} />) is zero.
              </p>

              <p>
                This is also true for <M t="\ket{\smalleye}" /> and{" "}
                <M t="\ket{\wideye}" /> from the previous page.
              </p>
            </Guidance.Disagree>
          ),
        }),
      ],
    }),
  ],
}));
