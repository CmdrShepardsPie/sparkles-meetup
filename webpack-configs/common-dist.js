'use strict';

// This is the common production configuration for client and server

const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin');

// https://webpack.js.org/guides/production-build/
module.exports = (env, root) => ({
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'nosources-source-map',
  plugins: [
    // LoaderOptionsPlugin to provide backwards compatibility with older plugins and loaders
    new webpack.LoaderOptionsPlugin({
      // Don't cache, so we always have fresh output
      cache: false,
      // Display debug information
      debug: true,
      // Minify everything
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Combine all the WebPack modules into one big IIFE (Immediately-Invoked Function Expression)
    //  instead of making one for each module (makes the code smaller and faster)
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Copy raw assets to their identical location and name in 'dist/client' in case they weren't properly imported
    // TODO: make this work right across client and server (just copies all client files to both client and server)
    // new CopyWebpackPlugin(
    //   [
    //     { context: './client', from: '**/*', to: './' }
    //   ],
    //   {
    //     ignore: [
    //       '*.js',
    //       '*.ts',
    //       '*.css',
    //       '*.scss',
    //       '*.html'
    //     ]
    //   }),
    // Minifiy and obfuscate the code
    new UglifyJSPlugin({
      // Run processes in parallel so it's faster
      parallel: true,
      // Keep/output source maps
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          // Keep it Safari 10 compatible
          safari10: true
        }
      }
    }),
    // new webpack.SourceMapDevToolPlugin()
  ]
});
