import { ChooseOne, M, Prose, TextBox, Toggle } from "@/components";
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
          <Prose>
            You have a supply of X, Z, and H gates. <br />
            On a piece of paper, try to design a simple circuit with one or two
            gates that has an input of a single qubit in state{" "}
            <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />, <br />
            that will yield an output of a qubit in state{" "}
            <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" /> <br />
            <br />
            How many gates do you need? Select one answer:{" "}
          </Prose>
          <ChooseOne // Another option is 'Toggle'
            model={m.designCircuit1chooseone}
            choices={[
              ["one", "I only need 1 gate"],
              ["two", "I need 2 gates"],
              ["more", "I need more than 2 gates, but I can do it"],
              ["impossible", "This can't be done with basic gates"],
              ["unsure", "I’m not sure how to answer this question."],
            ]}
          />
          <TextBox
            model={m.designCircuit1explain}
            label={
              <Prose>
                In the space below, explain your answer above. (If you came up
                with a circuit, describe it in words. If it's impossible, tell
                us why.)
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            You have a supply of X, Z, and H gates. <br />
            On a piece of paper, try to design a simple circuit with one or two
            gates that has an input of a single qubit in state{" "}
            <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />, <br />
            that will yield a final measurement of 1 with 100% certainty <br />
            <br />
            How many gates do you need? Select one answer:{" "}
          </Prose>
          <ChooseOne // Another option is 'Toggle'
            model={m.designCircuit2chooseone}
            choices={[
              ["one", "I only need 1 gate"],
              ["two", "I need 2 gates"],
              ["more", "I need more than 2 gates, but I can do it"],
              ["impossible", "This can't be done with basic gates"],
              ["unsure", "I’m not sure how to answer this question."],
            ]}
          />
          <TextBox
            model={m.designCircuit2explain}
            label={
              <Prose>
                In the space below, explain your answer above. (If you came up
                with a circuit, describe it in words. If it's impossible, tell
                us why.)
              </Prose>
            }
          />
        </>
      ),
    }),
    section({
    body: (m) => (
      <>
        <Toggle
          model={m.designCircuit3boolean}
          label={
            <Prose>
             I send you a string of qubits, one at a time. Each qubit is either in
              state {" "} <M t="\ket{0}" /> or in state {" "} <M t="\ket{1}" />.
              I use an ideal random coin toss to decide what
             to send for each qubit, with exactly 50/50 probabilty every time. <br />
             <br />
             Is the statement below true or false? <br />
             The qubits you recieve are each described by the quantum state <br />
             {" "} <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />.
            </Prose>
         }
        choices={[
         ["yes", "Yes"],
         ["no", "No"],
          ]}
        />

    <TextBox
    model= {m.designCircuit3explain}
    label={
      <Prose>
        Very briefly, explain.
      </Prose>
    }
    />
  </>
    )
})
  ],
}));
