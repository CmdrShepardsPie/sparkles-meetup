'use strict';

const path = require('path');

function convertTSConfigPaths(paths, config) {
  const tspaths = config.compilerOptions.paths;
  const tssrc = config.compilerOptions.baseUrl;
  const alias = {};
  const strip = /\/\*/;
  for (const key in tspaths) {
    const value = tspaths[key][0];
    // console.log('key', key, 'value', value);
    const wpKey = key.replace(strip, '');
    const wpValue = path.resolve(paths.root, tssrc, value.replace(strip, ''));
    alias[wpKey] = wpValue;
  }
  return alias;
}

module.exports = {
  convertTSConfigPaths
}
