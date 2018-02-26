'use strict';

const extractText = require('../misc/extract-text');
const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = (env, root) => ([
  {
    enforce: 'post',
    test: /\.s?(a|c)ss$/,
    use: extractText.makeNew([
      {
        loader: 'vue-style-loader',
        options: {
          manualInject: true,
          ssrId: true,
          sourceMap: true
        }
      },
      StringReplacePlugin.replace({
        replacements: [
          {
            pattern: new RegExp(root, 'g'),
            replacement: function (match, p1, offset, string) {
              return '';
            }
          }
        ]
      }),
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }
    ])
  },
  // We needed to split the rule for .scss files across two rules
  {
    // The loaders that compile to css (postcss and sass in this case) should be left as normal loaders
    test: /\.s(a|c)ss$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  }
]);
