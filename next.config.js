// @ts-check
const path = require("path");

const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA: COMMIT_SHA,
} = process.env;
process.env.SENTRY_DSN = SENTRY_DSN;

const withPlugins =
  (plugins, config) =>
  (...args) =>
    plugins.reduce((c, plugin) => plugin(c), config(...args));

module.exports = withPlugins([require("next-images")], (phase) => ({
  // Only create routes for those files in the `pages` directory that end with
  // these extensions.  This way we can put non-route files in the pages
  // directory, allowing us to collocate such files with the relevant routes.
  pageExtensions: ["page.tsx", "endpoint.ts"],

  // For next-images; remove SVG in favor of svgr
  fileExtensions: ["jpg", "jpeg", "png", "gif", "ico", "webp", "jp2", "avif"],

  // Real next config.
  sassOptions: {
    // TODO:
    includePaths: [
      path.join(__dirname, "lib/design"),
      path.join(__dirname, "lib/design/css"),
    ],
  },

  images: {
    // TODO: Consider switching to built-in next.js image handling.
    disableStaticImages: true,
  },

  // For Sentry.
  productionBrowserSourceMaps: true,
  env: {
    // Make the COMMIT_SHA available to the client so that Sentry events can
    // be marked for the release they belong to.
    NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
  },

  /**
   *
   * @param {import("webpack").Configuration} config
   */
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    //////////////////////////////////////////////////////////////////////////
    // Sentry config.
    // See: https://github.com/vercel/next.js/tree/canary/examples/with-sentry
    //////////////////////////////////////////////////////////////////////////
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    // Define an environment variable so source code can check whether or not
    // it's running on the server so we can correctly initialize Sentry
    config.plugins.push(
      new options.webpack.DefinePlugin({
        "process.env.NEXT_IS_SERVER": JSON.stringify(
          options.isServer.toString()
        ),
      })
    );

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === "production"
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules"],
          stripPrefix: ["webpack://_N_E/"],
          urlPrefix: `~/_next`,
          release: COMMIT_SHA,
          environment: process.env.NEXT_PUBLIC_ACE_ENV,
        })
      );
    }
    //////////////////////////////////////////////////////////////////////////
    // End Sentry config.
    //////////////////////////////////////////////////////////////////////////

    return config;
  },
}));
