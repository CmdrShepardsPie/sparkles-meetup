'use strict';

const path = require('path');

module.exports = (env, paths) => (
  [
    path.join(paths.serverSrc, 'polyfills.js'),
    path.join(paths.serverSrc, 'index.ts')
  ]
);
