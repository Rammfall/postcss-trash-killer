const postcss = require('postcss');

const plugin = require('../../index');

/**
 * @param {string} input plain css text
 * @param {string} output plain css text
 * @param {string} folder folder in test folder(default basic)
 * @param {boolean} tagSelectors Support tag selector
 */
function run(input, output, folder = 'basic', tagSelectors = true) {
  const options = {
    paths: [`testData/plugin/${folder}/`],
    fileExtensions: ['.html', '.js'],
    tagSelectors
  };
  expect(postcss([plugin(options)]).process(input).css).toBe(output);
}

module.exports = run;
