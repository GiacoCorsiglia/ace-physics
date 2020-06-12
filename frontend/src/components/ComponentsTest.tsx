import React from "react";
import * as s from "src/common/schema";
import { Provider, useField } from "src/state";
import { Prose, Question } from ".";
import ColumnVector from "./ColumnVector";
import {
  Button,
  Choice,
  Decimal,
  FieldGroup,
  Integer,
  Select,
  SelectChoices,
  Text,
  TextArea,
  Toggle,
} from "./inputs";
import M from "./M";

export function ComponentsTest() {
  return (
    <main className="full-width">
      <Provider schema={TestSchema}>
        <h1>Test Page</h1>

        <Typography />

        <Buttons />

        <TextInputs />

        <NumberInputs />

        <Selects />

        <Choices />

        <Toggles />

        <GroupedFields />

        <ColumnVectorTest />
      </Provider>
    </main>
  );
}

const lipsum =
  "Mauris ut justo justo. Integer lacinia nisi nec nisi vehicula tempor. Etiam ac ligula a odio dapibus cursus in at felis. Nam hendrerit lacinia tempus. Aliquam dapibus faucibus mi, eget aliquet quam. Nam eget risus fringilla, feugiat dolor a, cursus magna. Aliquam non lobortis lectus.";

function Typography() {
  return (
    <Prose>
      <h1>Heading 1</h1>
      <p>{lipsum}</p>

      <h2>Heading 2</h2>
      <p>{lipsum}</p>

      <h3>Heading 3</h3>
      <p>{lipsum}</p>

      <h4>Heading 4</h4>
      <p>{lipsum}</p>

      <h5>Heading 5</h5>
      <p>{lipsum}</p>

      <h6>Heading 6</h6>
      <p>{lipsum}</p>
      <blockquote>{lipsum}</blockquote>
      <p>{lipsum}</p>
      <M
        t="\iiint \frac{\hat{\mathbf{r}}}{4 \pi \epsilon_0 |\vec{\mathbf{r}} - \vec{\mathbf{x}}|^2} d^3x"
        display
      />
      <p>{lipsum}</p>
    </Prose>
  );
}

function Buttons() {
  return (
    <section>
      <Button>Primary Button</Button>
      <Button kind="secondary">Secondary Button</Button>
    </section>
  );
}

type TestSchema = s.TypeOf<typeof TestSchema>;
const TestSchema = s.record({
  text1: s.string(),
  text2: s.string(),

  number1: s.number(),
  number2: s.number(),

  select: s.choice(["opt1", "opt2", "opt3"] as const),
  selectNoOther: s.choice(["opt1", "opt2", "opt3"] as const),
  selectMulti: s.choice(["opt1", "opt2", "opt3"] as const, true),

  bool: s.boolean(),
});

function TextInputs() {
  const text1 = useField(TestSchema, "text1");
  const text2 = useField(TestSchema, "text2");

  return (
    <section>
      <h2>Text Inputs</h2>

      <Text
        field={text1}
        label={<Question label="a">Input question</Question>}
      />

      <TextArea
        field={text2}
        label={<Question label="b">Textarea question</Question>}
      />
    </section>
  );
}

function NumberInputs() {
  const number1 = useField(TestSchema, "number1");
  const number2 = useField(TestSchema, "number2");

  return (
    <section>
      <h2>Number Inputs</h2>

      <Decimal
        field={number1}
        placeholder="Decimal"
        label={<Question label="a">Decimal input question</Question>}
      />

      <Integer
        field={number2}
        placeholder="Integer"
        label={<Question label="b">Integer input question</Question>}
      />
    </section>
  );
}

const selectChoices: SelectChoices<TestSchema["select"]> = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
];

function Selects() {
  const select = useField(TestSchema, "select");
  const selectNoOther = useField(TestSchema, "selectNoOther");
  const selectMulti = useField(TestSchema, "selectMulti");

  return (
    <section>
      <h2>Selects</h2>

      <Select
        field={select}
        choices={selectChoices}
        label={<Question label="a">A question?</Question>}
      />
      <Select
        field={selectNoOther}
        choices={selectChoices}
        allowOther={false}
        label={<Question label="b">Another question?</Question>}
      />
      <Select
        field={selectMulti}
        choices={selectChoices}
        label={<Question label="c">Yet another question?</Question>}
      />
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

      <Choice
        field={select}
        choices={selectChoices}
        label={<Question label="a">A question?</Question>}
      />
      <Choice
        field={selectNoOther}
        choices={selectChoices}
        allowOther={false}
        label={<Question label="b">Another question?</Question>}
      />
      <Choice
        field={selectMulti}
        choices={selectChoices}
        label={<Question label="c">A third question?</Question>}
      />
    </section>
  );
}

function Toggles() {
  const selectNoOther = useField(TestSchema, "selectNoOther");
  const bool = useField(TestSchema, "bool");

  return (
    <section>
      <h2>Toggles</h2>

      <Toggle field={selectNoOther} choices={selectChoices} />

      <Toggle field={bool} />

      <Toggle
        label={<Question label="a">This is a question</Question>}
        field={bool}
        yes="Definitely"
        no="No way"
      />
    </section>
  );
}

function GroupedFields() {
  const select = useField(TestSchema, "select");
  const bool = useField(TestSchema, "bool");
  const text1 = useField(TestSchema, "text1");
  const text2 = useField(TestSchema, "text2");
  const number1 = useField(TestSchema, "number1");
  const number2 = useField(TestSchema, "number2");

  return (
    <section>
      <h2>Grouped Fields</h2>

      <FieldGroup grid>
        <Select
          field={select}
          choices={selectChoices}
          label={<div>A question:</div>}
        />

        <Toggle
          label="Another question:"
          field={bool}
          yes="Definitely"
          no="No way"
        />

        <Choice
          field={select}
          choices={selectChoices}
          label="Grouped choices:"
        />

        <Text field={text1} label="Input question:" />

        <TextArea field={text2} label="Textarea question:" />

        <Decimal field={number1} label="Decimal input question:" />

        <Integer field={number2} label="Integer input question:" />

        <Select field={select} choices={selectChoices} />

        <Toggle field={bool} yes="Definitely" no="No way" />

        <Choice field={select} choices={selectChoices} />

        <Text field={text1} />

        <TextArea field={text2} />

        <Decimal field={number1} />

        <Integer field={number2} />

        <Button>Click me!</Button>
      </FieldGroup>
    </section>
  );
}

function ColumnVectorTest() {
  const select = useField(TestSchema, "select");
  const number1 = useField(TestSchema, "number1");
  const number2 = useField(TestSchema, "number2");

  return (
    <section>
      <h2>Column Vector</h2>

      <ColumnVector
        labelTex="\ket{\psi}"
        vector={[
          <Select field={select} choices={selectChoices} />,
          <Decimal field={number1} />,
          <Integer field={number2} />,
        ]}
      />
    </section>
  );
}
