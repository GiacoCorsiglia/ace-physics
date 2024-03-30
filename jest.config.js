// @ts-check
const nextJest = require("next/jest");
const path = require("path");
const tsconfig = require("./tsconfig.json");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  // Disable matching  "__test__/*" or ".spec.ts" files for tests.
  testRegex: "(\\.|/)test\\.[jt]sx?$",

  // Ensure the `baseUrl` from tsconfig.json is respected.
  modulePaths: tsconfig.compilerOptions.baseUrl
    ? [tsconfig.compilerOptions.baseUrl.replace(".", "<rootDir>")]
    : undefined,
  moduleNameMapper: {
    // Fake CSS Modules.
    "\\.(css|less|sass|scss)$": "<rootDir>/lib/__mocks__/css-module-mock.js",
    // Support for tsconfig paths.
    ...Object.fromEntries(
      Object.entries(tsconfig.compilerOptions.paths || {}).map(([k, [v]]) => [
        `^${k.replace(/\*/, "(.*)")}`,
        path.join("<rootDir>", v.replace(/\*/, "$1")),
      ]),
    ),
  },

  // Setup.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

module.exports = createJestConfig(config);
