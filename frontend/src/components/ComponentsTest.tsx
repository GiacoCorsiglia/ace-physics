import React from "react";
import * as s from "src/common/schema";
import { Provider, useField } from "src/state";
import { Prose, Question } from ".";
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
import { Column, Content } from "./layout";
import M from "./M";
import Matrix from "./Matrix";

export function ComponentsTest() {
  return (
    <main>
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

        <MatrixTest />
      </Provider>
    </main>
  );
}

const lipsum =
  "Mauris ut justo justo. Integer lacinia nisi nec nisi vehicula tempor. Etiam ac ligula a odio dapibus cursus in at felis. Nam hendrerit lacinia tempus. Aliquam dapibus faucibus mi, eget aliquet quam. Nam eget risus fringilla, feugiat dolor a, cursus magna. Aliquam non lobortis lectus.";

function Typography() {
  return (
    <Content as="section">
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
    </Content>
  );
}

function Buttons() {
  return (
    <Content as="section" columns>
      <Column>
        <Button>Primary Button</Button>
        <br />
        <Button kind="secondary">Secondary Button</Button>
      </Column>

      <Column>
        <Button disabled>Primary Button</Button>
        <br />
        <Button kind="secondary" disabled>
          Secondary Button
        </Button>
      </Column>
    </Content>
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
    <Content as="section">
      <h2>Text Inputs</h2>

      <Text
        field={text1}
        label={<Question label="a">Input question</Question>}
      />

      <TextArea
        field={text2}
        label={<Question label="b">Textarea question</Question>}
      />
    </Content>
  );
}

function NumberInputs() {
  const number1 = useField(TestSchema, "number1");
  const number2 = useField(TestSchema, "number2");

  return (
    <Content as="section">
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
    </Content>
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
    <Content as="section">
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
    </Content>
  );
}

function Choices() {
  const select = useField(TestSchema, "select");
  const selectNoOther = useField(TestSchema, "selectNoOther");
  const selectMulti = useField(TestSchema, "selectMulti");

  return (
    <Content as="section">
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
    </Content>
  );
}

function Toggles() {
  const selectNoOther = useField(TestSchema, "selectNoOther");
  const bool = useField(TestSchema, "bool");

  return (
    <Content as="section">
      <h2>Toggles</h2>

      <Toggle field={selectNoOther} choices={selectChoices} />

      <Toggle field={bool} />

      <Toggle
        label={<Question label="a">This is a question</Question>}
        field={bool}
        yes="Definitely"
        no="No way"
      />
    </Content>
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
    <Content as="section">
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
    </Content>
  );
}

function MatrixTest() {
  const select = useField(TestSchema, "select");
  const number1 = useField(TestSchema, "number1");
  const number2 = useField(TestSchema, "number2");

  return (
    <Content as="section">
      <h2>Matrices</h2>

      <h3>Column Vector</h3>

      <Matrix
        labelTex="\ket{\psi}"
        column={[
          <Select field={select} choices={selectChoices} />,
          <Decimal field={number1} />,
          <Integer field={number2} />,
        ]}
      />

      <h3>Row Vector</h3>

      <Matrix
        labelTex="\bra{\psi}"
        row={[
          <Select field={select} choices={selectChoices} />,
          <Decimal field={number1} />,
          <Integer field={number2} />,
        ]}
      />

      <h3>Matrix</h3>

      <Matrix
        labelTex="\hat{S}"
        matrix={[
          [
            <Select field={select} choices={selectChoices} />,
            <Select field={select} choices={selectChoices} />,
            <Select field={select} choices={selectChoices} />,
          ],
          [
            <Decimal field={number1} />,
            <Decimal field={number1} />,
            <Decimal field={number1} />,
          ],
          [
            <Integer field={number2} />,
            <Integer field={number2} />,
            <Integer field={number2} />,
          ],
        ]}
      />
    </Content>
  );
}
