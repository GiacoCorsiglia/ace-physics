import { Decimal, M, Matrix, Prose, TextBox, Toggle } from "@/components";
import { pretest } from "@/tutorial";
import pretestGraphImg from "./assets/pretest-graph.png";
import pretestSGImg from "./assets/pretest-s-g-setup.png";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (
        <Prose>
          <p>
            Many identical particles are prepared in initial state
            <M t="\ket{\psi_i}" /> and are then sent through an analyzer
            depicted here.
          </p>

          <img
            src={pretestSGImg}
            width={1022}
            height={518}
            alt=""
            style={{ maxWidth: "350px" }}
          />

          <p className="text-center">
            <strong>Data:</strong>
            <br />
            1000 particles enter from the left.
            <br />
            150 particles are measured in detector 3.
          </p>
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Decimal
            model={m.countDetector1}
            label={
              <Prose>
                How many particles (on average) show up in Detector #1?
              </Prose>
            }
          />

          <TextBox
            model={m.countDetector1Explain}
            label={<Prose>Briefly, explain:</Prose>}
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Toggle
            model={m.canDeterminePsii}
            label={
              <Prose>
                Are you able to determine the exact incident state{" "}
                <M t="\ket{\psi_i}" /> from the information given?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextBox
            model={m.canDeterminePsiiExplain}
            label={<Prose>If so, what is it? If not, why not?</Prose>}
          />
        </>
      ),
    }),

    section({
      body: (
        <>
          <Prose>
            <p>
              Consider the 2-D spatial vector <M t="\vb{v}" /> shown here.
            </p>

            <img src={pretestGraphImg} width={249} height={228} alt="" />
          </Prose>
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            Construct a <strong>normalized</strong> column vector{" "}
            <M t="\ket{v}" /> to represent this state.
          </Prose>

          <Matrix
            labelTex="\ket{v}"
            column={Matrix.modelToColumn(m.normalizedV, (model) => (
              <Decimal model={model} />
            ))}
          />
        </>
      ),
    }),

    section({
      body: (
        <Prose>
          Consider the operator <M t="\hat{R}" /> defined by a matrix
          <M
            display
            t="\hat{R} \doteq \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}"
          />
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <TextBox
          model={m.rTimesVExplain}
          label={
            <Prose>
              Describe in words what <M t="\hat{R}\ket{v}" /> is (with{" "}
              <M t="\ket{v}" /> given above).
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <>
          <Toggle
            model={m.doesREffectAllVectorsSame}
            label={<Prose>Does R affect all vectors the same way?</Prose>}
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextBox
            model={m.doesREffectAllVectorsSameExplain}
            label={<Prose>Briefly, explain:</Prose>}
          />
        </>
      ),
    }),
  ],
}));
