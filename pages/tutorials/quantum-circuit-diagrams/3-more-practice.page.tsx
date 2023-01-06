import { ChooseOne, M, Prose, QC, TextBox } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "morePractice",
  label: "More Practice",
  answers: "none",
  sections: [
    section({
      name: "morePracticeIntro",
      body: (
        <Prose>Additional practice with some slightly tougher circuits.</Prose>
      ),
      continue: {
        label: "I’m ready!",
      },
    }),

    section({
      name: "inverseOfX",
      body: (m) => (
        <>
          <ChooseOne
            model={m.inverseOfX}
            label={
              <Prose>
                <p>
                  What does the second gate have to be to make this circuit
                  behave as shown no matter what the input state is?
                </p>

                <QC t="\lstick{ \ket{\psi} }& \gate{X} & \gate{?} & \qw & \rstick{\ket{\psi}}" />
              </Prose>
            }
            choices={[
              ["X", <M t="? = X" />],
              ["Z", <M t="? = Z" />],
              ["H", <M t="? = H" />],
              ["I", <M t="? = I" />],
            ]}
          />

          <Prose>
            <em>Hint:</em> Another way to ask this is: find an operator{" "}
            <M t="?" /> such that <M t="X? = I" />. This operator is called the{" "}
            <em>inverse</em> of <M t="X" />.
          </Prose>
        </>
      ),
    }),

    section({
      name: "outputZHPlus",
      body: (m) => (
        <>
          <TextBox
            model={m.outputZHPlus}
            label={
              <Prose>
                What is the output of the following circuit?
                <QC t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{H} & \gate{Z} & \qw" />
              </Prose>
            }
          />
          {/* TODO: Multiple choice.  Phase dropdown, state dropdown */}
        </>
      ),
    }),

    section({
      name: "outputHZPlus",
      body: (m) => (
        <>
          <TextBox
            model={m.outputHZPlus}
            label={
              <Prose>
                What is the output of the following circuit?
                <QC t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{Z} & \gate{H} & \qw" />
              </Prose>
            }
          />
          {/* TODO: Multiple choice */}
        </>
      ),
    }),

    section({
      name: "doHZCommute",
      body: (m) => (
        <TextBox
          model={m.doHZCommute}
          label={
            <Prose>
              Given the answers on this page, can you say whether <M t="H" />{" "}
              commutes with <M t="Z" /> without bothering to multiply matrices
              in different orders?
            </Prose>
          }
        />
      ),
    }),
  ],
}));
