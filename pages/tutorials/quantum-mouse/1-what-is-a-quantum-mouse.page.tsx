import {
  ChooseAll,
  Dropdown,
  Image,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";
import mouseBigEyeSvg from "./svgs/mouse-big-eye.svg";
import mouseSmallEyeSvg from "./svgs/mouse-small-eye.svg";

export default page(setup, ({ section, hint }) => ({
  name: "what-is-a-quantum-mouse",
  label: {
    title: "What the Heck is a Quantum Mouse?",
    html: (
      <>
        What the Heck is a <em>Quantum Mouse?</em>
      </>
    ),
  },
  answers: "checked-some",
  sections: [
    section({
      name: "whatIsAQuantumMouseIntro",
      body: (
        <Prose>
          <p>
            Consider a quantum object (a <em>quantum mouse</em>) and some new
            properties we can measure. For example, suppose “eye size,”{" "}
            <M t="\hat{S}" />, is a Hermitian (observable) operator. The
            corresponding physical measurement is “measure the diameter of the
            pupil.”
          </p>

          <p>
            Interestingly, the scale reads either 1 mm (tiny eyes) or 2 mm
            (wide-eyed), but nothing else!
          </p>

          <p className="text-center">
            <M t="\hat{S}" />
            <SmallEyeMouseKet />
            <M t="=\ 1" />
            <SmallEyeMouseKet />
            &nbsp;&nbsp;but&nbsp;&nbsp;
            <M t="\hat{S}" />
            <BigEyeMouseKet />
            <M t="=\ 2" />
            <BigEyeMouseKet />
          </p>

          <p>
            That notation is a bit wacky, but it's allowed! That said, let's
            simplify the kets for smalled-eyed mice and big-eyed mice to{" "}
            <M t="\ket{\smalleye}" /> and <M t="\ket{\wideye}" />, respectively.
          </p>

          <p>
            Note: Being either small-eyed or wide-eyed is totally{" "}
            <em>normal</em>. In fact, let us assume it is <em>ortho</em>normal
            (and complete).
          </p>
        </Prose>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "size",
      body: (m) => {
        const sizeChoices = [
          [
            "kets",
            <>
              <SmallEyeMouseKet /> and <BigEyeMouseKet />
            </>,
          ],
          [
            "value",
            <>
              <M t="1" /> and <M t="2" />
            </>,
          ],
          ["operator", <M t="\hat{S}" />],
        ] as const;

        return (
          <>
            <Prose>
              <strong>Look at the eigen-equations above</strong>, and make sure
              you understand the notation. Which symbols are the eigenvalue(s),
              and which are the eigenvector(s)?
            </Prose>

            <LabelsLeft>
              <Dropdown
                model={m.sizeEigenvalues}
                choices={sizeChoices}
                label="Eigenvalues:"
                placeholder="Select eigenvalues…"
              />

              <Dropdown
                model={m.sizeEigenvectors}
                choices={sizeChoices}
                label="Eigenvectors:"
                placeholder="Select eigenvectors…"
              />
            </LabelsLeft>
          </>
        );
      },
      hints: [
        hint({
          name: "sizeEigen",
          body: (
            <Prose>
              Eigen-equations usually look like:
              <M
                display
                t="(\text{operator}) (\text{eigenvector}) = (\text{eigenvalue}) \cdot (\text{eigenvector})"
              />
              This is still true even if there are mice involved!
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "hiddenUnits",
      body: (m) => (
        <>
          <Prose>Let's think some more about those eigen-equations.</Prose>

          <LabelsLeft>
            <Toggle
              model={m.hiddenUnits}
              choices={[
                ["yes", "Yes"],
                ["no", "No"],
              ]}
              label="Do any numbers have “hidden” units?"
            />
          </LabelsLeft>

          <Prose>
            If so, is that OK? Can you think of times we might have seen that
            before?
          </Prose>
        </>
      ),
      hints: [
        hint({
          name: "hiddenUnits",
          body: (
            <Prose>
              <p>
                When we say “hidden units,” we mean are there any numbers in the
                equations that have units that we haven't written down?
              </p>

              <p>
                When a number has units, it usually corresponds with something
                that can be physically measured.
              </p>
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "smallBigInnerProduct",
      body: (m) => (
        <>
          <Prose>
            What can you say about the numerical value of{" "}
            <M t="\braket{\smalleye|\wideye}" />?
          </Prose>

          <LabelsLeft>
            <Dropdown
              model={m.smallBigInnerProduct}
              choices={innerProductChoices}
              label={<M t="\braket{\smalleye|\wideye} = " />}
            />

            <TextBox model={m.smallBigInnerProductExplain} label="Explain:" />
          </LabelsLeft>
        </>
      ),
      continue: { label: "Let’s check in" },
      hints: [
        hint({
          name: "smallBigInnerProduct",
          body: (
            <Prose>
              We said they‘re <em>orthonormal!</em>
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "sizeEigenvaluesCheck",
      when: (r) =>
        r.sizeEigenvalues?.selected !== "value" ||
        r.sizeEigenvectors?.selected !== "kets",
      body: (
        <Prose>
          You might want to take another look at the first two questions on this
          page. Here’s what eigen-equations look like:
          <M
            display
            t="(\text{operator}) (\text{eigenvector}) = (\text{eigenvalue}) \cdot (\text{eigenvector})"
          />
        </Prose>
      ),
    }),

    section({
      name: "bigBigInnerProduct",
      when: (r) => r.smallBigInnerProduct?.selected === "0",
      body: (m) => (
        <>
          <Prose>
            What about <M t="\braket{\wideye|\wideye}" />?
          </Prose>

          <LabelsLeft>
            <Dropdown
              model={m.bigBigInnerProduct}
              choices={innerProductChoices}
              label={<M t="\braket{\wideye|\wideye} = " />}
            />
          </LabelsLeft>
        </>
      ),
    }),

    section({
      name: "orthonormalDefinition",
      when: (r) => r.smallBigInnerProduct?.selected !== "0",
      body: (m) => (
        <>
          <Prose>
            We said that the the pair of vectors <M t="\ket{\smalleye}" /> and{" "}
            <M t="\ket{\wideye}" /> is <em>orthonormal</em>.
          </Prose>

          <ChooseAll
            model={m.orthonormalDefinition}
            choices={[
              ["orthogonal", "They’re orthogonal"],
              ["90deg", "They’re at a 90 degree angle to one another"],
              [
                "0 inner product",
                "Their inner product (like their dot product) is equal to 0",
              ],
              [
                "normalized",
                "The inner product of either vector WITH ITSELF is equal to 1",
              ],
            ]}
            label={
              <Prose>
                If a pair of vectors is orthonormal, this also means… (Check ALL
                that apply)
              </Prose>
            }
          />
        </>
      ),
    }),
  ],
}));

function SmallEyeMouseKet() {
  return (
    <>
      <M t="\large|" />
      <Image src={mouseSmallEyeSvg} inline alt="Mouse with small eyes" />
      <M t="\large\rangle" />
    </>
  );
}

function BigEyeMouseKet() {
  return (
    <>
      <M t="\large|" />
      <Image src={mouseBigEyeSvg} inline alt="Mouse with wide eyes" />
      <M t="\large\rangle" />
    </>
  );
}

const innerProductChoices = [
  ["0", "0"],
  ["1", "1"],
  ["complex", "Some complex number, but not enough info"],
] as const;
