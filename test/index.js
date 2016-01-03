'use strict'

const Readable = require('stream').Readable
const assert = require('assert')

const ObjectTransform = require('..')

describe('Streaming Object Transform', () => {
  it('should execute all the transform functions', done => {
    const transform = ObjectTransform([
      val => {
        val.name += 1
        return val
      },
      val => {
        val.name = val.name.toUpperCase()
        return val
      }
    ])

    const stream = new Readable({
      objectMode: true
    })

    stream.push({
      name: 'a'
    })
    stream.push({
      name: 'b'
    })
    stream.push(null)

    let counter = 0

    stream.pipe(transform())
    .on('error', done)
    .on('end', done)
    .on('data', obj => {
      switch (counter++) {
        case 0:
          assert.equal(obj.name, 'A1')
          break
        case 1:
          assert.equal(obj.name, 'B1')
          break
        default:
          throw new Error('boom')
      }
    })
  })
})
