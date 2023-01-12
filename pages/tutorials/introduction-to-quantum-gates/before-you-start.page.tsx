import { ChooseOne, M, Prose, TextBox } from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

const confidenceChoices = [
  [
    "unable",
    "I don’t know how to do this yet. (Feel free to skip this question).",
  ],
  ["unsure", "I’m not sure, but I think I know how to do it."],
  ["confident", "I’ve got this."],
] as const;

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <>
          <Prose id="pretest-x-h-x-times-plus">
            Compute <M t="XHX \frac{1}{\sqrt{2}} (\ket{0} + \ket{1})" />.
          </Prose>

          <ChooseOne
            model={m.xHXTimesPlusConfidence}
            choices={confidenceChoices}
          />

          <TextBox
            model={m.xHXTimesPlus}
            aria-labelledby="pretest-x-h-x-times-plus"
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose id="pretest-prob-1">
            After the gates have been applied in the question above, what is the
            probability of measuring <M t="\ket{1}" />?
          </Prose>

          <ChooseOne model={m.prob1Confidence} choices={confidenceChoices} />

          <TextBox model={m.prob1} aria-labelledby="pretest-prob-1" />
        </>
      ),
    }),
  ],
}));
