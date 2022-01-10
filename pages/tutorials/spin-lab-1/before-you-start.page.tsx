import {
  Decimal,
  Image,
  LabelsLeft,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { pretest } from "@/tutorial";
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
                <Image
                  src={pretest1}
                  alt="Experimental setup with with a beam of electrons passing through a Stern-Gerlach apparatus oriented along the Z-axis."
                  maxWidth="300px"
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

          <TextBox
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

          <Image
            src={pretest2}
            alt="A chain of 3 S-G analyzers.  Z, X, then Z again.  500 particles emerge from the upper port of the first Z analyzer and enter the X analyzer.  Some number of particles then emerge from the lower port of the X analyzer and enter the last Z analyzer.  Detector A detects particles emerging from the upper port of the last Z analyzer; Detector B detects particles emerging from the lower port."
          />
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            What would be the subsequent readings at Detector A and Detector B?
          </Prose>

          <LabelsLeft>
            <Decimal model={m.readingDetectorA} label="Detector A: " />
            <Decimal model={m.readingDetectorB} label="Detector B: " />
          </LabelsLeft>

          <TextBox
            model={m.readingsExplain}
            label={<Prose>Briefly, explain your reasoning:</Prose>}
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <TextBox
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
