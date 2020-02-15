const postcss = require('postcss');

const DEFAULT_OPTIONS = {
  whiteList: ['html', 'body', 'head']
};

module.exports = postcss.plugin('postcss-trash-killer', opts => {
  const { whiteList } = [...opts, ...DEFAULT_OPTIONS];
  return root => {
    root.walkDecls(decl => {
      // eslint-disable-next-line no-console
      console.log(whiteList, decl);
    });
  };
});
