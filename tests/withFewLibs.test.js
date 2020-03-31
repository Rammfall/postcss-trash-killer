const run = require('./utils/runWithConfigs');

describe('Check with libs', () => {
  test('Not remove slick slider classes', () => {
    run(
      '.slick-track {display: none;} .slick-active {color: red;} .noUserSelector {color: red;}',
      '.slick-track {display: none;} .slick-active {color: red;}',
      ['fewLibs'],
      ['slick-carousel'],
      ['.js']
    );
  });

  test('Remove slick classes if we set json extension', () => {
    run(
      '.slick-track {display: none;} .slick-active {color: red;} .noUserSelector {color: red;}',
      '',
      ['fewLibs'],
      ['slick-carousel'],
      ['.json']
    );
  });
});
