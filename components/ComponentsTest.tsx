import { Provider, useFields } from "@/state";
import * as s from "common/schema";
import { Prose } from ".";
import {
  Button,
  Choice,
  Decimal,
  DisableInputs,
  FieldGroup,
  Integer,
  Select,
  SelectChoices,
  Text,
  TextArea,
  Toggle,
} from "./inputs";
import { Column, Content, Page } from "./layout";
import M from "./M";
import Matrix from "./Matrix";

export default function ComponentsTest() {
  return (
    <Page title="Test Page">
      <main>
        <Provider schema={TestSchema}>
          <Content>
            <h1 className="prose">Test Page</h1>
          </Content>

          <Typography />

          <Buttons />

          <TextInputs />

          <NumberInputs />

          <Selects />

          <Choices />

          <Toggles />

          <GroupedFields />

          <MatrixTest />

          <Content>
            <h1 className="prose">Disabled inputs</h1>
          </Content>

          <DisableInputs when={true}>
            <Buttons />

            <TextInputs />

            <NumberInputs />

            <Selects />

            <Choices />

            <Toggles />

            <GroupedFields />

            <MatrixTest />
          </DisableInputs>
        </Provider>
      </main>
    </Page>
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

        <h4>Lists</h4>

        <p>{lipsum}</p>

        <ol>
          <li>Mauris ut justo justo.</li>
          <li>
            Integer lacinia nisi nec nisi vehicula tempor. Etiam ac ligula a
            odio dapibus cursus in at felis.{" "}
          </li>
          <li>Aliquam non lobortis lectus.</li>
        </ol>

        <p>{lipsum}</p>

        <ul>
          <li>Mauris ut justo justo.</li>
          <li>
            Integer lacinia nisi nec nisi vehicula tempor. Etiam ac ligula a
            odio dapibus cursus in at felis.{" "}
          </li>
          <li>Aliquam non lobortis lectus.</li>
        </ul>

        <p>{lipsum}</p>
      </Prose>
    </Content>
  );
}

function Buttons() {
  return (
    <Content as="section" columns>
      <Column>
        <Button block>Primary Button</Button>
        <br />
        <Button kind="secondary">Secondary Button</Button>
      </Column>

      <Column>
        <Button block disabled>
          Primary Button
        </Button>
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
  const f = useFields(TestSchema);

  return (
    <Content as="section">
      <h2 className="prose">Text Inputs</h2>

      <Text field={f.text1} label={<Prose>Input question</Prose>} />

      <TextArea field={f.text2} label={<Prose>Textarea question</Prose>} />
    </Content>
  );
}

function NumberInputs() {
  const f = useFields(TestSchema);

  return (
    <Content as="section">
      <h2 className="prose">Number Inputs</h2>

      <Decimal
        field={f.number1}
        placeholder="Decimal"
        label={<Prose>Decimal input question</Prose>}
      />

      <Integer
        field={f.number2}
        placeholder="Integer"
        label={<Prose>Integer input question</Prose>}
      />
    </Content>
  );
}

const selectChoices: SelectChoices<TestSchema["select"]> = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2 blah" },
  { value: "opt3", label: "Option 3" },
];

function Selects() {
  const f = useFields(TestSchema);

  return (
    <Content as="section">
      <h2 className="prose">Selects</h2>

      <Select field={f.select} choices={selectChoices} label="A question?" />
      <Select
        field={f.selectNoOther}
        choices={selectChoices}
        allowOther={false}
        label={<Prose>Another question?</Prose>}
      />
      <Select
        field={f.selectMulti}
        choices={selectChoices}
        label={<Prose>Yet another question?</Prose>}
      />
    </Content>
  );
}

function Choices() {
  const f = useFields(TestSchema);

  return (
    <Content as="section">
      <h2 className="prose">Choices</h2>

      <Choice field={f.select} choices={selectChoices} label="A question?" />
      <Choice
        field={f.selectNoOther}
        choices={selectChoices}
        allowOther={false}
        label={<Prose>Another question?</Prose>}
      />
      <Choice
        field={f.selectMulti}
        choices={selectChoices}
        label={<Prose>A third question?</Prose>}
      />
    </Content>
  );
}

function Toggles() {
  const f = useFields(TestSchema);

  return (
    <Content as="section">
      <h2 className="prose">Toggles</h2>

      <Toggle
        field={f.selectNoOther}
        choices={selectChoices}
        label={<Prose></Prose>}
      />

      <Toggle
        field={f.selectNoOther}
        choices={selectChoices}
        vertical
        label={<Prose></Prose>}
      />

      <Toggle field={f.bool} label={<Prose></Prose>} />

      <Toggle
        label={<Prose>This is a question</Prose>}
        field={f.bool}
        yes="Definitely"
        no="No way"
      />
    </Content>
  );
}

function GroupedFields() {
  const f = useFields(TestSchema);

  return (
    <Content as="section">
      <h2 className="prose">Grouped Fields</h2>

      <FieldGroup grid>
        <Select
          field={f.select}
          choices={selectChoices}
          label={<div>A question:</div>}
        />

        <Toggle
          label="Another question:"
          field={f.bool}
          yes="Definitely"
          no="No way"
        />

        <Choice
          field={f.select}
          choices={selectChoices}
          label="Grouped choices:"
        />

        <Text field={f.text1} label="Input question:" />

        <TextArea field={f.text2} label="Textarea question:" />

        <Decimal field={f.number1} label="Decimal input question:" />

        <Integer field={f.number2} label="Integer input question:" />

        <Select field={f.select} choices={selectChoices} />

        <Toggle field={f.bool} yes="Definitely" no="No way" />

        <Choice field={f.select} choices={selectChoices} />

        <Text field={f.text1} />

        <TextArea field={f.text2} />

        <Decimal field={f.number1} />

        <Integer field={f.number2} />

        <Button>Click me!</Button>
      </FieldGroup>
    </Content>
  );
}

function MatrixTest() {
  const f = useFields(TestSchema);

  return (
    <Content as="section">
      <h2 className="prose">Matrices</h2>

      <h3 className="prose">Column Vector</h3>

      <Matrix
        labelTex="\ket{\psi}"
        column={[
          <Select field={f.select} choices={selectChoices} />,
          <Decimal field={f.number1} />,
          <Integer field={f.number2} />,
        ]}
      />

      <h3 className="prose">Row Vector</h3>

      <Matrix
        labelTex="\bra{\psi}"
        row={[
          <Select field={f.select} choices={selectChoices} />,
          <Decimal field={f.number1} />,
          <Integer field={f.number2} />,
        ]}
      />

      <h3 className="prose">Matrix</h3>

      <Matrix
        labelTex="\hat{S}"
        matrix={[
          [
            <Select field={f.select} choices={selectChoices} />,
            <Select field={f.select} choices={selectChoices} />,
            <Select field={f.select} choices={selectChoices} />,
          ],
          [
            <Decimal field={f.number1} />,
            <Decimal field={f.number1} />,
            <Decimal field={f.number1} />,
          ],
          [
            <Integer field={f.number2} />,
            <Integer field={f.number2} />,
            <Integer field={f.number2} />,
          ],
        ]}
      />
    </Content>
  );
}
