import {
  Button,
  ChooseOne,
  Column,
  Columns,
  Dropdown,
  Guidance,
  M,
  Prose,
  Reminder,
  TextBox,
  Toggle,
} from "@/components";
import { Axes, Plot, Rotate, Tick, Vector } from "@/plots";
import { useModel } from "@/reactivity";
import { page } from "@/tutorial";
import setup, { ResponseModels, Responses } from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "relatingBases",
  label: "Relating Different Bases",
  answers: "checked-some",
  sections: [
    section({
      name: "relatingBasesIntro",
      body: (
        <Prose>
          <Reminder>
            <M
              display
              t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}"
            />
            <M
              display
              t="
              \ket{i} \doteq \begin{pmatrix} 1 \\ 0 \end{pmatrix}
              \text{ and }
              \ket{j} \doteq \begin{pmatrix} 0 \\ 1 \end{pmatrix}
              "
            />
            <M
              display
              t="
              \ket{v_1} \doteq \begin{pmatrix}  \sqrt{3}/2 \\ 1/2 \end{pmatrix}
              \text{ and }
              \ket{v_2} \doteq \begin{pmatrix}  -1/2 \\ \sqrt{3}/2 \end{pmatrix}
              "
            />
          </Reminder>
          <Prose>
            <p>
              We have represented our vector in a new basis, that is in the form{" "}
              <M display t="a\ket{v_1} + b \ket{v_2}" />
              <em>Should we rename the vector in this basis?</em> Let’s do so
              and investigate whether we needed to.
            </p>

            <p>
              For now, we’ll call the vector in the new basis
              <M t="\ket{k}" />. That is,
              <M t="\ket{k} = a\ket{v_1} + b\ket{v_2}" />, where
              <M display t="a \approx 0.835 \text { and } b \approx 0.551" />
              as you found on the previous page.
            </p>
          </Prose>
        </Prose>
      ),
    }),

    section({
      name: "uAndKGraph",
      body: (m, { responses }) => (
        <>
          <Prose>
            <p>
              Now let’s create a single 2D graph showing both <M t="\ket{u}" />{" "}
              and <M t="\ket{k}" />.
            </p>

            <p>
              You’ll have to add <M t="\ket{u}" />, represent{" "}
              <M t="\ket{v_1}" /> and <M t="\ket{v_2}" /> on the graph, and then
              add the vector <M t="\ket{k}" />.
            </p>

            <p>
              Use the controls on the right to complete these steps before
              moving on.
            </p>
          </Prose>

          <Columns>
            <Column>
              <PlotUAndK graph={responses?.uAndKGraph} />
            </Column>

            <Column>
              <PlotOptions graphModel={m.uAndKGraph} />
            </Column>
          </Columns>
        </>
      ),
      continue: {
        allowed: ({ responses }, allowed) =>
          allowed && responses?.uAndKGraph?.k?.selected === "v1v2",
      },
    }),

    section({
      name: "uAndKRelationship",
      body: (m) => (
        <>
          <Guidance.Agree>Your graph looks good!</Guidance.Agree>

          <ChooseOne
            model={m.uAndKRelationship}
            choices={[
              ["same", "They’re the same vector."],
              [
                "different-bases",
                "They can’t be the same vector because they’re in different bases, even though they overlap on the graph.",
              ],
              [
                "different-coefficients",
                "They aren’t the same vector because they have different coefficients, even though they overlap on the graph.",
              ],
            ]}
            label={
              <Prose>
                Based on the graph, what is the relationship between{" "}
                <M t="\ket{u}" /> and
                <M t="\ket{k}" />?
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "uAndKRelationship",
          body: (
            <Prose>
              Other than the different labels, could you distinguish between the
              two vectors?
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "newNameNecessary",
      body: (m) => (
        <>
          <ChooseOne
            model={m.newNameNecessary}
            choices={[
              ["yes", "Yes, it was necessary."],
              ["no", "No, it wasn’t necessary."],
              [
                "no but useful",

                "It wasn’t necessary, but it was still useful to do this.",
              ],
            ]}
            label={
              <Prose>
                Earlier we had a state <M t="\ket{u}" /> initially written in
                the basis of <M t="\ket{i}" /> and <M t="\ket{j}" />. We then
                converted this to a new basis. Was it (in retrospect) necessary
                to give it a new name, <M t="\ket{k}" />?
              </Prose>
            }
          />

          <TextBox
            model={m.newNameNecessaryExplain}
            label={<Prose>Explain:</Prose>}
          />
        </>
      ),
      continue: { label: "Let’s check in" },
    }),

    section({
      name: "uVsKFeedback",
      enumerate: false,
      body: (_, { responses }) => (
        <>
          {responses?.uAndKRelationship?.selected === "same" && (
            <>
              {responses?.newNameNecessary?.selected === "no" && (
                <Guidance.Agree>
                  <p>We agree with your answers!</p>

                  <p>
                    <M t="\ket{u} = \ket{k}" />, and changing basis just changes
                    your representation of a vector, but it doesn’t change the
                    underlying vector. Considering that, there’s no reason to
                    give the vector another name. (Doing so might even be
                    confusing!)
                  </p>
                </Guidance.Agree>
              )}

              {(responses?.newNameNecessary?.selected === "yes" ||
                responses?.newNameNecessary?.selected === "no but useful") && (
                <Guidance.Disagree>
                  <p>
                    We agree that <M t="\ket{u}" /> and
                    <M t="\ket{k}" /> are the same vector,{" "}
                    <M t="\ket{u} = \ket{k}" />!
                  </p>

                  <p>
                    But since they’re the same vector, it doesn’t need a new
                    name.
                  </p>

                  <p>
                    Although you could use the name of the vector to indicate
                    the basis you’re working in, the right-hand-side of your
                    equation already tells you this information. If you write{" "}
                    <M t="\ket{u} = a\ket{v_1} + b\ket{v_2}" />, you know you’re
                    working the in the basis of <M t="\ket{v_1}" /> and{" "}
                    <M t="\ket{v_2}" />. It could actually be confusing to{" "}
                    <em>also</em> change the name.
                  </p>
                </Guidance.Disagree>
              )}
            </>
          )}

          {responses?.uAndKRelationship?.selected !== "same" && (
            <Guidance.Disagree>
              <p>
                <M t="\ket{u}" /> and
                <M t="\ket{k}" /> are the same vector,
                <M t="\ket{u} = \ket{k}" />.
              </p>

              <p>
                It’s no accident that they overlap on the graph. You can
                represent a vector in different bases and it’s still the same
                vector!
              </p>

              <p>
                Go ahead and change your answers above and scroll back down to
                check in again.
              </p>
            </Guidance.Disagree>
          )}
        </>
      ),
    }),

    section({
      name: "meaningOfCoB",
      body: (m) => (
        <TextBox
          model={m.meaningOfCoB}
          label={
            <Prose>
              Using the analogy we’ve created to 2-D spatial vectors, explain
              what changing the basis means for a given quantum state (in this
              case <M t="\ket{u}" />
              ).
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "equalityAllowed",
      body: (m) => (
        <Toggle
          model={m.equalityAllowed}
          choices={[
            ["allowed", "Yes, that’s allowed"],
            ["not allowed", "No, they’re in different bases"],
          ]}
          label={
            <Prose>
              Let’s bring this back to the physics context. Can we write
              <br />
              <M t="\ket{\psi} = a \ket{+} + b \ket{-} = c \ket{+}_x + d \ket{-}_x" />
              ?
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "whyNoSubscriptNeeded",
      body: (m) => (
        <>
          <TextBox
            model={m.whyNoSubscriptNeeded}
            label={
              <Prose>
                Why do we not need an <M t="x" /> subscript on{" "}
                <M t="\ket{\psi}" />?
              </Prose>
            }
          />

          <Prose>
            Make sure your answer here agrees with your response to the previous
            question.
          </Prose>
        </>
      ),
      continue: { label: "Let’s check in" },
    }),

    section({
      name: "equalityAllowedFeedback",
      enumerate: false,
      body: (_, { responses }) => (
        <>
          {responses?.equalityAllowed?.selected === "allowed" && (
            <Guidance.Agree>
              <p>
                Yep, that equation is totally allowed. <M t="\ket{\psi}" /> is
                the same vector regardless of the basis we express it in.
              </p>

              <p>
                For that reason, we don’t need any subscript on
                <M t="\ket{\psi}" />.
              </p>
            </Guidance.Agree>
          )}

          {responses?.equalityAllowed?.selected === "not allowed" && (
            <Guidance.Disagree>
              <p>That equation is allowed.</p>

              <p>
                <M t="\ket{\psi}" /> is the same vector regardless of the basis
                we express it in. You can check that the equality holds by
                expanding <M t="\ket{+}_x" /> and <M t="\ket{-}_x" /> in the
                z-basis.
              </p>

              <p>
                For the same reason, we don’t need any subscript on
                <M t="\ket{\psi}" />.
              </p>
            </Guidance.Disagree>
          )}
        </>
      ),
    }),
  ],
}));

function PlotUAndK({ graph }: { graph: Responses["uAndKGraph"] }) {
  // eslint-disable-next-line no-param-reassign
  graph = graph || {};

  const v1v2Choice = graph.v1v2?.selected;
  const kChoice = graph.k?.selected;

  const xLabel =
    v1v2Choice === "labels" ? "\\vb{i}, {\\color{green} \\vb{v_1}}" : "\\vb{i}";
  const yLabel =
    v1v2Choice === "labels" ? "\\vb{j}, {\\color{green} \\vb{v_2}}" : "\\vb{j}";

  const uX = 1 / Math.sqrt(5);
  const uY = 2 / Math.sqrt(5);

  const v1X = Math.sqrt(3) / 2;
  const v1Y = 1 / 2;
  const v2X = -1 / 2;
  const v2Y = Math.sqrt(3) / 2;

  const kX = (2 + Math.sqrt(3)) / (2 * Math.sqrt(5));
  const kY = Math.sqrt(3 / 5) - 1 / (2 * Math.sqrt(5));

  return (
    <Plot>
      {graph.ij === true && <Axes xLabel={xLabel} yLabel={yLabel} />}

      {graph.u === true && (
        <>
          <Tick x={uX} label="\frac{1}{\sqrt{5}}" color="blue" />

          <Tick y={uY} label="\frac{2}{\sqrt{5}}" color="blue" />

          <Vector
            x={uX}
            y={uY}
            label={
              kChoice === "v1v2"
                ? "{\\color{blue} \\ket{u}}, {\\color{red} \\ket{k}}"
                : "{\\color{blue} \\ket{u}}"
            }
            color={kChoice === "v1v2" ? "purple" : "blue"}
          />
        </>
      )}

      {v1v2Choice === "vectors" && !graph.v1v2Axes && (
        <>
          <Vector x={v1X} y={v1Y} label="\ket{v_1}" color="green" />

          <Vector x={v2X} y={v2Y} label="\ket{v_2}" color="green" />
        </>
      )}

      {graph.v1v2Axes === true && (
        <Rotate degrees={30}>
          <Axes xLabel="\vb{v_1}" yLabel="\vb{v_2}" color="darkgreen" />

          {kChoice === "v1v2" && (
            <>
              <Tick x={kX} color="red" label="a" />

              <Tick y={kY} color="red" label="b" />
            </>
          )}
        </Rotate>
      )}

      {kChoice === "ij" && (
        <>
          <Vector x={kX} y={kY} label="{\color{red} \ket{k}}" color="red" />

          <Tick x={kX} color="red" label="a" />

          <Tick y={kY} color="red" label="b" />
        </>
      )}
    </Plot>
  );
}

function PlotOptions({
  graphModel,
}: {
  graphModel: ResponseModels["uAndKGraph"];
}) {
  const [graph, setGraph] = useModel(graphModel);

  return (
    <>
      <Button
        color="blue"
        onClick={() => setGraph((prev) => ({ ...prev, ij: true }))}
        disabled={graph?.ij === true}
      >
        Add <M t="\ket{i}" /> and <M t="\ket{j}" /> axes
      </Button>

      {graph?.ij === true && (
        <Button
          color="blue"
          onClick={() => setGraph((prev) => ({ ...prev, u: true }))}
          disabled={graph?.u === true}
        >
          Add <M t="\ket{u}" /> from before
        </Button>
      )}

      {graph?.u === true && (
        <Dropdown
          model={graphModel.properties.v1v2}
          choices={[
            [
              "labels",
              <>
                Add <M t="\vb{v_1}" /> and <M t="\vb{v_2}" /> labels to the
                horizontal and vertical axes.
              </>,
            ],
            [
              "vectors",
              <>
                Add the <M t="\ket{v_1}" /> and <M t="\ket{v_2}" /> vectors.
              </>,
            ],
          ]}
          placeholder="What next?"
          disabled={graph?.v1v2Axes === true}
        />
      )}

      {graph?.v1v2?.selected === "labels" && (
        <Guidance.Hint>
          Does this make sense? Should the <M t="\ket{i}" /> and{" "}
          <M t="\ket{v_1}" /> axes point in the same direction like this?
        </Guidance.Hint>
      )}

      {graph?.v1v2?.selected === "vectors" && (
        <Button
          color="blue"
          onClick={() => setGraph((prev) => ({ ...prev, v1v2Axes: true }))}
          disabled={graph?.v1v2Axes === true}
        >
          Extend the vectors into axes
        </Button>
      )}

      {graph?.v1v2Axes === true && (
        <Dropdown
          model={graphModel.properties.k}
          choices={[
            [
              "v1v2",
              <>
                Plot <M t="(a, b)" /> against the <M t="\vb{v_1}" /> and{" "}
                <M t="\vb{v_2}" /> axes.
              </>,
            ],
            [
              "ij",
              <>
                Plot <M t="(a, b)" /> against the <M t="\vb{i}" /> and{" "}
                <M t="\vb{j}" /> axes.
              </>,
            ],
          ]}
          placeholder={
            <>
              How should we add <M t="\ket{k}" />?
            </>
          }
        />
      )}

      {graph?.k?.selected === "ij" && (
        <Guidance.Disagree>
          <p>
            Does <M t="a" /> represent the component of <M t="\ket{k}" /> along
            the <M t="\vb{i}" />
            -axis or along the <M t="\vb{v_1}" />
            -axis?
          </p>

          <p>
            Recall that <M t="a" /> is one of the coefficients you calculated
            when changing basis on the previous page.
          </p>
        </Guidance.Disagree>
      )}
    </>
  );
}
