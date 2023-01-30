import { ChooseAll, M, Prose, QuantumCircuit, TextBox } from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  cheatSheet: {
    body: (
      <>
        <M display t="Z\ket{0} = \ket{0},\, Z\ket{1} = -\ket{1}" />
        <M display t="X\ket{0} = \ket{1},\, X\ket{1} = \ket{0}" />
        <M display t="H\ket{0} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />
        <M display t="H\ket{1} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />
      </>
    ),
  },
  sections: [
    section({
      body: (m) => (
        <>
          <TextBox
            model={m.outputOfCircuit}
            label={
              <Prose>
                What is the output of the following circuit?
                <QuantumCircuit t="\lstick{\ket{1} } & \gate{H} & \gate{Z} & \gate{Z} & \gate{X} \qw \\" />
              </Prose>
            }
          />

          <Prose faded>
            If you aren’t sure how to answer this question, just say so and move
            on.
          </Prose>
        </>
      ),
    }),

    section({
      body: (m) => (
        <ChooseAll
          model={m.circuitAsDirac}
          label={
            <Prose>
              Choose <strong>all</strong> expressions which are equivalent to
              the circuit above:
            </Prose>
          }
          choices={[
            ["HZZX|1>", <M t="HZZX\ket{1}" />],
            ["XZZH|1>", <M t="XZZH\ket{1}" />],
            ["HX|1>", <M t="HX\ket{1}" />],
            ["HIX|1>", <M t="HIX\ket{1}" />],
            ["XH|1>", <M t="XH\ket{1}" />],
            ["XIH|1>", <M t="XIH\ket{1}" />],
            ["unsure", "I’m not sure how to answer this question."],
          ]}
        />
      ),
    }),
  ],
}));
