import { LabelsLeft, M, Matrix, Prose, TextBox, TextLine } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "hadamardGate",
  label: "The Hadamard Gate",
  answers: "none",
  sections: [
    section({
      name: "hadamardGateIntro",
      body: (
        <Prose>
          The <M t="H" /> gate (Hadamard gate, or <M t="U_H" />) is written in
          matrix form as
          <M display t="H = \frac{1}{\sqrt{2}} \pmatrix{1 & 1 \\ 1 & -1}" />
        </Prose>
      ),
    }),

    section({
      name: "hTimes0And1",
      body: (m) => (
        <>
          <Prose>
            What is <M t="H\ket{0}" />? What is <M t="H\ket{1}" />?
          </Prose>

          <LabelsLeft>
            <TextLine model={m.hTimes0} label={<M t="H\ket{0} =" />} />
            <TextLine model={m.hTimes1} label={<M t="H\ket{1} =" />} />
          </LabelsLeft>
        </>
      ),
    }),

    section({
      name: "hTimes0And1Answer",
      enumerate: false,
      body: (
        <Prose>
          <p>
            You should have found that
            <M
              display
              t="H\ket{0} = \frac{1}{\sqrt{2}} ( \ket{0} + \ket{1} )"
            />
            and
            <M
              display
              t="H\ket{1} = \frac{1}{\sqrt{2}} ( \ket{0} - \ket{1} )"
            />
          </p>

          <p>
            The Hadamard gate is important because, as you have just seen, it
            takes a <M t="\ket{0}" /> or a <M t="\ket{1}" /> input state and
            turns them into superposition states.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "hTimesKet",
      body: (m) => (
        <>
          <Prose>
            What is <M t="H" /> acting on the state{" "}
            <M t="\frac{1}{\sqrt{2}} \pmatrix{1 \\ 1}" />?
          </Prose>

          <Matrix
            label={<M display t="H \frac{1}{\sqrt{2}}\pmatrix{1 \\ 1} = " />}
            column={Matrix.modelToColumn(m.hTimesKet, (r) => (
              <TextLine model={r} />
            ))}
          />
        </>
      ),
    }),

    section({
      name: "hTimesHTimesKet",
      body: (m) => (
        <>
          <TextBox
            model={m.hTimesHTimesKet}
            label={
              <Prose>
                What is <M t="H" /> acting on the state <M t="H\ket{0}" />?
              </Prose>
            }
          />

          <Prose>
            Note: this can also be written as <M t="H(H\ket{0})" /> or{" "}
            <M t="H^2\ket{0}" />.
          </Prose>
        </>
      ),
    }),
  ],
}));
