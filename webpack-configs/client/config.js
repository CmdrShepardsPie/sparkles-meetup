'use strict';

const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin  = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlCriticalPlugin  = require('html-critical-webpack-plugin');

const entry = require('./entry');
const output  = require('./output');
const resolve = require('./resolve');

const linting = require('../loaders/linting');
const sourcemaps  = require('../loaders/sourcemaps');
const code  = require('../loaders/code');
const assets  = require('../loaders/assets');
const html  = require('../loaders/html');

// Env is environment string ('production' or 'development')
// Root is the root of the application, passed because '__dirname'
//   is the directory of the current js file, not the root execution directory
module.exports = (env, root) => ({
  cache: true,
  context: root,
  entry: entry(env, root),
  output: output(env, root),
  resolve: resolve(env, root),
  module: {
    rules: [
      ...linting(env, root),
      ...sourcemaps(env, root),
      ...code(env, root),
      ...html(env, root),
      // Use the 'extracting' version of the styles loader if in production (dist)
      ...(/dist/i.test(env) ? require('../loaders/styles-extract') : require('../loaders/styles'))(env, root),
      ...assets(env, root)
    ]
  },
  plugins: [
    // Style Lint all .scss, .sass, and .css files
    // Plugin is preferred over loader so it'll run on all files,
    //   instead of just imported/included files
    // See .stylelintrc  for configuration
    new StyleLintPlugin({
      files: [path.resolve(root, 'client/app/**/*.s?(a|c)ss')],
      emitErrors: false
    }),
    // Delete the dist/client folder to start fresh
    new CleanWebpackPlugin(['dist/client'], { root }),
    // Create a 'vendor' chunk from our 'app' entry so node_modules libraries are in their own file
    new CommonsChunkPlugin({
      // Name of the bundle (vendor.js)
      name: 'vendor',
      // Only analyze the app entry point, we don't want to change the others
      chunks: ['app'],
      // Check if module name is a string and is in node_modules
      minChunks: (module) => typeof module.userRequest === 'string' && /node_modules/.test(module.userRequest.split('!').pop())
    }),
    // Add all the CSS and JavaScript chunk references to index.html
    new HtmlWebpackPlugin({
      // Input
      template: path.resolve(root, 'client/app/_index.html'),
      // Output (configured in client/output.js)
      filename: 'index.html',
      // Sort the chunks (individual JS and CSS output files) so they load in the right order
      chunksSortMode: (left, right) => {
        // Priority from left to right, with polyfills loading before vendor (Vue, etc.) before app
        const entryPoints = ['polyfills', 'vendor', 'app'];
        // Sorting 'algorithm'
        const leftIndex = entryPoints.indexOf(left.names[0]);
        const rightIndex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightIndex) {
          return 1;
        } else if (leftIndex < rightIndex) {
          return -1;
        } else {
          return 0;
        }
      }
    }),
    // If in 'production' (dist) mode
    ...(/dist/i.test(env)
      ? [
        // Bring in extract text plugins to put the core CSS in its own file
        // Extractions are generated in loaders/styles-extract.js
        ...require('../misc/extract-text').getAll(),
        // Further extract the critical CSS and inline it into the index.html
        // TODO: This broke and I don't know why (yet)
        new HtmlCriticalPlugin({
          base: path.resolve(root, 'dist/client'),
          src: 'index.html',
          dest: 'index.html',
          inline: true,
          minify: true,
          // extract: true,
          width: 1440,
          height: 900,
          penthouse: {
            blockJSRequests: false
          }
        })
      ]
      // 'development' (dev) mode, no additional plugins
      : [])
  ]
});
