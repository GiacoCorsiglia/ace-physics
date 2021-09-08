import {
  M,
  Prose,
  Reminder,
  TextBox,
  TextLine,
  Toggle,
  VariableLengthColumn,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "energyBasis",
  label: "The Energy Basis",
  answers: "none",
  sections: [
    section({
      name: "energyBasisIntro",
      body: (
        <Prose>
          Consider a quantum particle in a well.
          <br />
          The (distinct) allowed energies are <M t="E_1, E_2, E_3, \ldots," />{" "}
          etc.
          <br />
          The energy eigenstates are correspondingly named{" "}
          <M t="\ket{E_1}\!, \ket{E_2}\!, \ket{E_3}\!, \ldots," /> etc.
          <br /> Note that there can be an infinite number of energy eigenvalues
          and eigenstate for such real-world systems!
        </Prose>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "psiAMeasurements",
      body: (m) => (
        <>
          <TextBox
            model={m.psiAMeasurements}
            label={
              <Prose>
                Suppose you have a particle initially in the normalized quantum
                state
                <M
                  display
                  t="
                  \ket{\psi_A}
                  = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
                  + \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
                  + \frac{1}{\sqrt{6}} \ket{E_4}
                  "
                />
                If you make an energy measurement on this particle, what results
                could you get, with what probabilities? (Please look carefully
                at the subscripts in the expression above!)
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "isPsiAEnergyEigenstate",
      body: (m) => (
        <>
          <Toggle
            model={m.isPsiAEnergyEigenstate}
            label={
              <Prose>
                Given the state above, are we in an eigenstate of energy?
              </Prose>
            }
            choices={[
              [
                "yes",
                <>
                  Yes, <M t="\ket{\psi_A}" /> is an energy eigenstate
                </>,
              ],
              ["no", "No, it isn’t"],
            ]}
          />

          <TextBox
            model={m.isPsiAEnergyEigenstateExplain}
            label={<Prose>Why or why not?</Prose>}
          />
        </>
      ),
      hints: [
        [
          hint({
            name: "isPsiAEnergyEigenstate",
            body: (
              <Prose>
                Does <M t="\ket{\psi_A}" /> satisfy the{" "}
                <em>energy eigenequation</em>,{" "}
                <M t="\hat{H}\ket{\psi_A} \stackrel{?}{=} E \ket{\psi_A}" />?
              </Prose>
            ),
          }),
          hint({
            name: "isPsiAEnergyEigenstate2",
            label: "I’m still not sure",
            body: (
              <Prose>
                If you are in an eigenstate of energy, then you must know with
                100% confidence exactly what energy you will get if you measure
                it!
              </Prose>
            ),
          }),
        ],
      ],
    }),

    section({
      name: "columnE2",
      body: (m) => (
        <>
          <Prose>
            If I use our standard notation from earlier spin examples, in the
            energy basis I would represent my first energy basis state as:
            <M
              display
              t="\ket{E_1} \doteq \begin{pmatrix} 1 \\ 0 \\ 0 \\ \vdots \end{pmatrix} "
            />
            Please represent <M t="\ket{E_2}" /> in this way:
          </Prose>

          <VariableLengthColumn
            model={m.columnE2}
            component={(model) => (
              <TextLine model={model} placeholder="Type here" />
            )}
            labelTex="\ket{E_2}"
          />

          <Prose faded justify="center">
            If you need it, you can type <M t="\frac{1}{\sqrt{N}}" /> as
            “1/sqrt(N)”
            <br />
            and the vertical “dot-dot-dot” just as “...”
          </Prose>
        </>
      ),
    }),

    section({
      name: "columnPsiA",
      body: (m) => (
        <>
          <Prose>Represent our starting state in the same way:</Prose>

          <VariableLengthColumn
            model={m.columnPsiA}
            component={(model) => (
              <TextLine model={model} placeholder="Type here" />
            )}
            labelTex="\ket{\psi_A}"
          />

          <Prose faded justify="center">
            If you need it, you can type <M t="\frac{1}{\sqrt{N}}" /> as
            “1/sqrt(N)” <br />
            and the vertical “dot-dot-dot” just as “...”
          </Prose>

          <Reminder>
            <M
              display
              t="
              \ket{\psi_A}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              + \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
            />
          </Reminder>
        </>
      ),
    }),

    section({
      name: "dotDotDotMeaning",
      body: (m) => (
        <TextBox
          model={m.dotDotDotMeaning}
          label={
            <Prose>
              You should have a “dot-dot-dot” in your answers, what does it mean
              here?
            </Prose>
          }
        />
      ),
    }),
  ],
}));
