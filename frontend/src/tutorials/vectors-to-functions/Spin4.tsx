import React from "react";
import { VectorsToFunctions } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Decimal } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import {
  Axes,
  Bar,
  DragHandle,
  Grid,
  Indicator,
  Plot,
  Tick,
} from "src/components/plots";
import VariableLengthColumn from "src/components/VariableLengthColumn";
import { isSet } from "src/state";
import { range } from "src/util";
import { Part, sectionComponents } from "../shared";
import styles from "./styles.module.scss";

export default function Spin4() {
  return (
    <Part label="Spin 4">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(VectorsToFunctions, [
  (f) => (
    <Section first>
      <Prose>
        <p>Consider a spin-4 particle.</p>

        <p>
          The eigenstates of <M t="S_z" /> are written as{" "}
          <M t="\ket{4}\!,\ \ket{3}\!,\ \dots,\ \ket{-3}\!,\ \ket{-4}" />
        </p>
      </Prose>

      <Continue commit={f.spin4IntroCommit} label="Ok, got it" />
    </Section>
  ),
  (f) => (
    <Section commits={f.spin4IntroCommit}>
      <Prose>
        Suppose the spin-4 particle is in the state <M t="\ket{\psi_D}" />,
        which satisfies the following relationships:
        <M
          display
          t="\braket{4|\psi_D} = 0,\ \braket{3|\psi_D} = 7,\ \braket{n|\psi_D} = (16 - n^2)"
        />
        Write <M t="\ket{\psi_D}" /> as a column vector with numbers. (Don’t
        worry about normalization yet.)
      </Prose>

      <VariableLengthColumn
        field={f.spin4Column}
        inputEl={<Decimal field={f.spin4Column.elements[0]} />}
        labelTex="\ket{\psi_D}"
      />

      <Continue commit={f.spin4ColumCommit} allowed={isSet(f.spin4Column)} />
    </Section>
  ),
  (f) => {
    const barCount = 9;

    return (
      <Section commits={f.spin4ColumCommit}>
        <Prose>
          Draw a diagram for the probability amplitude of <M t="\ket{\psi_D}" />
          . Label the horizontal axis. Label each point in Dirac notation
          (meaning, use clearly labeled bras and kets).
        </Prose>

        <Plot
          width={560}
          scale={[Math.ceil(560 / (barCount || 9)), 15]}
          height={(16 + 2 + 2) * 15}
          origin={["center", 16 + 2]}
          padding={25}
        >
          <Grid axis="y" />

          {barCount &&
            range(barCount).map((i) => {
              // Only odd number counts have a center
              const isCenter =
                barCount % 2 === 1 && i === Math.floor(barCount / 2);

              const x = i - (barCount - 1) / 2;

              const defaultHeight = 4;

              const field = f.spin4BarHeights.elements[i];

              return (
                <React.Fragment key={`${i}-${barCount}`}>
                  <Indicator x={x} />

                  <Tick x={x} label={isCenter ? undefined : x} />

                  <Bar
                    x={x}
                    height={
                      field.value !== undefined ? field.value : defaultHeight
                    }
                    width={0.6}
                  />

                  <DragHandle
                    direction="y"
                    snap={1}
                    xDefault={x}
                    yDefault={defaultHeight}
                    yField={field}
                  />
                </React.Fragment>
              );
            })}

          <Tick y={16} label={16} labelPosition="left" />

          <Axes xLabel="n" yLabel="\text{Probability Amplitude}" />
        </Plot>

        <div className={styles.histogramLabels}>
          {range(9).map((i) => (
            <div className={styles.histogramLabel} key={i}>
              {f.spin4BarHeights.elements[i].value}
            </div>
          ))}
        </div>
      </Section>
    );
  },
]);
