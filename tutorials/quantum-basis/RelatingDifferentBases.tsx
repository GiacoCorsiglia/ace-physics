import {
  Continue,
  Help,
  HelpButton,
  Info,
  Prose,
  Reminder,
  Section,
} from "@/design";
import { Column, Columns, Content } from "@/design/layout";
import { Button, Choice, Select, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { Axes, Plot, Rotate, Tick, Vector } from "@/plots";
import { isSet, needsHelp, useFields } from "@/state";
import { QuantumBasis } from "common/tutorials";
import { ContinueToNextPart, Part } from "tutorials/shared";

export default function RelatingDifferentBases() {
  const f = useFields(QuantumBasis);

  return (
    <Part label="Relating Different Bases">
      <Content>
        <Section first>
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
              <M t="a\ket{v_1} + b \ket{v_2}." />
              <em>Should we rename the vector in this basis?</em> Let’s go ahead
              and do that and investigate whether we needed to.
            </p>

            <p>
              <em>
                For now, we’ll call the vector in the new basis
                <M t="\ket{k}" />. That is,
                <M t="\ket{k} = a\ket{v_1} + b\ket{v_2}" />, where
              </em>

              <M display t="a \approx 0.835 \text { and } b \approx 0.551" />

              <em>as you found on the previous page.</em>
            </p>
          </Prose>

          <Continue commit={f.relatingBasesIntroCommit} />
        </Section>

        <Section commits={[f.relatingBasesIntroCommit]}>
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

          <Columns className="margin-top">
            <Column>
              <PlotUAndK />
            </Column>

            <Column>
              <PlotOptions />
            </Column>
          </Columns>

          <Continue
            commit={f.uAndKGraphCommit}
            allowed={
              isSet(f.uAndKGraph) && f.uAndKGraph.value?.k?.selected === "v1v2"
            }
          />
        </Section>

        <Section commits={f.uAndKGraphCommit}>
          <Help>
            <Prose>Your graph looks good!</Prose>
          </Help>

          <Choice
            field={f.uAndKRelationship}
            choices={uAndKRelationship}
            label={
              <Prose>
                Based on the graph, what is the relationship between{" "}
                <M t="\ket{u}" /> and
                <M t="\ket{k}" />?
              </Prose>
            }
          />

          {needsHelp(f.uAndKRelationshipHelp) && (
            <Help>
              <Prose>
                Other than the different labels, could you distinguish between
                the two vectors?
              </Prose>
            </Help>
          )}

          <Continue
            commit={f.uAndKRelationshipCommit}
            allowed={isSet(f.uAndKRelationship)}
          >
            <HelpButton help={f.uAndKRelationshipHelp} />
          </Continue>
        </Section>

        <Section commits={[f.uAndKRelationshipCommit]}>
          <Choice
            field={f.newNameNecessary}
            choices={newNameNecessaryChoices}
            label={
              <Prose>
                Earlier we had a state <M t="\ket{u}" /> initially written in
                the basis of <M t="\ket{i}" /> and <M t="\ket{j}" />. We then
                converted this to a new basis. Was it (in retrospect) necessary
                to give it a new name, <M t="\ket{k}" />?
              </Prose>
            }
          />

          <TextArea
            model={f.newNameNecessaryExplain}
            label={<Prose>Explain</Prose>}
          />

          <Continue
            label="Let’s check in"
            commit={f.newNameNecessaryCommit}
            allowed={
              isSet(f.newNameNecessary) && isSet(f.newNameNecessaryExplain)
            }
          />
        </Section>

        <Section commits={f.newNameNecessaryCommit}>
          {f.uAndKRelationship.value?.selected === "same" && (
            <>
              {f.newNameNecessary.value?.selected === "no" && (
                <Help>
                  <Prose>
                    <p>We agree with your answers!</p>

                    <p>
                      <M t="\ket{u} = \ket{k}" />, and changing basis just
                      changes your representation of a vector, but it doesn’t
                      change the underlying vector. Considering that, there’s no
                      reason to give the vector another name. (Doing so might
                      even be confusing!)
                    </p>
                  </Prose>
                </Help>
              )}

              {(f.newNameNecessary.value?.selected === "yes" ||
                f.newNameNecessary.value?.selected === "no but useful") && (
                <Info>
                  <Prose>
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
                      <M t="\ket{u} = a\ket{v_1} + b\ket{v_2}" />, you know
                      you’re working the in the basis of <M t="\ket{v_1}" /> and{" "}
                      <M t="\ket{v_2}" />. It could actually be confusing to{" "}
                      <em>also</em> change the name.
                    </p>
                  </Prose>
                </Info>
              )}
            </>
          )}

          {f.uAndKRelationship.value?.selected !== "same" && (
            <Info>
              <Prose>
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
              </Prose>
            </Info>
          )}

          <Continue commit={f.uVsKFeedbackCommit} />
        </Section>

        <Section commits={f.uVsKFeedbackCommit}>
          <TextArea
            model={f.meaningOfCoB}
            label={
              <Prose>
                Using the analogy we’ve created to 2-D spatial vectors, explain
                what changing the basis means for a given quantum state (in this
                case <M t="\ket{u}" />
                ).
              </Prose>
            }
          />

          <Continue
            commit={f.meaningOfCoBCommit}
            allowed={isSet(f.meaningOfCoB)}
          />
        </Section>

        <Section commits={f.meaningOfCoBCommit}>
          <Toggle
            model={f.equalityAllowed}
            choices={equalityAllowedChoices}
            label={
              <Prose>
                Let’s bring this back to the physics context. Can we write{" "}
                <M t="\ket{\psi} = a \ket{+} + b \ket{-} = c \ket{+}_x + d \ket{-}_x" />
                ?
              </Prose>
            }
          />

          <Continue
            commit={f.equalityAllowedCommit}
            allowed={isSet(f.equalityAllowed)}
          />
        </Section>

        <Section commits={f.equalityAllowedCommit}>
          <TextArea
            model={f.whyNoSubscriptNeeded}
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

          <Continue
            commit={f.whyNoSubscriptNeededCommit}
            allowed={isSet(f.whyNoSubscriptNeeded)}
            label="Let’s check in"
          />
        </Section>

        <Section commits={f.whyNoSubscriptNeededCommit}>
          {f.equalityAllowed.value?.selected === "allowed" && (
            <Help>
              <Prose>
                <p>
                  Yep, that equation is totally allowed. <M t="\ket{\psi}" /> is
                  the same vector regardless of the basis we express it in.
                </p>

                <p>
                  For that reason, we don’t need any subscript on
                  <M t="\ket{\psi}" />.
                </p>
              </Prose>
            </Help>
          )}

          {f.equalityAllowed.value?.selected === "not allowed" && (
            <Info>
              <Prose>
                <p>That equation is allowed.</p>

                <p>
                  <M t="\ket{\psi}" /> is the same vector regardless of the
                  basis we express it in. You can check that the equality holds
                  by expanding <M t="\ket{+}_x" /> and <M t="\ket{-}_x" /> in
                  the z-basis.
                </p>

                <p>
                  For the same reason, we don’t need any subscript on
                  <M t="\ket{\psi}" />.
                </p>
              </Prose>
            </Info>
          )}

          <Continue commit={f.equalityAllowedFeedbackCommit} />
        </Section>

        <Section commits={f.equalityAllowedFeedbackCommit}>
          <ContinueToNextPart commit={f.relatingBasesFinalCommit} />
        </Section>
      </Content>
    </Part>
  );
}

function PlotUAndK() {
  const graph = useFields(QuantumBasis).uAndKGraph.properties;

  const v1v2Choice = graph.v1v2.value?.selected;
  const kChoice = graph.k.value?.selected;

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
      {graph.ij.value === true && <Axes xLabel={xLabel} yLabel={yLabel} />}

      {graph.u.value === true && (
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

      {v1v2Choice === "vectors" && !graph.v1v2Axes.value && (
        <>
          <Vector x={v1X} y={v1Y} label="\ket{v_1}" color="green" />

          <Vector x={v2X} y={v2Y} label="\ket{v_2}" color="green" />
        </>
      )}

      {graph.v1v2Axes.value === true && (
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

function PlotOptions() {
  const graph = useFields(QuantumBasis).uAndKGraph.properties;

  return (
    <>
      <Button
        kind="secondary"
        onClick={() => graph.ij.set(true)}
        disabled={graph.ij.value === true}
      >
        Add <M t="\ket{i}" /> and <M t="\ket{j}" /> axes
      </Button>

      {graph.ij.value === true && (
        <Button
          className="margin-top-1"
          kind="secondary"
          onClick={() => graph.u.set(true)}
          disabled={graph.u.value === true}
        >
          Add <M t="\ket{u}" /> from before
        </Button>
      )}

      {graph.u.value === true && (
        <Select
          className="margin-top-1"
          model={graph.v1v2}
          choices={finalGraphV1V2Choices}
          placeholder="What next?"
          allowOther={false}
          isDisabled={graph.v1v2Axes.value === true}
        />
      )}

      {graph.v1v2.value?.selected === "labels" && (
        <Help>
          <Prose>
            Does this make sense? Should the <M t="\ket{i}" /> and{" "}
            <M t="\ket{v_1}" /> axes point in the same direction like this?
          </Prose>
        </Help>
      )}

      {graph.v1v2.value?.selected === "vectors" && (
        <Button
          className="margin-top-1"
          kind="secondary"
          onClick={() => graph.v1v2Axes.set(true)}
          disabled={graph.v1v2Axes.value === true}
        >
          Extend the vectors into axes
        </Button>
      )}

      {graph.v1v2Axes.value === true && (
        <Select
          className="margin-top-1"
          model={graph.k}
          choices={finalGraphKChoices}
          allowOther={false}
          placeholder={
            <>
              How should we add <M t="\ket{k}" />?
            </>
          }
        />
      )}

      {graph.k.value?.selected === "ij" && (
        <Help>
          <Prose>
            <p>
              Does <M t="a" /> represent the component of <M t="\ket{k}" />{" "}
              along the <M t="\vb{i}" />
              -axis or along the <M t="\vb{v_1}" />
              -axis?
            </p>

            <p>
              Recall that <M t="a" /> is one of the coefficients you calculated
              when changing basis on the previous page.
            </p>
          </Prose>
        </Help>
      )}
    </>
  );
}

const finalGraphV1V2Choices = [
  {
    value: "labels",
    label: (
      <>
        Add <M t="\vb{v_1}" /> and <M t="\vb{v_2}" /> labels to the horizontal
        and vertical axes.
      </>
    ),
  },
  {
    value: "vectors",
    label: (
      <>
        Add the <M t="\ket{v_1}" /> and <M t="\ket{v_2}" /> vectors.
      </>
    ),
  },
] as const;

const finalGraphKChoices = [
  {
    value: "v1v2",
    label: (
      <>
        Plot <M t="(a, b)" /> against the <M t="\vb{v_1}" /> and{" "}
        <M t="\vb{v_2}" /> axes.
      </>
    ),
  },
  {
    value: "ij",
    label: (
      <>
        Plot <M t="(a, b)" /> against the <M t="\vb{i}" /> and <M t="\vb{j}" />{" "}
        axes.
      </>
    ),
  },
] as const;

const uAndKRelationship = [
  { value: "same", label: "They’re the same vector." },
  {
    value: "different-bases",
    label:
      "They can’t be the same vector because they’re in different bases, even though they overlap on the graph.",
  },
  {
    value: "different-coefficients",
    label:
      "They aren’t the same vector because they have different coefficients, even though they overlap on the graph.",
  },
] as const;

const newNameNecessaryChoices = [
  { value: "yes", label: "Yes, it was necessary." },
  { value: "no", label: "No, it wasn’t necessary." },
  {
    value: "no but useful",
    label: "It wasn’t necessary, but it was still useful to do this.",
  },
] as const;

const equalityAllowedChoices = [
  { value: "allowed", label: "Yes, that’s allowed" },
  { value: "not allowed", label: "No, they’re in different bases" },
] as const;
