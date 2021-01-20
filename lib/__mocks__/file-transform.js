// Modified from: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/jest/fileTransform.js
"use strict";
const path = require("path");

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process(_, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFilename = path
        .parse(filename)
        .name.replace(/-/g, "")
        .replace(
          /(\w)(\w*)/g,
          (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
        );
      const componentName = JSON.stringify(`Svg${pascalCaseFilename}`);
      return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: React.forwardRef(
          (function() {
            function MockSvgComponent(props, ref) {
              return {
                $$typeof: Symbol.for('react.element'),
                type: 'svg',
                ref: ref,
                key: null,
                props: Object.assign({}, props, {
                  children: ${assetFilename}
                })
              };
            }
            MockSvgComponent.displayName = ${componentName};
            return MockSvgComponent;
          })()
        ),
      };`;
    }

    return `module.exports = ${assetFilename};`;
  },
};
