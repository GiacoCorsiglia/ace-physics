import { ChooseOne, M, Prose } from "@/components";
import { pretest } from "@/tutorial";
import { PretestStepPotential } from "./figures";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <>
          <Prose>
            <p>
              Consider just a single potential “step” (<em>not</em> a well).
              Quantum particles are incident from <M t="+\infty" />,{" "}
              <strong>entering from the right</strong> with positive energy{" "}
              <M t="E > V_0" />, as shown:
            </p>
          </Prose>

          <PretestStepPotential incidentFrom="right" energy="E above V_0" />

          <Prose faded justify="center">
            <M t="V=+V_0" /> for any <M t="x > 0" /> (all the way to infinity)
            <br />
            <M t="V=0" /> for any <M t="x < 0" /> (all the way to negative
            infinity)
          </Prose>

          <ChooseOne
            model={m.reflectWhenEAboveVFromRight}
            label={
              <Prose>
                Will incoming quantum particles “reflect” off this step?
              </Prose>
            }
            choices={answers}
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            Exactly as above, but now particles are incident from{" "}
            <M t="-\infty" />, <strong>entering from the left</strong> with
            positive energy <M t="E > V_0" />, as shown:
          </Prose>

          <PretestStepPotential incidentFrom="left" energy="E above V_0" />

          <ChooseOne
            model={m.reflectWhenEAboveVFromLeft}
            label={
              <Prose>
                Will incoming quantum particles “reflect” off this step?
              </Prose>
            }
            choices={answers}
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            Exactly as above, particles are incident from <M t="-\infty" /> with
            positive energy <M t="0 < E <V_0" />, as shown:
          </Prose>

          <PretestStepPotential incidentFrom="left" energy="E below V_0" />

          <ChooseOne
            model={m.reflectWhenEBelowVFromLeft}
            label={
              <Prose>
                Will incoming quantum particles “reflect” off this step?
              </Prose>
            }
            choices={answers}
          />
        </>
      ),
    }),
  ],
}));

const answers = [
  [
    "all",
    <>
      <b>All</b>: 100% reflection
    </>,
  ],
  [
    "some",
    <>
      <b>Some</b>: partial reflection/partial transmision
    </>,
  ],
  [
    "none",
    <>
      <b>None</b>: 100% transmission
    </>,
  ],
  [
    "depends",
    <>
      <b>Depends</b>: impossible to state without knowing the values of
      <M t="E" /> and <M t="V_0" />
    </>,
  ],
] as const;
