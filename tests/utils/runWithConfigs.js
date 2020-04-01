const postcss = require('postcss');

const plugin = require('../../index');

/**
 * @param {string} input plain css text
 * @param {string} output plain css text
 * @param {string[]} folder folder in test folder(default basic)
 * @param {string[]} libs folder in test folder(default basic)
 * @param {string[]} libsExtensions folder in test folder(default basic)
 * @param {string[]} whitelist Selectors that must be been in project
 * @param {boolean} tagSelectors Support tag selector
 */
function run(
  input,
  output,
  folder = ['basic'],
  libs = [],
  libsExtensions = [],
  whitelist = [],
  tagSelectors = true
) {
  const paths = folder.map(item => `testData/plugin/${item}/`);
  const options = {
    paths,
    fileExtensions: ['.html', '.js'],
    tagSelectors,
    libs,
    libsExtensions,
    whitelist
  };

  expect(postcss([plugin(options)]).process(input).css).toBe(output);
}

module.exports = run;
