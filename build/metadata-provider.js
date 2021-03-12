const path = require('path');

function getMetadataService(options = {}) {
  return function getMetadataFromFile(file, cb) {
    const basename = path.basename(file);
    const matches = basename.match(/^(?:((?:u[0-9a-f]{4,6},?)+)-)?(.+)\.svg$/i);
    const metadata = {
      path: file,
      name: options.aliases[matches[2]][0],
      unicode: [String.fromCodePoint(parseInt(options.codepoints[options.aliases[matches[2]][0]], 16))],
      renamed: false,
    };
    cb(null, metadata)
  };
}

module.exports = getMetadataService;
