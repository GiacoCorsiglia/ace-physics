import { M, Prose, TextBox } from "@/components";
import { posttest } from "@/tutorial";
import setup from "./setup";

export default posttest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <TextBox
          model={m.xHXTimesPlus}
          label={
            <Prose>
              Compute <M t="XHX \frac{1}{\sqrt{2}} (\ket{0} + \ket{1})" />.
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <TextBox
          model={m.prob1}
          label={
            <Prose>
              After the gates have been applied in the question above, what is
              the probability of measuring <M t="\ket{1}" />?
            </Prose>
          }
        />
      ),
    }),
  ],
}));
