import { default as React } from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Help, HelpButton, Prose, Section } from "src/components";
import { Button, Select, TextArea, Toggle } from "src/components/inputs";
import { Column, Columns, Content } from "src/components/layout";
import M from "src/components/M";
import { Axes, Plot, Rotate, Tick, Vector } from "src/components/plots";
import { isSet, needsHelp, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function RelatingDifferentBases() {
  const f = useFields(QuantumBasis);

  return (
    <Part label="Relating Different Bases">
      <Content>
        <Section first>
          <Prose>
            <p>
              We have represented our vector in a new basis, that is in the form{" "}
              <M t="a\ket{v_1} + b \ket{v_2}." />
              Should we rename the vector in this basis? Let’s go ahead and do
              that and investigate whether we needed to.
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

          <Continue commit={f.uAndKGraphCommit} allowed={isSet(f.uAndKGraph)} />
        </Section>

        <Section commits={[f.uAndKGraphCommit]}>
          <TextArea
            field={f.uAndKRelationship}
            label={
              <Prose>
                What is the relationship between <M t="\ket{u}" /> and
                <M t="\ket{k}" />? What is the inner product of the two?
              </Prose>
            }
          />

          {needsHelp(f.uAndKRelationshipHelp) && (
            <Help>
              <Prose>
                You probably don’t need to actually calculate the inner product.
              </Prose>
            </Help>
          )}

          <Continue commit={f.uAndKRelationshipCommit}>
            <HelpButton help={f.uAndKRelationshipHelp} />
          </Continue>
        </Section>

        <Section commits={[f.uAndKRelationshipCommit]}>
          <TextArea
            field={f.meaningOfCoB}
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

        <Section commits={[f.meaningOfCoBCommit]}>
          <Toggle
            field={f.newNameNecessary}
            label={
              <Prose>
                Earlier we had a state <M t="\ket{u}" /> initially written in
                the basis of <M t="\ket{i}" /> and <M t="\ket{j}" />. We then
                converted this to a new basis. Was it (in retrospect)
                appropriate or necessary to give it a new name,{" "}
                <M t="\ket{k}" />?
              </Prose>
            }
            yes="Yes, it was appropriate/necessary"
            no="No, it was not"
          />

          <TextArea
            field={f.newNameNecessaryExplain}
            label={<Prose>Explain</Prose>}
          />

          <Continue commit={f.newNameNecessaryCommit} />
        </Section>

        <Section commits={[f.newNameNecessaryCommit]}>
          <Toggle
            field={f.equalityAllowed}
            label={
              <Prose>
                Let’s bring this back to the physics context. Can we write{" "}
                <M t="\ket{\psi} = a \ket{+} + b \ket{-} = c \ket{+}_x + d \ket{-}_x" />
                ?
              </Prose>
            }
            yes="Yes, that’s allowed"
            no="No, they’re in different bases"
          />

          <Continue commit={f.equalityAllowedCommit} />
        </Section>

        <Section commits={[f.equalityAllowedCommit]}>
          <TextArea
            field={f.whyNoSubscriptNeeded}
            label={
              <Prose>
                Why do we not need an <M t="x" /> subscript on{" "}
                <M t="\ket{\psi}" />?
              </Prose>
            }
          />

          <Continue commit={f.whyNoSubscriptNeededCommit} />
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
          field={graph.v1v2}
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
          field={graph.k}
          choices={finalGraphKChoices}
          allowOther={false}
          placeholder={
            <>
              How should we add <M t="\ket{k}" />?
            </>
          }
        />
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
