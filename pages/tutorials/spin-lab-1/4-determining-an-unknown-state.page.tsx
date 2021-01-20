import { Prose } from "@/design";
import { FieldGroup, Text, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
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
              Refresh the tab with the sim, or{" "}
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
              Choose <strong>Unknown 2</strong> (click the 2 under the “Start”
              button.) Then, hit <strong>Reset</strong>.
            </p>

            <p>
              Important: make sure you selected <strong>Unknown 2</strong>, NOT
              Unknown 1!
            </p>

            <p>
              This causes the atoms to leave the source in a definite quantum
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
              <M t="a\ket{+} + b\ket{-}" />, where <M t="a" /> and
              <M t="b" /> are just (possibly complex) numbers. Run the sim and
              use the results to write <M t="\ket{\psi}" /> in this form:
              <M display t="\ket{\psi} = a\ket{+} + b\ket{-}" />
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

    // If not correct (a =0, b=1), we get a different answer.  Are you sure you
    // were running unknown 2?  Please check with an instructor.
    // Also indicate if correct
  ],
}));
