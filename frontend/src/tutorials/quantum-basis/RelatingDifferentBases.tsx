import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Help, HelpButton, Prose, Section } from "src/components";
import { TextArea, Toggle } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { needsHelp, useFields } from "src/state";
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
                <M t="\ket{k} = a\ket{v_1} + b\ket{v_2}" />.
              </em>
            </p>
          </Prose>

          <Continue commit={f.relatingBasesIntroCommit} />
        </Section>

        <Section commits={[f.relatingBasesIntroCommit]}>
          <Prose>TODO: Plot u and k</Prose>

          <Continue commit={f.uAndKGraphCommit} />
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

          <Continue commit={f.meaningOfCoBCommit} />
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
