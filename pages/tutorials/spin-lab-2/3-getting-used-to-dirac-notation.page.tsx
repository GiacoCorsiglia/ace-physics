import {
  Callout,
  Column,
  Columns,
  Decimal,
  Dropdown,
  M,
  Matrix,
  Prose,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";
import styles from "./styles.module.scss";

export default page(setup, ({ section, hint }) => ({
  name: "gettingUsedToDiracNotation",
  label: "Getting Used to Dirac Notation",
  sections: [
    section({
      name: "gettingUsedToDiracNotationIntro",
      body: (
        <Prose>
          <p>
            Let’s work in 2-D “regular space” (vectors in a plane), but we will
            use Dirac notation!
          </p>

          <p>
            We’ll write our “Cartesian unit vectors” (i.e.,{" "}
            <M t="\mathbf{\hat{x}}" /> and <M t="\mathbf{\hat{y}}" />) as{" "}
            <M t="\ket{x}" /> and <M t="\ket{y}" />.
          </p>
        </Prose>
      ),
      hints: [
        hint({
          name: "spinXVersusCartesianX",
          body: (
            <Prose>
              <p>
                <M t="\ket{x}" /> and <M t="\ket{+}_x" /> are{" "}
                <strong>
                  <em>totally different</em>
                </strong>{" "}
                vectors in <em>totally different</em> vector spaces.
              </p>

              <p>
                <M t="\ket{+}_x" /> is a quantum state describing a particle
                with a definite value of <M t="+\hbar/2" /> for the <M t="x" />
                -component of its spin vector. It lives in “Hilbert space”,
                which means it has two <em>complex number</em> coordinates.
              </p>

              <p>
                <M t="\ket{x}" /> is our usual <M t="\mathbf{\hat{x}}" /> (also
                written <M t="\mathbf{\hat{i}}" />) unit vector. It lives in the
                Cartesian plane, and has two <em>real number</em> coordinates.
              </p>

              <p>
                On this page, we’re using Dirac notation for <M t="\ket{x}" />{" "}
                because, although Dirac notation may be new to you, Cartesian
                unit vectors are something you’ve probably seen many times!
              </p>
            </Prose>
          ),
          label: (
            <>
              <M t="\ket{+}_x" /> or
              <M t="\ket{x}" />, what the <M t="x" />
              ??!
            </>
          ),
        }),
      ],
      continue: { label: "Kinda weird, but OK" },
    }),

    section({
      name: "normalizeUV",
      body: (m) => (
        <>
          <Prose>
            <p>
              Consider two particular 2-D spatial vectors:
              <M
                display
                t="-3\ket{x} + 4\ket{y} \enspace \text{and} \enspace 3\ket{x} - \ket{y}"
              />
            </p>

            <p>
              Normalize them (call these normalized versions <M t="\ket{u}" />{" "}
              and <M t="\ket{v}" />, respectively). Enter the components of the
              normalized vectors below (as decimals):
            </p>
          </Prose>

          <div className={styles.equation}>
            <M t="\ket{u} = " />
            <Decimal model={m.uNormalized.elements[0]} />
            <M t="\ket{x} + " />
            <Decimal model={m.uNormalized.elements[1]} />
            <M t="\ket{y}" />
          </div>

          <div className={styles.equation}>
            <M t="\ket{v} = " />
            <Decimal model={m.vNormalized.elements[0]} />
            <M t="\ket{x} + " />
            <Decimal model={m.vNormalized.elements[1]} />
            <M t="\ket{y}" />
          </div>

          <Callout color="blue">
            <PencilIcon /> &nbsp; Do this on scrap paper! And hang onto your
            results—you’ll want them on the next page.
          </Callout>
        </>
      ),
    }),

    section({
      name: "uVColumns",
      body: (m) => (
        <>
          <Prose>
            Represent <M t="\ket{u}" /> and <M t="\ket{v}" /> as column vectors,
            expressing each element as <strong>a number</strong>.
          </Prose>

          <Columns>
            <Column>
              <Matrix
                labelTex="\ket{u}"
                column={Matrix.modelToColumn(m.uColumn, (model) => (
                  <Decimal model={model} />
                ))}
              />
            </Column>

            <Column>
              <Matrix
                labelTex="\ket{v}"
                column={Matrix.modelToColumn(m.vColumn, (model) => (
                  <Decimal model={model} />
                ))}
              />
            </Column>
          </Columns>
        </>
      ),
    }),

    section({
      name: "uVColumnsDirac",
      body: (m) => (
        <>
          <Prose>
            Represent <M t="\ket{u}" /> and <M t="\ket{v}" /> as column vectors,
            expressing each element as{" "}
            <strong>an appropriate inner product</strong>.
          </Prose>

          <Columns>
            <Column>
              <Matrix
                labelTex="\ket{u}"
                column={Matrix.modelToColumn(m.uColumnDirac, (model) => (
                  <Dropdown
                    model={model}
                    choices={[
                      ["|x>", <M t="\ket{x}" />],
                      ["|y>", <M t="\ket{y}" />],
                      ["|u>", <M t="\ket{u}" />],
                      ["<x|u>", <M t="\braket{x|u}" />],
                      ["<y|u>", <M t="\braket{y|u}" />],
                      ["<u|x>", <M t="\braket{u|x}" />],
                      ["<u|y>", <M t="\braket{u|y}" />],
                    ]}
                  />
                ))}
              />
            </Column>

            <Column>
              <Matrix
                labelTex="\ket{v}"
                column={Matrix.modelToColumn(m.vColumnDirac, (model) => (
                  <Dropdown
                    model={model}
                    choices={[
                      ["|x>", <M t="\ket{x}" />],
                      ["|y>", <M t="\ket{y}" />],
                      ["|v>", <M t="\ket{v}" />],
                      ["<x|v>", <M t="\braket{x|v}" />],
                      ["<y|v>", <M t="\braket{y|v}" />],
                      ["<v|x>", <M t="\braket{v|x}" />],
                      ["<v|y>", <M t="\braket{v|y}" />],
                    ]}
                  />
                ))}
              />
            </Column>
          </Columns>
        </>
      ),
    }),
  ],
}));
