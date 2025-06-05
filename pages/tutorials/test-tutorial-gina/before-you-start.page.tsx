import {
  ChooseOne,
  Decimal,
  Dropdown,
  Integer,
  M,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <>
          <Prose>
            Now that you are familiar with single qubits and some of the
            fundamental quantum gates, this tutorial will focus on one of the
            import important quantum concepts: superposition.
            <p>
              Before starting the tutorial, answer these questions on your own.
            </p>
            <br />
            this one is small.
          </Prose>
        </>
      ),
    }),
    section({
      body: (m) => (
        <>
          <Prose>Next section, Steve's first! </Prose>
          <TextBox
            model={m.steveTutPretestText1}
            label={
              <Prose>
                You have a supply of X, Z, and H gates. Design a simple circuit
                with zero, one, or two gates that has an input of a single qubit
                in state
                <M display t="\frac{1}{\sqrt{2}}(\ket{0}+\ket{1})" />, and will
                yield an output qubit in state. If this task is impossible,
                explain why.
              </Prose>
            }
          />
          <ChooseOne // Another option is 'Toggle'
            model={m.steveTutPretestChooseOne}
            choices={[
              ["steveopt1", "Do you prefer this?"],
              ["steveopt2", "or that"],
            ]}
          />
        </>
      ),
    }),
    section({
      body: (m) => (
        <>
          <Prose>
            <p>Here is a new section added by Gina!</p>
            <p>This is a new paragraph! There are line breaks! </p>
            <p>Feel free to add more elements as needed.</p>
          </Prose>
          <TextBox
            model={m.GinaStringInput}
            label={
              <Prose>Gina would like you to type the word duck below</Prose>
            }
            initialValue="duckduck goose"
          />
        </>
      ),
    }),
    section({
      body: (m) => (
        <>
          <Prose>
            Notice the new horizontal line representing a new section. Notice
            also the 'm' in the code, in the parentheses just after body. This
            'm' is a reference to the 'pretest' element of the object defined in
            the 'schema.ts' file.
            <br />
            <br />
          </Prose>
          <ChooseOne // Another option is 'Toggle'
            model={m.docTutPretestChooseOneWithOther}
            choices={[
              ["test", "This is a test"],
              ["secondtest", "This is another test"],
            ]}
            // Typescript enforces that the argument of 'choices' is a dictionary
            // where the keys are the strings given when we first defined
            // docTutChooseOne, i.e. "test" and "secondtest".
            // If you add an 'other' to the s.chooseOne() function in schema
            // (notice that the second parameter is an s.string() so returns a
            // string field) then you will get an 'other' option. You can put in
            // a number field instead if you want.
          />
          <Prose>test</Prose>
          <TextBox
            model={m.docTutPretestText}
            label={
              <Prose>
                optional test (you don't have to input text here to be able to
                press continue)
              </Prose>
            }
          />

          <Decimal model={m.docTutPretestDecimal} label={"decimal test"} />

          <Integer
            model={m.docTutPretestDecimal}
            label={"integer test using same model"}
          />

          <Prose>
            Notice that typing in one of these boxes causes changes in the other
            box. This suggests that 'models' are environmental variables (at
            least with respect to the tutorial environment).
          </Prose>

          <ChooseOne
            model={m.docTutPretestChooseOneToggle}
            label={"Do models persist across sections?"}
            choices={[
              ["test", "Models persist across sections "],
              ["secondtest", "Models do not persist across sections"],
            ]}
          />
        </>
      ),
    }),
    section({
      body: (m, s) => (
        <>
          <Toggle
            model={m.docTutPretestChooseOneToggle}
            choices={[
              [
                "test",
                "Notice that labels can differ though model choices persist",
              ],
              ["secondtest", "This is another test"],
            ]}
          />
          <Dropdown
            model={m.docTutPretestChooseOneToggle}
            choices={[
              ["test", <M t="\psi" />],
              ["secondtest", "You  can  write  options  in  LaTeX!"],
            ]}
          />
          <Prose>
            The following is an example of using the Tutorial State. Here, we
            check what id choice the user chose:{" "}
            {s.pretest?.docTutPretestChooseOneToggle?.selected === "test"
              ? "'test'"
              : s.pretest?.docTutPretestChooseOneToggle?.selected ===
                  "secondtest"
                ? "'secondtest'"
                : "not chosen yet"}
            "{s.pretest?.docTutPretestText}"
          </Prose>
        </>
      ),
    }),
  ],
  continue: {
    optional: ["docTutPretestText"],
  },
}));
