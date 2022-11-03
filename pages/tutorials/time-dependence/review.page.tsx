import { ChooseOne, M, Prose, TextBox } from "@/components";
import { posttest } from "@/tutorial";
import setup from "./setup";

export default posttest(setup, ({ section }) => ({
  sections: [
    section({
      body: (
        <Prose>
          All questions below refer to a single particle in an infinite square
          well.
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <>
          <ChooseOne
            model={m.firstExcitedProbRightHalfChanges}
            label={
              <Prose>
                <p>
                  Suppose the particle starts at <M t="t=0" /> in the first
                  excited state <M t="\phi_2(x)" />.
                </p>

                <p>
                  <strong>True or false:</strong> The probability of finding the
                  particle somewhere in the left third of the well (
                  <M t="0 < x < L/3" prespace={false} />) changes with time.
                </p>
              </Prose>
            }
            choices={trueFalse}
          />

          <TextBox
            model={m.firstExcitedProbRightHalfChangesExplain}
            label="Briefly explain your reasoning:"
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <ChooseOne
            model={m.superpositionProbE2Changes}
            label={
              <Prose>
                <p>
                  Now suppose particle started in the superposition state
                  <M t="\frac{1}{\sqrt{2}}(\phi_1(x) + i\phi_2(x))" />.
                </p>

                <p>
                  <strong>True or false:</strong> The probability of measuring
                  the energy of the system to be <M t="E_2" /> changes with
                  time.
                </p>
              </Prose>
            }
            choices={trueFalse}
          />

          <TextBox
            model={m.superpositionProbE2ChangesExplain}
            label="Briefly explain your reasoning:"
          />
        </>
      ),
    }),
  ],
}));

const trueFalse = [
  ["true", "True"],
  ["false", "False"],
] as const;
