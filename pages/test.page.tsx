import {
  Button,
  Callout,
  ChooseControl,
  ControlGroup,
  DisableControls,
  DropdownControl,
  Horizontal,
  InputControl,
  Justify,
  M,
  Matrix,
  NumericInputControl,
  Prose,
  QuantumCircuit,
  SectionBox,
  Table,
  TextBoxControl,
  TextInputControl,
  ToggleControl,
  Vertical,
} from "@/components";
import { AlertIcon, ArrowDownIcon } from "@primer/octicons-react";
import { useState } from "react";

export default function TestPage() {
  const [selected, setSelected] = useState<"a" | "b">();
  const [selected2, setSelected2] = useState<
    "a" | "b" | "c" | "d" | "e" | "f" | "g"
  >();
  const [decimal, setDecimal] = useState<number>();
  const [string, setString] = useState<string>();

  const choices = [
    ["a", "Choice A"],
    ["b", "Choice B"],
  ] as const;
  const choices2 = [
    ["a", <M t="\ket{+}" />],
    ["b", "Choice B"],
    ["c", "Choice C"],
    ["d", "Choice D"],
    ["e", "Choice E"],
    ["f", "Choice F"],
    ["g", "Choice G"],
  ] as const;

  const [disabled, setDisabled] = useState(false);

  return (
    <Vertical space={300}>
      <QuantumCircuitTest />

      <LatexTest />

      <SectionBox>
        <Button color="green" onClick={() => setDisabled((d) => !d)}>
          {disabled ? "Enable" : "Disable"} Controls
        </Button>

        <DisableControls when={disabled}>
          <InputControl
            placeholder="Placeholder"
            label={<Prose>Input:</Prose>}
          />

          <TextInputControl
            label={<Prose>Text Input:</Prose>}
            value={string}
            onChange={setString}
          />

          <TextBoxControl
            label={<Prose>Text Box:</Prose>}
            value={string}
            onChange={setString}
          />

          <ToggleControl
            label={<Prose>Toggle:</Prose>}
            choices={choices}
            value={selected}
            onChange={setSelected}
          />

          <DropdownControl
            choices={choices2}
            value={selected2}
            onChange={setSelected2}
            label={<Prose>Dropdown:</Prose>}
          />

          <Prose>Control Group:</Prose>

          <ControlGroup>
            <NumericInputControl
              type="decimal"
              value={decimal}
              onChange={setDecimal}
              label={<M t="a = " />}
            />

            <DropdownControl
              choices={choices2}
              value={selected2}
              onChange={setSelected2}
              label={<M t="b =" />}
            />

            <Button color="green">Submit</Button>
          </ControlGroup>

          <ChooseControl
            multi={false}
            label={<Prose>Choice:</Prose>}
            choices={choices}
            value={selected}
            onChange={setSelected}
            other={{
              value: string,
              onChange: (v) => setString(v),
              inputType: "text-box",
            }}
          />

          <Horizontal justify="stretch">
            <Button color="green" iconRight={<ArrowDownIcon />}>
              Let’s get going
            </Button>
            <Button color="blue">Log out</Button>
            <Button color="yellow">Hmm…</Button>
          </Horizontal>
        </DisableControls>

        <ControlGroup>
          <NumericInputControl
            type="decimal"
            value={decimal}
            onChange={setDecimal}
          />
          <ControlGroup.Text>%</ControlGroup.Text>
        </ControlGroup>
      </SectionBox>

      <SectionBox>
        <Table columns={[0.5, 1, 1.5, 1]}>
          <thead>
            <tr>
              <td>Col 1</td>
              <td>Col 2</td>
              <td>Col 3</td>
              <td>Col 4</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>Row</th>
              <td>
                <ControlGroup>
                  <NumericInputControl
                    type="decimal"
                    value={decimal}
                    onChange={setDecimal}
                  />
                  <ControlGroup.Text>%</ControlGroup.Text>
                </ControlGroup>
              </td>
              <td>
                <ToggleControl
                  choices={choices}
                  value={selected}
                  onChange={setSelected}
                />
              </td>
              <td>
                <DropdownControl
                  choices={choices2}
                  value={selected2}
                  onChange={setSelected2}
                />
              </td>
            </tr>
            <tr>
              <th>Row</th>
              <td>
                <NumericInputControl
                  type="decimal"
                  value={decimal}
                  onChange={setDecimal}
                />
              </td>
              <td>
                <ToggleControl
                  choices={choices}
                  value={selected}
                  onChange={setSelected}
                />
              </td>
              <td>
                <DropdownControl
                  choices={choices2}
                  value={selected2}
                  onChange={setSelected2}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <Justify end>
          <Button
            color="green"
            disabled
            disabledExplanation="Please respond to every question before moving on"
          >
            Move on
          </Button>
        </Justify>
      </SectionBox>

      <SectionBox>
        <Prose>This is some prose.</Prose>

        <Matrix column={[<div>One</div>, <div>Two</div>]} />

        <Prose>This is some more prose.</Prose>

        <Callout color="neutral" title="Reminder">
          <Prose>This is a reminder.</Prose>
        </Callout>

        <Callout
          color="blue"
          title="Heads up"
          iconLeft={<AlertIcon size="large" />}
        >
          <Prose>This is some info.</Prose>
        </Callout>

        <Callout color="yellow">
          <Prose>This is a hint.</Prose>
        </Callout>

        <Callout color="green">
          <Prose>This is correct!</Prose>
        </Callout>

        <Callout color="red">
          <Prose>This is incorrect.</Prose>
        </Callout>

        <Button color="green" iconRight={<ArrowDownIcon />}>
          Let’s get going
        </Button>
      </SectionBox>

      <SectionBox>
        <Prose size="ui" style={{ maxWidth: "20rem" }}>
          <strong>Text UI:</strong> Light from a service hatch at the rear of
          the arcade showed him broken lengths of damp chipboard and the robot
          gardener. Before they could stampede, take flight from the Chinese
          program’s thrust.
        </Prose>

        <Prose size="ui-small" style={{ maxWidth: "15rem" }}>
          <strong>Text UI Small:</strong> Light from a service hatch at the rear
          of the arcade showed him broken lengths of damp chipboard and the
          robot gardener. Before they could stampede, take flight from the
          Chinese program’s thrust.
        </Prose>
      </SectionBox>

      <SectionBox>
        <Prose>
          <h1>Heading 1</h1>

          <p>
            Light from a service hatch at the rear of the arcade showed him
            broken lengths of damp chipboard and the robot gardener. Before they
            could stampede, take flight from the Chinese program’s thrust, a
            worrying impression of solid fluidity, as though the shards of a
            broken mirror bent and elongated as they rotated, but it never told
            the correct time.
          </p>

          <p>
            After the postoperative check at the rear of the arcade showed him
            broken lengths of damp chipboard and the dripping chassis of a
            gutted game console. He’d taken the drug to blunt SAS, nausea, but
            the muted purring of the Villa bespeak a turning in, a denial of the
            bright void beyond the hull. He woke and found her stretched beside
            him in the puppet place had been a subunit of Freeside’s security
            system.
          </p>

          <p>
            This is <strong>bold</strong> and this is <em>italicized</em>. Here
            is some inline math <M t="P = 16 - x^2" /> to go along with this
            sentence, and here is <M t="xyz-" />
            some more.
          </p>

          <h2>Heading 2</h2>

          <p>
            Light from a service hatch at the rear of the arcade showed him
            broken lengths of damp chipboard and the robot gardener. Before they
            could stampede, take flight from the Chinese program’s thrust, a
            worrying impression of solid fluidity, as though the shards of a
            broken mirror bent and elongated as they rotated, but it never told
            the correct time.
          </p>

          <h3>Heading 3</h3>

          <p>
            Light from a service hatch at the rear of the arcade showed him
            broken lengths of damp chipboard and the robot gardener. Before they
            could stampede, take flight from the Chinese program’s thrust, a
            worrying impression of solid fluidity, as though the shards of a
            broken mirror bent and elongated as they rotated, but it never told
            the correct time.
          </p>

          <h4>Heading 4</h4>

          <p>
            Light from a service hatch at the rear of the arcade showed him
            broken lengths of damp chipboard and the robot gardener. Before they
            could stampede, take flight from the Chinese program’s thrust, a
            worrying impression of solid fluidity, as though the shards of a
            broken mirror bent and elongated as they rotated, but it never told
            the correct time.
          </p>

          <h5>Heading 5</h5>

          <p>
            Light from a service hatch at the rear of the arcade showed him
            broken lengths of damp chipboard and the robot gardener. Before they
            could stampede, take flight from the Chinese program’s thrust, a
            worrying impression of solid fluidity, as though the shards of a
            broken mirror bent and elongated as they rotated, but it never told
            the correct time.
          </p>

          <h6>Heading 6</h6>

          <p>
            Light from a service hatch at the rear of the arcade showed him
            broken lengths of damp chipboard and the robot gardener. Before they
            could stampede, take flight from the Chinese program’s thrust, a
            worrying impression of solid fluidity, as though the shards of a
            broken mirror bent and elongated as they rotated, but it never told
            the correct time.
          </p>

          <ul>
            <li>
              She put his pistol down, picked up her fletcher, dialed the barrel
              over to single shot, and very carefully put a toxin dart through
              the center of a junked console.
            </li>
            <li>Light from a service hatch at the rear</li>
            <li>
              Its hands were holograms that altered to match the convolutions of
              the blowers and the amplified breathing of the fighters.
            </li>
          </ul>

          <p>
            After the postoperative check at the rear of the arcade showed him
            broken lengths of damp chipboard and the dripping chassis of a
            gutted game console. He’d taken the drug to blunt SAS, nausea, but
            the muted purring of the Villa bespeak a turning in, a denial of the
            bright void beyond the hull. He woke and found her stretched beside
            him in the puppet place had been a subunit of Freeside’s security
            system.
          </p>

          <ol>
            <li>
              She put his pistol down, picked up her fletcher, dialed the barrel
              over to single shot, and very carefully put a toxin dart through
              the center of a junked console.
            </li>
            <li>Light from a service hatch at the rear</li>
            <li>
              Its hands were holograms that altered to match the convolutions of
              the blowers and the amplified breathing of the fighters.
            </li>
          </ol>

          <p>
            A narrow wedge of light from a half-open service hatch framed a heap
            of discarded fiber optics and the chassis of a heroin factory. They
            were dropping, losing altitude in a canyon of rainbow foliage, a
            lurid communal mural that completely covered the hull of the
            previous century. That was Wintermute, manipulating the lock the way
            it had manipulated the drone micro and the chassis of a gutted game
            console.
          </p>

          <blockquote>
            And no Person holding any Office of honor, Trust or Profit under the
            United States, and will to the best of my Ability, preserve, protect
            and defend the Constitution of the United States, except in Cases of
            Rebellion or Invasion the public Safety may require it. Neither
            shall any person be eligible to the public Acts, Records, and
            judicial Proceedings of every other State.
          </blockquote>

          <p>
            A narrow wedge of light from a half-open service hatch framed a heap
            of discarded fiber optics and the chassis of a heroin factory. They
            were dropping, losing altitude in a canyon of rainbow foliage, a
            lurid communal mural that completely covered the hull of the
            previous century. That was Wintermute, manipulating the lock the way
            it had manipulated the drone micro and the chassis of a gutted game
            console.
          </p>

          <M
            display
            t="\begin{pmatrix} \frac{\hbar}{2} & 0 \\[.2em] 0 & -\frac{\hbar}{2} \end{pmatrix}  \ket{+}  = +\frac{\hbar}{2}\ket{+}"
          />

          <p>
            A narrow wedge of light from a half-open service hatch framed a heap
            of discarded fiber optics and the chassis of a heroin factory. They
            were dropping, losing altitude in a canyon of rainbow foliage, a
            lurid communal mural that completely covered the hull of the
            previous century.
            <M
              display
              t="\begin{pmatrix} \frac{\hbar}{2} & 0 \\[.2em] 0 & -\frac{\hbar}{2} \end{pmatrix}  \ket{+}  = +\frac{\hbar}{2}\ket{+}"
            />
            That was Wintermute, manipulating the lock the way it had
            manipulated the drone micro and the chassis of a gutted game
            console.
          </p>
          <p>
            A narrow wedge of light from a half-open service hatch framed a heap
            of discarded fiber optics and the chassis of a heroin factory. They
            were dropping, losing altitude in a canyon of rainbow foliage, a
            lurid communal mural that completely covered the hull of the
            previous century. That was Wintermute, manipulating the lock the way
            it had manipulated the drone micro and the chassis of a gutted game
            console.
          </p>

          <p>
            <M
              display
              t="\begin{pmatrix} \frac{\hbar}{2} & 0 \\[.2em] 0 & -\frac{\hbar}{2} \end{pmatrix}  \ket{+}  = +\frac{\hbar}{2}\ket{+}"
            />
          </p>
        </Prose>
      </SectionBox>

      <SectionBox>
        <DropdownControl
          choices={
            [
              ["a", <M t="\ket{+}" />],
              ["b", "Choice B"],
              ["c", "Choice C"],
              ["d", "Choice D"],
              ["e", "Choice E"],
              ["f", "Choice F"],
              ["g", "Choice G"],
            ] as const
          }
          value={selected2}
          onChange={setSelected2}
        />

        <DropdownControl
          choices={
            [
              ["a", <M t="\ket{+}" />],
              ["b", "Choice B"],
              ["c", "Choice C"],
              ["d", "Choice D"],
              ["e", "Choice E"],
              ["f", "Choice F"],
              ["g", "Choice G"],
            ] as const
          }
          value={selected2}
          onChange={setSelected2}
          disabled
        />
      </SectionBox>
    </Vertical>
  );
}

