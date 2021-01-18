import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

const OutInTableRow = f.object({
  upZ: f.number(),
  downZ: f.number(),
  upX: f.number(),
  downX: f.number(),
  upY: f.number(),
  downY: f.number(),
});

export default tutorialSchema({
  pages: [
    "spinZExperiment",
    "repeatedMeasurements",
    "spinAlongOtherAxes",
    "determiningAnUnknownState",
    "anotherUnknownState",
    "filteringSpin",
    "challenge",
  ],
  pretest: {},
  sections: [
    // spinZExperiment.
    "spinZIntro",
    "spinZSetup",
    "initialPredictions",
    "tenThousandSpins",
    "quantitativeStdDev",

    // repeatedMeasurements.
    "repeatedMeasurementsIntro",
    "repeatedMeasurementsRun",
    "probUpUp",
    "probUpDown",
    "repeatedMeasurementsConclusions",

    // spinAlongOtherAxes.
    "spinAlongOtherAxesIntro",
    "setupForUpZDownX",
    "outInTable",

    // determiningAnUnknownState.
    "determiningAnUnknownStateIntro",
    "unknown2Coefficients",
    "unknown2Measurements",
    "javaSimExploration",

    // anotherUnknownState.
    "anotherUnknownStateIntro",
    "unknown1Table",
    "unknown1Ket",
    "unknown1Measurements",
    "unknown1Ambiguity",
    "unknown1Randomness",

    // filteringSpin.
    "filteringSpinIntro",

    // challenge.
    "challengeIntro",
  ],
  responses: {
    predictSingleOutcome: f.chooseOne(["yes", "no"]),
    predictExactNumbers: f.chooseOne(["yes", "no"]),
    probSpinUp: f.number(),
    probSpinDown: f.number(),
    smallVariationFrom5050: f.chooseOne(["funny", "fluke"]),
    mediumVariationFrom5050: f.chooseOne(["funny", "fluke"]),
    largeVariationFrom5050: f.chooseOne(["funny", "fluke"]),
    variationFrom5050Explain: f.string(),
    quantitativeStdDev: f.string(),

    probUpUp: f.number(),
    probUpDown: f.number(),
    probUpDownDirac: f.string(),
    repeatedMeasurementsConclusions: f.string(),

    outInTable: f.object({
      upZ: OutInTableRow,
      downZ: OutInTableRow,
      upX: OutInTableRow,
      downX: OutInTableRow,
      upY: OutInTableRow,
      downY: OutInTableRow,
    }),

    unknown2CoefficientA: f.string(),
    unknown2CoefficientB: f.string(),
    unknown2Measurements: f.string(),
    javaSimExploration: f.string(),

    unknown1Table: f.object({
      up: f.object({ x: f.number(), y: f.number(), z: f.number() }),
      down: f.object({ x: f.number(), y: f.number(), z: f.number() }),
    }),
    unknown1Ket: f.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    unknown1Measurements: f.string(),
    unknown1Ambiguity: f.string(),
    unknown1TotallyRandom: f.chooseOne(["yes", "no"]),
    unknown1Undetermined: f.chooseOne(["yes", "no"]),
    unknown1FromThermalSource: f.chooseOne(["yes", "no"]),
    unknown1RandomnessExplain: f.string(),
  },
  hints: ["outInTableIsSimNecessary"],
});
