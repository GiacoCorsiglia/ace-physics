import { Help, Info, Prose, Reminder } from "@/design";
import { Column, Columns } from "@/design/layout";
import { approxEquals } from "@/helpers";
import { Decimal, Select, TextArea, Toggle } from "@/inputs";
import M, { Matrix } from "@/math";
import { modelToColumn } from "@/math/Matrix";
import { Axes, Plot, Tick, Vector } from "@/plots";
import { page } from "@/tutorial";
import React from "react";
import setup, { Responses } from "./setup";

export default page(setup, ({ section, oneOf, hint }) => ({
  name: "changingBasis",
  label: "TODO",
  answersChecked: "some",
  sections: [
    section({
      name: "changingBasisIntro",
      body: (
        <Prose>
          <p>We can represent vectors in any basis we want!</p>

          <p>
            Let’s shift to a new basis of <M t="\ket{v_1}" /> and{" "}
            <M t="\ket{v_2}" />, where
            <M
              display
              t="
                \ket{v_1} \doteq \begin{pmatrix} \sqrt{3}/2 \\ 1/2 \end{pmatrix}
                \text{ and }
                \ket{v_2} \doteq \begin{pmatrix} -1/2 \\ \sqrt{3}/2 \end{pmatrix}
                "
            />
            (You can check that these vectors are orthonormal if you'd like.)
          </p>
        </Prose>
      ),
      continue: { label: "Let’s do it" },
    }),

    section({
      name: "basisChangeApproach",
      body: (m) => (
        <TextArea
          model={m.basisChangeApproach}
          label={
            <Prose>
              <p>
                Let’s represent our vector{" "}
                <M t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}" />{" "}
                in this new basis.
              </p>

              <p>
                We want to write our vector in the form
                <M t="a\ket{v_1} + b\ket{v_2}" />.
              </p>

              <p>
                In the box below, explain how you might find <M t="a" /> and{" "}
                <M t="b" />. Don't calculate yet, just explain how you would.
                List all the methods you can think of!
              </p>
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "kColumnDirac",
      body: (m) => (
        <>
          <Prose>
            <p>
              Awesome, thanks for taking the time to think about that. Here’s
              one way you can do it. It’s usually the most efficient way, but
              there are other valid approaches too!
            </p>

            <p>
              Thinking back to the previous page, if we represent our ket as a
              column vector in the new basis, it will look like
              <M
                display
                t="a \ket{v_1} + b \ket{v_2} \doteq \begin{pmatrix} a \\ b \end{pmatrix}_v"
              />
            </p>

            <p>
              Now, express each element in Dirac notation. This is similar to
              what we did on the previous page, but remember we’re working in
              the new basis now.
            </p>
          </Prose>

          <Matrix
            className="margin-top"
            labelTex="\begin{pmatrix} a \\ b \end{pmatrix}_v ="
            subscriptTex="v"
            column={modelToColumn(m.kColumnDirac, (c) => (
              <Select
                model={c}
                choices={[
                  ["|v1>", <M t="\ket{v_1}" />],
                  ["|v2>", <M t="\ket{v_2}" />],
                  ["<v1|u>", <M t="\braket{v_1|u}" />],
                  ["<v2|u>", <M t="\braket{v_2|u}" />],
                  ["<i|u>", <M t="\braket{i|u}" />],
                  ["<j|u>", <M t="\braket{j|u}" />],
                ]}
                allowOther={false}
              />
            ))}
          />
        </>
      ),
      hints: [
        hint({
          name: "kColumnDirac",
          body: (
            <Prose>
              On the previous page, we could think of <M t="\braket{i|u}" /> as
              the <M t="\ket{i}" /> component. Can you describe the coefficient{" "}
              <M t="a" /> in similar terms?
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "columnSubscriptExplain",
      body: (m) => (
        <TextArea
          model={m.columnSubscriptExplain}
          label={<Prose>Why is there a subscript on the column vectors?</Prose>}
        />
      ),
      hints: [
        hint({
          name: "columnSubscriptExplain",
          body: (
            <Prose>
              We didn’t have subscripts on our column vectors on the previous
              page. What’s the big change we made on this page?
            </Prose>
          ),
        }),
      ],
      continue: { label: "Let’s check in" },
    }),

    oneOf({
      which: (r) => {
        const [v1_, v2_] = r.kColumnDirac || [];
        const v1 = v1_?.selected;
        const v2 = v2_?.selected;

        if (!v1 || !v2) {
          // Shouldn't get here...
          return null;
        }

        const v1Correct = v1 === "<v1|u>";
        const v2Correct = v2 === "<v2|u>";

        const v1Reversed = v1 === "<v2|u>";
        const v2Reversed = v2 === "<v1|u>";

        const v1iOrJ = v1 === "<i|u>" || v1 === "<j|u>";
        const v2iOrJ = v2 === "<i|u>" || v2 === "<j|u>";

        const v1Ket = v1 === "|v1>" || v1 === "|v2>";
        const v2Ket = v2 === "|v1>" || v2 === "|v2>";

        // There are 6*6 = 36 total options

        if (v1Ket || v2Ket) {
          // (20) Really wrong.
          return "kColumnDiracKet";
        } else if (v1Correct && v2Correct) {
          // (1) Totally correct.
          return "kColumnDiracCorrect";
        } else if (v1Reversed && v2Reversed) {
          // (1) Just reversed.
          return "kColumnDiracReversed";
        } else if ((v1Correct && v2Reversed) || (v1Reversed && v2Correct)) {
          // (2) Duplicated correct answer.
          return "kColumnDiracRepeated";
        } else if (v1iOrJ || v2iOrJ) {
          // (12) Wrong basis (or guessing).
          return "kColumnDiracIorJ";
        }
        // This should be all the possibilities.
        return null;
      },
      sections: {
        kColumnDiracKet: section({
          name: "kColumnDiracKet",
          body: (
            <Info>
              <Prose>
                <p>
                  You’ve inserted a <strong>ket</strong> (
                  <M prespace={false} t="\ket{v_1}" /> or
                  <M t="\ket{v_2}" />) into your column vector. This is kind of
                  like writing vector
                  <M t="\vec{v} = (5, \vec{w}, 3)" />, which normally doesn't
                  make sense.
                </p>

                <p>
                  The elements of your column vector should be{" "}
                  <strong>numbers</strong>. In Dirac notation,{" "}
                  <strong>inner products</strong> (aka “brakets”) evaluate to
                  numbers.
                </p>

                <p>
                  Similarly, it <em>would</em> be sensible to write{" "}
                  <M t="\vec{v} = (5, \vec{w} \cdot \vec{v}, 3)" />.
                </p>

                <p>Adjust your answers, then check in again.</p>
              </Prose>
            </Info>
          ),
          continue: { label: "Check in again" },
        }),
        kColumnDiracCorrect: section({
          name: "kColumnDiracCorrect",
          body: (
            <Help>
              <Prose>
                <p>Your column vector looks good to us! Nice work.</p>

                <p>
                  The <M t="v" /> subscript is how we indicate that the column
                  vector is expressed in the basis of <M t="\ket{v_1}" />
                  and
                  <M t="\ket{v_2}" /> (as opposed to the standard basis of
                  <M t="\ket{i}" />
                  and
                  <M t="\ket{j}" />, which doesn't require a subscript).
                </p>
              </Prose>
            </Help>
          ),
          continue: { label: "Keep on going" },
        }),
        kColumnDiracReversed: section({
          name: "kColumnDiracReversed",
          body: (
            <Info>
              <Prose>
                <p>
                  Looks like you may have swapped <M t="a" /> and <M t="b" />{" "}
                  (i.e., written the elements in your column vector in the wrong
                  order).
                </p>

                <p>Adjust your answers, then check in again.</p>
              </Prose>
            </Info>
          ),
          continue: { label: "Check in again" },
        }),
        kColumnDiracRepeated: section({
          name: "kColumnDiracRepeated",
          body: (
            <Info>
              <Prose>
                <p>
                  Looks like you repeated the same answer for both components in
                  the column vector. You should have a different expression for
                  both elements.
                </p>

                <p>Adjust your answers, then check in again.</p>
              </Prose>
            </Info>
          ),
          continue: { label: "Check in again" },
        }),
        kColumnDiracIorJ: section({
          name: "kColumnDiracIorJ",
          body: (
            <Info>
              <Prose>
                <p>
                  Looks like you have <M t="\braket{i|u}" /> or{" "}
                  <M t="\braket{j|u}" /> in your column vector again. This was
                  right on the previous page, but the <M t="v" /> subscript on
                  the column tells you that now we’re working in a different
                  basis!
                </p>

                <p>Which basis is that? What are the basis vectors?</p>

                <p>Adjust your answers, then check in again.</p>
              </Prose>
            </Info>
          ),
          continue: { label: "Check in again" },
        }),
      },
    }),

    section({
      name: "basisChange",
      body: (
        <>
          <Prose>
            <p>
              Change the basis for <M t="\ket{u}" /> to the <M t="\ket{v_1}" />
              -and-
              <M prespace={false} t="\ket{v_2}" /> basis. In other words,
              calculate numerical values for <M t="a" /> and <M t="b" />.
            </p>

            <p>
              <strong>Do this on scrap paper</strong> and click to move on once
              you’re done!
            </p>

            <p>
              You’ll need the values of <M t="a" /> and <M t="b" /> as decimals
              when you move on, and you'll be able to check your answers in a
              moment.
            </p>
          </Prose>

          <Reminder>
            <M
              display
              t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}"
            />
            <M
              display
              t="\ket{i} \doteq \begin{pmatrix}1 \\ 0\end{pmatrix} \text{ and } \ket{j} \doteq \begin{pmatrix}0 \\ 1\end{pmatrix}"
            />
            <M
              display
              t="
                  \ket{v_1} \doteq \begin{pmatrix} \sqrt{3}/2 \\ 1/2 \end{pmatrix}
                  \text{ and }
                  \ket{v_2} \doteq \begin{pmatrix} -1/2 \\ \sqrt{3}/2 \end{pmatrix}
                "
            />
          </Reminder>
        </>
      ),
      hints: [
        hint({
          name: "basisChange",
          body: (
            <Prose>
              Our goal is to represent our vector in the form
              <M display t="a\ket{v_1} + b\ket{v_2}" />
              How do you represent the coefficients <M t="a" /> and
              <M t="b" /> in Dirac notation? (Hint: You did it above!) Can you
              compute those inner products?
            </Prose>
          ),
        }),
      ],
      continue: { label: "I’m done changing basis" },
    }),

    section({
      name: "v1v2AxesAllowed",
      body: (m, { responses }) => (
        <>
          <Prose>
            <p>
              Sweet. Let’s go ahead and plot the vector in the new basis. You’ll
              need your answers for <M t="a" /> and <M t="b" /> to do this.
            </p>

            <p>But before we get to that, let’s think about our axes.</p>
          </Prose>

          <Toggle
            model={m.v1v2AxesAllowed}
            choices={[
              ["yes", "Yes, that’s fine"],
              ["no", "No, it’s not OK"],
            ]}
            label={
              <Prose>
                Is it OK to label the horizontal axis as <M t="\vb{v_1}" /> and
                the vertical axis as <M t="\vb{v_2}" />?
              </Prose>
            }
          />

          {responses?.v1v2AxesAllowed?.selected === "no" && (
            <TextArea
              model={m.v1v2AxesAllowedExplain}
              label={<Prose>Explain why not:</Prose>}
            />
          )}
        </>
      ),
      hints: [
        [
          hint({
            name: "v1v2AxesAllowed",
            label: "I’m not sure!",
            body: (
              <Prose>
                <M t="\ket{v_1}" /> and <M t="\ket{v_2}" /> form an{" "}
                <em>orthonormal basis</em> just like <M t="\ket{i}" /> and{" "}
                <M t="\ket{j}" />. This means that they can be represented by
                any pair of perpendicular axes.
              </Prose>
            ),
          }),

          hint({
            name: "v1v2AxesAllowed2",
            label: "I’m still unsure",

            body: (
              <Prose>
                Therefore <strong>yes</strong>, we can label our axes this way
                in this diagram.
              </Prose>
            ),
          }),
        ],
      ],
    }),

    section({
      name: "v1v2AxesAllowedCorrection",
      when: (r) => r.v1v2AxesAllowed?.selected === "no",
      body: (
        <Prose>
          <p>
            Because <M t="\ket{v_1}" /> and <M t="\ket{v_2}" /> form an{" "}
            <em>orthonormal basis</em>, they can be represented by any pair of
            perpendicular axes. So we think it’s just fine for us to use the
            horizontal and vertical axes for this purpose.
          </p>

          <p>
            Sorry this software can’t respond directly to your explanation
            above!
          </p>

          <p>
            We’re going to go ahead and set up our axes this way. If you have
            lingering questions, you should reach out to your peers or
            instructors! Don’t worry though—you’re totally good to keep working
            on the tutorial.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "kColumn",
      body: (m, { responses }) => (
        <>
          <Columns>
            <Column>
              <Prose noMargin>
                <p>
                  Alright, let’s plot the vector. Like before, type in the new
                  coordinates as decimals in the column vector below.
                </p>
              </Prose>

              <Matrix
                className="margin-top"
                labelTex="\begin{pmatrix} a \\ b \end{pmatrix}_v ="
                subscriptTex="v"
                column={modelToColumn(m.kColumn, (c) => (
                  <Decimal model={c} />
                ))}
              />
            </Column>

            <Column>
              <PlotK vector={responses?.kColumn} />
            </Column>
          </Columns>
        </>
      ),
      continue: { label: "Let’s check in" },
    }),

    oneOf({
      which: (r) => {
        if (approxEquals(r.kColumn, [0.835, 0.551])) {
          return "kColumnCorrect";
        } else if (approxEquals(r.kColumn, [0.551, 0.835])) {
          return "kColumnReversed";
        } else {
          return "kColumnIncorrect";
        }
      },
      sections: {
        kColumnCorrect: section({
          name: "kColumnCorrect",
          body: (
            <Help>
              <Prose>Looks good to us! Wonderful job.</Prose>
            </Help>
          ),
          continue: { label: "Awesome, let’s keep going" },
        }),

        kColumnReversed: section({
          name: "kColumnReversed",
          body: (
            <Help>
              <Prose>
                <p>
                  You’re really close! Looks like you reversed <M t="a" /> and{" "}
                  <M t="b" /> though. If you’re using inner products to
                  calculate, make sure you’re using these equations:
                  <M
                    display
                    t="a = \braket{v_1|u} \text{ and } b = \braket{v_2|u}"
                  />
                </p>

                <p>
                  You can fix this above if you’d like (it will help you
                  visualize the vector). Otherwise, you’re ready to move on.
                </p>
              </Prose>
            </Help>
          ),
        }),

        kColumnIncorrect: section({
          name: "kColumnIncorrect",
          body: (_, { responses }) => (
            <Info>
              <Prose>
                {approxEquals(responses?.kColumn, [0.835, 0.551]) ? (
                  <p>
                    Hey! Looks like you changed your answers to the correct
                    ones. Nice job! Feel free to move on.
                  </p>
                ) : (
                  <>
                    <p>
                      {approxEquals(responses?.kColumn?.[0], 0.835) ? (
                        <>
                          Looks like your <M t="b" /> is somewhat off.
                        </>
                      ) : approxEquals(responses?.kColumn?.[1], 0.551) ? (
                        <>
                          Looks like your <M t="a" /> is somewhat off.
                        </>
                      ) : (
                        <>Looks like your calculation is somewhat off.</>
                      )}{" "}
                      If you’re using inner products to calculate, make sure
                      you’re using these equations:
                      <M
                        display
                        t="a = \braket{v_1|u} \text{ and } b = \braket{v_2|u}"
                      />
                    </p>

                    <p>
                      The answers are revealed on the top of the next page. Keep
                      trying (if you want), and you can double check yourself
                      there. Move on when you decide you’re ready.
                    </p>
                  </>
                )}
              </Prose>
            </Info>
          ),
        }),
      },
    }),
  ],
}));

function PlotK({ vector }: { vector: Responses["kColumn"] }) {
  const [x, y] = vector || [];

  return (
    <Plot width={266} height={266} scale={90}>
      <Axes xLabel="\vb{v_1}" yLabel="\vb{v_2}" color="darkgreen" />

      {x !== undefined && (
        <Tick x={x} label={`\\braket{v_1|u} = ${x}`} color="red" />
      )}

      {y !== undefined && (
        <Tick y={y} label={`\\braket{v_2|u} = ${y}`} color="red" />
      )}

      {(x !== undefined || y !== undefined) && (
        <Vector x={x || 0} y={y || 0} color="red" />
      )}
    </Plot>
  );
}
