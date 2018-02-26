'use strict';

module.exports = (env, root) => ([
  {
    // SOURCE MAP LOADER
    // Reference: https://github.com/webpack-contrib/source-map-loader
    // Extracts SourceMaps for source files that as added as sourceMappingURL comment

    // Run before other loaders
    enforce: 'pre',

    // Run on .js, .ts, .css, .scss, and .sass files
    test: /\.(j|t|s?(a|c)s)s$/,

    // Use the source-map-loader
    use: [
      'source-map-loader'
    ]
  }
]);
