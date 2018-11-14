'use strict'

var test = require('tape')
var path = require('path')
var proxyquire = require('proxyquire')
var readUp = require('./')

test('single filename', function (t) {
  t.plan(2)

  var cwd = path.resolve(__dirname, 'fixture', 'a', 'b', 'c')
  var root = __dirname

  readUp('data.txt', { cwd, root }, function (err, data) {
    if (err) return t.end(err)
    t.ok(Array.isArray(data), 'receives array of data')
    t.deepEqual(data.map(String).map(string => string.trim()), [
      'c',
      'b',
      'a',
      'root'
    ])
  })
})

test('multiple filenames', function (t) {
  t.plan(2)

  var cwd = path.resolve(__dirname, 'fixture', 'a', 'b', 'c')
  var root = __dirname

  readUp(['data.txt', 'data-alternate.txt'], { cwd, root }, function (err, data) {
    if (err) return t.end(err)
    t.ok(Array.isArray(data), 'receives array of data')
    t.deepEqual(data.map(String).map(string => string.trim()), [
      'c',
      'b',
      'b-alternate',
      'a',
      'root'
    ])
  })
})

test('root directory', function (t) {
  t.plan(2)

  var cwd = path.resolve(__dirname, 'fixture', 'a', 'b', 'c')
  var root = path.resolve(__dirname, 'fixture', 'a')

  readUp('data.txt', { cwd, root }, function (err, data) {
    if (err) return t.end(err)
    t.ok(Array.isArray(data), 'receives array of data')
    t.deepEqual(data.map(String).map(string => string.trim()), [
      'c',
      'b',
      'a'
    ])
  })
})

test('cwd', function (t) {
  t.plan(2)

  var cwd = path.resolve(__dirname, 'fixture', 'a', 'b')
  var root = path.resolve(__dirname, 'fixture')

  readUp('data.txt', { cwd, root }, function (err, data) {
    if (err) return t.end(err)
    t.ok(Array.isArray(data), 'receives array of data')
    t.deepEqual(data.map(String).map(string => string.trim()), [
      'b',
      'a',
      'root'
    ])
  })
})

test('no root', function (t) {
  t.plan(2)

  var cwd = path.relative(__dirname, path.resolve(__dirname, 'fixture'))

  readUp('data.txt', { cwd }, function (err, data) {
    if (err) return t.end(err)
    t.ok(Array.isArray(data), 'receives array of data')
    t.deepEqual(data.map(String).map(string => string.trim()), [
      'root'
    ])
  })
})

test('only ignores ENOENT error', function (t) {
  t.plan(2)

  var _readUp = proxyquire('./', {
    fs: {
      readFile: function (filename, callback) {
        callback(new Error('broke'))
      }
    }
  })

  var cwd = path.resolve(__dirname, 'fixture', 'a', 'b')
  var root = path.resolve(__dirname, 'fixture')

  _readUp('root-only.txt', { cwd, root }, function (err) {
    t.ok(err)
    t.equal(err.message, 'broke')
  })
})
