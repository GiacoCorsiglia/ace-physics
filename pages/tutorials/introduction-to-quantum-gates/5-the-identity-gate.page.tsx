import { Callout, M, Prose, TextBox, Toggle } from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "identityGate",
  label: "The Identity Gate",
  answers: "none",
  sections: [
    section({
      name: "identityGateIntro",
      body: (
        <Prose>
          The identity gate is like multiplying by 1. It does nothing, but
          sometimes it is useful to multiply by 1. In matrix notation, it is the
          identity matrix:
          <M display t="I = \pmatrix{1 & 0 \\ 0 & 1}" />
        </Prose>
      ),
    }),

    section({
      name: "identityGateTimesKet",
      body: (m) => (
        <>
          <Prose>
            Compute{" "}
            <M t="I \left( \frac{1}{\sqrt{2}} (\ket{0}-\ket{1}) \right)" />.
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Do this on scrap paper.
          </Callout>

          <Toggle
            model={m.identityGateTimesKet}
            label={
              <Prose>
                Did acting with <M t="I" /> change this state?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it’s a different state"],
              ["no", "No, it’s the same state"],
            ]}
          />
        </>
      ),
    }),

    section({
      name: "isOperatorIdentity",
      body: (m) => (
        <TextBox
          model={m.isOperatorIdentity}
          label={
            <Prose>
              We have seen that <M t="Z\ket{0}=\ket{0}" /> and that{" "}
              <M t="H^2\ket{0}=\ket{0}" />. At first glance, you might think
              that this means both <M t="Z" /> and
              <M t="H^2" /> are equal to <M t="I" />. However, we know that
              <M t="Z \neq I" /> (but it turns out that <M t="H^2 = I" />
              ). How do you decide if an operator is equal to the identity?
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "xAndZSquaredEqualsI",
      body: (m) => (
        <>
          <Toggle
            model={m.xAndZSquaredEqualsI}
            label={
              <Prose>
                True or False: <M t="X^2 = Z^2=I" />
              </Prose>
            }
            choices={[
              ["true", "True"],
              ["false", "False"],
            ]}
          />

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Check this on scrap paper.
          </Callout>
        </>
      ),
    }),
  ],
}));
