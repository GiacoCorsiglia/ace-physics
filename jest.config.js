// @ts-check
const tsconfig = require("./tsconfig.json");

/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  // Test files.
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],

  // Transformation/compilation.
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",

    // TODO: Fake asset imports.
    // SEE: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/jest/fileTransform.js
    // "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
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
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // TODO: Add support for tsconfig paths.
  },

  // Setup.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

module.exports = config;
