'use strict';

const path = require('path');

module.exports = (env, paths) => ([
  {
    test: /\.(svg|png|jpg|jpeg|gif)([?]?.*)$/,

    // Export them as files with the file-loader
    use: [
      {
        // TODO: Get files to work without absolute root paths nor url embedding
        loader: 'file-loader',
        options: {
          // limit: 8192,
          context: paths.clientSrc,
          name: '[name].content_[hash:5].[ext]',
          outputPath: 'assets/images'
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
          context: paths.clientSrc,
          name: '[name].content_[hash:5].[ext]',
          outputPath: 'assets/fonts'
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
          context: paths.clientSrc,
          name: '[name].content_[hash:5].[ext]',
          outputPath: 'assets/videos'
        }
      }
    ]
  }
]);
