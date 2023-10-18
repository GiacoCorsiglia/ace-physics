import { ChooseOne, Decimal, Dropdown, Integer, M, Prose, TextBox, Toggle } from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({section}) => ({
  sections: [
    section({
      body: (m) => (
        <>
          <Prose>
            This is how you might add some Prose.
            It also might be everything you have in a section if you want to.
            Line breaks in code don't add real line breaks.

            <p>
              Use 'p' to do that!
            </p>
            <p>
              consecutive p's have wide line breaks. Notice that the first
              line break was not as big.
            </p>
            test
            <br/>this one is small.
          </Prose>


        </>
      ),
    }),
    section({
      body: (m) => (
        <>
        <Prose>
          Notice the new horizontal line representing a new section.
          Notice also the 'm' in the code, in the parentheses just after body.
          This 'm' is a reference to the 'pretest' element of the object defined
          in the 'schema.ts' file.
          <br/><br/>

        </Prose>
        <ChooseOne // Another option is 'Toggle'
          model={m.docTutPretestChooseOneWithOther}
          choices={[
            ["test", "This is a test"],
            ["secondtest", "This is another test"]
          ]}
          // Typescript enforces that the argument of 'choices' is a dictionary
          // where the keys are the strings given when we first defined
          // docTutChooseOne, i.e. "test" and "secondtest".
          // If you add an 'other' to the s.chooseOne() function in schema
          // (notice that the second paramater is an s.string() so returns a
          // string field) then you will get an 'other' option. You can put in
          // a number field instead if you want.
        />
        <Prose>
          test
        </Prose>
        <TextBox model={m.docTutPretestText} label={<Prose>test</Prose>} />

        <Decimal model={m.docTutPretestDecimal} label={"decimal test"} />

        <Integer model={m.docTutPretestDecimal} label={"integer test using same model"} />

        <Prose>
          Notice that typing in one of these boxes causes changes in the other
          box. This suggests that 'models' are environmental variables (at least
          with respect to the tutorial environment).
        </Prose>



        <ChooseOne
          model={m.docTutPretestChooseOneToggle}
          label={"Do models persist across sections?"}
          choices={[
            ["test", "Models persist across sections "],
            ["secondtest", "Models do not persist across sections"]
          ]}
        />
        </>
      )
    }),
    section({
      body: (m) => (
        <>

        <Toggle
          model={m.docTutPretestChooseOneToggle}
          choices={[
            ["test", "Notice that labels can differ though model choices persist"],
            ["secondtest", "This is another test"]
          ]}
        />
        <Dropdown
          model={m.docTutPretestChooseOneToggle}
          choices={[
            ["test", <M t="\psi"/>],
            ["secondtest", "You  can  write  options  in  LaTeX!"]
          ]}
        />
        </>
      )

    })
  ],
}));
