'use strict';

const path = require('path');

module.exports = (env, root) => ([
  {
    // ES LINT LOADER
    // Reference: https://github.com/MoOx/eslint-loader
    // Lint ECMAScript
    // See .eslintrc for configuration

    // Run before other loaders
    enforce: 'pre',

    // Run on .js files
    test: /\.js$/,

    // Use the eslint-loader
    use: [
      { loader: 'eslint-loader', options: { cache: true } }
    ],
    exclude: [ path.resolve(root, 'node_modules') ]
  },
  {
    // TS LINT LOADER
    // Reference: https://github.com/wbuchwalter/tslint-loader
    // Lint TypeScript

    // Run before other loaders
    enforce: 'pre',

    // Run on .ts files
    test: /\.ts$/,

    // Use the tslint-loader, see tslint.json for configuration
    use: [
      { loader: 'tslint-loader', options: { cache: true, typeCheck: true } }
    ],
    exclude: [ path.resolve(root, 'node_modules') ]
  }
]);
