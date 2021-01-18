import { Help, Info, Prose } from "@/design";
import { FieldGroup, Text, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "determiningAnUnknownState",
  label: "Determining an Unknown State",
  sections: [
    section({
      name: "determiningAnUnknownStateIntro",
      body: (
        <>
          <Prose>
            <p>
              In the sim, choose <strong>Unknown 2</strong> (click the 2 under
              the start button.) Then, hit <strong>Reset</strong>
            </p>

            <p>
              Important: make sure you selected <strong>Unknown 2</strong>, NOT
              Unknown 1!
            </p>

            <p>
              This causes the atoms to leave the gun in a definite quantum
              state, which we call <M t="\ket{\psi}" />. Your task is to
              conclude what <M t="\ket{\psi}" /> is, in terms of the z-basis.
            </p>
          </Prose>
        </>
      ),
      continue: { label: "Ooh, a mystery" },
    }),

    section({
      name: "unknown2Coefficients",
      body: (m) => (
        <>
          <Prose>
            <p>
              Any general quantum state can always be written in the form
              <M t="𝑎\ket{+} + 𝑏\ket{-}" />, where <M t="a" /> and
              <M t="b" /> are just (possibly complex) numbers. Run the sim and
              use the results to write <M t="\ket{\psi}" /> in this form.
            </p>

            <p>Record your results here:</p>
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Text
              model={m.unknown2CoefficientA}
              label={<M t="a = " />}
              maxWidth
            />

            <Text
              model={m.unknown2CoefficientB}
              label={<M t="b = " />}
              maxWidth
            />
          </FieldGroup>
        </>
      ),
    }),

    section({
      name: "unknown2Measurements",
      body: (m) => (
        <TextArea
          model={m.unknown2Measurements}
          label={
            <Prose>
              What measurements did you make to conclude your answer to part A
              above? (Why?)
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "javaSimExploration",
      body: (m) => (
        <>
          <Prose>
            <p>
              There is a more advanced version of the sim{" "}
              <a
                href="http://tinyurl.com/jdo2ybd"
                target="_blank"
                rel="noreferrer noopener"
              >
                available here
              </a>
              . It requires Java. If someone in your group has Java running,
              have them download and launch the new sim. If not, try to find an
              instructor who has the Java sim running.
            </p>

            <Info>
              <p>
                Worst case scenario, you can skip this section if you’re having
                technical difficulties.
              </p>
            </Info>

            <p>
              <strong>To set up the Java sim:</strong> Once you have it
              launched, hit <em>Ctrl-D</em> to reset. Then pick{" "}
              <em>Initialize Menu</em> → <strong>User state</strong> and read
              on!
            </p>

            <p>
              We know this state is pretty simple, but confirm your conclusion
              above by entering your calculated coefficients for <M t="a" /> and{" "}
              <M t="b" /> into the table for “User State” and running the
              experiment to make sure it matches with what you saw. (The 4
              entries are the Real and Imaginary parts of the coefficients{" "}
              <M t="a" /> and <M t="b" />
              ).
            </p>
          </Prose>

          <TextArea
            model={m.javaSimExploration}
            label={
              <Prose>
                <strong>
                  Can you find a different set of 4 entries that gives the same
                  experimental outcome?
                </strong>{" "}
                How much “different” can you make it? (Discuss! How would you
                characterize the “ambiguity” in your answer to part B? )
              </Prose>
            }
          />

          <Help>
            <Prose>
              The Java program has a weird glitch and you will probably need to
              re-set the “User State” before using it. To do this, switch to
              Unknown #1 and then back to User State. Re-set all four numbers,
              being sure to not leave any blank. Repeat this process until the
              User State shows up correctly when you check it. (Also, be sure
              the “Choose basis” button is selected as “Z”, this should be the
              default)
            </Prose>
          </Help>
        </>
      ),
      continue: {
        // Always allowed, because people might not run the Java sim.
        allowed: () => true,
      },
    }),
  ],
}));
