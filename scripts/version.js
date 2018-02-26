'use strict';

const replace = require('replace-in-file');
const pkgVersion = require('../package.json').version;

const options = {
  files: 'docker-compose.yml',
  from: /:v(.*)/g,
  to: (':v' + pkgVersion),
  encoding: 'utf8'
};

replace(options).then(function (changedFiles) {

}, function (error) {
  console.error('Error occurred:', error);
});
