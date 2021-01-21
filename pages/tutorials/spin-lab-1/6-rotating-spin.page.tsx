import { Prose } from "@/design";
import M from "@/math/M";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "rotatingSpin",
  label: "Rotating Spin: A Challenge",
  sections: [
    section({
      name: "rotatingSpinIntro",
      body: (
        <>
          <Prose>
            <p>
              One last time,{" "}
              <a
                href="https://tinyurl.com/spin3220"
                target="_blank"
                rel="noreferrer noopener"
              >
                open a new sim
              </a>{" "}
              to start from scratch.
            </p>

            <p>
              Choose <strong>Unknown R</strong> (click the “R” under the “Start”
              button.) Then hit “Reset.”
            </p>

            <p>
              Change the S-G to be an “X” analyzer. Break the “spin-down output
              port” line,{" "}
              <em>
                so all you have to work with is a single pure X-spin up beam.
              </em>
            </p>

            <p>
              Now for your challenge: Try to build a “chain” of subsequent
              measurement devices so that at the very end you get one final beam
              of electrons all in the state <M t="\ket{-}_x" /> (i.e. pure “spin
              down” in the X-direction).
            </p>

            <p>Demonstrate with the sim that you have created such a beam!</p>
          </Prose>
        </>
      ),
      continue: { label: "I did it!" },
    }),
  ],
}));
