'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
// const HtmlCriticalPlugin  = require('html-critical-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const ManifestPlugin  = require('webpack-manifest-plugin');
const SriPlugin = require('webpack-subresource-integrity');

const entry = require('./entry');
const output  = require('./output');
const resolve = require('./resolve');

const linting = require('../loaders/linting');
const sourcemaps  = require('../loaders/sourcemaps');
const code  = require('../loaders/code');
const assets  = require('../loaders/assets');
const html  = require('../loaders/html');

// const Extractor = require('../misc/extractor');
// const extractor = new Extractor();

module.exports = (env, paths) => ({
  cache: true,
  context: paths.root,
  entry: entry(env, paths),
  output: output(env, paths),
  resolve: resolve(env, paths),
  module: {
    rules: [
      ...linting(env, paths),
      ...sourcemaps(env, paths),
      ...code(env, paths),
      ...html(env, paths),
      // Extract css in 'production' (dist) mode
      ...(/dist/i.test(env)
        ? require('../loaders/styles-extract')
        : require('../loaders/styles'))(env, paths),
      ...assets(env, paths)
    ]
  },
  plugins: [
    new CleanWebpackPlugin([paths.clientDist], { root: paths.root }),
    // new CopyWebpackPlugin([
    //   // { from: 'index.html', to: paths.clientDist },
    //   // { from: 'assets/logos', to: path.join(paths.clientDist, 'assets/logos/[name].content_[hash:5].[ext]') }
    // ], { context: paths.clientSrc }),
    new HtmlWebpackPlugin({
      template: path.join(paths.clientSrc, '_app_index.html'),
      // Output (configured in client/output.js)
      filename: 'index.html'
    }),
    // If in 'production' (dist) mode
    ...(/dist/i.test(env)
      ? [
        // See .stylelintrc  for configuration
        // Stylelint is broken in dev mode, so only run it for dist
        new StyleLintPlugin({
          files: [path.join(paths.clientSrc, '**/*.s?(a|c)ss')],
          emitErrors: false
        }),
        // Output extracted CSS
        new MiniCssExtractPlugin({
          filename: 'styles/[name]/[name].build_[hash:5].css',
          // .content_[contenthash:5]
          chunkFilename: 'styles/[name]/[name].chunk_[chunkhash:5].css'
        }),
        // Compress output files to gzip
        new CompressionPlugin({
          cache: true,
          minRatio: 2,
          // deleteOriginalAssets: true
        }),
        new ManifestPlugin(),
        new SriPlugin({
          hashFuncNames: ['sha256']
        }),
      ]
      // 'development' (dev) mode, no additional plugins
      : []),
    // new BundleAnalyzerPlugin()
  ],

  // If in 'production' (dist) mode
  ...(/dist/i.test(env)
    ? {
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all'
        },
      },
    }
    // 'development' (dev) mode, no chunks
    : {})
});
