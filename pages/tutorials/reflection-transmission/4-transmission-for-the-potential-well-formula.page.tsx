import {
  LabelsLeft,
  M,
  Prose,
  Reminder,
  TextBox,
  TextLine,
} from "@/components";
import { Axes, Plot } from "@/plots";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "transmissionForThePotentialWellFormula",
  label: "Transmission for the Potential Well: Formula",
  answers: "none",
  sections: [
    section({
      name: "transmissionForThePotentialWellFormulaIntro",
      body: (
        <Prose>
          <p>
            The transmission coefficient for a (downward) well is equal to:
            <M
              display
              t="
              T = \frac{
                4 E (E + V_0)
              }{
                4 E (E + V_0) + V_0^2 \sin^2(2 l a)
              }
              "
            />
            where <M t="l = \sqrt{2 m (E + V_0)/\hbar^2}" />.
          </p>

          <p>(This is derived in McIntyre, for example.)</p>
        </Prose>
      ),
    }),

    section({
      name: "unitsOflAndT",
      body: (m) => (
        <>
          <Prose>
            What are the dimensions of <M t="T" />? What about <M t="l" />?
          </Prose>

          <LabelsLeft>
            <TextLine
              model={m.unitsOfT}
              label={
                <>
                  <M t="T" />:
                </>
              }
            />

            <TextLine
              model={m.unitsOfl}
              label={
                <>
                  <M t="l" />:
                </>
              }
            />
          </LabelsLeft>
        </>
      ),
    }),

    section({
      name: "tVersusEGraph",
      body: (m) => (
        <>
          <Prose>
            <p>
              Below, sketch the transmission coefficient as a function of
              energy.
            </p>

            <p>
              <strong>Use Zoom’s annotation feature</strong> (or just sketch on
              paper if you’re working alone).
            </p>

            <p>
              Label the axes, what sets the scales? Label any interesting
              points.
            </p>
          </Prose>

          <Plot width={560} height={350} scale={100} origin={[0.5, 3.2]}>
            <Axes yLabel="T" />
          </Plot>

          <Reminder>
            <Prose>
              <M
                display
                t="
                T = \frac{
                  4 E (E + V_0)
                }{
                  4 E (E + V_0) + V_0^2 \sin^2(2 l a)
                }
                "
              />
              where <M t="l = \sqrt{2 m (E + V_0)/\hbar^2}" />.
            </Prose>
          </Reminder>

          <Prose>
            This sketch is challenging! Spend some time on it, but feel free to
            move on even if your sketch isn’t perfect.
          </Prose>
        </>
      ),
      hints: [
        hint({
          name: "tVersusEGraph",
          body: (
            <Prose>
              Think about ways to rewrite the equation to make it easier to
              sketch! You do NOT have to reproduce the “McIntyre plot” that we
              have shown in class—try to think of your own way.
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "tVersusA",
      body: (m) => (
        <>
          <Prose>
            <p>
              Now try sketching <M t="T" /> as a function of <M t="a" />, for
              two different values of <M t="E" />:
            </p>

            <ul>
              <li>
                Use <strong style={{ color: "red" }}>red</strong> for{" "}
                <M t="0 \leq E \ll V_0" />
              </li>
              <li>
                Use <strong style={{ color: "blue" }}>blue</strong> for{" "}
                <M t="E \gg V_0" />
              </li>
            </ul>
          </Prose>

          <Plot width={560} height={350} scale={100} origin={[0.3, 3.2]}>
            <Axes yLabel="T" xLabel="a" />
          </Plot>

          <TextBox
            model={m.tVersusALimits}
            label={
              <Prose>
                Discuss any interesting limits—can you interpret anything
                physically?
              </Prose>
            }
          />

          <Reminder>
            <Prose>
              <M
                display
                t="T = \frac{
            4 E (E + V_0)
            }{
              4 E (E + V_0) + V_0^2 \sin^2(2 l a)
            }"
              />
              where <M t="l = \sqrt{2 m (E + V_0)/\hbar^2}" />.
            </Prose>
          </Reminder>
        </>
      ),
    }),
  ],
}));
