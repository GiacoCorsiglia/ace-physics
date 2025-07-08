import { M, Prose, TextBox, Toggle } from "@/components";
import { posttest } from "@/tutorial";
import setup from "./setup";

export default posttest(setup, ({ section }) => ({
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
                <strong>Post-activity questions:</strong> Please work on this page
                 <strong> alone</strong> and dont discuss your answers.
                (Feel free to check in with your tutorial instructor after
                you are done though)
              </Prose>
        </>
      ),
    }),
    section({
      body: (m) => (
        <>
          <TextBox
            model={m.postActivity1}
            label={
              <Prose>
               <strong>Question 1:</strong> You have a supply of X, Z, and H gates. Design a
               simple circuit with zero, one or two gates that has an input of
               {" "}<M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />
               and will yield an output of  {" "}
               <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />. <br />
               <br />
               If this is impossible, explain why.
              </Prose>
            }
          />
        </>
      ),
    }),
    section({
      body: (m) => (
        <>
          <TextBox
            model={m.postActivity2}
            label={
              <Prose>
               <strong>Question 2:</strong> You have a supply of X, Z, and H gates. Design a
               simple circuit with zero, one or two gates that has an input of
               {" "}<M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />
               and will yield a final measurement of 1 with 100%
               certainty. <br />
               <br />
               If this is impossible, explain why.
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
              <strong>Question 3:</strong> I send you a string of qubits, one at
              a time. Each qubit is either in state {" "}<M t="\ket{0}" /> or in
              state {" "}<M t="\ket{1}" />. I use an ideal random coin toss to
              decide what to send for each qubit, with exactly 50/50 probabilty
              every time. <br />

            </Prose>
        <Toggle
          model={m.postActivity3Boolean}
          label={
            <Prose>
              Is the statement below <strong>true</strong> or <strong>false</strong>?
              (choose one) <br />
              <br />
              The qubits you recieve are each described by the quantum state <br />
              {" "}<M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />.
            </Prose>
          }
          choices={[
            ["yes", "True"],
            ["no", "False"],

          ]}
        />
        <TextBox
        model={m.postActivity4}
        label= {<Prose>
        Very briefly, explain.
        </Prose>
        }
        />
        </>
      ),
    }),
  ],
}));
