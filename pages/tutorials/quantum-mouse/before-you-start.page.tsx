import {
  Decimal,
  LabelsLeft,
  M,
  Matrix,
  Prose,
  TextBox,
  TextLine,
} from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (
        <Prose>
          Consider the following two equations:
          <M
            display
            t="
                \begin{aligned}
                  \hat{A}\ket{a_1} &= 5 \text{eV}\ket{a_1} \\
                  \hat{A}\ket{a_2} &= -4 \text{eV}\ket{a_2}
                \end{aligned}
                "
          />
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            Label every component of the expression{" "}
            <M t="\hat{A}\ket{a_1} = 5\ket{a_1}" />, with the appropriate
            quantum mechanical terms.
          </Prose>

          <LabelsLeft>
            <TextLine
              model={m.operatorLabel}
              placeholder="Your label"
              label={
                <>
                  <M t="\hat{A}" />
                  &nbsp;&nbsp;&nbsp;—
                </>
              }
            />

            <TextLine
              model={m.eigenstateLabel}
              placeholder="Your label"
              label={
                <>
                  <M t="\ket{a_1}" />
                  &nbsp;&nbsp;&nbsp;—
                </>
              }
            />

            <TextLine
              model={m.eigenvalueLabel}
              placeholder="Your label"
              label={
                <>
                  <M t="5" />
                  &nbsp;&nbsp;&nbsp;—
                </>
              }
            />
          </LabelsLeft>
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            Express <M t="\hat{A}" /> in matrix notation for the two-state
            system (in the orthonormal <M t="\ket{a_1}" />,
            <M t="\ket{a_2}" /> basis).
          </Prose>

          <Matrix
            labelTex="\hat{A}"
            matrix={Matrix.modelToMatrix(m.A, (c) => (
              <Decimal model={c} />
            ))}
          />
        </>
      ),
    }),

    section({
      body: (
        <Prose>
          <p>
            Now consider the following expressions:
            <M
              display
              t="
                  \begin{aligned}
                    \ket{b_1} &= \frac{1}{\sqrt{3}}\ket{a_1} + \frac{\sqrt{2}}{\sqrt{3}}\ket{a_2} \\
                    \ket{b_2} &= \frac{\sqrt{2}}{\sqrt{3}}\ket{a_1} - \frac{1}{\sqrt{3}}\ket{a_2}
                  \end{aligned}
                  "
            />
            where <M t="\hat{B}\ket{b_1} = 2 \text{eV}\ket{b_1}" /> and
            <M t="\hat{B}\ket{b_2} = 7 \text{eV}\ket{b_2}" />.
          </p>

          <p>
            Starting with a particle in the state{" "}
            <M t="\ket{\psi} = \ket{b_1}" />…
          </p>
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <TextBox
          model={m.measureA}
          label={
            <Prose>
              …if you measure <M t="\hat{A}" />, what value(s) could you obtain,
              with what probabilities?
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <>
          {/* Multiple choice b1/b2/a1/a2/|a1>/... */}
          {/* Briefly comment on your answer */}
          <TextBox
            model={m.afterMeasureA}
            label={
              <Prose>
                <strong>After the measurement</strong> of <M t="\hat{A}" />{" "}
                above, you then measure <M t="\hat{B}" />. What value(s) could
                you obtain?
              </Prose>
            }
          />
        </>
      ),
    }),
  ],
}));
