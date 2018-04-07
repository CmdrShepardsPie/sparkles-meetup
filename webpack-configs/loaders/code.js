'use strict';

const path = require('path');

module.exports = (env, paths) => ([
  {
    // BABEL LOADER
    // Reference: https://github.com/babel/babel-loader
    // Transpile .js files using babel-loader
    // Compiles ESNext into browser-compatible (ES5/6) code

    // Run on .js files
    test: /\.js$/,

    // Use the babel-loader
    use: [
      // Babel transpiler, see .babelrc for configuration
      {
        loader: 'babel-loader',
        options: {
          sourceMap: true, // Emit sourcemaps
          cacheDirectory: true // Cache compilation
        }
      }
    ],
    ...(/dev/i.test(env) ? { exclude: [ path.join(paths.root, 'node_modules') ] } : {})
  },
  {
    // TYPESCRIPT LOADER
    // Reference: https://github.com/TypeStrong/ts-loader
    // Transpile .ts files using ts-loader
    // Compiles TS into ESNext code, then ESNext into browser-compatible (ES5/6) code

    // Run on .ts files
    test: /\.ts$/,

    // Use ts-loader then babel-loader
    use: [
      // Babel transpiler, see .babelrc for configuration
      {
        loader: 'babel-loader',
        options: {
          sourceMap: true, // Emit sourcemaps
          cacheDirectory: true // Cache compilation
        }
      },
      // See tsconfig.json for configuration
      'ts-loader'
    ],
    ...(/dev/i.test(env) ? { exclude: [ path.join(paths.root, 'node_modules') ] } : {})
  }
]);
