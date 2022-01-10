import {
  ChooseOne,
  Decimal,
  Guidance,
  Image,
  M,
  Prose,
  Table,
} from "@/components";
import { cx, deepEqual } from "@/helpers/client";
import { page } from "@/tutorial";
import xzImg from "./assets/x-z.png";
import zxImg from "./assets/z-x.png";
import setup from "./setup";
import styles from "./styles.module.scss";

export default page(setup, ({ section, hint, oneOf }) => ({
  name: "spinAlongOtherAxes",
  label: "Spin Along Other Axes",
  answers: "checked-all",
  sections: [
    section({
      name: "spinAlongOtherAxesIntro",
      body: (
        <>
          <Prose>
            <p>
              You can choose orientations for the analyzers <M t="X" />,
              <M t="Y" />, or <M t="Z" />, oriented along the usual
              <M t="xyz" />
              -axes of a Cartesian coordinate system. (We ignore the fourth
              option <M t="\theta" /> for now). When a direction other than
              <M t="Z" /> is chosen, we use a subscript to distinguish the
              output states (e.g., <M t="\ket{-}_y" />
              ).
            </p>

            <p>
              If we can also use the spin down port of the first analyzer as
              input to the second analyzer, there are six possible input states
              and six possible output states for the second analyzer. (The six
              states are: up or down, in each of the X, Y, and Z directions.)
            </p>

            <p>
              <strong>
                Your task is to measure the probabilities
                <M t="P = |\braket{\text{out}|\text{in}}|^2" /> corresponding to
                each pair of input and output states (there are 36!).
              </strong>{" "}
              This is the probability that an atom leaving the first analyzer
              also makes it through the second analyzer to the chosen detector.
              (Not the total probability for getting from the oven to the
              detector.)
            </p>

            <p>
              For example, the previous page (page 2, which had both analyzers
              along the z-axis) gave the result <M t="|\braket{+|+}|^2 = 1" />.
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
            setup that will let you correctly determine
            <M t="|\braket{+|+}_x|^2" />. Set up the sim accordingly.
          </Prose>
        </>
      ),
    }),

    section({
      name: "setupForUpZDownXCheck",
      body: (m) => (
        <ChooseOne
          model={m.setupForUpZDownXCheck}
          label={
            <Prose>Which of these reasonably matches your sim’s setup?</Prose>
          }
          choices={[
            ["z-x", <Image src={zxImg} alt="Z S-G first, X S-G second" />],
            ["x-z", <Image src={xzImg} alt="X S-G first, Z S-G second" />],
            ["none", "None of the above"],
          ]}
        />
      ),
    }),

    oneOf({
      which: (r) => {
        switch (r.setupForUpZDownXCheck?.selected) {
          case "x-z":
            return "setupForUpZDownXCorrect";
          case "z-x":
            return "setupForUpZDownXReversed";
          case "none":
            return "setupForUpZDownXIncorrect";
          case undefined:
            return null;
        }
      },
      sections: {
        setupForUpZDownXIncorrect: section({
          name: "setupForUpZDownXIncorrect",
          body: (
            <Guidance.Disagree>
              We think one of those two choices will work. Take another look, or
              discuss with an instructor before moving on.
            </Guidance.Disagree>
          ),
        }),
        setupForUpZDownXReversed: section({
          name: "setupForUpZDownXReversed",
          body: (
            <Guidance.Disagree>
              <p>
                Your goal is to determine <M t="|\braket{+|+}_x|^2" />. The
                template formula we use for probabilities is
                <M t="P = |\braket{\text{out}|\text{in}}|^2" />.
              </p>

              <p>
                In this setup, which analyzer should come last: the one
                corresponding with <M t="\ket{\text{in}}" />, or the one
                corresponding with <M t="\ket{\text{out}}" />?
              </p>
            </Guidance.Disagree>
          ),
        }),
        setupForUpZDownXCorrect: section({
          name: "setupForUpZDownXCorrect",
          body: <Guidance.Agree>Excellent, looks good to us!</Guidance.Agree>,
        }),
      },
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
                <span className={styles.green}>green</span>) with the
                corresponding probability.
              </p>

              <p>
                <strong>Continue down that column</strong> filling in more
                entries.
              </p>

              <p>
                Then, <strong>fill in the rest of the table</strong> by
                inputting the appropriate <strong>probability value</strong> in
                each cell. (Reminder: probabilities are numbers between{" "}
                <M t="0" /> and
                <M t="1" />
                .)
              </p>
            </Prose>

            <Table>
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
                        <td key={col}>
                          <Decimal
                            model={rowModel.properties[col]}
                            className={cx(
                              row === "upZ" &&
                                col === "upX" &&
                                styles.greenBorder
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
            </Table>
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

    section({
      name: "outInTableFeedback",
      enumerate: false,
      body: (m, { responses }) => (
        <>
          {deepEqual(responses?.outInTable, correctTable) ? (
            <Guidance.Agree>Excellent work!</Guidance.Agree>
          ) : (
            <Guidance.Disagree>
              <p>
                Heads up, there’s at least one mistake somewhere in your table.
              </p>

              <p>This message will update when your table is 100% correct.</p>
            </Guidance.Disagree>
          )}
        </>
      ),
    }),
  ],
}));

// prettier-ignore
const correctTable = {
  upZ:   { upZ: 1,   downZ: 0,   upX: 0.5, downX: 0.5, upY: 0.5, downY: 0.5 },
  downZ: { upZ: 0,   downZ: 1,   upX: 0.5, downX: 0.5, upY: 0.5, downY: 0.5 },
  upX:   { upZ: 0.5, downZ: 0.5, upX: 1,   downX: 0,   upY: 0.5, downY: 0.5 },
  downX: { upZ: 0.5, downZ: 0.5, upX: 0,   downX: 1,   upY: 0.5, downY: 0.5 },
  upY:   { upZ: 0.5, downZ: 0.5, upX: 0.5, downX: 0.5, upY: 1,   downY: 0 },
  downY: { upZ: 0.5, downZ: 0.5, upX: 0.5, downX: 0.5, upY: 0,   downY: 1 },
};
