import React from "react";
import * as s from "src/common/schema";
import { Provider, useField } from "src/state";
import { Choice, Select, SelectChoices, Text, TextArea } from "./inputs";

export function ComponentsTest() {
  return (
    <main className="full-width">
      <Provider schema={TestSchema}>
        <h1>Test Page</h1>

        <TextInputs />

        <Selects />

        <Choices />
      </Provider>
    </main>
  );
}

type TestSchema = s.TypeOf<typeof TestSchema>;
const TestSchema = s.record({
  text1: s.string(),
  text2: s.string(),

  select: s.choice(["opt1", "opt2"] as const),
  selectNoOther: s.choice(["opt1", "opt2"] as const),
  selectMulti: s.choice(["opt1", "opt2"] as const, true),
});

function TextInputs() {
  const text1 = useField(TestSchema, "text1");
  const text2 = useField(TestSchema, "text2");

  return (
    <section>
      <h2>Text Inputs</h2>

      <Text field={text1} />

      <TextArea field={text2} />
    </section>
  );
}

const selectChoices: SelectChoices<TestSchema["select"]> = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
];

function Selects() {
  const select = useField(TestSchema, "select");
  const selectNoOther = useField(TestSchema, "selectNoOther");
  const selectMulti = useField(TestSchema, "selectMulti");

  return (
    <section>
      <h2>Selects</h2>

      <Select field={select} choices={selectChoices} />
      <Select
        field={selectNoOther}
        choices={selectChoices}
        allowOther={false}
      />
      <Select field={selectMulti} choices={selectChoices} />
    </section>
  );
}

function Choices() {
  const select = useField(TestSchema, "select");
  const selectNoOther = useField(TestSchema, "selectNoOther");
  const selectMulti = useField(TestSchema, "selectMulti");

  return (
    <section>
      <h2>Choices</h2>

      <Choice field={select} choices={selectChoices} />
      <Choice
        field={selectNoOther}
        choices={selectChoices}
        allowOther={false}
      />
      <Choice field={selectMulti} choices={selectChoices} />
    </section>
  );
}
