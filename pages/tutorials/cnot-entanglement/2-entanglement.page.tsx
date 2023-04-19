import {
  Answer,
  Decimal,
  Horizontal,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "entanglement",
  label: "Entanglement",
  answers: "provided",
  sections: [
    section({
      name: "entanglementIntro",
      body: (
        <Prose>
          <p>
            The state we found above,{" "}
            <M t="\frac{1}{\sqrt{2}} ( \ket{00} + \ket{11})" /> is{" "}
            <em>entangled</em>. It cannot be “factorized”, i.e. it cannot be
            written as{" "}
            <M t="(a\ket{0}+b\ket{1}) \otimes (c\ket{0} + d\ket{1})" />. You
            CANNOT write the state of either single qubit by itself—you can only
            write the combined two-qubit state.
          </p>

          <p>
            Two qubits are said to be <i>separable</i> if you can write the
            state of each qubit independently. A state that is not separable is
            said to be <i>entangled</i>:
          </p>

          <M
            display
            t="\ket{\psi_{\text{separable}}} = \ket{\psi_1} \otimes \ket{\psi_2}"
          />

          <M
            display
            t="\ket{\psi_{\text{entangled}}} \neq \ket{\psi_1} \otimes \ket{\psi_2}"
          />

          <M
            display
            t="\text{for \it any } \ket{\psi_1} \text{or} \ket{\psi_2}"
          />
        </Prose>
      ),
    }),

    section({
      name: "is00Plus01Entangled",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.is00Plus01Entangled}
            label={
              <Prose>
                Is <M t="\frac{1}{\sqrt{2}}(\ket{00} +\ket{01}" /> entangled?
              </Prose>
            }
            choices={[
              ["entangled", "Yes, it is entangled"],
              ["not entangled", "No, it is not entangled"],
            ]}
            answer="not entangled"
          />

          {responses?.is00Plus01Entangled && (
            <TextBox
              model={m.is00Plus01EntangledExplain}
              label={
                responses.is00Plus01Entangled.selected === "entangled" ? (
                  <Prose>Explain how you know:</Prose>
                ) : (
                  <Prose>What is the state of each qubit separately?</Prose>
                )
              }
            />
          )}

          <Answer>
            <p>You can separate it as follows:</p>
            <M
              display
              t="\ket{0} \otimes [\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})] = \ket{0} \otimes \ket{+}"
            />
          </Answer>
        </>
      ),
    }),

    section({
      name: "isEquationEntangledTwo",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.isBeta01Entangled}
            label={
              <Prose>
                Is <M t="\frac{1}{\sqrt{2}}(\ket{01} +\ket{10})" /> entangled?
              </Prose>
            }
            choices={[
              ["entangled", "Yes, it is entangled"],
              ["not entangled", "No, it is not entangled"],
            ]}
            answer="entangled"
          />

          {responses?.isBeta01Entangled && (
            <TextBox
              model={m.isEquationEntangledTwoExplanation}
              label={
                responses.isBeta01Entangled.selected === "entangled" ? (
                  <Prose>Explain how you know:</Prose>
                ) : (
                  <Prose>What is the state of each qubit separately?</Prose>
                )
              }
            />
          )}

          <Answer>
            You cannot write the state of each qubit separately. In addition,
            measuring one of the qubits affects the measurement probabilities
            for the second qubit.
          </Answer>
        </>
      ),
    }),

    section({
      name: "considerBeta11",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.isProbQubit1Beta11FiftyFifty}
            label={
              <Prose>
                Given a two-qubit state{" "}
                <M display t="\frac{1}{\sqrt{2}}(\ket{01} - \ket{10})" /> is it
                correct to say that the probability of measuring either a{" "}
                <M t="\ket{0}" /> or <M t="\ket{1}" />
                for qubit 1 is 50-50?
              </Prose>
            }
            choices={[
              ["yes", "Yes, the probability is 50-50"],
              ["no", "No, qubit 1 cannot be 50-50"],
            ]}
            answer="yes"
          />

          {responses?.isProbQubit1Beta11FiftyFifty && (
            <>
              <hr />

              <Toggle
                model={m.isStateQubit1Beta11Minus}
                label={
                  <Prose>
                    Is it correct to say that the state of qubit 1 is the
                    following?{" "}
                    <M display t="\frac{1}{\sqrt{2}}(\ket{0} -\ket{1})" />
                  </Prose>
                }
                choices={[
                  ["yes", "Yes, that’s correct"],
                  ["no", "No, that’s incorrect "],
                ]}
                answer="no"
                explanation="The original state is entangled, qubit 1 does not a definite state by itself."
              />
            </>
          )}

          {responses?.isStateQubit1Beta11Minus && (
            <>
              <hr />

              <Toggle
                model={m.isStateQubit1Beta11Arbitrary}
                label={
                  <Prose>
                    Is it correct to say that the state of qubit 1 is{" "}
                    <M
                      display
                      t="\frac{1}{\sqrt{2}}(\ket{0} +e^{i \theta}\ket{1})"
                    />{" "}
                    for some angle <M t="\theta" />?
                  </Prose>
                }
                choices={[
                  ["yes", "Yes, that’s correct"],
                  ["no", "No, that’s incorrect "],
                ]}
                answer="no"
                explanation="The original state is entangled, qubit 1 does not have a definite state by itself."
              />
            </>
          )}
        </>
      ),
    }),

    section({
      name: "measuringBeta11Qubit1",
      body: (m, { responses }) => (
        <>
          <Prose>
            <p>
              Consider the state{" "}
              <M display t="\frac{1}{\sqrt{2}}(\ket{01} -\ket{10})" />
            </p>

            <p>
              What is the probability that a measurement of qubit 1 yields{" "}
              <M t="\ket{0}" />?
            </p>
          </Prose>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probBeta11Qubit1is0}
              label={<Prose>Probability:</Prose>}
            />

            <Answer
              correct={
                responses?.probBeta11Qubit1is0 === 0.5 ||
                responses?.probBeta11Qubit1is0 === 50
              }
            >
              50%
            </Answer>
          </Horizontal>

          <hr />

          <Prose>
            What is the probability that a measurement of qubit 2 yields{" "}
            <M t="\ket{0}" />?
          </Prose>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probBeta11Qubit2is0}
              label={<Prose>Probability:</Prose>}
            />

            <Answer
              correct={
                responses?.probBeta11Qubit1is0 === 0.5 ||
                responses?.probBeta11Qubit1is0 === 50
              }
            >
              50%
            </Answer>
          </Horizontal>
        </>
      ),
    }),

    section({
      name: "measuringBeta11Qubit2",
      body: (m, { responses }) => (
        <>
          <Prose>
            Again consider the state state{" "}
            <M display t="\frac{1}{\sqrt{2}}(\ket{01} -\ket{10})" /> Now assume
            that qubit 2 is measured to be <M t="\ket{0}" />. What is the
            resulting state of qubit 1?
          </Prose>

          <TextBox model={m.stateOfQubit1WhenBeta11Qubit2is0} />

          <Answer>
            The resulting state for qubit 1 would be <M t="\ket{1}" />.
          </Answer>

          <Prose>
            Given that qubit 2 was measured to be <M t="\ket{0}" />, what is the
            subsequent probability that qubit 1 will also be measured to be{" "}
            <M t="\ket{0}" />?
          </Prose>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probQubit1is0WhenBeta11Qubit2is0}
              label={<Prose>Probability:</Prose>}
            />

            <Answer
              correct={responses?.probQubit1is0WhenBeta11Qubit2is0 === 0.0}
            >
              0%
            </Answer>
          </Horizontal>
        </>
      ),
    }),

    section({
      name: "differenceBetweenQuestionsComment",
      enumerate: false,
      body: (
        <Prose>
          Your answers to the previous two questions should be different. Before
          qubit 2 is measured, the probabilities for qubit 1 are 50/50. After
          qubit 2 is measured, we say “the state has collapsed”, and qubit 1’s
          outcome is now certain. The specific result of that outcome depends on
          the qubit 2 measurement.
        </Prose>
      ),
      continue: {
        label: "Noted",
      },
    }),

    section({
      name: "measuringSuperpositionState",
      body: (m, { responses }) => (
        <>
          <Prose>
            Consider the state{" "}
            <M
              display
              t="\frac{1}{\sqrt{10}}\ket{00}  + \frac{2}{\sqrt{10}}\ket{01}  + i \frac{\sqrt{3}}{\sqrt{10}}\ket{10} - \frac{\sqrt{2}}{\sqrt{10}}\ket{11}"
            />
            What is the probability that qubit 2 will be measured to be{" "}
            <M t="\ket{1}" />?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.probQubit2is1}
              label={<Prose>Probability:</Prose>}
            />
          </LabelsLeft>

          <Answer correct={responses?.probQubit2is1 === 0.6}>
            <M
              display
              t="\bigg|\frac{2}{\sqrt{10}}\bigg|^2 + \bigg|\frac{2}{\sqrt{10}}\bigg|^2 ="
            />

            <M display t="\frac{4}{10} + \frac{2}{10} = \frac{6}{10} = " />

            <M display t="\frac{3}{5} \text{ or 0.6}" />
          </Answer>

          <TextBox
            model={m.resultingStateQubit1}
            label={
              <Prose>
                Assuming qubit 2 is measured to be <M t="\ket{1}" />, what is
                the resulting (normalized) state of qubit 1?
              </Prose>
            }
          />

          <Answer>
            <M display t="\frac{1}{\sqrt{3}}( \sqrt{2}\ket{0} + \ket{1})" />
          </Answer>
        </>
      ),
    }),
  ],
}));
