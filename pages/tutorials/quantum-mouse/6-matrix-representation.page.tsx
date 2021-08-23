import {
  Decimal,
  Dropdown,
  Guidance,
  LabelsLeft,
  M,
  Matrix,
  Prose,
  Reminder,
  TextLine,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "matrix-representation",
  label: "Matrix Representation",
  answers: "checked-some",
  sections: [
    section({
      name: "matrixRepresentationIntro",
      body: (
        <>
          <Reminder>
            <Prose>
              <p>
                Small-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\smalleye} = 1 \ket{\smalleye}" /> <br />
                Wide-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\wideye} = 2 \ket{\wideye}" /> <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{\smiley}=\ket{\smiley}" />
                <br />
                Sad mice: &nbsp;{" "}
                <M t="\hat{M}\ket{\frownie}= -\ket{\frownie}" />
              </p>
            </Prose>

            <M
              display
              t="\ket{\smalleye} = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}"
            />

            <M
              display
              t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
            />
          </Reminder>

          <Prose>
            <p>Let’s choose mood eigenstates to be our “basis.”</p>

            <p>This means we’ll be using the following column vectors:</p>

            <M
              display
              t="\ket{\smiley} \dot{=}\ \begin{pmatrix} 1 \\ 0 \end{pmatrix}"
            />
            <M
              display
              t="\ket{\frownie} \dot{=}\ \begin{pmatrix} 0 \\ 1 \end{pmatrix}"
            />
          </Prose>
        </>
      ),
      continue: { label: "Let’s go!" },
    }),

    section({
      name: "eyeSizeVectors",
      body: (m) => {
        const vectorSelectChoices = [
          ["0", <M t="0" />],
          ["1", <M t="1" />],
          ["1/root5", <M t="1/\sqrt{5}" />],
          ["-1/root5", <M t="-1/\sqrt{5}" />],
          ["2/root5", <M t="2/\sqrt{5}" />],
          ["-2/root5", <M t="-2/\sqrt{5}" />],
        ] as const;

        return (
          <>
            <Prose>
              <p>
                Now that we've defined the mood basis states, how would the
                following be represented?
              </p>
            </Prose>

            <Matrix
              label="A small-eyed mouse,&nbsp;"
              labelTex="\ket{\smalleye}"
              column={Matrix.modelToColumn(m.smallVector, (model) => (
                <Dropdown model={model} choices={vectorSelectChoices} />
              ))}
            />

            <Matrix
              label="A wide-eyed mouse,&nbsp;"
              labelTex="\ket{\wideye}"
              column={Matrix.modelToColumn(m.wideVector, (model) => (
                <Dropdown model={model} choices={vectorSelectChoices} />
              ))}
            />
          </>
        );
      },
    }),

    section({
      name: "moodEigenequations",
      body: (m) => (
        <>
          <Prose>
            <p>
              Now we want to find the representation for the <M t="\hat{M}" />{" "}
              operator.
            </p>

            <p>But first, let’s remind ourselves of some things.</p>
          </Prose>

          <LabelsLeft>
            <TextLine
              model={m.happyEigenequation}
              label={<M t="\hat{M}\ket{\smiley} =" />}
            />

            <TextLine
              model={m.sadEigenequation}
              label={<M t="\hat{M}\ket{\frownie} =" />}
            />
          </LabelsLeft>

          <Prose align="center">
            <span className="text-small text-faded">
              You can copy-paste these:
            </span>
            <span
              role="img"
              aria-label="happy face"
              style={{ marginLeft: "1rem" }}
            >
              😁
            </span>
            <span
              role="img"
              aria-label="sad face"
              style={{ marginLeft: "1rem" }}
            >
              😭
            </span>
          </Prose>
        </>
      ),
    }),

    section({
      name: "moodMatrix",
      body: (m) => (
        <>
          <Prose>
            <p>
              Let <M t="\hat{M}" /> be a matrix with unknown elements:
              <M
                display
                t="\hat{M}\ \dot{=}\ \begin{pmatrix} a & b \\ c & d \end{pmatrix}"
              />
              Act <M t="\hat{M}" /> on the mood basis vectors to solve for{" "}
              <M t="a" />, <M t="b" />,
              <M t="c" />, and <M t="d" />.
            </p>

            <p>
              Do this on scrap paper, but input your results here (as decimals):
            </p>
          </Prose>

          <Matrix
            labelTex="\hat{M}"
            matrix={Matrix.modelToMatrix(m.moodMatrix, (model) => (
              <Decimal model={model} />
            ))}
          />
        </>
      ),
    }),

    section({
      name: "moodMatrixDiagonal",
      when: (r) => r.moodMatrix?.[0]?.[1] !== 0 || r.moodMatrix?.[1]?.[0] !== 0,
      body: (
        <Guidance.Disagree>
          Hint: You should find that <M t="b = c = 0" />. Give it another go!
        </Guidance.Disagree>
      ),
    }),
  ],
}));
