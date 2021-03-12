// @ts-check
const path = require("path");
const tsconfig = require("./tsconfig.json");

/** @type {import("@jest/types").Config.InitialOptions} */
const config = (module.exports = {
  // Test files.
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],

  // Transformation/compilation.
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",

    // Fake asset imports.
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "<rootDir>/lib/__mocks__/file-transform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  // Modules.
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
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
      ])
    ),
  },

  // Setup.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
});
