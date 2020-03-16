const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

const REGEX = /\[.*?\]|[:*][a-z-_:]+|[^a-z-_]+/g;
const DEFAULT_OPTIONS = {
  path: 'app/',
  exts: [],
  whitelist: ['body', 'html', 'slick', 'slick-track', 'aos']
};

const getFiles = (pathName, exts) =>
  fs.readdirSync(pathName).flatMap(file => {
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

const getContent = files => files.map(f => fs.readFileSync(f, 'utf8')).join();
const getWords = content =>
  content
    .toLowerCase()
    .split(REGEX)
    .filter(Boolean);

module.exports = postcss.plugin('remove-unused', opts => css => {
  // eslint-disable-next-line no-shadow
  const { path, exts, whitelist } = Object.assign(DEFAULT_OPTIONS, opts);
  const content = getWords(getContent(getFiles(path, exts))).concat(whitelist);

  css.walkRules(rule => {
    // eslint-disable-next-line no-param-reassign
    rule.selectors = rule.selectors.filter(selector => {
      const res = getWords(selector).every(word => {
        return content.includes(word);
      });

      if (!res) {
        rule.remove();
        return false;
      }
      return true;
    });
  });
});
