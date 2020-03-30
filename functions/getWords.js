/**
 * @param {string} content
 * @param {RegExp} regex
 * @return {string[]}
 */
const getWords = (content, regex) =>
  content
    .toLowerCase()
    .split(regex)
    .filter(Boolean);

module.exports = getWords;
