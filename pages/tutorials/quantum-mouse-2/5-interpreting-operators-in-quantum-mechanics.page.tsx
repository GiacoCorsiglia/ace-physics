import { Prose } from "@/design";
import { FieldGroup, Text, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "interpretingOperatorsInQuantumMechanics",
  label:
    "Bonus: Interpreting Operators in Quantum Mechanics — If You Have Time",
  answersChecked: "none",
  sections: [
    section({
      name: "interpretingOperatorsInQuantumMechanicsIntro",
      body: (
        <Prose>
          On the previous page, you acted <M t="\hat{S_z}" /> on{" "}
          <M t="\ket{+}_x" /> to discover:
          <M display t="\hat{S_z} \ket{+}_x = \frac{\hbar}{2} \ket{-}_x" />
          If you came to a different conclusion on the previous page, take a
          moment right now to check that it’s mathematically equivalent to this
          expression.
        </Prose>
      ),
    }),

    section({
      name: "SzTimesPlusXIsEigenequation",
      body: (m) => (
        <Toggle
          model={m.SzTimesPlusXIsEigenequation}
          label={
            <Prose>
              <p>Is the equation above an “eigen-equation?”</p>
            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
          ]}
        />
      ),
    }),

    section({
      name: "doesSzTimesPlusXConnectToMeasurement",
      body: (m) => (
        <>
          <Toggle
            model={m.doesSzTimesPlusXConnectToMeasurement}
            label={
              <Prose>
                <p>
                  If you normalize the state on the right side of your equation,
                  what physical state does that represent?
                </p>

                <p>
                  Does it have any obvious or direct physical connection to what
                  would happen if you actually measured <M t="\hat{S_z}" /> on
                  your starting state?
                </p>
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextArea
            model={m.doesSzTimesPlusXConnectToMeasurementExplain}
            label={<Prose>Explain:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "canPredictSz",
      body: (m) => (
        <>
          <Toggle
            model={m.canPredictSzForPlusX}
            label={
              <Prose>
                Do you think a measurement of <M t="\hat{S_z}" /> on a particle
                in state <M t="\ket{+}_x" /> should have a determined{" "}
                <strong>value</strong>? (That is, can you{" "}
                <strong>predict</strong> the experimental value in advance of
                measuring it?)
              </Prose>
            }
            choices={[
              ["yes", "Yes, it has a determined value"],
              ["no", "No, it doesn’t"],
            ]}
          />

          <Toggle
            model={m.canPredictFinalState}
            label={
              <Prose>
                What about the final <strong>state</strong> after the
                measurement, do you think there is any formula predicting that
                in advance of the measurement?
              </Prose>
            }
            choices={[
              ["yes", "Yes, the state can be predicted"],
              ["no", "No, it can’t"],
            ]}
          />
        </>
      ),
    }),

    section({
      name: "SzTimesArbitraryKet",
      body: (m) => (
        <>
          <Prose>
            Similar to what you just did for the particular state{" "}
            <M t="\ket{+}_x" />, now act <M t="\hat{S_z}" /> on an arbitrary
            (normalized) ket <M t="\ket{\psi} = a\ket{+} + b\ket{-}" />. What do
            you get?
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Text
              model={m.SzTimesArbitraryKet}
              label={<M t="\hat{S_z}\ket{\psi} = " />}
            />
          </FieldGroup>
        </>
      ),
    }),

    section({
      name: "studentInterpretationsOfSzTimesPsi",
      body: (m) => (
        <>
          <Prose>
            <p>
              Consider a conversation about the results of the previous question
              (part D).
            </p>

            <blockquote>
              <strong>Student A:</strong> I think this formula tells you the
              experimental result of measuring the z-component of spin on some
              (generic) incoming state <M t="\ket{\psi}" />.
            </blockquote>

            <blockquote>
              <strong>Student B:</strong> I disagree. I think it tells you what
              the resulting quantum state is after you measure the z-component
              of spin. That’s different from an experimental result, which would
              be a number (with dimensions), not a state.
            </blockquote>

            <blockquote>
              <strong>Student C:</strong> I think you’re both mistaken, and
              over-interpreting this equation—it’s just a mathematical relation!
            </blockquote>
          </Prose>

          <TextArea
            model={m.studentInterpretationsOfSzTimesPsi}
            label={
              <Prose>
                Discuss the above opinions. Where/how do you agree or disagree?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "whyOperatorTimesStateIsNotMeasurement",
      body: (m) => (
        <TextArea
          model={m.whyOperatorTimesStateIsNotMeasurement}
          label={
            <Prose>
              <p>
                We <strong>strongly disagree</strong> with the claim that{" "}
                <M t="\hat{O}\ket{\psi}" /> literally means “a measurement of{" "}
                <M t="\hat{O}" /> on state <M t="\ket{\psi}" />
                .” So we’d be most inclined to agree with Student C above.
              </p>

              <p>Can you explain why?</p>
            </Prose>
          }
        />
      ),
    }),
  ],
}));
