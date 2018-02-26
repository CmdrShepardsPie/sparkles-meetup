'use strict';

const path = require('path');

module.exports = (env, root) => ([
  {
    test: /\.(svg|png|jpg|jpeg|gif)([?]?.*)$/,

    // Export them as files with the file-loader
    use: [
      {
        // TODO: Get files to work without absolute root paths nor url embedding
        loader: 'file-loader',
        options: {
          // limit: 8192,
          context: path.resolve(root, 'client'),
          name: 'assets/images/[name].[ext]' // Exported file name mask
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2|ttf|eot|otf)([?]?.*)$/,

    // Export them as files with the file-loader
    use: [
      {
        // TODO: Get files to work without absolute root paths nor url embedding
        loader: 'file-loader',
        options: {
          // limit: 8192,
          context: path.resolve(root, 'client'),
          name: 'assets/fonts/[name].[ext]' // Exported file name mask
        }
      }
    ]
  },
  {
    test: /\.(mov|mp4)([?]?.*)$/,

    // Export them as files with the file-loader
    use: [
      {
        // TODO: Get files to work without absolute root paths nor url embedding
        loader: 'file-loader',
        options: {
          // limit: 8192,
          context: path.resolve(root, 'client'),
          name: 'assets/videos/[name].[ext]' // Exported file name mask
        }
      }
    ]
  }
]);
