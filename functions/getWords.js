/**
 * @param {string} content text content
 * @param {RegExp} regex regex for split on selectors
 * @returns {string[]} array selectors
 */
const getWords = (content, regex) =>
  content
    .toLowerCase()
    .split(regex)
    .filter(Boolean);

module.exports = getWords;
