import * as s from "@/schema/tutorial";

const TableRow = s.object({
  phaseDifference: s.chooseOne(["0", "pi/2", "pi", "-pi/2", "other"]),
  equationProbAmp: s.chooseOne([
    "ψ1 + ψ2",
    "-iψ1 + ψ2",
    "-ψ1 + ψ2",
    "iψ1 + ψ2",
  ]),
  equationProbDens: s.chooseOne([
    "ψ1^2 + ψ2^2 + ψ1ψ2",
    "ψ1^2 + ψ2^2",
    "ψ1^2 + ψ2^2 - ψ1ψ2",
  ]),
  graphProbDens: s.chooseOne(["t000", "t025", "t050"]),
});

export default s.tutorial({
  pages: {
    timeEvolutionInfiniteSquareWellPotential: s.page(),
    anEnergyEigenstate: s.page(),
    aSuperpositionOfEigenstates: s.page(),
    timeEvolution: s.page(),
  },
  pretest: {
    firstExcitedProbRightHalfChanges: s.chooseOne(
      ["true", "false"],
      s.string(),
    ),
    firstExcitedProbE2Changes: s.chooseOne(["true", "false"], s.string()),
    superpositionProbRightHalfChanges: s.chooseOne(
      ["true", "false"],
      s.string(),
    ),
    superpositionProbE2Changes: s.chooseOne(["true", "false"], s.string()),
  },
  posttest: {
    // This is misnamed now, oops.
    firstExcitedProbRightHalfChanges: s.chooseOne(["true", "false"]),
    firstExcitedProbRightHalfChangesExplain: s.string(),
    superpositionProbE2Changes: s.chooseOne(["true", "false"]),
    superpositionProbE2ChangesExplain: s.string(),
    superpositionGroundSecondExcitedState: s.chooseOne([
      "maximal",
      "=0, minimal",
      ">0, minimal",
      "between minimum and maximum",
    ]),
    superpositionGroundSecondExcitedStateExplain: s.string(),
  },
  sections: {
    timeEvolutionInfiniteSquareWellPotentialIntro: s.section(),
    groundStateGraph: s.section({
      messages: ["nodes", "correct", "sin^2"],
    }),
    timeEvolvedGroundState: s.section(),
    timeEvolvedGroundStateChoice: s.section({
      messages: ["no time dependence", "none", "+E_1", "-E_1", "E_n"],
    }),
    timeEvolutionDescription: s.section(),
    rotationDirection: s.section({
      messages: ["delayedFeedback"],
    }),
    probDensPlot: s.section({
      messages: ["true", "false"],
    }),
    difTimePlot: s.section({
      messages: ["exp(-i 3pi/ 2) feedback", "answer"],
    }),
    wholeFunctionTimeDependencePlot: s.section(),
    // Legacy sections.
    groundStateSketch: s.section(),

    anEnergyEigenstateIntro: s.section(),
    simSetup: s.section(),
    prevGraphComparison: s.section(),
    rotationDirectionFeedback: s.section(),
    simGraphComparison: s.section(),
    rotationPeriods: s.section({
      messages: [
        "rotationPeriodsOffByFactor",
        "rotationPeriodsIncorrect",
        "rotationPeriod1Incorrect",
        "rotationPeriod2Incorrect",
        "rotationPeriodsCorrect",
        "rotationPeriodsClose",
      ],
    }),
    comparePeriodicPsi2: s.section({
      messages: ["comparePeriodicPsi2Correct", "comparePeriodicPsi2Incorrect"],
    }),
    verifyRotationPeriod2: s.section(),
    studentStatementsOnTimeEvolution: s.section(),
    studentStatementsOnTimeEvolutionGuidance: s.section(),
    // Legacy.
    rotationPeriodsCorrect: s.section(),
    rotationPeriodsClose: s.section(),
    rotationPeriodsOffByFactor: s.section(),
    rotationPeriodsIncorrect: s.section(),
    comparePeriodicPsi2Correct: s.section(),
    comparePeriodicPsi2Incorrect: s.section(),

    aSuperpositionOfEigenstatesIntro: s.section(),
    meaningOfRedLineInSim: s.section(),
    explainTimeDependenceOfProbDens: s.section(),
    behaviorOfProbDensAtMidpoint: s.section(),
    tableTime0: s.section(),
    tableTime25: s.section({
      messages: [
        "prob amp incorrect",
        "prob dens incorrect",
        "graph incorrect",
        "phase difference incorrect",
        "correct",
      ],
    }),
    tableTime50: s.section(),
    completeTable: s.section(),
    symmetry: s.section(),
    explainSymmetryWhenPerp: s.section(),
    periodOfProbDens: s.section({
      messages: ["periodOfProbDensCorrect", "periodOfProbDensIncorrect"],
    }),
    // Legacy.
    periodOfProbDensCorrect: s.section(),
    periodOfProbDensIncorrect: s.section(),
    table: s.section(),
    tableGuidance: s.section(),

    timeEvolutionIntro: s.section(),
    incorrectStatementsWrapUp: s.section(),
    explainWhyGraphIncorrect: s.section(),
    connectSimWithCorrectDescription: s.section(),
    superpositionTimeDependence: s.section(),
  },
  responses: {
    groundStateGraph: s.chooseOne(["psi1", "psi2", "psi1^2", "psi2^2"]),
    timeEvolvedGroundState: s.string(false),
    groundStateTimeDependence: s.chooseOne([
      "none",
      "no time dependence",
      "-E_1",
      "+E_1",
      "-E_n",
      "+E_n",
    ]),
    timeEvolutionDescription: s.string(),
    rotationDirection: s.chooseOne(["clockwise", "counterclockwise"]),
    probDensRelationshipToProbAmp: s.string(),
    probDensDependsOnTime: s.boolean(),
    exp3PiOver2: s.string(false),
    difTimePlotAxisX: s.string(false),
    difTimePlotAxisY: s.string(false),
    wholeFunctionTimeDependencePlot: s.string(),

    prevGraphComparison: s.string(),
    simGraphComparison: s.string(),
    rotationPeriod1: s.number(),
    rotationPeriod2: s.number(),
    comparePeriodicPsi2: s.chooseOne(["same", "different"]),
    comparePeriodicPsi2Difference: s.string(),
    verifyRotationPeriod2: s.string(), // Legacy.
    agreementStudentA: s.chooseOne(["agree", "disagree"]),
    explainStudentA: s.string(),
    agreementStudentB: s.chooseOne(["agree", "disagree"]),
    explainStudentB: s.string(),
    agreementStudentC: s.chooseOne(["agree", "disagree"]),
    explainStudentC: s.string(),
    agreementStudentD: s.chooseOne(["agree", "disagree"]),
    explainStudentD: s.string(),
    agreementStudentE: s.chooseOne(["agree", "disagree"]),
    explainStudentE: s.string(),

    meaningOfRedLineInSim: s.string(),
    explainTimeDependenceOfProbDens: s.string(),
    behaviorOfProbDensAtMidpoint: s.string(),
    explainProbDensAtTime0: s.string(),
    table: s.object({
      t000: TableRow,
      t025: TableRow,
      t050: TableRow,
      t075: TableRow,
    }),
    samePlaneSymmetry: s.chooseOne(["symmetric", "asymmetric"]),
    perpPlaneSymmetry: s.chooseOne(["symmetric", "asymmetric"]),
    explainSymmetryWhenPerp: s.string(),
    periodOfProbDens: s.number(),

    explainWhyIncorrectStudentA: s.string(),
    explainWhyIncorrectStudentB: s.string(),
    explainWhyGraphIncorrect: s.string(),
    connectSimWithCorrectDescription: s.string(),
    superpositionTimeDependenceExplain: s.string(),
  },
  hints: {
    groundStateGraph: s.hint(),
    rotationDirection: s.hint(),
    rotationDirectionFeedback: s.hint(),
    probDensPlot: s.hint(),
    prevGraphComparison: s.hint(),
    simGraphComparison: s.hint(),
    hbar: s.hint(),
    verifyRotationPeriod2: s.hint(),
    explainProbDensAtTime0: s.hint(),

    // Finding psiA in tableTime25.
    table025PsiA1: s.hint(),
    table025PsiA2: s.hint(),
    table025PsiA3: s.hint(),
    table025Delta: s.hint(),
  },
});
