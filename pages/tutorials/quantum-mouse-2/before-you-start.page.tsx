import { Prose } from "@/design";
import { ChooseOne, FieldGroup, Text, TextArea, Toggle } from "@/inputs";
import M from "@/math/M";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <>
          <Prose>
            Consider the prepared state{" "}
            <M t="\ket{\psi} = 1/2 \ket{+} - \sqrt{3}/2 \ket{-}" />. Express the
            result of acting the operator <M t="\hat{S_z}" /> on this state.
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Text
              model={m.SzTimesPsi}
              label={<M t="\hat{S_z} \ket{\psi} = " />}
            />
          </FieldGroup>
        </>
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.interpretSzTimesPsi}
          label={
            <Prose>
              <p>
                Choose the answer below that best represents your result above.
              </p>

              <p>My response to question A above represents…</p>
            </Prose>
          }
          choices={[
            [
              "experimental value",
              <>
                The experimental value of measuring the z-component of spin on
                the state <M t="\ket{\psi}" />
              </>,
            ],
            [
              "resulting state",
              <>
                The resulting state after measuring the z-component of spin on
                the state <M t="\ket{\psi}" />
              </>,
            ],
            [
              "mathematical relation",
              <>
                Neither the value nor the state. It’s only a mathematical
                relation.
              </>,
            ],
          ]}
        />
      ),
    }),

    section({
      enumerate: false,
      body: (
        <Prose>
          <p>Consider the following two equations:</p>

          <M display t="\hat{A}\ket{a_1} = 5 \unit{nm} \ket{a_1}" />
          <M display t="\hat{A}\ket{a_2} = -4 \unit{nm} \ket{a_2}" />

          <p>
            There is also a different operator, <M t="\hat{C}" />, such that
          </p>

          <M display t="\hat{C}\ket{a_1} = 2 \unit{nm} \ket{a_1}" />
          <M display t="\hat{C}\ket{a_2} = 7 \unit{nm} \ket{a_2}" />
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <TextArea
          model={m.possibleCMeasurementResults}
          label={
            <Prose>
              We start with some unknown state and measure <M t="\hat{A}" />,
              and happen to get the result <M t="5 \unit{nm}" />. We then follow
              up immediately with a measurement of <M t="\hat{C}" />, what
              value(s) can we get, with what probabilities?
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <>
          <Toggle
            model={m.doAAndCCommute}
            label={
              <Prose>
                Do <M t="\hat{A}" /> and <M t="\hat{C}" /> commute?
              </Prose>
            }
            choices={[
              ["yes", "Yes, they commute"],
              ["no", "No, they do not"],
            ]}
          />

          <TextArea
            model={m.doAAndCCommuteExplain}
            label={<Prose>How do you know?</Prose>}
          />
        </>
      ),
    }),
  ],
}));
