'use strict';

module.exports = (env, paths) => ({
  test: /\.component\.(ts|js)$/,
  enforce: 'post',
  use: ['vue-hot-reload-loader'],
  include: [ paths.clientSrc ]
});
