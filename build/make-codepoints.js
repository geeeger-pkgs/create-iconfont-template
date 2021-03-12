const pinyin = require('pinyin')
const Stream = require('stream')
const { basename } = require('path');
const { getAlias, getCodePoints } = require('./helper');

module.exports = function(ref) {
  const codepoints = {}
  const stream = new Stream.Transform({
    objectMode: true
  });
  stream._transform = function(file, unused, cb) {
    const filename = basename(file.path, '.svg');
    const py = pinyin(filename.replace(/\s/, '').replace(/#/, ''), {
      style: pinyin.STYLE_NORMAL
    }).map(v => v[0]).join('')

    codepoints[py] = {
      filename: filename,
      code: ''
    }
    this.push(file)
    cb()
  }
  stream._flush = function(cb) {
    let start = 0xF000
    let keys = Object.keys(codepoints)
    keys.sort()
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      codepoints[element].code = (start++).toString('16').toUpperCase()
    }
    ref.codepointsOrigin = codepoints
    ref.aliases = Object.assign(ref.aliases, getAlias(codepoints))
    ref.codepoints = Object.assign(ref.codepoints, getCodePoints(codepoints))
    cb()
  }
  return stream
}
