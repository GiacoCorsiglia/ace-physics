import { Answer, ChooseOne, Image, M, Prose, TextBox } from "@/components";
import { page } from "@/tutorial";
import entangledStatesSvg from "./assets/entangled-states.svg";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "entangledStates",
  label: "Entangled States",
  answers: "provided",
  sections: [
    section({
      name: "entangledStatesIntro",
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
              in the <em>Z</em>-basis by the state:
              <M
                display
                t="
                \ket{\psi} = \frac{1}{\sqrt{2}}
                \bigl( \ket{\uparrow_A}\ket{\downarrow_B} - \ket{\downarrow_A}\ket{\uparrow_B} \bigr)
                "
              />
            </p>

            <p>
              It can be shown that this entangled state is equivalent to:
              <M
                display
                t="
                \ket{\psi} = \frac{1}{\sqrt{2}}
                \bigl( \ket{\uparrow_A}_X\ket{\downarrow_B}_X - \ket{\downarrow_A}_X\ket{\uparrow_B}_X \bigr)
                "
              />
            </p>

            <p>
              <em>
                This can be done given the usual relations
                <M t="\ket{\uparrow_A}_Z = \frac{1}{\sqrt{2}} ( \ket{\uparrow_A}_X + \ket{\downarrow_A}_X )" />
                , and{" "}
                <M t="\ket{\downarrow_A}_Z = \frac{1}{\sqrt{2}} ( \ket{\uparrow_A}_X - \ket{\downarrow_A}_X )" />
                .
              </em>
            </p>
          </Prose>
        </>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "bStateAfterMeasureA",
      body: (m) => (
        <>
          <Prose>
            Particle A’s <em>Z</em>-spin is measured and yields{" "}
            <M t="+\hbar/2" />. That is, the spin state of A is found to be{" "}
            <M t="\ket{\uparrow_A}_Z" />.
          </Prose>

          <ChooseOne
            model={m.bStateAfterMeasureA}
            label={
              <Prose>
                Which of the following is a good prediction for particle B’s
                spin state after Particle A’s measurement?
              </Prose>
            }
            choices={[
              ["|up_B>X", <M t="\ket{\uparrow_B}_X" />],
              ["|down_B>X", <M t="\ket{\downarrow_B}_X" />],
              ["|up_B>Z", <M t="\ket{\uparrow_B}_Z" />],
              ["|down_B>Z", <M t="\ket{\downarrow_B}_Z" />],
              [
                "cannot predict",
                "We cannot predict Particle B’s spin state from the knowledge of particle A’s spin state",
              ],
            ]}
            answer="|down_B>Z"
            explanation="Because we collapsed the state to this."
          />

          <TextBox
            model={m.bStateAfterMeasureAExplain}
            label={<Prose>Discuss how you made this prediction:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "bUpLikelihood",
      body: (m) => (
        <>
          <Prose>
            Particle A’s <em>Z</em>-spin is measured and yields spin up.
          </Prose>

          <ChooseOne
            model={m.bUpLikelihood}
            label={
              <Prose>
                What is the likelihood of finding particle B’s spin state in the
                X-basis as <M t="\ket{\uparrow_B}_X" />? (In other words, what
                is the probability that a measurement of <em>X</em>-spin for
                particle B yields “up”?)
              </Prose>
            }
            choices={[
              ["100%", "100%"],
              ["75%", "75%"],
              ["50%", "50%"],
              ["25%", "25%"],
              ["0%", "0%"],
              ["Not determined", "Not determined"],
            ]}
            answer="50%"
            explanation="Because B is in the z-down state, which yields 50% chance of X up."
          />

          <TextBox
            model={m.bUpLikelihoodExplain}
            label={<Prose>Discuss how you found this likelihood:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "howOftenAliceBobSpinUp",
      body: (m) => (
        <>
          <Prose>
            <M t="N=1000" /> of these entangled pairs are sent out. Each pair
            constitutes an “event.”
          </Prose>

          <TextBox
            model={m.howOftenAliceBobSpinUp}
            label={
              <Prose>
                If Alice and Bob both measure <M t="S_z" />, how often does
                Alice measure spin up? How about Bob?
              </Prose>
            }
          />

          <Answer>
            <Prose>500 each (on average)</Prose>
          </Answer>
        </>
      ),
    }),

    section({
      name: "howOftenAliceBobSame",
      body: (m) => (
        <>
          <TextBox
            model={m.howOftenAliceBobSame}
            label={
              <Prose>
                How often do Alice and Bob both measure the SAME result (up or
                down) for a given event?
              </Prose>
            }
          />

          <Answer>
            <Prose>Never</Prose>
          </Answer>
        </>
      ),
    }),

    section({
      name: "howOftenAliceSzBobSxSame",
      body: (m) => (
        <>
          <TextBox
            model={m.howOftenAliceSzBobSxSame}
            label={
              <Prose>
                If Alice measures <M t="S_z" /> and Bob measures <M t="S_x" />,
                how often do Alice and Bob both measure the SAME result (up or
                down) for a given event?
              </Prose>
            }
          />

          <Answer>
            <Prose>500 times (half)</Prose>
          </Answer>
        </>
      ),
    }),

    section({
      name: "causality",
      body: (m) => (
        <>
          <TextBox
            model={m.causality}
            label={
              <Prose>
                In any scenario above, are Alice’s measurements “causing” Bob’s?
                That is, can she send him a message instantly, using these
                spins? (If so—is special relativity violated here? If not—why
                not?)
              </Prose>
            }
          />

          <Answer>
            <Prose>No they are not; no she cannot.</Prose>
          </Answer>
        </>
      ),
    }),
  ],
}));
