import { Help, Info, Prose, Reminder, Vocabulary } from "@/design";
import { ChooseOne, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { Axes, Curve, Plot, Tick } from "@/plots";
import { page } from "@/tutorial";
import { sequence } from "@/tutorial/config";
import React from "react";
import setup from "./setup";

const psiA = (x: number) =>
  (1 / Math.sqrt(3)) * Math.sin(x) +
  (1 / Math.sqrt(2)) * Math.sin(2 * x) +
  (1 / Math.sqrt(6)) * Math.sin(4 * x);

export default page(setup, ({ section, hint, oneOf }) => ({
  name: "positionRepresentationA",
  label: {
    html: (
      <>
        Representing <M t="\ket{\psi_A}" /> in the Position Basis
      </>
    ),
    title: "Representing A in the Position Basis",
  },
  answers: "checked-some",
  sections: [
    section({
      name: "positionRepresentationAIntro",
      body: (
        <>
          <Reminder>
            <M
              display
              t="
              \ket{\psi_A}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              + \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
            />
          </Reminder>

          <Prose>
            A <em>different representation</em> of our original starting state
            <M t="\ket{\psi_A}" /> is given here. This is called the “position
            representation” or the “wave function representation.”
          </Prose>

          <Plot
            width={360}
            height={320}
            scale={[360 / (Math.PI + 0.3), 320 / 3.2]}
            origin={[0.1, "center"]}
          >
            <Axes xLabel="x" yLabel="\psi_A(x)" />

            <Tick x={Math.PI} length={20} />

            <Curve f={psiA} from={0} to={Math.PI} />
          </Plot>
        </>
      ),
      hints: [
        hint({
          name: "positionRepresentationAIntro",
          label: "Wait…what?",
          body: (
            <Prose>
              <p>
                Any quantum state describing a particle that has a position can
                be represented as a function like this. For right now, you don’t
                need to worry about how we converted between the energy
                representation and the position representation.
              </p>

              <p>
                On this page, we’re going to explore what this graph is telling
                us.
              </p>
            </Prose>
          ),
        }),
      ],
      continue: { label: "OK, let’s explore" },
    }),

    section({
      name: "infoFromGraph",
      body: (m) => (
        <>
          <TextArea
            model={m.infoFromGraph}
            label={
              <Prose>
                What information can you readily infer about this state from the
                graph? (What does the graph tell you about the particle?)
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "probDensA",
      body: (m) => (
        <>
          <Prose>
            <p>
              Given any wave function <M t="\psi(x)" />, we define the{" "}
              <Vocabulary>probability density</Vocabulary> to be
              <M t="|\psi(x)|^2" />.
            </p>

            <p>
              <strong>
                Very roughly sketch the probability density associated with{" "}
                <M t="\psi_A(x)" />.
              </strong>
            </p>

            <p>
              <em>If you’re working with others in Zoom:</em> Someone in your
              group should share their screen. Then,{" "}
              <strong>use Zoom’s “annotate” feature to sketch</strong>.
            </p>

            <p>
              <em>Otherwise:</em> <strong>Sketch on paper</strong> (start by
              copying these axes).
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
              yLabel="|\psi_A(x)|^2,\,{\color{#999} \psi_A(x)}"
            />

            <Tick x={Math.PI} length={20} />

            <Curve f={psiA} stroke={"#ddd"} from={0} to={Math.PI} dotted />
          </Plot>

          <Prose>
            <p>
              <strong>Indicate on your graph</strong> where a particle described
              by <M t="\psi_A(x)" /> would be MOST likely to be found if you
              measured its position, and where it is LEAST likely to be found.
            </p>

            <p>
              <strong>Take a screenshot</strong> of your graph before you move
              on.
            </p>
          </Prose>
        </>
      ),
      continue: { label: "I’m done sketching" },
    }),

    /*We might just have to do something where we give them the probability
  density (click a button to probability density) and then just isolate regions
  and ask them where it is most likely and least likely. I don’t think there is
  any way to get them to graph or that it would be worth it to do that. Two drop
  down menus with each */

    section({
      name: "interpretProbDens",
      body: (m) => (
        <>
          <Prose>
            <p>
              Some students are discussing their thoughts about the question{" "}
              <em>
                “what is the probability that a measurement of position on a
                particle in state
                <M t="\ket{\psi_A}" /> will result in a value within{" "}
                <M t="dx" /> of
                <M t="x_0" />
                ?”
              </em>
            </p>

            <blockquote>
              <strong>Student A:</strong> Isn’t that exactly what{" "}
              <M t="\psi(x_0)" /> tells you?
            </blockquote>

            <blockquote>
              <strong>Student B:</strong> No, I think the probability is{" "}
              <M t="|\psi_A(x_0)|^2" />
            </blockquote>

            <blockquote>
              <strong>Student C:</strong> I feel like we need to include{" "}
              <M t="dx" /> somehow. Isn’t the answer the area under the wave
              function?
            </blockquote>
          </Prose>

          <TextArea
            model={m.studentInterpretationsProbDens}
            label={<Prose>What do you think about these responses? </Prose>}
          />

          <TextArea
            model={m.correctInterpretationProbDens}
            label={<Prose> Can you help firm up a fully correct answer?</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "psiAExpVal",
      body: (m) => (
        <>
          <Toggle
            model={m.psiAExpVal}
            label={
              <Prose>
                Where do you think the expectation value of position for state{" "}
                <M t="\psi_A(x)" /> will be?
              </Prose>
            }
            choices={[
              ["left", "Left of center"],
              ["center", "At the center"],
              ["right", "Right of center"],
            ]}
          />

          <TextArea model={m.psiAExpValExplain} label={<Prose>Why?</Prose>} />
        </>
      ),
    }),
    /*Choices. Hint The expectation value in discrete cases is EQUATION. How can
  we apply that in wave function notation */

    section({
      name: "psiAPosEigenstate",
      body: (m) => (
        <>
          <Toggle
            model={m.psiAPosEigenstate}
            label={
              <Prose>
                Is a particle described by <M t="\psi_A(x)" /> in an eigenstate
                of position?
              </Prose>
            }
            choices={[
              ["position eigenstate", "Yes, it is"],
              ["not position eigenstate", "No, it isn’t"],
            ]}
          />

          <TextArea
            model={m.psiAPosEigenstateExplain}
            label={<Prose>Why or why not?</Prose>}
          />
        </>
      ),
    }),

    oneOf({
      which: (r) => {
        if (!r.psiAPosEigenstate) {
          return null;
        }
        return r.psiAPosEigenstate.selected === "not position eigenstate"
          ? "correct"
          : "incorrect";
      },
      sections: {
        incorrect: sequence({
          sections: [
            section({
              name: "whatDoesAPosEigenstateLookLike",
              body: (m) => (
                <ChooseOne
                  model={m.whatDoesAPosEigenstateLookLike}
                  label={
                    <Prose>
                      <p>
                        An eigenstate of position describes a particle that has
                        100% probability of being measured at exactly one
                        position (one value of <M t="x" />
                        ).
                      </p>

                      <p>What does an eigenstate of position look like?</p>
                    </Prose>
                  }
                  choices={[
                    [
                      "any f(x)",
                      <>
                        Any state written in the position basis (i.e., any state
                        written as a function of <M t="x" />
                        ).
                      </>,
                    ],
                    [
                      "bump",
                      <>
                        A function with a max at a specific <M t="x" /> value.
                      </>,
                    ],
                    [
                      "delta function",
                      <>
                        A function that spikes (delta function) at exactly one
                        value of <M t="x" />, and is zero everywhere else.
                      </>,
                    ],
                  ]}
                  allowOther={false}
                />
              ),
            }),

            oneOf({
              which: (r) => {
                const selected = r.whatDoesAPosEigenstateLookLike?.selected;
                if (selected === undefined) {
                  return null;
                }
                return selected === "delta function" ? "agree" : "disagree";
              },
              sections: {
                agree: section({
                  name: "whatDoesAPosEigenstateLookLikeCorrect",
                  body: (
                    <Help>
                      <Prose>
                        Agreed! An eigenstate of position is a delta function
                        when written in the position basis. Therefore{" "}
                        <M t="\ket{\psi_A}" /> is <strong>not</strong> an
                        eigenstate of position (because <M t="\psi_A(x)" /> is
                        not a delta function).
                      </Prose>
                    </Help>
                  ),
                }),

                disagree: section({
                  name: "whatDoesAPosEigenstateLookLikeIncorrect",
                  body: (
                    <Info>
                      <Prose>
                        <p>
                          An eigenstate of position is a delta function when
                          written in the position basis (i.e., as a function of{" "}
                          <M t="x" />
                          ).
                        </p>

                        <p>
                          Therefore <M t="\ket{\psi_A}" /> is{" "}
                          <strong>not</strong> an eigenstate of position
                          (because <M t="\psi_A(x)" /> is not a delta function).
                          A particle in state <M t="\ket{\psi_A}" /> could be
                          measured to be at multiple different positions.
                        </p>
                      </Prose>
                    </Info>
                  ),
                }),
              },
            }),
          ],
        }),

        correct: section({
          name: "psiAPosEigenstateCorrect",
          body: (
            <Help>
              <Prose>
                <p>
                  We agree! <M t="\psi_A(x)" /> is <strong>not</strong> an
                  eigenstate of position, because it describes a particle{" "}
                  <em>without</em> a definite position. A particle in state{" "}
                  <M t="\ket{\psi_A}" /> could be measured to be at multiple
                  different positions.
                </p>
              </Prose>
            </Help>
          ),
        }),
      },
    }),
  ],
}));
