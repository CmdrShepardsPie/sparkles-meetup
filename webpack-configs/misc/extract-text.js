'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractors = [];

function getNew() {
  const count = extractors.length;
  const extractor = new ExtractTextPlugin(`styles.[name].css`);
  extractors.push(extractor);
  return extractor;
}

function makeNew(use) {
  const extractor = getNew();
  const fallback = use.splice(0, 1);
  return extractor.extract({
    fallback,
    use
  });
}

function getAll() {
  return extractors;
}

module.exports = {
  getNew,
  makeNew,
  getAll
}
