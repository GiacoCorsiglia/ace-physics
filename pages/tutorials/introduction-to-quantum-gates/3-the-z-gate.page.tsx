import {
  Callout,
  Dropdown,
  Guidance,
  M,
  Matrix,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "zGate",
  label: {
    html: (
      <>
        The <M t="Z" /> Gate
      </>
    ),
    title: "The Z Gate",
  },
  answers: "checked-some",
  sections: [
    section({
      name: "zGateIntro",
      body: (
        <Prose>
          The <M t="Z" /> gate (or “Phase gate”, or <M t="U_Z" />) adds a{" "}
          <strong>phase</strong> of <M t="-1" /> to the <M t="\ket{1}" /> state.
          It is written in matrix form as{" "}
          <M display t="Z = \pmatrix{1 & 0 \\ 0 & -1}" />
          Take a moment to verify (using matrix multiplication) that
          <M t="Z\ket{0} = \ket{0}" /> and <M t="Z\ket{1} = -\ket{1}" />.
        </Prose>
      ),
      hints: [
        hint({
          name: "phase",
          label: "Phase?",
          body: (
            <>
              A “phase” is any complex coefficient of magnitude 1—i.e., of the
              form <M t="e^{i\theta}" />. This includes <M t="1, -1, i" /> and{" "}
              <M t="-i" />.
            </>
          ),
        }),
      ],
    }),

    section({
      name: "zTimesKet",
      body: (m) => (
        <>
          <Prose>
            What is <M t="Z" /> acting on the state
            <M t="\frac{1}{5} \pmatrix{ 3i \\ -4}" />?
          </Prose>

          <Matrix
            label={<M display t="Z \frac{1}{5}\pmatrix{3i \\ -4} = " />}
            column={Matrix.modelToColumn(m.zTimesKet, (row) => (
              <Dropdown
                model={row}
                choices={[
                  ["3i/5", <M t="3i/5" />],
                  ["-3i/5", <M t="-3i/5" />],
                  ["4/5", <M t="4/5" />],
                  ["-4/5", <M t="-4/5" />],
                ]}
              />
            ))}
          />

          <Prose>Is there more than one way to do this?</Prose>
        </>
      ),
      guidance: {
        nextMessage(r) {
          const a = r.zTimesKet?.[0]?.selected;
          const b = r.zTimesKet?.[1]?.selected;

          if (a === "3i/5" && b === "4/5") {
            return "correct";
          }

          return "incorrect";
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>Nice, we agree with your answer.</Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                Please double-check your answer.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      name: "zTimesArbitraryKet",
      body: (m) => (
        <>
          <TextBox
            model={m.zTimesArbitraryKet}
            label={
              <Prose>
                What is <M t="Z (a\ket{0} + b\ket{1})" />? Can you answer this
                without using matrices?
              </Prose>
            }
          />

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Scrap paper is your friend!
          </Callout>
        </>
      ),
    }),

    section({
      name: "zTimesPlus",
      body: (m) => (
        <>
          <Prose>
            Compute
            <M t="Z \left[ \frac{1}{\sqrt{2}} (\ket{0}+\ket{1}) \right]" />.
          </Prose>

          <Toggle
            model={m.zTimesPlus}
            label={
              <Prose>
                Did acting with <M t="Z" /> change this state?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it changed the state"],
              ["no", "No, the state is the same"],
            ]}
          />
        </>
      ),
      guidance: {
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.zTimesPlus?.selected === "yes"
                    ? "agree"
                    : "disagree"
                }
              >
                The resulting state is{" "}
                <M t="\frac{1}{\sqrt{2}} (\ket{0} - \ket{1})" />. Although the
                probabilities of measuring <M t="\ket{0}" /> or{" "}
                <M t="\ket{1}" /> are 50/50 whether there is a minus sign on the
                second term or not, there is a measurable difference between
                these states. We will see how to spot that difference soon!
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
  ],
}));
