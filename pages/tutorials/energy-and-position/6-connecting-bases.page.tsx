import { M, Prose, TextBox } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "connectingBases",
  label: "Wrap Up: Connecting Bases",
  answers: "none",
  sections: [
    section({
      name: "connectingBasesIntro",
      body: (
        <Prose>
          <p>
            In the position basis, our energy eigenstates are represented as{" "}
            <M t="\ket{E_1} \doteq \phi_1(x)" />,{" "}
            <M t="\ket{E_2} \doteq \phi_2(x)" />, etc. We call{" "}
            <M t="\phi_1 (x)" /> the “ground state wave function,” and{" "}
            <M t="\phi_2 (x)" /> the “first excited energy state wave function,”
            etc.
          </p>

          <p>
            Recall, our original state was
            <M
              display
              t="
            \ket{\psi_A}
            = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
            + \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
            + \frac{1}{\sqrt{6}} \ket{E_4}
            "
            />
            You worked out that this state was written in the energy basis as:
            <M
              display
              t="\ket{\psi_A} \doteq \begin{pmatrix} \sqrt{2/6} \\[0.3em] \sqrt{3/6} \\[0.3em] 0 \\[0.3em] \sqrt{1/6} \\[0em] \vdots \end{pmatrix}_E"
            />
            Later, we also said that same state was given in the position basis
            as
            <M display t="\ket{\psi_A} \doteq \psi_A(x)" />
          </p>
        </Prose>
      ),
      continue: { label: "Much Learned" },
    }),

    section({
      name: "ketInEnergyBasisFunc",
      body: (m) => (
        <>
          <TextBox
            model={m.ketInEnergyBasisFunc}
            label={
              <Prose>
                Combine the information on this page to express{" "}
                <M t="\psi_A(x)" /> directly in terms of the energy basis wave
                functions
                <M t="\phi_n (x)" />.
              </Prose>
            }
          />

          <Prose faded>
            You can write <M t="1/\sqrt{N}" /> as “1/sqrt(N)”, and write “psi_n”
            and “phi_n”, or copy-paste:
            <br />ψ and φ
          </Prose>
        </>
      ),
    }),

    /*[This is going to be really hard to have them write, but I think we could
  maybe come up with a couple options? Or give them the expression and ask them
  to describe it/unpack it. We could ask “how is this similar to what you’ve
  learned previously in spins” We have to be careful about anything specific
  because we’re trying not to assume infinite square well …even though that is
  where the functions come from.*/

    section({
      name: "posQuestionsEnergyBasis",
      body: (m) => (
        <>
          <TextBox
            model={m.posQuestionsEnergyBasis}
            label={
              <Prose>
                Given all the results above, could you answer any “position
                related” questions (e.g. probabilities of position measurements,
                or expectation values of position) if you were only given the
                energy representation for this state?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "toThinkAbout",
      body: (m) => (
        <>
          <TextBox
            model={m.toThinkAbout}
            label={
              <Prose>
                <em>To think about:</em> how about vice-versa, do you think you
                could answer any “energy related” questions (e.g. probabilities
                of energy measurements, or expectation values) if you were only
                given the position wave function <M t="\psi_A(x)" />?
              </Prose>
            }
          />
        </>
      ),
      continue: { allowed: () => true },
    }),
  ],
}));