const LatexTest = () => {
  const [tex, setTex] = useState("");
  const [isDisplay, setDisplay] = useState<boolean | undefined>(true);

  return (
    <SectionBox>
      <Prose>
        <h2>LaTeX Test</h2>
      </Prose>

      <ToggleControl
        value={isDisplay}
        onChange={setDisplay}
        choices={[
          [true, "Display mode"],
          [false, "Inline mode"],
        ]}
      />

      <TextBoxControl
        value={tex}
        onChange={setTex}
        label="LaTeX Code"
        style={{ fontFamily: "monospace", fontSize: 13 }}
      />

      <Prose>
        <p>Preview:</p>

        <p>
          <M display={isDisplay} t={tex} renderErrorOnDev />
        </p>
      </Prose>
    </SectionBox>
  );
};

const QuantumCircuitTest = () => {
  const [tex, setTex] = useState("");

  return (
    <SectionBox>
      <Prose>
        <h2>Quantum Circuit Test</h2>
      </Prose>

      <TextBoxControl
        value={tex}
        onChange={setTex}
        label="Quantum Circuit Code"
        style={{ fontFamily: "monospace", fontSize: 13 }}
      />

      <Prose>
        <p>Preview:</p>

        <p>
          <QuantumCircuit t={tex} />
        </p>
      </Prose>
    </SectionBox>
  );
};
