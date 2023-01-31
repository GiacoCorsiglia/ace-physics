import { ChooseOne, Image, M, Prose } from "@/components";
import { pretest } from "@/tutorial";
import entangledStatesSvg from "./assets/entangled-states.svg";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (
        <>
          <Image
            src={entangledStatesSvg}
            responsive
            alt="A pair of entangled particles is split up, with each particle sent to a different detector."
          />

          <Prose>
            <p>
              Suppose we have two entangled spin-½ particles (A and B) described
              by the state:
              <M
                display
                t="\ket{\psi} = \frac{1}{\sqrt{2}} (\ket{\uparrow\downarrow} - \ket{\downarrow\uparrow})"
              />
            </p>

            <p>
              <strong>Every question asks the same thing:</strong> What was the
              outcome of Bob’s measurement?
            </p>

            <p>
              <strong>
                For ALL questions, Bob orients his analyzer along the <em>Z</em>
                -direction.
              </strong>
            </p>
          </Prose>
        </>
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.aliceSpinUpX}
          choices={answers}
          label={
            <Prose>
              GIVEN that Alice measured FIRST, oriented her analyzer along the
              X-direction (Note: X, not Z), and measured <M t="+\hbar/2" />,
              what did Bob measure?
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.aliceSpinUpZ}
          choices={answers}
          label={
            <Prose>
              GIVEN that Alice measured FIRST, oriented her analyzer along the
              Z-direction, and measured <M t="+\hbar/2" />, what did Bob
              measure?
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.aliceSpinUpZAfter}
          choices={answers}
          label={
            <Prose>
              GIVEN that Alice measured <strong>AFTER</strong> Bob, oriented her
              analyzer along the Z-direction, and measured <M t="+\hbar/2" />,
              what did Bob measure?
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.aliceNoMeasurement}
          choices={answers}
          label={
            <Prose>
              GIVEN that Alice did not make any measurement at all, what did Bob
              measure?
            </Prose>
          }
        />
      ),
    }),
  ],
}));

const answers = [
  ["+hbar/2", <M t="+\hbar/2" />],
  ["-hbar/2", <M t="-\hbar/2" />],
  [
    "either",
    <>
      Could be either <M t="\pm\hbar/2" />
    </>,
  ],
  ["not sure", "I’m not sure"],
] as const;
