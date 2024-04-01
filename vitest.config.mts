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

    fileParallelism: Boolean(process.env.CI) ? false : undefined,
  },
});
