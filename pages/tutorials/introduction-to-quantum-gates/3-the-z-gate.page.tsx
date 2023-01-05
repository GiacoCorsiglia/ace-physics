import {
  Callout,
  M,
  Matrix,
  Prose,
  TextBox,
  TextLine,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "zGate",
  label: {
    html: (
      <>
        The <M t="Z" /> Gate
      </>
    ),
    title: "The Z Gate",
  },
  answers: "none",
  sections: [
    section({
      name: "zGateIntro",
      body: (
        <Prose>
          The <M t="Z" /> gate (or “Phase gate”, or <M t="U_Z" />) adds a phase
          of <M t="-1" /> to the <M t="\ket{1}" /> state. It is written in
          matrix form as
          <M display t="Z = \pmatrix{1 & 0 \\ 0 & -1}" />
          Take a moment to verify (using matrix multiplication) that
          <M t="Z\ket{0} = \ket{0}" /> <M t="Z\ket{1} = -\ket{1}" />.
        </Prose>
      ),
    }),

    section({
      name: "zTimesArbitraryKet",
      body: (m) => (
        <TextBox
          model={m.zTimesArbitraryKet}
          label={
            <Prose>
              What is <M t="Z (a\ket{0} + b\ket{1})" />? Can you answer this
              without using matrices?
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "zTimesKet",
      body: (m) => (
        <>
          <Prose>
            What is <M t="Z" /> acting on the state
            <M t="\frac{1}{5} \pmatrix{ 3i \\ -4}" />?
          </Prose>

          <Matrix
            label={<M display t="Z \frac{1}{5}\pmatrix{3i \\ -4} = " />}
            column={Matrix.modelToColumn(m.zTimesKet, (r) => (
              <TextLine model={r} />
            ))}
          />

          <Prose>Is there more than one way to do this?</Prose>
        </>
      ),
    }),

    section({
      name: "zTimesPlus",
      body: (m) => (
        <>
          <Prose>
            Compute
            <M t="Z \left( \frac{1}{\sqrt{2}} (\ket{0}+\ket{1}) \right)" />.
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Do this on scrap paper.
          </Callout>

          <Toggle
            model={m.zTimesPlus}
            label={
              <Prose>
                Did acting with <M t="Z" /> change this state?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it changed the state"],
              ["no", "No, the state is the same"],
            ]}
          />
        </>
      ),
    }),
  ],
}));
