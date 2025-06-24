import { ChooseOne, M, Prose, QuantumCircuit, TextBox, Toggle } from "@/components";

import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "reviewingGates",
  label: "Reviewing Gates",
  answers: "none",
  cheatSheet: {
    body: (
      <>
        <M display t="Z = \pmatrix{1 & 0 \\ 0 & -1}" />
        <M display t="X = \pmatrix{0 & 1 \\ 1 & 0}" />
        <M display t="H = \frac{1}{\sqrt{2}}\pmatrix{1 & 1 \\ 1 & -1}" />
      </>
    ),
  },
  sections: [
    section({
      name: "reviewingGatesIntro",
      body: (m) => (
        <>
          <Prose>
            {" "}
            First let's do a brief review of some single-qubit circuits:
          </Prose>
        </>
      ),
    }),

    section({
      name: "outputcircuit1",
      body: (m) => (
        <>
          <ChooseOne
            model={m.outputcircuit1}
            label={
              <Prose>
                What is the output of the following circuit? (Try to do this
                without multiplying matrices.)
                <QuantumCircuit t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{H} & \gate{Z} & \qw" />
              </Prose>
            }
            choices={[
              ["0", <M t=" \ket{0}" />],
              ["minus0", <M t=" - \ket{0}" />],
              ["1", <M t=" \ket{1}" />],
              ["minus1", <M t=" -\ket{1}" />],
              ["plus", <M t=" \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />],
              ["minus", <M t=" \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />],
              ["other", "Something else"],
            ]}
          />
        </>
      ),
    }),

    section({
      name: "outputcircuit2",
      body: (m) => (
        <>
          <ChooseOne
            model={m.outputcircuit2}
            label={
              <Prose>
                What is the output of the following circuit? (Try to do this
                without multiplying matrices.)
                <QuantumCircuit t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{Z} & \gate{H} & \qw" />
              </Prose>
            }
            choices={[
              ["0", <M t=" \ket{0}" />],
              ["minus0", <M t=" - \ket{0}" />],
              ["1", <M t=" \ket{1}" />],
              ["minus1", <M t=" -\ket{1}" />],
              ["plus", <M t=" \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />],
              ["minus", <M t=" \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />],
              ["other", "Something else"],
            ]}
          />
        </>
      ),
    }),

    section({
      name: "doHZCommute",
      body: (m) => (
        <>
          <Toggle
            model={m.doHZCommute}
            label={
              <Prose>
                Using your answers above, can you say whether <M t="H" />{" "}
                commutes with <M t="Z" /> ?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          <TextBox
          model={m.doHZCommuteExplain}
          label={
            <Prose>
              Briefly, explain:
            </Prose>
          }
          />
        </>
      ),
    }),
  ],
}));
