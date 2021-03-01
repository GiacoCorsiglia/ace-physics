const plugins = [];
if (process.env.NODE_ENV === "test") {
  const tsconfig = require("./tsconfig.json");

  plugins.push([
    require.resolve("babel-plugin-module-resolver"),
    {
      root: [tsconfig.compilerOptions.baseUrl || "."],
      alias: Object.fromEntries(
        Object.entries(tsconfig.compilerOptions.paths || {}).map(([k, [v]]) => [
          `${k.replace(/\/\*/, "")}`,
          `${v.replace(/\/\*/, "")}`,
        ])
      ),
    },
  ]);
}

module.exports = {
  plugins,

  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
        },
      },
    ],
    "linaria/babel",
  ],
};
