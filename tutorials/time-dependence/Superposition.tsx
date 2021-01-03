import { Continue, Prose, Section } from "@/design";
import { Content } from "@/design/layout";
import { Decimal, FieldGroup, TextArea, Toggle } from "@/inputs";
import Select, { choices } from "@/inputs/Select";
import M from "@/math";
import { isSet } from "@/state";
import { TimeDependence } from "common/tutorials";
import { Fragment } from "react";
import { StylesConfig } from "react-select";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";
import tableGraph1 from "./img/table-graph-1.png";
import tableGraph2 from "./img/table-graph-2.png";
import tableGraph3 from "./img/table-graph-3.png";

export default function Superposition() {
  return (
    <Part label="Time Evolution for a superposition of eigenstates">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(TimeDependence, [
  (f) => (
    <Section first>
      <Prose>
        Set up the sim to consider the state
        <M t="\psi_A = \frac{1}{\sqrt{2}} (\psi_1 + \psi_2)" />. Use the{" "}
        <em>stop</em> and <em>step</em> controls as needed.
      </Prose>

      <Continue commit={f.part3IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part3IntroCommit}>
      <TextArea
        model={f.meaningOfRedLineInSim}
        label={
          <Prose>
            What does the red line in the top right wave function graph depict?
          </Prose>
        }
      />

      <Continue
        commit={f.meaningOfRedLineInSimCommit}
        allowed={isSet(f.meaningOfRedLineInSim)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.meaningOfRedLineInSimCommit}>
      <TextArea
        model={f.explainTimeDependenceOfProbDens}
        label={
          <Prose>
            Using the top right graph, explain why the <M t="|\psi_A|^2" />{" "}
            probability density graph changes with time.
          </Prose>
        }
      />

      <Continue
        commit={f.explainTimeDependenceOfProbDensCommit}
        allowed={isSet(f.explainTimeDependenceOfProbDens)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.explainTimeDependenceOfProbDensCommit}>
      <TextArea
        model={f.behaviorOfProbDensAtMidpoint}
        label={
          <Prose>
            What happens to the <M t="|\psi_A|^2" /> probability density graph
            at the point <M t="x=L/2" /> as time goes by? How can you explain
            this behavior?
          </Prose>
        }
      />

      <Prose className="opacity-faded">
        You can set the slider to fix <M t="x=L/2" /> in the sim
      </Prose>

      <Continue
        commit={f.behaviorOfProbDensAtMidpointCommit}
        allowed={isSet(f.behaviorOfProbDensAtMidpoint)}
      />
    </Section>
  ),

  (f) => {
    const table = f.table.properties;
    const phaseChoices = choices(table.t000.properties.phaseDifference, {
      "pi/2": <M t="\pi/2" />,
      pi: <M t="\pi" />,
      "0_": <M t="0" />,
      "-pi/2": <M t="-\pi/2" />,
    });

    const equationProbAmpChoices = choices(
      table.t000.properties.equationProbAmp,
      {
        "iψ1 + ψ2": <M t="\frac{1}{\sqrt{2}}(i\psi_1 + \psi_2)" />,
        "ψ1 + ψ2": <M t="\frac{1}{\sqrt{2}}(\psi_1 + \psi_2)" />,
        "-ψ1 + ψ2": <M t="\frac{1}{\sqrt{2}}(-\psi_1 + \psi_2)" />,
        "-iψ1 + ψ2": <M t="\frac{1}{\sqrt{2}}(-i\psi_1 + \psi_2)" />,
      }
    );

    const equationProbDensChoices = choices(
      table.t000.properties.equationProbDens,
      {
        "ψ1^2 + ψ2^2 + ψ1ψ2": (
          <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2 + \psi_1\psi_2)" />
        ),
        "ψ1^2 + ψ2^2 - ψ1ψ2": (
          <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2 - \psi_1\psi_2)" />
        ),
        "ψ1^2 + ψ2^2": <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2)" />,
      }
    );

    const graphChoices = choices(table.t000.properties.graphProbDens, {
      t025: (
        <img
          className="img"
          alt=""
          src={tableGraph2}
          width={750}
          height={438}
        />
      ),
      t050: (
        <img
          className="img"
          alt=""
          src={tableGraph3}
          width={750}
          height={438}
        />
      ),
      t000: (
        <img
          className="img"
          alt=""
          src={tableGraph1}
          width={750}
          height={438}
        />
      ),
    });

    const selectStyles: StylesConfig = {
      container: (s) => ({ ...s, minWidth: "auto" }),
      control: (s) => ({ ...s, borderRadius: 0, border: "none" }),
      dropdownIndicator: (s) => ({ ...s, padding: "8px 2px" }),
      // Caused unnecessary clipping
      singleValue: (s) => ({
        ...s,
        textOverflow: "none",
        "& img": {
          height: "3rem",
          width: "auto",
        },
      }),
    };

    return (
      <Section commits={f.behaviorOfProbDensAtMidpointCommit}>
        <Prose>
          <p>
            Use the simulation for state
            <M t="\psi_A = \frac{1}{\sqrt{2}} ( \psi_1 + \psi_2 )" /> to fill
            out the table below. Note that the <M t="\psi_n" /> are real, so{" "}
            <M t="\psi_n^*(x) = \psi_n(x)" />.
          </p>

          <p>
            <M t="\Delta \equiv\," /> the phase difference (rotation angle)
            between
            <M t="\psi_1" /> and <M t="\psi_2" />
          </p>
        </Prose>

        <table className="table text-small text-left">
          <colgroup>
            <col style={{ width: "16%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "29%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>

          <thead
            className="text-center"
            style={{ background: "hsl(0, 0%, 90%)" }}
          >
            <tr>
              <th>
                <M t="\Delta" />
              </th>

              <th>
                Equation for <M t="\psi_A" />
              </th>

              <th>
                Equation for <M t="|\psi_A|^2" />
              </th>

              <th>
                Sketch of <M t="|\psi_A|^2" />
              </th>
            </tr>
          </thead>

          <tbody>
            {(["t000", "t025", "t050", "t075"] as const).map((row) => (
              <Fragment key={row}>
                <tr style={{ background: "hsl(0, 0%, 95%)" }}>
                  <th
                    colSpan={4}
                    style={{
                      padding: "0.25rem 0.5rem",
                      fontWeight: "normal",
                    }}
                    className="text-left text-smaller opacity-faded"
                  >
                    At time <M t={`t = 0.${row.substring(2)}0\\ h / E_1`} />:
                  </th>
                </tr>

                <tr className="tight">
                  <td>
                    <Select
                      model={table[row].properties.phaseDifference}
                      choices={phaseChoices}
                      allowOther={false}
                      isClearable={false}
                      styles={selectStyles}
                    />
                  </td>

                  <td>
                    <Select
                      model={table[row].properties.equationProbAmp}
                      choices={equationProbAmpChoices}
                      allowOther={false}
                      isClearable={false}
                      styles={selectStyles}
                    />
                  </td>

                  <td>
                    <Select
                      model={table[row].properties.equationProbDens}
                      choices={equationProbDensChoices}
                      allowOther={false}
                      isClearable={false}
                      styles={selectStyles}
                    />
                  </td>

                  <td>
                    <Select
                      model={table[row].properties.graphProbDens}
                      choices={graphChoices}
                      allowOther={false}
                      isClearable={false}
                      styles={selectStyles}
                    />
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>

        <Continue commit={f.tableCommit} allowed={isSet(f.table)} />
      </Section>
    );
  },

  (f) => {
    const cs = choices(f.samePlaneSymmetry, {
      symmetric: (
        <>
          <M t="|\psi_A|^2" /> <b>is</b> symmetric about <M t="x = L/2" />
        </>
      ),
      asymmetric: (
        <>
          <M t="|\psi_A|^2" /> is <b>not</b> symmetric in this case
        </>
      ),
    });

    return (
      <Section commits={f.tableCommit}>
        <Prose>
          For the next few questions, we’re going to generalize your results
          from the table.
        </Prose>

        <Prose>
          What can you say about the symmetry of the function{" "}
          <M t="|\psi_A|^2" /> with respect to <M t="L/2" /> for the following
          two instances?
        </Prose>

        <Toggle
          model={f.samePlaneSymmetry}
          label={
            <Prose>
              When <M t="\psi_1" /> and <M t="\psi_2" /> are in{" "}
              <strong>the same plane</strong> (0 or 180 degrees out of phase):
            </Prose>
          }
          choices={cs}
        />

        <Toggle
          model={f.perpPlaneSymmetry}
          label={
            <Prose>
              When <M t="\psi_1" /> and <M t="\psi_2" /> are in{" "}
              <strong>perpendicular planes</strong> (90 or 270 degrees out of
              phase):
            </Prose>
          }
          choices={cs}
        />

        <Continue
          commit={f.symmetryCommit}
          allowed={isSet(f.samePlaneSymmetry) && isSet(f.perpPlaneSymmetry)}
        />
      </Section>
    );
  },

  (f) => (
    <Section commits={f.symmetryCommit}>
      <TextArea
        model={f.explainSymmetryWhenPerp}
        label={
          <Prose>
            <p>
              When <M t="\psi_1" /> and <M t="\psi_2" /> are in perpendicular
              planes, the probability density <M t="|\psi_A|^2" /> is symmetric
              with respect to <M t="L/2" />.
            </p>

            <p>
              Using the “Equation for <M t="|\psi_A|^2" />” column in your
              table, explain how this symmetry arises in the probability density
              even though <M t="\psi_2" /> is antisymmetric.
            </p>
          </Prose>
        }
      />

      <Continue
        commit={f.explainSymmetryWhenPerpCommit}
        allowed={isSet(f.explainSymmetryWhenPerp)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.explainSymmetryWhenPerpCommit}>
      <Prose>
        Using the time display, step controls, and the bottom graph, find the
        period <M t="T_A" /> of the probability density <M t="|\psi_A|^2" />{" "}
        (not the wave function!) in terms of <M t="h/E_1" />.
      </Prose>

      <FieldGroup grid suffixed className="margin-top-1">
        <Decimal model={f.periodOfProbDens} label={<M t="T_A = " />} />

        <M t="\times \frac{h}{E_1}" />
      </FieldGroup>

      <Prose>
        <em>
          To think about: Is the period of the probability density the same as
          the period of either of the individual eigenfunctions?
        </em>
      </Prose>

      <Continue
        commit={f.periodOfProbDensCommit}
        allowed={isSet(f.periodOfProbDens)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.periodOfProbDensCommit}>
      <ContinueToNextPart commit={f.part3FinalCommit} />
    </Section>
  ),
]);
