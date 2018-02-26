'use strict';

const path = require('path');

module.exports = (env, root) => ({
  test: /\.component\.(ts|js)$/,
  enforce: 'post',
  use: ['vue-hot-reload-loader'],
  exclude: [ path.resolve(root, 'node_modules') ]
});
