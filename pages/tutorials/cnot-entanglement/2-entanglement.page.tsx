import {
  Decimal,
  Horizontal,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "entanglement",
  label: "Entanglement",
  answers: "none",
  sections: [
    section({
      name: "entanglementIntro",
      body: (
        <Prose>
          <p>
            The state we found above,{" "}
            <M t="\frac{1}{\sqrt{2}} ( \ket{00} + \ket{11})" /> is{" "}
            <i>entangled</i> It cannot be “factorized”, i.e. it cannot be
            written as{" "}
            <M t="(a\ket{0}+b\ket{1}) \otimes (c\ket{0} + d\ket{1})" />. You
            CANNOT write the state of either single qubit by itself -- you can
            only write the combined two-qubit state.
          </p>
          <p>
            Two qubits are said to be <i>separable</i> if you can write the
            state of each qubit independently. A state that is not separable is
            said to be <i>entangled</i>:
          </p>
          <M
            display
            t="\ket{\psi_{\text{separable}}} = \ket{\psi_1} \otimes \ket{\psi_2} \\
               \ket{\psi_{\text{entangled}}} \neq \ket{\psi_1} \otimes \ket{\psi_2} \text{for \it any } \ket{\psi_1} \text{or} \ket{\psi_2}"
          />
        </Prose>
      ),
    }),
    section({
      name: "isEquationEntangledOne",
      body: (m) => (
        <>
          <Toggle
            model={m.isEquationEntangledOneTF}
            label={
              <Prose>
                Is <M t="\frac{1}{\sqrt{2}}(\ket{00} +\ket{01}" /> entangled?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it is entangled"],
              ["no", "No, it is not entangled"],
            ]}
          />
          <TextBox
            model={m.isEquationEntangledOneExplanation}
            label={
              <Prose>
                (If so, how do you know? If not, what is the state of each qubit
                separately?)
              </Prose>
            }
          />
        </>
      ),
    }),
    section({
      name: "isEquationEntangledTwo",
      body: (m) => (
        <>
          <Toggle
            model={m.isEquationEntangledTwoTF}
            label={
              <Prose>
                Is <M t="\frac{1}{\sqrt{2}}(\ket{01} +\ket{10})" /> entangled?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it is entangled"],
              ["no", "No, it is not entangled"],
            ]}
          />
          <TextBox
            model={m.isEquationEntangledTwoExplanation}
            label={
              <Prose>
                (If so, how do you know? If not, what is the state of each qubit
                separately?)
              </Prose>
            }
          />
        </>
      ),
    }),
    section({
      name: "isProbabilityFiftyFiftyOne",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.isProbabilityFiftyFiftyOne}
            label={
              <Prose>
                Given a two-qubit state{" "}
                <M t="\frac{1}{\sqrt{2}}(\ket{01} - \ket{10})" /> , is it
                correct to say that the probability of measuring either a{" "}
                <M t="\ket{0}" /> or <M t="\ket{1}" />
                for qubit 1 is 50-50?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          {responses?.isProbabilityFiftyFiftyOne && (
            <Toggle
              model={m.isProbabilityFiftyFiftyTwo}
              label={
                <Prose>
                  Is it correct to say that the state of qubit 1 is{" "}
                  <M t="\frac{1}{\sqrt{2}}(\ket{0} -\ket{1})" />?
                </Prose>
              }
              choices={[
                ["yes", "Yes"],
                ["no", "No"],
              ]}
            />
          )}
          {responses?.isProbabilityFiftyFiftyTwo && (
            <Toggle
              model={m.isProbabilityFiftyFiftyThree}
              label={
                <Prose>
                  Is it correct to say that the state of qubit 1 is{" "}
                  <M t="\frac{1}{\sqrt{2}}(\ket{0} +e^{i \theta}\ket{1})" /> for
                  some angle <M t="\theta" />?
                </Prose>
              }
              choices={[
                ["yes", "Yes"],
                ["no", "No"],
              ]}
            />
          )}
        </>
      ),
    }),
    section({
      name: "probabilityMeasuresToKetZero",
      body: (m) => (
        <>
          <Prose>
            For the state <M t="\frac{1}{\sqrt{2}}(\ket{01} -\ket{10})" />: what
            is the probability that a measurement of qubit 1 yields{" "}
            <M t="\ket{0}" />? What is the probability that a measurement of
            qubit 2 yields <M t="\ket{0}" />?
          </Prose>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probabilityMeasureKetZeroQubitOne}
              label={<Prose>Probability of Qubit 1:</Prose>}
            />
          </Horizontal>
          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probabilityMeasureKetZeroQubitTwo}
              label={<Prose>Probability of Qubit 2:</Prose>}
            />
          </Horizontal>
        </>
      ),
    }),
    section({
      name: "resultingStateOfQubitOne",
      body: (m, { responses }) => (
        <>
          <Prose>
            Again given state <M t="\frac{1}{\sqrt{2}}(\ket{01} -\ket{10})" />:
            assume that qubit 2 is measured to be <M t="\ket{0}" />. What is the
            resulting state of qubit 1?
          </Prose>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.resultingStateOfQubitOne}
              label={<Prose>Resulting State:</Prose>}
            />
          </Horizontal>
          {responses?.resultingStateOfQubitOne && (
            <>
              <Prose>
                With that in mind, what is the subsequent probability (given the
                fact that qubit 2 was measured to be <M t="\ket{0}" />) that
                qubit 1 will be measured to be <M t="\ket{0}" />?
              </Prose>

              <Horizontal align="center" justify="start">
                <Decimal
                  model={m.resultingStateOfQubitOneProbability}
                  label={<Prose>Probability:</Prose>}
                />
              </Horizontal>
            </>
          )}
        </>
      ),
    }),
    section({
      name: "differenceBetweenQuestionsComment",
      enumerate: false,
      body: (
        <Prose>
          Note the difference between this answer and the previous one. Before
          qubit 2 is measured, the probabilities for qubit 1 are 50/50. After
          qubit 2 is measured, we say “the state has collapsed”, and qubit 1’s
          outcome is now certain. (But the specific result of that outcome
          depends on the qubit 2 measurement.)
        </Prose>
      ),
    }),
    section({
      name: "probabilityMeasuresToKetOne",
      body: (m, { responses }) => (
        <>
          <Prose>
            Consider the state{" "}
            <M t="\frac{1}{\sqrt{10}}\ket{00}  + \frac{2}{\sqrt{10}}\ket{01}  + i \frac{\sqrt{3}}{\sqrt{10}}\ket{10} - \frac{\sqrt{2}}{\sqrt{10}}\ket{11}" />
            . What is the probability that qubit 2 will be measured to be{" "}
            <M t="\ket{1}" />?
          </Prose>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probabilityMeasuresToKetOne}
              label={<Prose>Probability:</Prose>}
            />
          </Horizontal>
          {responses?.probabilityMeasuresToKetOne && (
            <>
              <Prose>
                Assuming observer 2 measures <M t="\ket{1}" /> what is the
                resulting (normalized) state of particle 1?
              </Prose>

              <Horizontal align="center" justify="start">
                <Decimal
                  model={m.resultingStateOfParticleOne}
                  label={<Prose>Resulting State:</Prose>}
                />
              </Horizontal>
            </>
          )}
        </>
      ),
    }),
    section({
      name: "bellBasisContext",
      body: (
        <Prose>
          <p>
            We have already discussed how the states{" "}
            <M t="{ \ket{00}, \ket{01}, \ket{10}, \ket{11}}" /> form a basis for
            the two-qubit space. Another valid basis is the “Bell Basis”, which
            consists of four linearly independent entangled states (known as the
            Bell states).
          </p>
          <M
            display
            t="\ket{\beta_{00}} = \frac{1}{\sqrt{2}} (\ket{00} + \ket{11}) \\
               \ket{\beta_{01}} = \frac{1}{\sqrt{2}} (\ket{01} + \ket{10}) \\
               \ket{\beta_{10}} = \frac{1}{\sqrt{2}} (\ket{00} - \ket{11}) \\
               \ket{\beta_{11}} = \frac{1}{\sqrt{2}} (\ket{01} - \ket{10})"
          />
          <p>Above, you discovered that the output of:</p>
          <QuantumCircuit
            t="\lstick{\ket{0}} \gate{H} \ctrl{1}  \qw \\
\lstick{\ket{0}} \qw \targ \qw"
          />
          <p>
            was{" "}
            <M t="\frac{1}{\sqrt{2}} (\ket{00} + \ket{11}) = \ket{\beta_{00}}" />{" "}
            . This circuit is commonly used to entangle states. Check for
            yourself that if you input the other three basis states{" "}
            <M t="(\ket{01},\ket{10}, and \ket{11})" /> this same circuit gives
            the corresponding Bell output states.
          </p>
        </Prose>
      ),
    }),
    section({
      name: "beforeAndAfterEnteringCNOTGate",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.beforeEnteringCNOTGate}
            label={
              <Prose>
                In the circuit shown above, with <M t="\ket{00}" /> as input,
                does qubit 1 have a definite state just <i>before</i> entering
                the <M t="U_{CNOT}" /> gate?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          {responses?.beforeEnteringCNOTGate && (
            <Toggle
              model={m.afterEnteringCNOTGate}
              label={
                <Prose>
                  How about just <i>after</i> exiting that gate?
                </Prose>
              }
              choices={[
                ["yes", "Yes"],
                ["no", "No"],
              ]}
            />
          )}
        </>
      ),
    }),
    section({
      name: "circuitEntangled",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.circuitStateInputEntangled}
            label={
              <Prose>
                <p>Consider the circuit shown below:</p>
                <QuantumCircuit
                  t="
                \lstick{}   \ctrl{1}   \gate{H}  \qw \\
                \lstick{}  \targ   \qw   \qw
                \inputgroupv{1}{2}{0.5em}{1em}{\ket{\beta_{00}}}"
                />
                <p>Is the input state entangled?</p>
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          {responses?.circuitStateInputEntangled && (
            <Toggle
              model={m.twoQubitStateEntangled}
              label={
                <Prose>
                  Is the 2-qubit state entangled just BEFORE entering the
                  Hadamard?
                </Prose>
              }
              choices={[
                ["yes", "Yes"],
                ["no", "No"],
              ]}
            />
          )}

          {responses?.twoQubitStateEntangled && (
            <TextBox
              model={m.outputOfCircuit}
              label={<Prose>What is the output state?</Prose>}
            />
          )}

          {responses?.outputOfCircuit && (
            <Toggle
              model={m.outputStateOfCircuitEntangled}
              label={<Prose>Is it entangled?</Prose>}
              choices={[
                ["yes", "Yes"],
                ["no", "No"],
              ]}
            />
          )}
        </>
      ),
    }),
  ],
}));
