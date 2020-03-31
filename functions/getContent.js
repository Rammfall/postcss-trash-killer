const fs = require('fs');

/**
 * @param {string[]} files - array of files
 * @returns {string} return all text from files array
 */
const getContent = files =>
  files.map(file => fs.readFileSync(file, 'utf8')).join();

module.exports = getContent;
