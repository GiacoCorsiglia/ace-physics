import { ChooseOne, Image, M, Prose, TextBox } from "@/components";
import { posttest } from "@/tutorial";
import groundThirdSuperpositionImg from "./assets/ground-third-superposition.png";
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

    section({
      body: (m) => (
        <>
          <ChooseOne
            model={m.superpositionGroundSecondExcitedState}
            label={
              <Prose>
                <Image src={groundThirdSuperpositionImg} />
                The graph shows a superposition of the ground state{" "}
                <M t="\psi_1" /> with the <strong>second</strong> excited state{" "}
                <M t="\psi_3" /> at one instance in time.
                <M display t="\psi = \frac{1}{\sqrt{2}}( \psi_1 + \psi_3 )" />
                For the indicated point <M t="x_0 = 0.6L" /> (red dot), how does
                the probability density <M t="|\psi(x_0)|^2" /> at the given
                time compare with other times?
              </Prose>
            }
            choices={[
              [
                "maximal",
                <>
                  <M t="|\psi(x_0)|^2" /> currently has its{" "}
                  <strong>maximal</strong> value.
                </>,
              ],
              [
                ">0, minimal",
                <>
                  <M t="|\psi(x_0)|^2 >0" />, but currently has its{" "}
                  <strong>minimal</strong> value.
                </>,
              ],
              [
                "=0, minimal",
                <>
                  <M t="|\psi(x_0)|^2 = 0" /> and currently has its{" "}
                  <strong>minimal</strong> value.
                </>,
              ],
              [
                "between minimum and maximum",
                <>
                  <M t="|\psi(x_0)|^2 = 0" /> is in between its maximum and
                  minimum.
                </>,
              ],
            ]}
          />

          <TextBox
            model={m.superpositionGroundSecondExcitedStateExplain}
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
