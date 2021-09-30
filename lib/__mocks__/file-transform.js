// Modified from: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/jest/fileTransform.js
"use strict";

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html
module.exports = {
  process(_, filename) {
    // Return what Next Image expects.
    /** @type {StaticImageData} */
    const imageData = {
      src: filename,
      width: 100,
      height: 100,
    };
    return `module.exports = ${JSON.stringify(imageData)};`;
  },
};
