
# streaming-object-transform

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Apply a series of promise-returning transform functions on an object stream.

```js
const transform = require('streaming-object-transform')([
  obj => {
    // sort object alphabetically
    return require('deep-object-sort')(obj)
  },
  async => {
    // asynchronously populate the user
    if (obj.user_id) obj.user = await Users.getById(obj.user_id)
    return obj
  }
])

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  db.query({})
    .stream()
    .on('error', next)
    .pipe(transform())
    .on('error', next)
    .pipe(require('JSONStream').stringify())
    .on('error', next)
    .pipe(res)
})
```

[npm-image]: https://img.shields.io/npm/v/streaming-object-transform.svg?style=flat-square
[npm-url]: https://npmjs.org/package/streaming-object-transform
[travis-image]: https://img.shields.io/travis/jonathanong/streaming-object-transform.svg?style=flat-square
[travis-url]: https://travis-ci.org/jonathanong/streaming-object-transform
[codecov-image]: https://img.shields.io/codecov/c/github/jonathanong/streaming-object-transform/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/jonathanong/streaming-object-transform
[david-image]: http://img.shields.io/david/jonathanong/streaming-object-transform.svg?style=flat-square
[david-url]: https://david-dm.org/jonathanong/streaming-object-transform
[license-image]: http://img.shields.io/npm/l/streaming-object-transform.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/streaming-object-transform.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/streaming-object-transform
