import * as webpack from "webpack";

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  entry: `${__dirname}/src/index.ts`,
  output: {
    path: `${__dirname}/build/`,
    // Lambda expects this filename by default.
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  target: "node",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // This makes the builds significantly faster!
              transpileOnly: process.env.NODE_ENV === "development",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  // devtool: "inline-source-map",
  optimization: {
    nodeEnv: false,
    minimize: false,
    noEmitOnErrors: true, // This is the default for "production" but still.
  },
  // The AWS SDK is included in the Lambda runtime
  externals: [/^aws\-sdk(\/|$)/],
};

export default config;
