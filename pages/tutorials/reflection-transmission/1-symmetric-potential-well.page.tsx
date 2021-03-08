import { Prose } from "@/design";
import { FieldGroup, Text, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import React from "react";
import { SymmetricWellPotential } from "./figures";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "symmetricPotentialWell",
  label: "The Symmetric Potential Well",
  answers: "none",
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
                  down if the physical situation involves particles approaching
                  the well from the RIGHT.
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
  ],
}));
