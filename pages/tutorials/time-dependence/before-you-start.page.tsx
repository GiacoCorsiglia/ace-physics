import { ChooseOne, M, Prose } from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (
        <Prose>
          All questions below refer to a single particle is in an infinite
          square well. The energy eigenfunctions are named <M t="\phi_n(x)" />,
          with corresponding energies <M t="E_n" />. The ground state is{" "}
          <M t="\phi_1(x)" />.
        </Prose>
      ),
    }),

    section({
      body: (m) => (
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
                particle somewhere in the right half of the well changes with
                time.
              </p>
            </Prose>
          }
          choices={trueFalse}
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.firstExcitedProbE2Changes}
          label={
            <Prose>
              <p>
                Still assuming the particle starts at <M t="t=0" /> in the first
                excited state <M t="\phi_2(x)" />.
              </p>

              <p>
                <strong>True or false:</strong> The probability of measuring the
                energy of the system to be <M t="E_2" /> changes with time
              </p>
            </Prose>
          }
          choices={trueFalse}
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.superpositionProbRightHalfChanges}
          label={
            <Prose>
              <p>
                Now suppose the particle started in the superposition state
                <M t="\frac{1}{\sqrt{2}}(\phi_1(x) + \phi_2(x))" />.
              </p>

              <p>
                <strong>True or false:</strong> The probability of finding the
                particle somewhere in the right half of the well changes with
                time.
              </p>
            </Prose>
          }
          choices={trueFalse}
        />
      ),
    }),
    section({
      body: (m) => (
        <ChooseOne
          model={m.superpositionProbE2Changes}
          label={
            <Prose>
              <p>
                Still assuming the particle started in the superposition state
                <M t="\frac{1}{\sqrt{2}}(\phi_1(x) + \phi_2(x))" />.
              </p>

              <p>
                <strong>True or false:</strong> The probability of measuring the
                energy of the system to be <M t="E_2" /> changes with time
              </p>
            </Prose>
          }
          choices={trueFalse}
        />
      ),
    }),
  ],
}));

const trueFalse = [
  ["true", "True"],
  ["false", "False"],
] as const;
