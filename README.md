# phash-image

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

  [pHash](http://www.phash.org/) for images in node.js.

  Phash is a library that will create a "perceptual hash" of media files, so similar files will return similar hashes. Typically to compare hashes,
  a simple [Hamming distance](http://en.wikipedia.org/wiki/Hamming_distance) between the two hashes is a good indicator of how similar two
  media files are.

## Installation

phash-image depends on [CImg](http://cimg.sourceforge.net/), [pHash](http://www.phash.org/), [ImageMagicK](http://www.imagemagick.org/).

On Ubuntu:

```bash
sudo apt-get install cimg-dev libphash0-dev libmagickcore-dev
```

On OSX:

```bash
brew install phash imagemagick
```

Then, install using npm:

```bash
$ npm install phash-image
```

## API

```js
var phash = require('phash-image');
// with a callback
phash(filename, (err, hash) => );
// as a promise
phash(filename).then( hash => );
// integer distance. the shorter, the more similar
var distance = phash.compare(hash1, hash2);
```

[npm-image]: https://img.shields.io/npm/v/phash-image.svg?style=flat-square
[npm-url]: https://npmjs.org/package/phash-image
[github-tag]: http://img.shields.io/github/tag/mgmtio/phash-image.svg?style=flat-square
[github-url]: https://github.com/mgmtio/phash-image/tags
[travis-image]: https://img.shields.io/travis/mgmtio/phash-image.svg?style=flat-square
[travis-url]: https://travis-ci.org/mgmtio/phash-image
[coveralls-image]: https://img.shields.io/coveralls/mgmtio/phash-image.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/mgmtio/phash-image
[david-image]: http://img.shields.io/david/mgmtio/phash-image.svg?style=flat-square
[david-url]: https://david-dm.org/mgmtio/phash-image
[license-image]: http://img.shields.io/npm/l/phash-image.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/phash-image.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/phash-image
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/
