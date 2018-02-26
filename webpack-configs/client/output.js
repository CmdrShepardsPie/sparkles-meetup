'use strict';

const path = require('path');

module.exports = (env, root) => ({
  // Absolute output directory
  path: path.join(root, 'dist/client/'),

  // Output path from the view of the page
  // Uses webpack-dev-server in development
  // publicPath: './',

  // Filename for entry points
  // Only adds hash in build mode
  filename: 'entry.[name].js',

  // Filename for non-entry points
  // Only adds hash in build mode
  chunkFilename: 'chunk.[name].js',

  // Filename for source-map in browser's devtools
  // devtoolModuleFilenameTemplate: '[resource-path]',

  library: 'sparkles-meetup-client',
  libraryTarget: 'umd'
});
