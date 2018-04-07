'use strict';

// This is the common production configuration for client and server

const UglifyJSPlugin  = require('uglifyjs-webpack-plugin');

module.exports = (env, paths) => ({
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map',
  plugins: [
  ],
  optimization: {
    // We want to configure the uglifier manually to include Safari 10 support
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true,
        uglifyOptions: {
          compress: true,
          safari10: true,
          mangle: {
            safari10: true
          },
          output: {
            safari10: true
          }
        }
      })
    ]
  }
});
