'use strict'

var path = require('path')
var fs = require('fs')
var array = require('cast-array')
var parallel = require('run-parallel')
var partial = require('ap').partial

module.exports = readUp

function readUp (filenames, options, callback) {
  filenames = array(filenames)
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var start = options.cwd || process.cwd()
  var end = options.root || path.parse(start).root

  var results = []

  ;(function find (directory) {
    parallel(filenames.map(createReader), function (err, files) {
      if (err) return callback(err)
      results.push.apply(results, files.filter(Boolean))
      if (directory !== end) return find(path.dirname(directory))
      callback(null, results)
    })

    function createReader (filename) {
      return partial(read, path.resolve(directory, filename))
    }
  })(start)
}

function read (filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err && err.code !== 'ENOENT') return callback(err)
    err ? callback(null) : callback(null, data)
  })
}
