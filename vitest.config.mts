import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfig from "./tsconfig.json";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",

    alias: Object.fromEntries(
      Object.entries(tsconfig.compilerOptions.paths || {}).map(([k, [v]]) => [
        k.replace(/\/\*$/, ""),
        new URL(v.replace(/\*$/, ""), import.meta.url).pathname,
      ]),
    ),

    setupFiles: ["./vitest.setup.ts"],

    // We need the testing globals for React testing library.
    // https://github.com/testing-library/react-testing-library/issues/1240
    globals: true,

    // There's some sort of race condition bug in CI where connections to
    // dynamoDB local are being dropped.  It seems similar to this node-fetch
    // issue: https://github.com/node-fetch/node-fetch/issues/1735.  Disabling
    // parallel test execution resolves it.
    // fileParallelism: Boolean(process.env.CI) ? false : undefined,
  },
});
