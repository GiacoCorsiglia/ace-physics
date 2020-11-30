const path = require("path");

const withPlugins = (plugins, config) => (...args) =>
  plugins.reduce((c, plugin) => plugin(c), config(...args));

module.exports = withPlugins([require("next-images")], () => ({
  // For next-images; remove SVG in favor of svgr
  fileExtensions: ["jpg", "jpeg", "png", "gif", "ico", "webp", "jp2", "avif"],

  // Real next config.
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
}));
