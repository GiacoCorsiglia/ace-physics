import { Prose, Reminder } from "@/design";
import { Decimal, Text } from "@/inputs";
import M from "@/math/M";
import { page } from "@/tutorial";
import { css } from "linaria";
import React from "react";
import setup from "./setup";
import { equationCss } from "./shared";

export default page(setup, ({ section, hint }) => ({
  name: "challenge",
  label: "Challenge — Only if You Have Time",
  sections: [
    section({
      name: "challengeIntro",
      body: (m) => {
        const spinUpRow =
          m.challengeProbabilityTable.properties.spinUp.properties;
        const spinDownRow =
          m.challengeProbabilityTable.properties.spinDown.properties;

        return (
          <>
            <Prose>
              <h3>Back to Spins!</h3>

              <p>
                Return to the{" "}
                <a
                  href="https://tinyurl.com/spin3220"
                  target="blank"
                  rel="noopener noreferrer"
                >
                  Stern-Gerlach sim
                </a>
                .
              </p>

              <p>
                On the oven, choose state <strong>3</strong> (just below the
                “Start” button). This causes the atoms to leave the oven in a
                definite quantum state, <M t="\ket{\psi_3}" />.
              </p>

              <p>
                Measure the six probabilities <M t="|\braket{\phi|\psi_3}|^2" />
                , where <M t="\ket{\phi}" />
                corresponds to spin up or spin down along the three axes (X, Y,
                and Y). Fill in the worksheet table below. Use your results to
                deduce what <M t="\ket{\psi_3}" /> is, using the following
                procedure:
              </p>

              <ol>
                <li>
                  Assume that we want to write the unknown state vector in terms
                  of the <M t="\ket{\pm}" /> basis, i.e.
                  <M t="\ket{\psi_3} = a \ket{+} + b \ket{-}" />
                  <br />
                  (<M t="a" prespace={false} /> and <M t="b" /> are complex so
                  we must use the data to find them!)
                </li>

                <li>
                  Use the measured probabilities of spin up and down along the
                  Z-axis first. This allows you to determine the magnitudes of{" "}
                  <M t="a" />
                  and <M t="b" />. Since an overall phase of the state vector
                  has no physical meaning, we follow the convention that the
                  coefficient of <M t="\ket{+}" /> (i.e. <M t="a" />) is chosen
                  to be real and positive. If we write{" "}
                  <M t="b=|b|e^{i\theta}" />, then you have determined
                  everything except the phase <M t="\theta" />!
                </li>

                <li>
                  Use the measured probabilities of spin up and spin down along
                  the X-axis to provide information about the phase of{" "}
                  <M t="b" />. You should be close, but there is still a sign
                  issue!
                </li>

                <li>
                  Use the measured probabilities of spin up and spin down along
                  the Y-axis to finish.
                </li>
              </ol>
            </Prose>

            <Prose>
              <h4>
                Your conclusion: what is state <M t="\ket{\psi_3}" />?
              </h4>
            </Prose>

            <div className={equationCss}>
              <M t="\ket{\psi_3} =" />
              <Text
                model={m.challengeConclusion.elements[0]}
                maxWidth
                placeholder="a = ?"
              />
              <M t="\ket{+} +" />
              <Text
                model={m.challengeConclusion.elements[1]}
                maxWidth
                placeholder="b = ?"
              />
              <M t="\ket{-}" />
            </div>

            <Prose>(You can type complex numbers in if you need to.)</Prose>

            <Prose>
              <h4>
                Worksheet for unknown <M t="\ket{\psi_3}" />
              </h4>
            </Prose>

            <table className="table">
              <thead>
                <tr>
                  <td>Probabilities</td>
                  <td colSpan={3}>Axis</td>
                </tr>
                <tr>
                  <td>Result</td>
                  <td>X</td>
                  <td>Y</td>
                  <td>Z</td>
                </tr>
              </thead>

              <tbody
                className={css`
                  & input {
                    min-width: 100%;
                  }
                `}
              >
                <tr>
                  <th>Spin up</th>
                  <td>
                    <Decimal model={spinUpRow.x} />
                  </td>
                  <td>
                    <Decimal model={spinUpRow.y} />
                  </td>
                  <td>
                    <Decimal model={spinUpRow.z} />
                  </td>
                </tr>

                <tr>
                  <th>Spin down</th>
                  <td>
                    <Decimal model={spinDownRow.x} />
                  </td>
                  <td>
                    <Decimal model={spinDownRow.y} />
                  </td>
                  <td>
                    <Decimal model={spinDownRow.z} />
                  </td>
                </tr>
              </tbody>
            </table>

            <Reminder>
              <M
                display
                t="
                  \begin{aligned}
                  \ket{+}_x &= \frac{1}{\sqrt{2}} \ket{+} + \frac{1}{\sqrt{2}} \ket{-} \\
                  \ket{-}_x &= \frac{1}{\sqrt{2}} \ket{+} - \frac{1}{\sqrt{2}} \ket{-} \\
                  \ket{+}_y &= \frac{1}{\sqrt{2}} \ket{+} + \frac{i}{\sqrt{2}} \ket{-} \\
                  \ket{-}_y &= \frac{1}{\sqrt{2}} \ket{+} - \frac{i}{\sqrt{2}} \ket{-}
                  \end{aligned}
                "
              />
            </Reminder>
          </>
        );
      },
      continue: {
        label: "I did it! (Or, skip this—that’s OK too)",
        allowed: () => true,
      },
    }),
  ],
}));
