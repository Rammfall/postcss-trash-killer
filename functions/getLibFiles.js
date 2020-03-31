const flatMap = require('array.prototype.flatmap');

const path = require('path');
const fs = require('fs');

/**
 * @param {string} lib path to lib exclude node_modules
 * @param {string[]} exts file extension for files
 * @returns {string[]} all files that match
 */
const wrapper = (lib, exts) => {
  /**
   * @param {string} lib path to lib exclude node_modules
   * @param {string[]} exts file extension for files
   * @returns {string[]} all files that match
   */
  // eslint-disable-next-line no-shadow
  function getLibFiles(lib, exts) {
    const files = fs.readdirSync(lib);

    return flatMap(files, file => {
      const filename = path.join(`${lib}`, file);
      if (
        fs.lstatSync(filename).isDirectory() &&
        filename.match(/node_modules/g).length <= 1
      ) {
        return getLibFiles(filename, exts);
      }
      if (exts.includes(path.extname(filename))) {
        return [filename];
      }
      return [];
    });
  }

  return getLibFiles(`node_modules/${lib}`, exts);
};

module.exports = wrapper;
