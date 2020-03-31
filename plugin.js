const getFiles = require('./functions/getFiles');
const getContent = require('./functions/getContent');
const getWords = require('./functions/getWords');
const getLibFiles = require('./functions/getLibFiles');

const { regex, regexForAttributeSelector } = require('./config/index');
const htmlTags = require('./lists/html-tags');
const pseudo = require('./lists/pseudo');

const DEFAULT_OPTIONS = {
  paths: [],
  fileExtensions: [],
  whitelist: [],
  tagSelectors: true,
  libs: [],
  libsExtensions: []
};

/**
 * @param {object} options Object params
 * @param {string[]} options.paths Paths to files whats needs check on selectors
 * @param {string[]} options.fileExtensions File extensions for paths
 * @param {string[]} options.whitelist White list selectors which not need to remove
 * @param {boolean} options.tagSelectors Support all tag selector
 * @param {string[]} options.libs Paths to libs (exclude 'node_modules' path)
 * @param {string[]} options.libsExtension Extensions to libs
 * @returns {function(...[*]=)} returns postcss plugin
 */
const plugin = options => css => {
  const {
    paths,
    fileExtensions,
    whitelist,
    tagSelectors,
    libs,
    libsExtensions
  } = Object.assign(DEFAULT_OPTIONS, options);
  let allSelectors = [].concat(whitelist);

  allSelectors = allSelectors.concat(pseudo);
  if (tagSelectors === true) {
    allSelectors = allSelectors.concat(htmlTags);
  }
  let content = paths.reduce((prev, current) => {
    const result = new Set(
      getWords(getContent(getFiles(current, fileExtensions)), regex).concat(
        prev
      )
    );

    return [...result];
  }, allSelectors);

  content = libs.reduce((prev, current) => {
    const result = new Set(
      getWords(getContent(getLibFiles(current, libsExtensions)), regex).concat(
        prev
      )
    );

    return [...result];
  }, content);

  css.walkRules(rule => {
    // eslint-disable-next-line no-param-reassign
    rule.selectors = rule.selectors.filter(selector => {
      let res;

      if (!regexForAttributeSelector.test(selector)) {
        res = getWords(selector, regex).every(word => {
          return content.includes(word);
        });
      } else {
        res = true;
      }

      return res;
    });

    if (rule.selectors.length === 1 && rule.selectors[0] === '') rule.remove();
  });

  css.walkAtRules('media', atRule => {
    if (atRule.nodes.length === 0) {
      atRule.remove();
    }
  });
};

module.exports = plugin;
