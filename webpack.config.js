'use strict';

const root  = __dirname;
const merge = require('webpack-merge');

module.exports = env => ([
  merge(
    require('./webpack-configs/client/config')(env, root),
    require(`./webpack-configs/common-${env}`)(env, root)
  ),
  merge(
    require('./webpack-configs/server/config')(env, root),
    require(`./webpack-configs/common-${env}`)(env, root)
  )
]);
