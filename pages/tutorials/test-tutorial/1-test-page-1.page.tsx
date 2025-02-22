import { BooleanToggle, ChooseAll, Prose } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "testPage1",
  label: "Test Page 1 - Gina's page",
  sections: [
    section({
      name: "testPage1Section1",
      body: (m) => (
        <>
          <Prose>Text of section 1</Prose>
        </>
      ),
    }),
    section({
      name: "testPage1Section2",
      body: (m) => (
        <>
          <Prose>
            Text of section 2<p> I'm going to ask a true/false question.</p>
          </Prose>
          <BooleanToggle model={m.testpage1boolean} label="test label" />

          <Prose>
            This is a question where you should select all animals you like
          </Prose>

          <ChooseAll
            model={m.testpage1chooseall}
            choices={[
              ["id1", "cat"],
              ["id2", "dog"],
              ["id3", "mouse"],
              ["id4", "hamster"],
            ]}
          />
        </>
      ),
    }),
  ],
}));
