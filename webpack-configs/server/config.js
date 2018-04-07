'use strict';

// See client/config.js for more comprehensive comments
const fs  = require('fs');
const path = require('path');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entry = require('./entry');
const output  = require('./output');
const resolve = require('./resolve');

const linting = require('../loaders/linting');
const sourcemaps  = require('../loaders/sourcemaps');
const code  = require('../loaders/code');
const assets  = require('../loaders/assets');

module.exports = (env, paths) => ({
  cache: true,
  context: paths.root,
  target: 'node',
  // node: false, // Node polyfills and mocks (enabled by default for web browsers, want them disabled for node)
  externals: fs.readdirSync(path.join(paths.root, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .reduce((prev, mod) => { prev[mod] = 'commonjs ' + mod; return prev; }, {}),
  entry: entry(env, paths),
  output: output(env, paths),
  resolve: resolve(env, paths),
  module: {
    rules: [
      ...linting(env, paths),
      ...sourcemaps(env, paths),
      ...code(env, paths),
      ...assets(env, paths)
    ]
  },
  plugins: [
    new CleanWebpackPlugin([paths.serverDist], { root: paths.root }),
    // new CopyWebpackPlugin([
    //   { from: '**/*', to: paths.dbDist }
    // ], { context: paths.dbSrc }),
    new NodemonPlugin({
      nodeArgs: [ '--inspect' ]
    })
  ],

  // If in 'production' (dist) mode
  // ...(/dist/i.test(env)
  //   ? {
  //     optimization: {
  //       runtimeChunk: false,
  //       splitChunks: {
  //         chunks: 'all'
  //       }
  //     }
  //   }
  //   // 'development' (dev) mode, no chunks
  //   : {})
});
