// @ts-check
const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Only create routes for those files in the `pages` directory that end with
  // these extensions.  This way we can put non-route files in the pages
  // directory, allowing us to colocate such files with the relevant routes.
  pageExtensions: ["page.tsx", "endpoint.ts"],

  sassOptions: {
    includePaths: [path.join(__dirname, "lib/design")],
  },

  sentry: {
    hideSourceMaps: true,
  },

  async headers() {
    const headers = [];

    // Ensure search engines don't crawl beta.acephysics.net.
    if (process.env.NEXT_PUBLIC_ACE_ENV !== "production") {
      headers.push({
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      });
    }

    return headers;
  },
};

// Sentry's should be the last plugin added.
module.exports = withSentryConfig(nextConfig, {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
});
