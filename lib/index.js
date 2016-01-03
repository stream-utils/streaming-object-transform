'use strict'

const Transform = require('stream').Transform
const waterfall = require('waterfall-then')
const destroy = require('destroy')

module.exports = fns => {
  const fn = waterfall(fns)

  return () => {
    return new Transform({
      transform,
      objectMode: true,
    }).on('pipe', function (source) {
      // pass errors from the source to here
      source.on('error', err => this.emit('error', err))
      // if an error happens on transform,
      // try to destroy the source stream to avoid leaks
      this.on('error', () => destroy(source))
    })
  }

  function transform (obj, NULL, done) {
    fn(obj)
      .then(obj => {
        this.push(obj)
        done()
      })
      .catch(err => done(err))
  }
}
