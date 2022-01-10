import {
  Callout,
  ChooseOne,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { Html } from "@/helpers/client";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "backToSpins",
  label: "Bonus: Back to Spins — If You Have Time",
  answers: "none",
  sections: [
    section({
      name: "backToSpinsIntro",
      body: (
        <Prose>
          <p>
            Let’s leave the world of Quantum Mice and return to discussing
            spins.
          </p>

          <p>
            We often write
            <M display t="\hat{S_z}\ket{+} = \frac{\hbar}{2} \ket{+}" />
            which we might describe in words by saying:
          </p>

          <blockquote>
            Acting the <M t="S_z" /> operator on <M t="\ket{+}" /> gives{" "}
            <M t="\hbar/2" /> times <M t="\ket{+}" />.
          </blockquote>

          <p>Let’s think about what this means.</p>
        </Prose>
      ),
    }),

    section({
      name: "interpretSzEigenequation",
      body: (m) => (
        <>
          <Prose>
            Briefly—in both technical and ordinary/colloquial language—how do
            you interpret each of the individual terms and symbols that appear
            in the equation <M t="\hat{S_z}\ket{+} = \hbar/2 \ket{+}" />?
          </Prose>

          <LabelsLeft>
            <TextBox
              model={m.interpretSz}
              label={<M t="\hat{S_z} \rightarrow" />}
              placeholder="Type your interpretation here"
            />

            <TextBox
              model={m.interpretPlusZ}
              label={<M t="\hbar/2 \rightarrow" />}
              placeholder="Type your interpretation here"
            />

            <TextBox
              model={m.interpretHBarOver2}
              label={<M t="\ket{+} \rightarrow" />}
              placeholder="Type your interpretation here"
            />
          </LabelsLeft>
        </>
      ),
    }),

    section({
      name: "SzTimesArbitraryKetKindOfObject",
      body: (m) => (
        <ChooseOne
          model={m.SzTimesArbitraryKetKindOfObject}
          label={
            <Prose>
              <p>
                Now suppose we act <M t="S_z" /> on the state
                <M t="\ket{\psi} = a\ket{+} + b\ket{-}" />
              </p>
              <p>
                What <em>kind of object</em> is <M t="S_z \ket{\psi}" />?
              </p>
            </Prose>
          }
          choices={kindOfObjectChoices(<M t="S_z \ket{\psi}" />, "is")}
        />
      ),
    }),

    section({
      name: "SzTimesPlusX",
      body: () => (
        <>
          <Prose>
            <p>
              For now, let’s pick a very particular
              <M t="\ket{\psi} = \ket{+}_x" />.
            </p>
          </Prose>

          <Callout color="blue">
            <p>
              <PencilIcon /> <strong>On scrap paper:</strong>
            </p>

            <ol>
              <li>
                Rewrite <M t="\ket{+}_x" /> as a column vector in the{" "}
                <M t="\hat{S_z}" /> basis.
              </li>

              <li>
                Act <M t="S_z" /> on it (do you remember how to write{" "}
                <M t="S_z" /> as a 2x2 matrix?)
              </li>

              <li>See what you get! </li>
            </ol>
          </Callout>
        </>
      ),
      continue: { label: "I worked it out on scrap paper" },
    }),

    section({
      name: "SzTimesPlusXIsKindOfObject",
      body: (m) => (
        <ChooseOne
          model={m.SzTimesPlusXKindOfObject}
          label={<Prose>What kind of object did you get?</Prose>}
          choices={kindOfObjectChoices(
            <>
              Acting <M t="\hat{S_z}" /> on <M t="\ket{+}_x" />
            </>,
            "gives"
          )}
        />
      ),
    }),

    section({
      name: "SzTimesPlusXIsNormalized",
      body: (m) => (
        <Toggle
          model={m.SzTimesPlusXIsNormalized}
          label={
            <Prose>
              Is the result of acting <M t="\hat{S_z}" /> on <M t="\ket{+}_x" />{" "}
              normalized?
            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
          ]}
        />
      ),
    }),
  ],
}));

const kindOfObjectChoices = (object: Html, verb: string) =>
  [
    [
      "bra",
      <>
        {object} {verb} a <b>bra</b>
      </>,
    ],
    [
      "ket",
      <>
        {object} {verb} a <b>ket</b>
      </>,
    ],
    [
      "operator",
      <>
        {object} {verb} an <b>operator</b>
      </>,
    ],
    [
      "number",
      <>
        {object} {verb} a <b>number</b>
      </>,
    ],
  ] as const;
