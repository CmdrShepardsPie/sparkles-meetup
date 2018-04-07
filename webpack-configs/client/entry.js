'use strict';

const path = require('path');

module.exports = (env, paths) => (
  {
    polyfills: path.join(paths.clientSrc, 'polyfills.js'),
    app: path.join(paths.clientSrc, 'bootstrap/app.bootstrap.ts')
  }
);
