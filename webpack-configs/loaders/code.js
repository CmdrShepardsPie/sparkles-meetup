'use strict';

module.exports = (env, root) => ([
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
    ]
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
    ]
  }
]);
