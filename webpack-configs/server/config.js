'use strict';

// See client/config.js for more comprehensive comments

const webpack = require('webpack');
// const path = require('path');
const fs  = require('fs');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const NameAllModulesPlugin  = require('name-all-modules-plugin');

const entry = require('./entry');
const output  = require('./output');
const resolve = require('./resolve');

const linting = require('../loaders/linting');
const sourcemaps  = require('../loaders/sourcemaps');
const code  = require('../loaders/code');
const assets  = require('../loaders/assets');

module.exports = (env, root) => ({
  cache: true,
  context: root,
  target: 'node',
  externals: fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .reduce((prev, mod) => { prev[mod] = 'commonjs ' + mod; return prev; }, {}),
  entry: entry(env, root),
  output: output(env, root),
  resolve: resolve(env, root),
  module: {
    rules: [
      ...linting(env, root),
      ...sourcemaps(env, root),
      ...code(env, root),
      ...assets(env, root)
    ]
  },

  // WebPack plugin configuration
  plugins: [
    // CleanWebpackPlugin deletes the dist folder before build
    new CleanWebpackPlugin(['dist/server'], { root }),

    // Run node (server) and keep it running, restart if files changed
    new NodemonPlugin()
  ]
});
