import { Help, Info, Prose, Reminder } from "@/design";
import { TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { Axes, Curve, Plot, Tick } from "@/plots";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

const psiB = (x: number) =>
  (1 / Math.sqrt(3)) * Math.sin(x) -
  (1 / Math.sqrt(2)) * Math.sin(2 * x) +
  (1 / Math.sqrt(6)) * Math.sin(4 * x);

export default page(setup, ({ section, hint, oneOf }) => ({
  name: "positionRepresentationB",
  label: {
    html: (
      <>
        Representing <M t="\ket{\psi_B}" /> in the Position Basis
      </>
    ),
    title: "Representing B in the Position Basis",
  },
  answers: "none",
  sections: [
    section({
      name: "positionRepresentationBIntro",
      body: (
        <>
          <Reminder>
            <M
              display
              t="
              \ket{\psi_B}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              - \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
            />
          </Reminder>

          <Prose>
            The position representation (or wave function) of the state
            <M t="\ket{\psi_B}" /> from page 2 is given here:
          </Prose>

          <Plot
            width={360}
            height={320}
            scale={[360 / (Math.PI + 0.3), 320 / 3.2]}
            origin={[0.1, "center"]}
          >
            <Axes xLabel="x" yLabel="\psi_B(x)" />

            <Tick x={Math.PI} length={20} />

            <Curve f={psiB} from={0} to={Math.PI} />
          </Plot>
        </>
      ),
      continue: { label: "Looks Good" },
    }),

    section({
      name: "probDensB",
      body: (m) => (
        <>
          <Prose>
            <p>
              <strong>
                Very roughly sketch the probability density associated with{" "}
                <M t="\psi_B(x)" />.
              </strong>
            </p>

            <p>
              Like before: if you’re working with others in Zoom, use Zoom’s
              “annotate” feature, otherwise sketch on paper.
            </p>
          </Prose>

          <Plot
            width={360}
            height={320}
            scale={[360 / (Math.PI + 0.3), 320 / 5]}
            origin={[0.1, "center"]}
          >
            <Axes
              xLabel="x"
              yLabel="|\psi_B(x)|^2,\,{\color{#999} \psi_B(x)}"
            />

            <Tick x={Math.PI} length={20} />

            <Curve f={psiB} stroke={"#ddd"} from={0} to={Math.PI} dotted />
          </Plot>

          <Prose>
            <p>
              <strong>Indicate on your graph</strong> where a particle described
              by <M t="\psi_B(x)" /> would be MOST likely to be found if you
              measured its position, and where it is LEAST likely to be found.
            </p>

            <p>
              <strong>Take a screenshot</strong> of your graph before you move
              on.
            </p>
          </Prose>
        </>
      ),
    }),

    section({
      name: "compareGraphs",
      body: (m) => (
        <>
          <TextArea
            model={m.compareGraphs}
            label={
              <Prose>
                Compare your graph, and the positions where the particle is most
                and least likely to be found, with what you got for{" "}
                <M t="\psi_A(x)" />. (I.e., compare your two screenshots). What
                is different now?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "psiBExpVal",
      body: (m) => (
        <>
          <Toggle
            model={m.psiBExpVal}
            label={
              <Prose>
                Where do you think the expectation value of position for state{" "}
                <M t="\psi_B(x)" /> will be?
              </Prose>
            }
            choices={[
              ["left", "Left of center"],
              ["center", "At the center"],
              ["right", "Right of center"],
            ]}
          />

          <TextArea model={m.psiBExpValExplain} label={<Prose>Why?</Prose>} />
        </>
      ),
    }),

    section({
      name: "psiBDifferentFromPsiAReflect",
      body: (m, { responses }) => (
        <>
          <Prose>
            <p>
              Previously, we asked you if the second particle (in state{" "}
              <M t="\ket{\psi_B}" />) was in the SAME state as{" "}
              <M t="\ket{\psi_A}" />, or if was it in a DIFFERENT state.
            </p>

            {responses?.psiBDifferentFromPsiA?.selected !== undefined && (
              <>
                <p>You said:</p>

                <blockquote>
                  The second particle is in{" "}
                  {responses.psiBDifferentFromPsiA.selected === "same"
                    ? "the SAME state as"
                    : "a DIFFERENT state from"}{" "}
                  <M t="\ket{\psi_A}" />.
                </blockquote>
              </>
            )}

            {!!responses?.psiBDistinguishableFromPsiA && (
              <>
                <p>
                  We also asked if/how you could distinguish the two particles,
                  and you said:
                </p>

                <blockquote>
                  {responses.psiBDistinguishableFromPsiA
                    .split("\n")
                    .map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                </blockquote>
              </>
            )}
          </Prose>

          <Toggle
            model={m.psiBDifferentFromPsiAModified}
            label={
              <Prose>Are your answers modified in any way at this point?</Prose>
            }
            choices={[
              ["modified", "Yes, my answers have changed"],
              ["unmodified", "No, my answers are the same"],
            ]}
          />

          <TextArea
            model={m.psiBDifferentFromPsiAReflect}
            label={<Prose>Explain:</Prose>}
          />
        </>
      ),
    }),

    oneOf({
      which: (r) => {
        const originalAnswer = r.psiBDifferentFromPsiA?.selected;
        const modifiedAnswer = r.psiBDifferentFromPsiAModified?.selected;
        if (originalAnswer === undefined || modifiedAnswer === undefined) {
          // Nothing to compare against, so we can't do anything.
          return null;
        }

        const correctOriginally = originalAnswer === "different";
        const modified = modifiedAnswer === "modified";
        const correctNow =
          (correctOriginally && !modified) || (!correctOriginally && modified);

        return correctNow
          ? "psiBDifferentFromPsiAModifiedCorrect"
          : "psiBDifferentFromPsiAModifiedIncorrect";
      },
      sections: {
        psiBDifferentFromPsiAModifiedIncorrect: section({
          name: "psiBDifferentFromPsiAModifiedIncorrect",
          body: (
            <Info>
              <Prose>
                <p>We disagree.</p>

                <p>
                  <M t="\ket{\psi_A}" /> and <M t="\ket{\psi_B}" /> have
                  different wave function representations (i.e., the graph on
                  this page looks different from the graph on the previous
                  page). Therefore, they are different states.
                </p>
              </Prose>
            </Info>
          ),
        }),
        psiBDifferentFromPsiAModifiedCorrect: section({
          name: "psiBDifferentFromPsiAModifiedCorrect",
          body: (
            <Help>
              <Prose>
                <p>We agree.</p>

                <p>
                  <M t="\ket{\psi_A}" /> and <M t="\ket{\psi_B}" /> are
                  different states. One way to tell is to notice that their wave
                  function representations look different.
                </p>
              </Prose>
            </Help>
          ),
        }),
      },
    }),
  ],
}));
