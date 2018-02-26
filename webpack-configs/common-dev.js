'use strict';

// This is the common development configuration for client and server

const webpack = require('webpack');
const NameAllModulesPlugin  = require('name-all-modules-plugin');

// https://webpack.js.org/guides/production-build/
module.exports = (env, root) => ({
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'source-map',
  plugins: [
    // LoaderOptionsPlugin to provide backwards compatibility with older plugins and loaders
    new webpack.LoaderOptionsPlugin({
      // Cache whenever possible
      cache: true,
      // Display debug information
      debug: true,
      // Don't minify anything
      minimize: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    // Give WebPack modules names instead of numbers
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new NameAllModulesPlugin()
  ]
});
