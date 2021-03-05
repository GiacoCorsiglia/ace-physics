import { Help, Info, Prose } from "@/design";
import { FieldGroup, Text, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, oneOf }) => ({
  name: "determiningAnUnknownState",
  label: "Determining an Unknown State",
  answers: "checked-some",
  sections: [
    section({
      name: "determiningAnUnknownStateIntro",
      body: (
        <>
          <Prose>
            <p>
              <a
                href="https://tinyurl.com/spin3220"
                target="_blank"
                rel="noreferrer noopener"
              >
                Open a new sim
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
              state, which we call <M t="\ket{\psi_1}" />. Your task is to
              conclude what <M t="\ket{\psi_1}" /> is, in terms of the z-basis.
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
              use the results to write <M t="\ket{\psi_1}" /> in this form:
              <M display t="\ket{\psi_1} = a\ket{+} + b\ket{-}" />
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

    oneOf({
      which: (r) =>
        r.unknown2CoefficientA === "0" &&
        ["1", "-1", "i", "-i"].includes(r.unknown2CoefficientB?.trim() || "")
          ? "unknown2CoefficientsCorrect"
          : "unknown2CoefficientsIncorrect",
      sections: {
        unknown2CoefficientsIncorrect: section({
          name: "unknown2CoefficientsIncorrect",
          body: (
            <Info>
              <Prose>
                We get a different answer for <M t="a" /> and <M t="b" />. Are
                you sure you were using Unknown 2 in the sim? Please check with
                an instructor.
              </Prose>
            </Info>
          ),
        }),

        unknown2CoefficientsCorrect: section({
          name: "unknown2CoefficientsCorrect",
          body: (_, { responses }) => (
            <Help>
              <Prose>
                <p>Nice work, we agree with your coefficients!</p>

                {responses?.unknown2CoefficientB?.trim() === "-1" && (
                  <p>
                    We would have gone with the simpler answer of{" "}
                    <M t="b = 1" /> as opposed to <M t="b = -1" />. (You can
                    always multiply a state by a minus sign without affecting
                    the physics.)
                  </p>
                )}
              </Prose>
            </Help>
          ),
        }),
      },
    }),
  ],
}));
