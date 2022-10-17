import * as s from "@/schema/tutorial";

const TableRow = s.object({
  phaseDifference: s.chooseOne(["0", "pi/2", "pi", "-pi/2"]),
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
      s.string()
    ),
    firstExcitedProbE2Changes: s.chooseOne(["true", "false"], s.string()),
    superpositionProbRightHalfChanges: s.chooseOne(
      ["true", "false"],
      s.string()
    ),
    superpositionProbE2Changes: s.chooseOne(["true", "false"], s.string()),
  },
  sections: {
    timeEvolutionInfiniteSquareWellPotentialIntro: s.section(),
    groundStateGraph: s.section(),
    timeEvolvedGroundState: s.section(),
    timeEvolvedGroundStateChoice: s.section(),
    timeEvolutionDescription: s.section(),
    probDensPlot: s.section(),
    difTimePlot: s.section({
      messages: ["answer"],
    }),
    wholeFunctionTimeDependencePlot: s.section(),
    // Legacy sections.
    groundStateSketch: s.section(),

    anEnergyEigenstateIntro: s.section(),
    simSetup: s.section(),
    prevGraphComparison: s.section(),
    simGraphComparison: s.section(),
    rotationPeriods: s.section(),
    rotationPeriodsCorrect: s.section(),
    rotationPeriodsClose: s.section(),
    rotationPeriodsOffByFactor: s.section(),
    rotationPeriodsIncorrect: s.section(),
    comparePeriodicPsi2: s.section(),
    comparePeriodicPsi2Correct: s.section(),
    comparePeriodicPsi2Incorrect: s.section(),
    verifyRotationPeriod2: s.section(),
    studentStatementsOnTimeEvolution: s.section(),
    studentStatementsOnTimeEvolutionGuidance: s.section(),

    aSuperpositionOfEigenstatesIntro: s.section(),
    meaningOfRedLineInSim: s.section(),
    explainTimeDependenceOfProbDens: s.section(),
    behaviorOfProbDensAtMidpoint: s.section(),
    table: s.section(),
    tableGuidance: s.section(),
    symmetry: s.section(),
    explainSymmetryWhenPerp: s.section(),
    periodOfProbDens: s.section(),
    periodOfProbDensCorrect: s.section(),
    periodOfProbDensIncorrect: s.section(),

    timeEvolutionIntro: s.section(),
    incorrectStatementsWrapUp: s.section(),
    explainWhyGraphIncorrect: s.section(),
    connectSimWithCorrectDescription: s.section(),
  },
  responses: {
    groundStateGraph: s.chooseOne(["psi1", "psi2", "psi2^2"]),
    timeEvolvedGroundState: s.string(),
    groundStateTimeDependence: s.chooseOne([
      "none",
      "-E_1",
      "+E_1",
      "-E_n",
      "+E_n",
    ]),
    timeEvolutionDescription: s.string(),
    probDensRelationshipToProbAmp: s.string(),
    probDensDependsOnTime: s.boolean(),
    exp3PiOver2: s.string(),
    difTimePlotAxisX: s.string(),
    difTimePlotAxisY: s.string(),
    wholeFunctionTimeDependencePlot: s.string(),

    prevGraphComparison: s.string(),
    simGraphComparison: s.string(),
    rotationPeriod1: s.number(),
    rotationPeriod2: s.number(),
    comparePeriodicPsi2: s.chooseOne(["same", "different"]),
    comparePeriodicPsi2Difference: s.string(),
    verifyRotationPeriod2: s.string(),
    agreementStudentA: s.chooseOne(["agree", "disagree"]),
    explainStudentA: s.string(),
    agreementStudentB: s.chooseOne(["agree", "disagree"]),
    explainStudentB: s.string(),
    agreementStudentC: s.chooseOne(["agree", "disagree"]),
    explainStudentC: s.string(),
    agreementStudentD: s.chooseOne(["agree", "disagree"]),
    explainStudentD: s.string(),

    meaningOfRedLineInSim: s.string(),
    explainTimeDependenceOfProbDens: s.string(),
    behaviorOfProbDensAtMidpoint: s.string(),
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
  },
  hints: {
    // Hints here.
  },
});
