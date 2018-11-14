# read-up [![Build Status](https://travis-ci.org/bendrucker/read-up.svg?branch=master)](https://travis-ci.org/bendrucker/read-up) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/read-up.svg)](https://greenkeeper.io/)

> Read multiple files with a given filename and aggregate the results


## Install

```
$ npm install --save read-up
```


## Usage

```js
var readUp = require('read-up')

readUp('data.txt', function (err, data) {
  console.log(data[0])
  // === cat './a/b/c/data.txt'  
})
```

```
# File tree
.
├── a
│   ├── b
│   │   ├── c
│   │   │   └── data.txt
│   │   ├── data-alternate.txt
│   │   ├── data.txt
│   │   └── ignored.txt
│   └── data.txt
└── data.txt
```

## API

#### `readUp(filenames, [options], callback)` -> `undefined`

Reads upwards looking for `filenames` in each directory. Results are returned in the order they were read, so the deepest files come first.

##### filenames

*Required*  
Type: `array[string]` / `string`

One or more filenames to search for in each directory.

##### options

###### cwd

Type: `string`  
Default: `process.cwd()`

The directory where traversal will begin.

###### root

Type: `string`  
Default: `/`

The directory where traversal will end.

##### callback

*Required*  
Type: `function`  
Arguments: `err, results`

A callback that will be called with an error or an array of `Buffer` objects representing file data. `results` are ordered by read-time.

## License

MIT © [Ben Drucker](http://bendrucker.me)
