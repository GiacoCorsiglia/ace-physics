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
    "rotatingSpin",
  ],
  pretest: {
    predictForSingleElectron: f.chooseOne(["yes", "no"]),
    predictForSingleElectronExplain: f.string(),
    readingDetectorA: f.number(),
    readingDetectorB: f.number(),
    readingsExplain: f.string(),
    xSpinAtDetectorA: f.string(),
  },
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
    "probUpUpOver1",
    "probUpUpIncorrect",
    "probUpDown",
    "repeatedMeasurementsConclusions",

    // spinAlongOtherAxes.
    "spinAlongOtherAxesIntro",
    "setupForUpZDownX",
    "setupForUpZDownXCheck",
    "setupForUpZDownXReversed",
    "setupForUpZDownXIncorrect",
    "setupForUpZDownXCorrect",
    "outInTable",
    "outInTableFeedback",

    // determiningAnUnknownState.
    "determiningAnUnknownStateIntro",
    "unknown2Coefficients",
    "unknown2Measurements",
    "unknown2CoefficientsIncorrect",
    "unknown2CoefficientsCorrect",

    // anotherUnknownState.
    "anotherUnknownStateIntro",
    "anotherUnknownStateStrategy",
    "unknown1Table",
    "unknown1TableFeedback",
    "unknown1Ket",
    "unknown1KetClarified",
    "unknown1KetFeedback",
    "unknown1Ambiguity",
    "unknown1AmbiguityFeedback",
    "unknown1Randomness",
    "unknown1RandomnessCorrect",
    "unknown1RandomnessIncorrect",

    // rotatingSpin.
    "rotatingSpinIntro",
  ],
  responses: {
    predictSingleOutcome: f.chooseOne(["yes", "no"]),
    predictExactNumbers: f.chooseOne(["yes", "no"]),
    probSpinUp: f.number(),
    probSpinDown: f.number(),
    smallVariationFrom5050: f.chooseOne(["funny", "in-between", "fluke"]),
    mediumVariationFrom5050: f.chooseOne(["funny", "in-between", "fluke"]),
    largeVariationFrom5050: f.chooseOne(["funny", "in-between", "fluke"]),
    variationFrom5050Explain: f.string(),
    quantitativeStdDev: f.string(),

    probUpUp: f.number(),
    probUpDown: f.number(),
    probUpDownDirac: f.string(),
    repeatedMeasurementsConclusions: f.string(),

    setupForUpZDownXCheck: f.chooseOne(["z-x", "x-z", "none"]),
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

    anotherUnknownStateStrategy: f.string(),
    unknown1Table: f.object({
      up: f.object({ x: f.number(), y: f.number(), z: f.number() }),
      down: f.object({ x: f.number(), y: f.number(), z: f.number() }),
    }),
    unknown1Ket: f.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    unknown1KetClarified: f.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    unknown1Ambiguity: f.string(),
    unknown1TotallyRandom: f.chooseOne(["yes", "no"]),
    unknown1Undetermined: f.chooseOne(["yes", "no"]),
    unknown1FromThermalSource: f.chooseOne(["yes", "no"]),
    unknown1RandomnessExplain: f.string(),
  },
  hints: ["howToUseSim", "tenThousandSpins", "outInTableIsSimNecessary"],
});
