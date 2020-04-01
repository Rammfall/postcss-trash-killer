/**
 * @param {string[]} arr parts selectors array
 * @param {string} word word, where we search any part of strings
 * @returns {boolean} return boolean, if word contains in array
 */
const includesPart = (arr, word) => {
  return arr.some(item => word.indexOf(item));
};

module.exports = includesPart;
