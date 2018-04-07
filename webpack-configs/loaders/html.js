'use strict';

const path = require('path');

module.exports = (env, paths) => ([
  {
    // HTML LOADER
    // Reference: https://github.com/webpack/html-loader
    // Allow loading html through js

    // Run on .html files
    test: /\.html$/,

    // Use the html-loader
    use: [
      {
        loader: 'vue-template-loader',
        options: {
          scoped: true,
          minimize: true,
          // hmr: true,
          // Emit source-maps
          sourceMap: true,
          // Export as an es6 module default for better WebPack support
          exportAsEs6Default: true,
          // Root project path to resolve relative files
          // root: path.join(root, 'client'),
          transformToRequire: {
            // The key should be an element name
            // The value should be an attribute name or an array of attribute names
            img: 'src',
            video: 'src',
            link: 'href'
          }
        }
      }
    ],
    exclude: [ path.join(paths.clientSrc, '_app_index.html'), path.join(paths.clientSrc, 'index.html') ]
  }
]);
