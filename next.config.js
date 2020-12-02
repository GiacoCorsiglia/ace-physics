const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const withPlugins = (plugins, config) => (...args) =>
  plugins.reduce((c, plugin) => plugin(c), config(...args));

const forEachRule = (rules, iterator) =>
  rules.forEach((rule) => {
    iterator(rule);
    if (rule.oneOf && Array.isArray(rule.oneOf)) {
      forEachRule(rule.oneOf, iterator);
    }
    if (rule.use && Array.isArray(rule.use)) {
      forEachRule(rule.use, iterator);
    } else if (rule.use) {
      iterator(rule.use);
    }
  });

module.exports = withPlugins(
  [require("next-images"), require("next-linaria")],
  (phase) => ({
    // For next-images; remove SVG in favor of svgr
    fileExtensions: ["jpg", "jpeg", "png", "gif", "ico", "webp", "jp2", "avif"],

    // For next-linaria.
    linaria: {
      displayName: phase === PHASE_DEVELOPMENT_SERVER,
    },

    // Real next config.
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
    webpack(config) {
      const cssX = /(^|\/)css-loader($|\/)/;
      forEachRule(config.module.rules, (rule) => {
        if (cssX.test(rule.loader) && rule.options && rule.options.modules) {
          // Just let me use global selectors in my CSS modules.  I'll be good,
          // I promise.  https://webpack.js.org/loaders/css-loader/#mode
          rule.options.modules.mode = "local";
        }
      });

      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  })
);
