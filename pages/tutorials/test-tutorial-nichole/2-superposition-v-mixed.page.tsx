import {
  ChooseOne,
  M,
  Prose,
  TextBox
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "superpositionvmixed",
  label: "Superposition versus mixed states",
  answers: "provided",
  cheatSheet: {
    body: (
      <>
        <M display t="Z\ket{0} = \ket{0},\, Z\ket{1} = -\ket{1}" />
        <M display t="X\ket{0} = \ket{1},\, X\ket{1} = \ket{0}" />
      </>
    ),
  },
  sections: [
    section({
      name: "aliceBobQuestion1",
      body: (m) => (
        <>
          <Prose>
           Alice has created a black box device that outputs a qubit (one
           qubit at a time), each in the quantum state
           {" "} <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />. <br />
            <br />
            Bob created a black box that also outputs one qubit at a time, but
            each is either in state {" "} <M t="\ket{0}" /> or in
            state {" "} <M t="\ket{1}" />. His black box uses a
            random number generator to decide which is output, each with 50%
            probability.  <br />
            <br />
            Alice and Bob's setups produce qubits that are (select one):
            </Prose>
            <ChooseOne
            model={m.aliceBobQuestion1}
            choices={[
              ["one", "Identical (and therefore, experimentally indistinguishable"],
              ["two", "Different, but experimentally indistinguishable"],
              ["more", "Different, and can be experimentally distinguished"],
            ]}
          />
          <TextBox
            model={m. aliceBob1Explain}
            label={
              <Prose>
                Briefly explain your reasoning. (Please dont spend much time on
                this yet, we just want your first impressions. We will be exploring
                the answer in the rest of this tutorial)
              </Prose>
            }
          />
        </>
      ),
    }),



    section({
      name: "aliceBobIntro2",
      body: (m) => (
        <>
            <Prose>
              Alice and Bob are debating how to think about their black boxes. <br />
              Alice thinks there is something measureably different about their
              outputs.<br />
              Bob disagrees, he argues that his black box is experimentally
              indistinguishable from Alice's, since (after all) both are
              effectively "50/50, 0 or 1" boxes. <br />
              Try to decide, Alice and Bob each produce a large number of qubits
             and measure each qubit to be a 0 or 1. They can only make
             measurements of 0 or 1. After measuring many qubits:
            </Prose>
             <TextBox
          model={m.aliceBobQuestion2A}
          label={
            <Prose> On average, what percent of Alice's qubits will be measured
              to be 0?
             </Prose>
          }
        />
        <TextBox
        model={m.aliceBobQuestion2B}
        label={
          <Prose>
            On average, what percent of Bob's qubits will be measured to be 0?
          </Prose>
          }
        />
        <TextBox
        model={m.aliceBobQuestion2C}
        label={
          <Prose>
            On the basis of just this set of experiments so far, can Alice and
            Bob settle their debate?
          </Prose>
        }
        />
        </>
      ),
    }),
//start of header for question 3
    section({
      name: "aliceBobIntro3",
      body: (m) => (
        <>
        <Prose>
          The statistical outcome of the previous experiment was the same for both
          (50-50). Bob claims that this shows their black boxes are experimentally
          indistinguishable. Alice wants to do another experiment. <br />
          <br />
          Alice suggests they each apply a Z gate to their qubits before they
          measure. After many such measurements:
        </Prose>
          <TextBox
            model={m.aliceBobQuestion3A}
            label={
              <Prose>
                On average, what percent of Alice's qubits will be measured to
                be 0?
              </Prose>
            }
          />
          <TextBox
          model={m.aliceBobQuestion3B}
          label={
          <Prose>
            On average, what percent of Bob's qubits will be measured to be 0?
          </Prose>
          }
          />
          <TextBox
          model={m.aliceBobQuestion3C}
          label={
            <Prose>
              On the basis of all experiments so far, can Alice and Bob settle
              their debate?
            </Prose>
          }
          />
          </>
      ),
    }),

    section({
      name: "aliceBobQuestion4",
      body: (m) => (
        <>
          <Prose>
           The statistical outcome is once again the same for both observers.
           Bob believes this confirms their black boxes are experimentally
           indistinguishable. Alice wants to do another experiment.  <br />
           <br />
          </Prose>

           <TextBox
            model={m.aliceBobQuestion4}
            label={
              <Prose>
                This time, they decide to apply an X gate to their qubits before
                they measure. Using similar reasoning as in the previous
                experiments, decide whether the statistical outcome finally settles
                their debate. (Briefly, discuss.)
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "aliceBobQuestion5",
      body: (m) => (
        <>
        <Prose>
          After all these experiments (the first, where they simply measured,
          then where they applied a Z gate before measuring, and finally where
          they applied an X gate), they found that it was impossible to distinguish
          Alice and Bob's qubits. They decide to try one more experiment. <br />
          <br />
          This time, they apply an H gate to their qubits before they measure.
          <br />
        </Prose>
        <TextBox
        model={m.aliceBobQuestion5A}
        label={
          <Prose>
            On average, what percent of Alice's qubits will be measured to be 0?
          </Prose>
        }
        />
        <TextBox
        model={m.aliceBobQuestion5A}
        label={
          <Prose>
            On average, what percent of Bob's qubits will be measured to be 0?
          </Prose>
        }
        />
        <TextBox
        model={m.aliceBobQuestion5B}
        label={
          <Prose>
            Does the outcome of this final experiment at last settle their debate?
          </Prose>
        }
        />
        </>
      )
    }),
    section({
      name: "superpositionvmixedConclusion",
      body: (m) => (
        <>
        <Prose>
        <strong>Please check your answer with an instructor.</strong> <br />
        <br />
        This final experiment yields different statistical outcomes for Alice
        and Bob, showing that their black boxes do indeed produce
        experimentally<br /> <em> distinguishable states.</em> <br />
        Alice's state is called a <em> superposition.</em> It is a uniquely
        quantum mechanical state, and plays an important role in quantum
         computers.<br />
        Bob's state is called a<em> mixed state. </em>
        We often refer to this state as a mixture
        or a "lack-of-knowledge" state.
        </Prose>
        </>
      )
    })
  ],
}));
