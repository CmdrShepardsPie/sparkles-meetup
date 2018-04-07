'use strict';

module.exports = (env, paths) => ({
  path: paths.serverDist,
  library: 'better-meetupper-server',
  libraryTarget: 'umd',
  umdNamedDefine: true,
  publicPath: '/',

  // If in 'production' (dist) mode
  ...(/dist/i.test(env)
    ? {
      filename: '[name].build_[hash:5].js',
      chunkFilename: '[name].chunk_[chunkhash:5].js',
    }
    // 'development' (dev) mode
    : {
      filename: '[name].dev.js',
      chunkFilename: '[name].dev.chunk_[chunkhash:5].js',
    }),

});
