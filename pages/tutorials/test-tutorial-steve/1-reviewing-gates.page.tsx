import {
  Answer,
  ChooseOne,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";

import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "reviewingGates",
  label: "Reviewing Gates",
  answers: "provided",
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
            First lets do a brief review of some single-qubit circuits:
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
            answer="0"
          />
          <Answer>
            <p>
              In the circuit diagram, H acts first. <br />
              Note that
              <M t="H \ket{0} = \frac{1}{\sqrt{2}} (\ket{0} + \ket{1}) \ " />
              and
              <M t="H \ket{1} = \frac{1}{\sqrt{2}} (\ket{0} - \ket{1}) " />.
              <br /> Adding these two, the <M t="\ket{1}" /> terms cancel out,
              giving
              <br />{" "}
              <M t="H \frac{1}{\sqrt{2}} (\ket{0} + \ket{1}) = \ket{0} " />
              <br /> (Please verify for yourself all the factors of 2 work out
              like this)
              <br />
              <br /> Since
              <M t="Z \ket{0} =  \ket{0} " />, nothing further happens, and we
              end up with state <M t="\ket{0}" />.
            </p>
          </Answer>
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
            answer="1"
          />
          <Answer>
            <p>
              This time Z acts first. <br /> <M t="Z \ket{1} = -\ket{1}" />{" "}
              introduces a relative minus sign on the second term. <br />
              Verify for yourself that in this case,
              <br />
              <M t="H \frac{1}{\sqrt{2}} (\ket{0} - \ket{1}) = \ket{1} " />
              <br /> So here, we end up with state <M t="\ket{1}" />, a
              different answer than the previous question.
            </p>
          </Answer>
        </>
      ),
    }),

    section({
      name: "doHZCommute",
      body: (m) => (
        <>
          <Toggle
            model={m.doHZCommute}
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
            label={
              <Prose>
                Given the answers on this page, does <M t="H" /> commute with{" "}
                <M t="Z" />?
                <br /> (Hint: Try to answer without bothering to multiply any
                matrices in different orders. Just look at the previous two
                questions.)
              </Prose>
            }
          />

          <TextBox
            model={m.doHZCommuteExplain}
            label={<Prose>Briefly explain,</Prose>}
          />
          <Answer>
            <p>
              The above two questions showed that HZ and ZH acting on the same
              input state give different results. <br /> This is sufficient to
              show that H and Z do not commute, which means that "order
              matters".
              <br /> You can also verify this by writing out the H and Z
              matrices, and multiply them in the two different orders. You will
              not get the same answer, another valid way to show that two
              operators do not commute!
            </p>
          </Answer>
        </>
      ),
    }),
  ],
}));
