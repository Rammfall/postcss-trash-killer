const postcss = require('postcss');

const plugin = require('../../index');

function run(input, output, folder = 'basic', tagSelectors = true) {
  const options = {
    paths: `testData/plugin/${folder}/`,
    fileExtensions: ['.html', '.js'],
    tagSelectors
  };
  expect(postcss([plugin(options)]).process(input).css).toBe(output);
}

module.exports = run;
