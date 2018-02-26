'use strict';

const path = require('path');

module.exports = (env, root) => ({
  // WebPack should look for files/modules in the client folder first, followed by the node_modules folder
  modules: [
    path.resolve(root, 'client/app'),
    'node_modules'
  ],

  // When an extension is not specified on an import, look for a .ts file first, then fallback to a .js file
  extensions: ['.ts', '.js'],

  // Create module aliases, so you can reference then without relative paths (import 'components/something')
  alias: {
    // Vue specific aliases to point to the ES6 module version of files
    'vue$': 'vue/dist/vue.runtime.esm.js',
    'vue-router$': 'vue-router/dist/vue-router.esm.js',
    'vuex$': 'vuex/dist/vuex.esm.js',

    // These aliases are only for WebPack, any general purpose path aliases need to be reflected in tsconfig.json too
    assets: path.resolve(root, 'client/app/assets'),
    components: path.resolve(root, 'client/app/components'),
    containers: path.resolve(root, 'client/app/containers'),
    services: path.resolve(root, 'client/app/services'),
    styles: path.resolve(root, 'client/app/styles'),

    config: path.resolve(root, 'config'),
    data: path.resolve(root, 'data'),
    client: path.resolve(root, 'client/app'),
    server: path.resolve(root, 'server')
  }
});
