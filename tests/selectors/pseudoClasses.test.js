const run = require('../utils/run');

describe('Checks pseudo classes', () => {
  test('Check with pseudo class', () => {
    run(
      '.selector:after {color: red;} .uselessSelector:after {color: red;}',
      '.selector:after {color: red;}',
      'combinatorsSelectors'
    );

    run(
      '.selector::after {color: red;} .uselessSelector::after {color: red;}',
      '.selector::after {color: red;}',
      'combinatorsSelectors'
    );

    run(
      '.selector:before {color: red;} .uselessSelector:before {color: red;}',
      '.selector:before {color: red;}',
      'combinatorsSelectors'
    );

    run(
      '.selector::before {color: red;} .uselessSelector::before {color: red;}',
      '.selector::before {color: red;}',
      'combinatorsSelectors'
    );
  });
});
