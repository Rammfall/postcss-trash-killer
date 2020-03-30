const getFiles = require('./functions/getFiles');
const getContent = require('./functions/getContent');
const getWords = require('./functions/getWords');

const { regex } = require('./config/index');
const htmlTags = require('./lists/html-tags');

const DEFAULT_OPTIONS = {
  paths: 'app/',
  fileExtensions: [],
  whitelist: [],
  tagSelectors: true,
  libs: []
};

/**
 * @param {string[]} options.paths
 * @param {string[]} options.fileExtensions
 * @param {string[]} options.whitelist
 * @param {boolean} options.tagSelectors
 * @param {string[]} options.libs
 * @return {function(...[*]=)}
 */
const plugin = options => css => {
  const { paths, fileExtensions, whitelist, tagSelectors } = Object.assign(
    DEFAULT_OPTIONS,
    options
  );
  if (tagSelectors === true) {
    whitelist.concat(htmlTags);
  }

  const content = getWords(
    getContent(getFiles(paths, fileExtensions)),
    regex
  ).concat(whitelist);

  css.walkRules(rule => {
    // eslint-disable-next-line no-param-reassign
    rule.selectors = rule.selectors.filter(selector => {
      const res = getWords(selector, regex).every(word => {
        return content.includes(word);
      });

      if (!res) {
        rule.remove();

        return false;
      }

      return true;
    });
  });

  css.walkAtRules('media', atRule => {
    if (atRule.nodes.length === 0) {
      atRule.remove();
    }
  });
};

module.exports = plugin;
