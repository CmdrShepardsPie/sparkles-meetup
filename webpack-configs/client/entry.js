'use strict';

const path = require('path');

module.exports = (env, root) => ({
  // First, enter at polyfills as they need to be loaded first
  polyfills: path.join(root, 'client/app/polyfills.js'),
  // Second, enter at the main app file, and traverse the application tree from there
  app: path.join(root, 'client/app/bootstrap/app.bootstrap.ts')
});
