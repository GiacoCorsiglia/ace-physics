import { Prose } from "@/design";
import { Decimal, FieldGroup, TextArea, Toggle } from "@/inputs";
import { pretest } from "@/tutorial";
import React from "react";
import pretest1 from "./assets/pretest-1.png";
import pretest2 from "./assets/pretest-2.png";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <>
          <Toggle
            model={m.predictForSingleElectron}
            label={
              <Prose>
                <img
                  src={pretest1}
                  alt="Experimental setup with with a beam of electrons passing through a Stern-Gerlach apparatus oriented along the Z-axis."
                  style={{ maxWidth: "300px" }}
                />

                <p>
                  Can you predict the value of the z-component of the spin for a
                  single electron passing through this detector (above)?
                </p>
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextArea
            model={m.predictForSingleElectronExplain}
            label={<Prose>Why or why not?</Prose>}
          />
        </>
      ),
    }),

    section({
      body: (
        <Prose>
          <p>
            After the first Stern-Gerlach analyzer, 500 particles emerge from
            the top port and continue to the next analyzer (as depicted below).
          </p>

          <img src={pretest2} alt="" />
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            What would be the subsequent readings at Detector A and Detector B?
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal model={m.readingDetectorA} label="Detector A: " />
            <Decimal model={m.readingDetectorB} label="Detector B: " />
          </FieldGroup>

          <TextArea
            model={m.readingsExplain}
            label={<Prose>Briefly, explain your reasoning:</Prose>}
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <TextArea
          model={m.xSpinAtDetectorA}
          label={
            <Prose>
              Of the particles arriving at Detector A, what is the value of the
              x-component of the spin? If it cannot be determined, explain your
              reasoning.
            </Prose>
          }
        />
      ),
    }),
  ],
}));
