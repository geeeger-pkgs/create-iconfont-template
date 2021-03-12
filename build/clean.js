const fs = require('fs-extra');
const { join } = require('path');

module.exports = function () {
  fs.emptyDirSync(join(__dirname, '../lib'));
}

