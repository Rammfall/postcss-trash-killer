const postcss = require('postcss');

const plugin = require('../index');

function run(input, output, options) {
  options = { path: 'test/', exts: ['.html'] };
  expect(postcss([plugin(options)]).process(input).css).toBe(output);
}

it('Must remove useless selector with rule', () => {
  run('.test {color: red;} .notest {color: black;}', '.test {color: red;}');
});
