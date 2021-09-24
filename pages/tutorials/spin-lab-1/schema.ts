import * as s from "@/schema/tutorial";

const OutInTableRow = s.object({
  upZ: s.number(),
  downZ: s.number(),
  upX: s.number(),
  downX: s.number(),
  upY: s.number(),
  downY: s.number(),
});

export default s.tutorial({
  pages: {
    spinZExperiment: s.page(),
    repeatedMeasurements: s.page(),
    spinAlongOtherAxes: s.page(),
    determiningAnUnknownState: s.page(),
    anotherUnknownState: s.page(),
    rotatingSpin: s.page(),
  },
  pretest: {
    predictForSingleElectron: s.chooseOne(["yes", "no"]),
    predictForSingleElectronExplain: s.string(),
    readingDetectorA: s.number(),
    readingDetectorB: s.number(),
    readingsExplain: s.string(),
    xSpinAtDetectorA: s.string(),
  },
  sections: {
    // spinZExperiment.
    spinZIntro: s.section(),
    spinZSetup: s.section(),
    initialPredictions: s.section(),
    tenThousandSpins: s.section(),
    quantitativeStdDev: s.section(),

    // repeatedMeasurements.
    repeatedMeasurementsIntro: s.section(),
    repeatedMeasurementsRun: s.section(),
    probUpUp: s.section(),
    probUpUpOver1: s.section(),
    probUpUpIncorrect: s.section(),
    probUpDown: s.section(),
    repeatedMeasurementsConclusions: s.section(),

    // spinAlongOtherAxes.
    spinAlongOtherAxesIntro: s.section(),
    setupForUpZDownX: s.section(),
    setupForUpZDownXCheck: s.section(),
    setupForUpZDownXReversed: s.section(),
    setupForUpZDownXIncorrect: s.section(),
    setupForUpZDownXCorrect: s.section(),
    outInTable: s.section(),
    outInTableFeedback: s.section(),

    // determiningAnUnknownState.
    determiningAnUnknownStateIntro: s.section(),
    unknown2Coefficients: s.section(),
    unknown2Measurements: s.section(),
    unknown2CoefficientsIncorrect: s.section(),
    unknown2CoefficientsCorrect: s.section(),

    // anotherUnknownState.
    anotherUnknownStateIntro: s.section(),
    anotherUnknownStateStrategy: s.section(),
    unknown1Table: s.section(),
    unknown1TableFeedback: s.section(),
    unknown1Ket: s.section(),
    unknown1KetClarified: s.section(),
    unknown1KetFeedback: s.section(),
    unknown1Ambiguity: s.section(),
    unknown1AmbiguityFeedback: s.section(),
    unknown1Randomness: s.section(),
    unknown1RandomnessCorrect: s.section(),
    unknown1RandomnessIncorrect: s.section(),

    // rotatingSpin.
    rotatingSpinIntro: s.section(),
  },
  responses: {
    predictSingleOutcome: s.chooseOne(["yes", "no"]),
    predictExactNumbers: s.chooseOne(["yes", "no"]),
    probSpinUp: s.number(),
    probSpinDown: s.number(),
    smallVariationFrom5050: s.chooseOne(["funny", "in-between", "fluke"]),
    mediumVariationFrom5050: s.chooseOne(["funny", "in-between", "fluke"]),
    largeVariationFrom5050: s.chooseOne(["funny", "in-between", "fluke"]),
    variationFrom5050Explain: s.string(),
    quantitativeStdDev: s.string(),

    probUpUp: s.number(),
    probUpDown: s.number(),
    probUpDownDirac: s.string(),
    repeatedMeasurementsConclusions: s.string(),

    setupForUpZDownXCheck: s.chooseOne(["z-x", "x-z", "none"]),
    outInTable: s.object({
      upZ: OutInTableRow,
      downZ: OutInTableRow,
      upX: OutInTableRow,
      downX: OutInTableRow,
      upY: OutInTableRow,
      downY: OutInTableRow,
    }),

    unknown2CoefficientA: s.string(),
    unknown2CoefficientB: s.string(),
    unknown2Measurements: s.string(),
    javaSimExploration: s.string(),

    anotherUnknownStateStrategy: s.string(),
    unknown1Table: s.object({
      up: s.object({ x: s.number(), y: s.number(), z: s.number() }),
      down: s.object({ x: s.number(), y: s.number(), z: s.number() }),
    }),
    unknown1Ket: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    unknown1KetClarified: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    unknown1Ambiguity: s.string(),
    unknown1TotallyRandom: s.chooseOne(["yes", "no"]),
    unknown1Undetermined: s.chooseOne(["yes", "no"]),
    unknown1FromThermalSource: s.chooseOne(["yes", "no"]),
    unknown1RandomnessExplain: s.string(),
  },
  hints: {
    howToUseSim: s.hint(),
    tenThousandSpins: s.hint(),
    outInTableIsSimNecessary: s.hint(),
  },
});
