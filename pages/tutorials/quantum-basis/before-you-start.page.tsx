import {
  ChooseAll,
  LabelsLeft,
  LabelsRight,
  M,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <>
          <ChooseAll
            model={m.coBExpression}
            choices={[
              [
                "x-subscripts",
                <M t="\frac{1}{\sqrt{3}} \ \ket{+}_x + \frac{\sqrt{2}}{\sqrt{3}} \ \ket{-}_x" />,
              ],
              [
                "projection (correct)",
                <M t="\brasub{x}\braket{+|\psi} \ \ket{+}_x + \brasub{x}\braket{-|\psi} \ \ket{-}_x" />,
              ],
              [
                "probability coefficients",
                <M t="\Big| \brasub{x}\braket{+|\psi} \Big|^2 \ket{+}_x + \Big| \brasub{x}\braket{-|\psi} \Big|^2 \ket{-}_x" />,
              ],
              [
                "x<+|+> coefficients",
                <M t="\brasub{x}\braket{+|+} \ \ket{+}_x + \brasub{x}\braket{-|-} \ \ket{-}_x" />,
              ],
              [
                "just inner products",
                <M t="\frac{1}{\sqrt{3}} \ \brasub{x}\braket{+|+} + \frac{\sqrt{2}}{\sqrt{3}} \ \brasub{x}\braket{-|-}" />,
              ],
            ]}
            label={
              <Prose>
                <p>
                  Consider a spin-½ electron prepared in the state:
                  <M
                    display
                    t="\ket{\psi} = \frac{1}{\sqrt{3}} \ket{+} + \frac{\sqrt{2}}{\sqrt{3}}\ket{-}"
                  />
                </p>

                <p>
                  Which expression correctly converts <M t="\ket{\psi}" /> into
                  the <i>x</i>-basis? Check ALL that apply.
                </p>
              </Prose>
            }
          />

          <Prose faded>
            <M t="\ket{+}_x" /> and <M t="\ket{-}_x" /> refer to the spin-up and
            spin-down states along the <i>x</i>-direction.
          </Prose>
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            Consider the following statements and choose <em>True</em> or{" "}
            <em>False</em>.
          </Prose>

          <LabelsRight>
            <Toggle
              model={m.changedProbabilities}
              label={
                <>
                  By writing the state <M t="\ket{\psi}" /> in the <i>x</i>
                  -basis, we’ve changed the probabilities for measuring along
                  the <i>z</i>-direction.
                </>
              }
              choices={[
                ["true", "True"],
                ["false", "False"],
              ]}
            />
          </LabelsRight>

          <LabelsLeft>
            <TextBox model={m.changedProbabilitiesExplain} label="Explain:" />
          </LabelsLeft>

          <hr />

          <LabelsRight>
            <Toggle
              model={m.cantKnowBothProbabilities}
              label={
                <>
                  We can‘t know the probabilities for measurements along both
                  the <i>z</i>-direction and the <i>x</i>-direction at the same
                  time.
                </>
              }
              choices={[
                ["true", "True"],
                ["false", "False"],
              ]}
            />
          </LabelsRight>

          <LabelsLeft>
            <TextBox
              model={m.cantKnowBothProbabilitiesExplain}
              label="Explain:"
            />
          </LabelsLeft>

          <hr />

          <LabelsRight>
            <Toggle
              model={m.createdNewState}
              label={
                <>
                  By representing the state <M t="\ket{\psi}" /> in the <i>x</i>
                  -basis, we’ve created a new quantum state.
                </>
              }
              choices={[
                ["true", "True"],
                ["false", "False"],
              ]}
            />
          </LabelsRight>

          <LabelsLeft>
            <TextBox model={m.createdNewStateExplain} label="Explain:" />
          </LabelsLeft>
        </>
      ),
    }),
  ],
}));
