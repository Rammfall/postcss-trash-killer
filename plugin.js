const getFiles = require('./functions/getFiles');
const getContent = require('./functions/getContent');
const getWords = require('./functions/getWords');
const getLibFiles = require('./functions/getLibFiles');
const includesPart = require('./functions/includesPart');

const { regex, regexForAttributeSelector } = require('./config/index');
const htmlTags = require('./lists/html-tags');
const pseudo = require('./lists/pseudo');
const pseudoWithArgs = require('./lists/pseudoWithArgs');

const DEFAULT_OPTIONS = {
  paths: [],
  fileExtensions: [],
  whitelist: [],
  tagSelectors: true,
  libs: [],
  libsExtensions: [],
  dynamicSelectors: []
};

/**
 * @param {object} options Object params
 * @param {string[]} options.paths Paths to files whats needs check on selectors
 * @param {string[]} options.fileExtensions File extensions for paths
 * @param {string[]} options.whitelist White list selectors which not need to remove
 * @param {boolean} options.tagSelectors Support all tag selector
 * @param {string[]} options.libs Paths to libs (exclude 'node_modules' path)
 * @param {string[]} options.libsExtension Extensions to libs
 * @param {string[]} options.dynamicSelectors Extensions to libs
 * @returns {function(...[*]=)} returns postcss plugin
 */
const plugin = options => css => {
  const {
    paths,
    fileExtensions,
    whitelist,
    tagSelectors,
    libs,
    libsExtensions,
    dynamicSelectors
  } = Object.assign(DEFAULT_OPTIONS, options);
  let allSelectors = [].concat(whitelist);

  // add to selectors pseudoclasses and pseudoelements
  allSelectors = allSelectors.concat(pseudo);
  // if turn on html tags - add them to list
  if (tagSelectors === true) {
    allSelectors = allSelectors.concat(htmlTags);
  }
  let dynamic = dynamicSelectors.map(item => item.toLowerCase());

  // all content from project files
  let content = paths.reduce(
    (prev, current) => {
      const result = new Set(
        getWords(getContent(getFiles(current, fileExtensions)), regex).concat(
          prev
        )
      );

      return [...result];
    },
    allSelectors.map(item => item.toLowerCase())
  );

  // add content from project libs
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
        if (includesPart(dynamic, selector)) {
          return true;
        }
        // TODO: refactor this part
        res = getWords(selector, regex).every((word, index, array) => {
          if (index > 0 && includesPart(pseudoWithArgs, selector)) {
            return array.slice(1).some(item => pseudoWithArgs.includes(item));
          }
          return content.includes(word);
        });
      } else {
        res = true;
      }

      return res;
    });

    // remove empty rules
    if (rule.selectors.length === 1 && rule.selectors[0] === '') {
      rule.remove();
    }
  });

  // if media rule have 0 rules - remove it
  css.walkAtRules('media', atRule => {
    if (atRule.nodes.length === 0) {
      atRule.remove();
    }
  });
};

module.exports = plugin;
