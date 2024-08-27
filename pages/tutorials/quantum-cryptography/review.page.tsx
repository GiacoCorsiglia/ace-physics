import {
  Callout,
  ChooseAll,
  Decimal,
  Horizontal,
  M,
  Prose,
  QuantumCircuit,
} from "@/components";
import { posttest } from "@/tutorial";
import setup from "./setup";

export default posttest(setup, ({ section }) => ({
  sections: [
    section({
      body: (
        <Callout color="blue">
          In all scenarios below, ``measurement" is in the computational basis,
          i.e. you measure either <M t="\ket{0}" /> or <M t="\ket{1}" />.
        </Callout>
      ),
    }),
    section({
      body: (m) => (
        <>
          <ChooseAll
            model={m.whenBobMeasuresCorrectly}
            label={
              <Prose>
                <p>
                  Alice is sending qubits to Bob. She is given a{" "}
                  <M t="\ket{0}" /> qubit, and may or may not operate with a
                  Hadamard before she sends the qubit to Bob. When Bob receives
                  qubits from Alice, he also may or may not operate on them with
                  H before measuring.{" "}
                </p>
                <p>
                  In which of the following situations would Bob measure{" "}
                  <M t="\ket{0}" /> with 100% probability? Choose ALL that
                  apply.
                </p>
              </Prose>
            }
            choices={[
              [
                "sendMeasure",
                <QuantumCircuit t="\lstick{\ket{0}} & \begin{matrix}send \newline to \; Bob\end{matrix} & \meter" />,
                // <Image
                //   src={doesBobMeasureCorrectly1}
                //   alt="The experimental setup described above"
                //   maxWidth={"200px"}
                // />,
              ],
              [
                "HsendMeasure",
                <QuantumCircuit t="\lstick{\ket{0}} & \gate{H} & \begin{matrix}send \newline to \; Bob\end{matrix} & \meter" />,
                // <Image
                //   src={doesBobMeasureCorrectly2}
                //   alt="The experimental setup described above"
                //   maxWidth={"243px"}
                // />,
              ],
              [
                "sendHMeasure",
                <QuantumCircuit t="\lstick{\ket{0}} & \begin{matrix}send \newline to \; Bob\end{matrix} & \gate{H} & \meter" />,
                // <Image
                //   src={doesBobMeasureCorrectly3}
                //   alt="The experimental setup described above"
                //   maxWidth={"260px"}
                // />,
              ],
              [
                "HsendHMeasure",
                <QuantumCircuit t="\lstick{\ket{0}} & \gate{H} & \begin{matrix}send \newline to \; Bob\end{matrix} & \gate{H} &\meter" />,
                // <Image
                //   src={doesBobMeasureCorrectly4}
                //   alt="The experimental setup described above"
                //   maxWidth={"280px"}
                // />,
              ],
            ]}
          />
          <Prose>
            <p>
              In the other situation(s), what is the probability that Bob will
              measure <M t="\ket{0}" />?
            </p>
          </Prose>
          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probOfMeasuringCorrectly}
              label={<Prose>Probability:</Prose>}
            />
          </Horizontal>
        </>
      ),
    }),
    section({
      body: (m) => (
        <>
          <ChooseAll
            model={m.whenStateRemainsSame}
            label={
              <Prose>
                <p>
                  A "middleman" receives qubits which may be <M t="\ket{0}" />,{" "}
                  <M t="\ket{1}" />, <M t="\ket{+}" />, or <M t="\ket{-}" />. At
                  some point, they measure the qubit in the{" "}
                  <M t="\{\ket{0}, \ket{1}\}" /> basis and then send the exact
                  same qubit they measured. That is, if they measure a{" "}
                  <M t="\ket{0}" /> then they send a <M t="\ket{0}" /> qubit
                  forward in the circuit and if they measure a <M t="\ket{1}" />{" "}
                  state then they send a <M t="\ket{1}" /> qubit. (In some
                  diagrams below, this qubit is then passed through an
                  additional <M t="H" /> gate.)
                </p>
                <p>
                  In which of the following situations will the final sent qubit
                  be in the same quantum state as the input qubit with 100%
                  probability?
                </p>
              </Prose>
            }
            choices={[
              [
                "minusMeasure",
                <QuantumCircuit t="\lstick{\ket{-}} & \meter & \rstick{send}" />,
                // <Image
                //   src={whenStateRemainsSame1}
                //   alt="The experimental setup described above"
                //   maxWidth={"246px"}
                // />,
              ],
              [
                "plusHMeasureH",
                <QuantumCircuit t="\lstick{\ket{+}} & \gate{H} & \meter & \gate{H} & \rstick{send}" />,
                // <Image
                //   src={whenStateRemainsSame2}
                //   alt="The experimental setup described above"
                //   maxWidth={"335px"}
                // />,
              ],
              [
                "zeroMeasure",

                <QuantumCircuit t="\lstick{\ket{0}} & \meter & \rstick{send}" />,
                // <Image
                //   src={whenStateRemainsSame3}
                //   alt="The experimental setup described above"
                //   maxWidth={"228px"}
                // />,
              ],
              [
                "oneHMeasureH",
                <QuantumCircuit t="\lstick{\ket{1}} & \gate{H} & \meter & \gate{H} & \rstick{send}" />,
                // <Image
                //   src={whenStateRemainsSame4}
                //   alt="The experimental setup described above"
                //   maxWidth={"323px"}
                // />,
              ],
            ]}
          />
          <Prose>
            <p>
              In the other situations, what is the probability that the final
              sent qubit will be in the same quantum state as the input qubit?
            </p>
          </Prose>
          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probOfStateSame}
              label={<Prose>Probability:</Prose>}
            />
          </Horizontal>
        </>
      ),
    }),
  ],
}));
