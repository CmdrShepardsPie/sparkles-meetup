'use strict';

const path  = require('path');
const util  = require('../misc/util');

module.exports = (env, paths) => ({
  // WebPack should look for files/modules in the server folder first, followed by the node_modules folder
  modules: [
    path.join(paths.serverSrc),
    'node_modules'
  ],

  // When an extension is not specified on an import, look for a .ts file first, then fallback to a .js file
  extensions: ['.ts', '.js'],

  // Create module aliases, so you can reference then without relative paths (import 'components/something')
  alias: {
    // Vue specific aliases to point to the ES6 module version of files
    ...util.convertTSConfigPaths(paths, require(path.join(paths.root, 'tsconfig.json')))
  }
});
