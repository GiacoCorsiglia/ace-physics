export { tutorial as tutorialSetup } from "./config";
export * from "./page-factories";

/**
 * A no-op (identity function), which indicates to the tutorial validation tests
 * that we *intended* to repeat the reference to this model.
 */
export const repeatedModel = <T>(model: T) => model;
