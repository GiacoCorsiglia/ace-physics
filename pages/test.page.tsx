import {
  Agree,
  Button,
  ChooseControl,
  Content,
  ControlGroup,
  Disagree,
  Hint,
  Horizontal,
  Info,
  InputControl,
  M,
  Matrix,
  Prose,
  Reminder,
  TextAreaControl,
  ToggleControl,
  Vertical,
} from "@/components";
import { DropdownControl } from "@/components/controls/dropdown";
import { LabelsRight } from "@/components/controls/labels";
import { ArrowDownIcon } from "@primer/octicons-react";
import React, { useState } from "react";

export default function TestPage() {
  const [selected, setSelected] = useState<"a" | "b">();
  const [selected2, setSelected2] = useState<
    "a" | "b" | "c" | "d" | "e" | "f" | "g"
  >();
  const [decimal, setDecimal] = useState<number>();
  const [string, setString] = useState("");

  return (
    <Vertical>
      <Content>
        <Vertical>
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
            selected={selected2}
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
            selected={selected2}
            onChange={setSelected2}
            disabled
          />

          <ControlGroup>
            <ControlGroup.Text>Test = </ControlGroup.Text>

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
              selected={selected2}
              onChange={setSelected2}
            />
          </ControlGroup>
        </Vertical>
      </Content>

      <Content>
        <Vertical>
          <LabelsRight>
            <ToggleControl
              label={<Prose>What is the answer?</Prose>}
              choices={
                [
                  ["a", "Choice A"],
                  ["b", "Choice B"],
                ] as const
              }
              selected={selected}
              onSelect={setSelected}
              onDeselect={() => {}}
            />

            <TextAreaControl
              label={<Prose>Explain your thoughts.</Prose>}
              value={string}
              onChange={setString}
            />
          </LabelsRight>
        </Vertical>
      </Content>

      <Content>
        <Vertical>
          <InputControl placeholder="Placeholder" />

          <InputControl placeholder="Placeholder" disabled />

          <ControlGroup>
            <ControlGroup.Text>
              <M t="a = " />
            </ControlGroup.Text>

            <InputControl placeholder="Coefficient" />

            <ControlGroup.Text>
              <M t="b =" />
            </ControlGroup.Text>

            <InputControl placeholder="Coefficient" />

            <Button color="green">Submit</Button>
          </ControlGroup>

          <ChooseControl
            multi={false}
            choices={
              [
                ["a", "Choice A"],
                ["b", "Choice B"],
              ] as const
            }
            selected={selected}
            onSelect={setSelected}
            onDeselect={() => {}}
            other={false}
          />

          <ChooseControl
            multi={false}
            choices={
              [
                ["a", "Choice A"],
                ["b", "Choice B"],
              ] as const
            }
            selected={selected}
            onSelect={setSelected}
            onDeselect={() => {}}
            other={false}
            disabled
          />

          <Horizontal>
            <Button color="green" iconRight={<ArrowDownIcon />}>
              Let’s get going
            </Button>
            <Button color="blue">Log out</Button>
            <Button color="yellow">Hmm…</Button>
          </Horizontal>
        </Vertical>
      </Content>

      <Content>
        <Vertical>
          <Prose>This is some prose.</Prose>

          <Matrix column={[<div>One</div>, <div>Two</div>]} />

          <Prose>This is some more prose.</Prose>

          <Reminder>
            <Prose>This is a reminder.</Prose>
          </Reminder>

          <Info>
            <Prose>This is some info.</Prose>
          </Info>

          <Hint>
            <Prose>This is a hint.</Prose>
          </Hint>

          <Agree>
            <Prose>This is correct!</Prose>
          </Agree>

          <Disagree>
            <Prose>This is incorrect.</Prose>
          </Disagree>

          <Button color="green" iconRight={<ArrowDownIcon />}>
            Let’s get going
          </Button>
        </Vertical>
      </Content>

      <Content>
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
      </Content>

      <Content>
        <Vertical>
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
            selected={selected2}
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
            selected={selected2}
            onChange={setSelected2}
            disabled
          />
        </Vertical>
      </Content>
    </Vertical>
  );
}
