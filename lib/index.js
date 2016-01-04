'use strict'

const Transform = require('stream').Transform
const waterfall = require('waterfall-then')
const destroy = require('destroy')

module.exports = fns => {
  const fn = waterfall(fns)

  return () => {
    const stream = new Transform({
      transform,
      objectMode: true,
    })

    stream.destroy = noop

    stream.on('pipe', source => {
      // pass destroys up the chain
      stream.destroy = () => {
        destroy(source)
        stream.emit('close')
      }
      // if an error happens on transform,
      // try to destroy the source stream to avoid leaks
      stream.on('error', () => destroy(stream))
      // pass errors from the source to here
      source.on('error', err => stream.emit('error', err))
    })

    return stream
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

function noop() {}
