const fs = require('fs');

/**
 * @param {string[]} files - array of files
 * @return {string}
 */
const getContent = files =>
  files.map(file => fs.readFileSync(file, 'utf8')).join();

module.exports = getContent;
