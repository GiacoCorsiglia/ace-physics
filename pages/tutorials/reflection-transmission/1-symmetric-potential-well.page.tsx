import { Help, Info, Prose } from "@/design";
import { arraysEqual } from "@/helpers";
import { ChooseAll, FieldGroup, Text, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import React from "react";
import { SymmetricWellPotential } from "./figures";
import setup from "./setup";

export default page(setup, ({ section, oneOf }) => ({
  name: "symmetricPotentialWell",
  label: "The Symmetric Potential Well",
  answers: "checked-some",
  sections: [
    section({
      name: "symmetricPotentialWellIntro",
      body: (
        <>
          <Prose>
            The figure shows a graph of the potential energy (PE) for a 1-D
            system:
            <M
              display
              t="
                V(x) =
                \begin{cases}
                  0 & |x| > a \\
                  -V_0 & |x| < a
                \end{cases}
                "
            />
          </Prose>

          <SymmetricWellPotential />

          <Prose>
            Take a moment to confirm that the formula matches with the graph.
          </Prose>
        </>
      ),
      continue: { label: "Looks good" },
    }),

    section({
      name: "unitsOfV0",
      body: (m) => (
        <Text
          model={m.unitsOfV0}
          label={
            <Prose>
              What are the units of <M t="V_0" />?
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "generalSolution",
      body: (m) => (
        <>
          <Prose>
            Write down a general solution to the time-independent Schrödinger
            equation for each region for a particle with total energy
            <M t="E>0" /> as shown.
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Text
              model={m.generalSolution.properties.regionI}
              label="Region I:"
            />

            <Text
              model={m.generalSolution.properties.regionII}
              label="Region II:"
            />

            <Text
              model={m.generalSolution.properties.regionIII}
              label="Region III:"
            />
          </FieldGroup>

          <TextArea
            model={m.generalSolutionNewSymbols}
            label={<Prose>Define any new symbols you used:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "generalSolutionConstraints",
      body: (m) => (
        <>
          <TextArea
            model={m.generalSolutionConstraints}
            label={
              <Prose>
                <p>
                  Describe (in words) the constraints on the equations you wrote
                  down if the physical situation involves only particles
                  approaching the well from the RIGHT.
                </p>
              </Prose>
            }
            minRows={4}
          />

          <TextArea
            model={m.generalSolutionPhysicalInterpretation}
            label={
              <Prose>
                Interpret the physical meaning of all nonzero terms:
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "fromRightNonzeroTerms",
      body: (m) => (
        <>
          <Prose>
            <p>There will be at most two terms in each region.</p>

            <p>
              Suppose again that particles approach the well only from the
              RIGHT. Select ALL of the terms that are NOT zero.
            </p>
          </Prose>

          <FieldGroup className="margin-top-1" grid>
            <ChooseAll
              model={m.fromRightNonzeroTerms.properties.regionI}
              label="Region I:"
              choices={[
                ["rightward", <M t="Ae^{ikx}" />],
                ["leftward", <M t="Be^{-ikx}" />],
              ]}
              allowOther={false}
            />

            <ChooseAll
              model={m.fromRightNonzeroTerms.properties.regionII}
              label="Region II:"
              choices={[
                ["rightward", <M t="Ce^{i\kappa x}" />],
                ["leftward", <M t="De^{-i \kappa x}" />],
              ]}
              allowOther={false}
            />

            <ChooseAll
              model={m.fromRightNonzeroTerms.properties.regionIII}
              label="Region III:"
              choices={[
                ["rightward", <M t="Fe^{ikx}" />],
                ["leftward", <M t="Ge^{-ikx}" />],
              ]}
              allowOther={false}
            />
          </FieldGroup>

          <Prose>
            <em>
              The coefficients (<M t="A, B," prespace={false} /> etc.) are just
              constants.
            </em>
          </Prose>
        </>
      ),
      continue: {
        allowed: ({ responses }) => {
          const fromRightNonzeroTerms = responses?.fromRightNonzeroTerms;
          const rI = fromRightNonzeroTerms?.regionI?.selected?.length;
          const rII = fromRightNonzeroTerms?.regionII?.selected?.length;
          const rIII = fromRightNonzeroTerms?.regionIII?.selected?.length;
          // At least one of them must have nonzero length---means at least one
          // of the boxes must be checked before they can move on.  But they
          // don't have to check a box in every region.
          return !!(rI || rII || rIII);
        },
      },
    }),

    section({
      name: "fromRightNonzeroTermsGuidance",
      body: (_, { responses }) => {
        const fromRightNonzeroTerms = responses?.fromRightNonzeroTerms;
        const rI = fromRightNonzeroTerms?.regionI?.selected;
        const rII = fromRightNonzeroTerms?.regionII?.selected;
        const rIII = fromRightNonzeroTerms?.regionIII?.selected;

        const rIAgree = arraysEqual(rI, ["leftward"]);
        const rIIAgree = arraysEqual(rII, ["leftward", "rightward"]);
        const rIIIAgree = arraysEqual(rIII, ["leftward", "rightward"]);

        if (rIAgree && rIIAgree && rIIIAgree) {
          return (
            <Help>
              <Prose>Excellent work—we agree with your answer.</Prose>
            </Help>
          );
        }

        const rIAll = arraysEqual(rI, ["leftward", "rightward"]);
        const rIIIAsIfFromLeft = arraysEqual(rIII, ["rightward"]);
        if (rIAll && rIIAgree && (rIIIAgree || rIIIAsIfFromLeft)) {
          // Everything is checked OR their answer looks like they thought the
          // particle was approaching from the LEFT not the RIGHT.
          return (
            <Info>
              <Prose>
                Particles approaching from the RIGHT means that there are no
                particles approaching from the LEFT.
              </Prose>
            </Info>
          );
        }

        if (!(rI?.length && rII?.length && rIII?.length)) {
          // There is at least one region in which nothing is checked.
          return (
            <Info>
              <Prose>
                Heads up—there’s at least one nonzero term in each region.
              </Prose>
            </Info>
          );
        }

        return (
          <Info>
            <Prose>Heads up—we disagree with your previous answer.</Prose>
          </Info>
        );
      },
    }),
  ],
}));
