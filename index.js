const postcss = require('postcss');

const DEFAULT_OPTIONS = {
  whiteList: ['html', 'body', 'head']
};

module.exports = postcss.plugin('postcss-trash-killer', opts => {
  return root => {
    root.walkDecls(decl => {
      console.log(decl);
    });
  };
});
