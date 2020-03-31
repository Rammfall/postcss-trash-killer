const flatMap = require('array.prototype.flatmap');

const path = require('path');
const fs = require('fs');

/**
 * @param {string} pathName - path to files for parse
 * @param {string[]} exts - array of extension files. Example: ['.js', '.ts']
 * @returns {string[]} - array files with extensions
 */
const getFiles = (pathName, exts) => {
  // if (fs.existsSync(pathName)) {
  const files = fs.readdirSync(pathName);

  return flatMap(files, file => {
    const filename = path.join(pathName, file);
    if (
      fs.lstatSync(filename).isDirectory() &&
      !filename.includes('node_modules')
    ) {
      return getFiles(filename, exts);
    }
    if (exts.includes(path.extname(filename))) {
      return [filename];
    }
    return [];
  });
  // }

  // throw new Error('One or more your path does not exist');
};

module.exports = getFiles;
