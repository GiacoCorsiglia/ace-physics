import {
  ChooseOne,
  Guidance,
  LabelsLeft,
  M,
  Matrix,
  Prose,
  TextLine,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "hadamardGate",
  label: "The Hadamard Gate",
  answers: "checked-some",
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

          {/* TODO: Define |+> and |-> */}
        </Prose>
      ),
    }),

    section({
      name: "plusMinus",
      enumerate: false,
      body: (
        <Prose>
          These states are so common we often refer to them simply as:
          <M
            display
            t="\ket{+} \equiv \frac{1}{\sqrt{2}} ( \ket{0} + \ket{1} )"
          />
          <M
            display
            t="\ket{-} \equiv \frac{1}{\sqrt{2}} ( \ket{0} - \ket{1} )"
          />
        </Prose>
      ),
      continue: {
        label: "I’ll remember that!",
      },
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
          {/* TODO: Grade this */}
        </>
      ),
      guidance: {
        nextMessage(r) {
          const a = r.hTimesKet?.[0];
          const b = r.hTimesKet?.[1];

          if (a?.trim() === "1" && b?.trim() === "0") {
            return "correct";
          }

          return "incorrect";
        },
        messages: {
          correct: {
            body: <Guidance.Agree>Nice work!</Guidance.Agree>,
            onContinue: "nextSection",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                You might want to double-check your answer. Be sure to work it
                out on scrap paper.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      name: "hTimesHTimesKet",
      body: (m) => (
        <>
          <ChooseOne
            model={m.hTimesHTimesKet}
            label={
              <Prose>
                What is <M t="H" /> acting on the state <M t="H\ket{0}" />?
              </Prose>
            }
            choices={[
              ["|0>", <M t="\ket{0}" />],
              ["-|0>", <M t="-\ket{0}" />],
              ["|1>", <M t="\ket{1}" />],
              ["-|1>", <M t="-\ket{1}" />],
              ["|+>", <M t="\ket{+}" />],
              ["-|+>", <M t="-\ket{+}" />],
              ["|->", <M t="\ket{-}" />],
              ["-|->", <M t="-\ket{-}" />],
            ]}
          />

          <Prose>
            Note: this can also be written as <M t="H(H\ket{0})" /> or{" "}
            <M t="H^2\ket{0}" />.
          </Prose>
        </>
      ),
      guidance: {
        nextMessage(r) {
          const answer = r.hTimesHTimesKet?.selected;

          if (answer === "|0>") {
            return "correct";
          } else if (answer === "-|0>") {
            return "signError";
          } else if (answer === "|+>") {
            return "plus";
          }

          return "incorrect";
        },
        messages: {
          correct: {
            body: <Guidance.Agree>Nice work!</Guidance.Agree>,
            onContinue: "nextSection",
          },
          signError: {
            body: (
              <Guidance.Disagree>
                Double-check your minus signs!
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          plus: {
            body: (
              <Guidance.Disagree>
                You need to apply the <M t="H" /> operator twice.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),
  ],
}));
