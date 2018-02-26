# sparkles-meetup

TODO: Put banner here.

![banner]()

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

TODO: Put more badges here.

> Sparkles' Better Meetup Client

TODO: Fill out long description.

## Table of Contents

- [TODO](#todo)
- [File Structure](#file-structure)
- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## TODO


## File Structure

- client          ` Client-side files directory `
    - app           ` App-specific code and files `
        - components  ` Components to be embedded in pages and other components `
        - pages       ` Components to be used as pages `
        - services    ` Application services (data, etc.) that are created and included with Inversify `
        - styles      ` Global and base application styles `
    - assets        ` Images, icons, fonts, etc. `
    - config        ` Application configuration files `
- dist            ` Output directory when building a re-distributable/"prod" build `
- node_modules    ` Installation directory for node modules (package.json) `
- scripts         ` Build (non application) scripts `
- server          ` Simple express.js script to serve files from dist directory for Docker deployment `
- webpack-configs ` Common directory for individual pieces of the WebPack build configuration `
    - loaders       ` WebPack loader configuration (perform processing on individual file types; .js, .scss, .html, etc.) `

## Security

Designed for prototype development, should work when hosted or distributed, but not hardened or guaranteed for prod.

## Background

TODO: Fill out background.

## Install

```
npm install
```

## Usage

Run webpack dev server:
```
npm start
```

Produce minified distributable:
```
npm run dist
```

## API

TODO: Fill out API.

## Maintainers

- [Christopher Simpson](https://github.com/CmdrShepardsPie)

## Contribute

TODO: See [the contribute file](contribute.md)!

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT License (MIT)
