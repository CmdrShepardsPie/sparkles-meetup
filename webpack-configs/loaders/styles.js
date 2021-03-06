'use strict';

const path = require('path');

module.exports = (env, paths) => ([
  {
    // Loaders that transform css into a format for webpack consumption should be post loaders (enforce: 'post')
    enforce: 'post',
    test: /\.(sass)|(scss)|(css)$/,
    use: [
      {
        loader: 'vue-style-loader',
        options: {
          manualInject: true,
          ssrId: true,
          sourceMap: true
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          minimize: true
        }
      }
    ]
  },
  {
    // The loaders that compile to css (postcss and sass in this case) should be left as normal loaders
    test: /\.css$/,
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
      }
    ]
  },
  {
    // The loaders that compile to css (postcss and sass in this case) should be left as normal loaders
    test: /\.(sass)|(scss)$/,
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
  },
  // {
  //   // The loaders that compile to css (postcss and stylus in this case) should be left as normal loaders
  //   test: /\.styl$/,
  //   use: [
  //     {
  //       loader: 'postcss-loader',
  //       options: {
  //         sourceMap: true
  //       }
  //     },
  //     {
  //       loader: 'resolve-url-loader',
  //       options: {
  //         sourceMap: true
  //       }
  //     },
  //     {
  //       loader: 'stylus-loader',
  //       options: {
  //         sourceMap: true,
  //         preferPathResolver: true
  //       }
  //     }
  //   ]
  // }
]);
