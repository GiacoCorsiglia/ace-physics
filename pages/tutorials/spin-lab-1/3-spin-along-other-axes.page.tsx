import { Prose } from "@/design";
import { Decimal } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import { css, cx } from "linaria";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "spinAlongOtherAxes",
  label: "A Spin-Z Experiment",
  sections: [
    section({
      name: "repeatedMeasurementsIntro",
      body: (
        <>
          <Prose>
            <p>
              You can choose orientations for the analyzers <M t="X" />,
              <M t="Y" />, or <M t="Z" />, oriented along the usual
              <M t="xyz" />
              -axes of a Cartesian coordinate system. (We ignore the fourth
              option <M t="\hat{n}" /> for now). When a direction other than
              <M t="Z" /> is chosen, we use a subscript to distinguish the
              output states (e.g., <M t="\ket{-}_y" />
              ).
            </p>

            <p>
              If we can also use the spin down port of the first analyzer as
              input to the second analyzer, there are six possible input states
              and six possible output states for the second analyzer.
            </p>

            <p>
              <strong>
                Your task is to measure the probabilities
                <M t="P_{\text{out}} = |\braket{\text{out}|\text{in}}|^2" />{" "}
                corresponding to each pair of input and output states (there are
                36!).
              </strong>{" "}
              This is the probability that an atom leaving the first analyzer
              also makes it through the second analyzer to the detector. (Not
              the total probability for getting from the oven to the detector.)
            </p>

            <p>
              For example, the previous page (page 2, which had both analyzers
              along the z-axis) above gave the result{" "}
              <M t="|\braket{+|+}|^2 = 1" />.
            </p>
          </Prose>
        </>
      ),
      continue: { label: "Let’s get measuring" },
    }),

    section({
      name: "setupForUpZDownX",
      body: (
        <>
          <Prose>
            As a warm-up, discuss with your group the S-G ("Stern-Gerlach")
            setup that will let you correctly determine{" "}
            <M t="|\braket{+|+}_x|^2" />.
          </Prose>
        </>
      ),
    }),

    section({
      name: "outInTable",
      body: (m) => {
        const states = [
          "upZ",
          "downZ",
          "upX",
          "downX",
          "upY",
          "downY",
        ] as const;

        const pieces = (state: string) => [
          state.includes("up") ? "+" : "-",
          state.slice(-1).toLowerCase(),
        ];

        const ket = (state: string) => {
          const [pm, last] = pieces(state);
          const sub = last === "z" ? "" : `_${last}`;
          return <M t={`\\ket{${pm}}${sub}`} prespace={false} />;
        };

        const bra = (state: string) => {
          const [pm, last] = pieces(state);
          const sub = last === "z" ? "" : `\\brasub{${last}}`;
          return <M t={`${sub}\\bra{${pm}}`} prespace={false} />;
        };

        return (
          <>
            <Prose>
              <p>
                Use the sim to run your S-G setup, and fill in the corresponding
                box in the table below (outlined in{" "}
                <span
                  className={css`
                    color: green;
                  `}
                >
                  green
                </span>
                ).
              </p>

              <p>
                <strong>Continue down that column</strong> filling in more
                entries.
              </p>

              <p>
                Then, <strong>fill in the rest of the table</strong>.
              </p>
            </Prose>

            <table className="table">
              <thead>
                <tr>
                  <td>
                    <M t="|\braket{\text{out}|\text{in}}|^2" prespace={false} />
                  </td>

                  {states.map((s) => (
                    <td key={s}>{ket(s)}</td>
                  ))}
                </tr>
              </thead>

              <tbody>
                {states.map((row) => {
                  const rowModel = m.outInTable.properties[row];
                  return (
                    <tr key={row}>
                      <th>{bra(row)}</th>

                      {states.map((col) => (
                        <td>
                          <Decimal
                            model={rowModel.properties[col]}
                            className={cx(
                              row === "upZ" &&
                                col === "upX" &&
                                css`
                                  border-color: green;
                                `
                            )}
                            initialValue={
                              row === "upZ" && col === "upZ" ? 1 : undefined
                            }
                            disabled={row === "upZ" && col === "upZ"}
                            placeholder=""
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      },
      hints: [
        hint({
          name: "outInTableIsSimNecessary",
          label: "Can I do this without the sim?",
          body: (
            <Prose>
              Whenever you feel you don’t need to use the sim, but can just
              deduce the answers, that’s fine! Just be sure your group mates
              agree!
            </Prose>
          ),
        }),
      ],
    }),
  ],
}));
