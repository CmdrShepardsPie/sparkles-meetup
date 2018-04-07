'use strict';

const path  = require('path');

const root  = __dirname;
const src = path.resolve(root, 'src');
const dist  = path.resolve(root, 'dist');
const clientSrc = path.resolve(src, 'client');
const clientDist  = path.resolve(dist, 'client');
const serverSrc = path.resolve(src, 'server');
const serverDist  = path.resolve(dist, 'server');
const dbSrc = path.resolve(src, 'db');
const dbDist  = path.resolve(dist, 'db');

const paths = { root, src, dist, clientSrc, clientDist, serverSrc, serverDist, dbSrc, dbDist };
const merge = require('webpack-merge');

module.exports = env => ([
  merge(
    require('./webpack-configs/client/config')(env, paths),
    require(`./webpack-configs/common-${env}`)(env, paths)
  ),
  merge(
    require('./webpack-configs/server/config')(env, paths),
    require(`./webpack-configs/common-${env}`)(env, paths)
  )
]);
