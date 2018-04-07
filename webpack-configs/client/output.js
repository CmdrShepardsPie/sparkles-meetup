'use strict';

module.exports = (env, paths) => ({
  path: paths.clientDist,
  library: 'better-meetupper-client',
  libraryTarget: 'umd',
  umdNamedDefine: true,
  publicPath: '/',

  // If in 'production' (dist) mode
  ...(/dist/i.test(env)
    ? {
      filename: 'code/[name]/[name].build_[hash:5].js',
      chunkFilename: 'code/[name]/[name].chunk_[chunkhash:5].js',
    }
    // 'development' (dev) mode
    : {
      filename: 'code/dev/[name].dev.build_[hash:5].js',
      chunkFilename: 'code/dev/[name].dev.chunk_[chunkhash:5].js',
    }),

  crossOriginLoading: 'use-credentials'
});
