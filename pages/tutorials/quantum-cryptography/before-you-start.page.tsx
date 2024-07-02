import {
  Callout,
  ChooseAll,
  Decimal,
  Horizontal,
  Image,
  M,
  Prose,
} from "@/components";
import { pretest } from "@/tutorial";
import doesBobMeasureCorrectly1 from "./media/doesBobMeasureCorrectly1.png";
import doesBobMeasureCorrectly2 from "./media/doesBobMeasureCorrectly2.png";
import doesBobMeasureCorrectly3 from "./media/doesBobMeasureCorrectly3.png";
import doesBobMeasureCorrectly4 from "./media/doesBobMeasureCorrectly4.png";
import whenStateRemainsSame1 from "./media/whenStateRemainsSame1.png";
import whenStateRemainsSame2 from "./media/whenStateRemainsSame2.png";
import whenStateRemainsSame3 from "./media/whenStateRemainsSame3.png";
import whenStateRemainsSame4 from "./media/whenStateRemainsSame4.png";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
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
                <Image
                  src={doesBobMeasureCorrectly1}
                  alt="The experimental setup described above"
                  maxWidth={"200px"}
                />,
              ],
              [
                "HsendMeasure",
                <Image
                  src={doesBobMeasureCorrectly2}
                  alt="The experimental setup described above"
                  maxWidth={"243px"}
                />,
              ],
              [
                "sendHMeasure",
                <Image
                  src={doesBobMeasureCorrectly3}
                  alt="The experimental setup described above"
                  maxWidth={"260px"}
                />,
              ],
              [
                "HsendHMeasure",
                <Image
                  src={doesBobMeasureCorrectly4}
                  alt="The experimental setup described above"
                  maxWidth={"280px"}
                />,
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
                <Image
                  src={whenStateRemainsSame1}
                  alt="The experimental setup described above"
                  maxWidth={"246px"}
                />,
              ],
              [
                "plusHMeasureH",
                <Image
                  src={whenStateRemainsSame2}
                  alt="The experimental setup described above"
                  maxWidth={"335px"}
                />,
              ],
              [
                "zeroMeasure",
                <Image
                  src={whenStateRemainsSame3}
                  alt="The experimental setup described above"
                  maxWidth={"228px"}
                />,
              ],
              [
                "oneHMeasureH",
                <Image
                  src={whenStateRemainsSame4}
                  alt="The experimental setup described above"
                  maxWidth={"323px"}
                />,
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
  continue: {
    // Don't require any answers.
    allowed: () => true,
  },
}));
